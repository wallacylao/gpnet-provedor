import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per window

// Input validation patterns
const CPF_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const PHONE_PATTERN = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const NAME_PATTERN = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

interface ReferralRequest {
  subscriberName: string;
  subscriberCpf: string;
  subscriberPhone: string;
  nomineeName: string;
  nomineePhone: string;
  captchaAnswer?: string;
}

// Rate limiting function
async function checkRateLimit(supabase: any, ipAddress: string): Promise<boolean> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW);
  
  // Clean old records
  await supabase
    .from("rate_limits")
    .delete()
    .lt("window_start", windowStart.toISOString());
  
  // Count current requests
  const { data: existingRequests } = await supabase
    .from("rate_limits")
    .select("*")
    .eq("ip_address", ipAddress)
    .eq("endpoint", "send-referral-email")
    .gte("window_start", windowStart.toISOString());
  
  if (existingRequests && existingRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Record this request
  await supabase
    .from("rate_limits")
    .insert({
      ip_address: ipAddress,
      endpoint: "send-referral-email",
      request_count: 1,
      window_start: now.toISOString()
    });
  
  return true;
}

// Input sanitization and validation
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

function validateReferralData(data: ReferralRequest): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.subscriberName || !NAME_PATTERN.test(data.subscriberName)) {
    errors.push("Nome do assinante inválido");
  }
  
  if (!data.subscriberCpf || !CPF_PATTERN.test(data.subscriberCpf)) {
    errors.push("CPF inválido");
  }
  
  if (!data.subscriberPhone || !PHONE_PATTERN.test(data.subscriberPhone)) {
    errors.push("Telefone do assinante inválido");
  }
  
  if (!data.nomineeName || !NAME_PATTERN.test(data.nomineeName)) {
    errors.push("Nome do indicado inválido");
  }
  
  if (!data.nomineePhone || !PHONE_PATTERN.test(data.nomineePhone)) {
    errors.push("Telefone do indicado inválido");
  }
  
  return { isValid: errors.length === 0, errors };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Extract IP address
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    // Check rate limit
    const isAllowed = await checkRateLimit(supabase, ipAddress);
    if (!isAllowed) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Muitas tentativas. Tente novamente em alguns minutos." 
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse and validate request body
    let requestData: ReferralRequest;
    try {
      requestData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Dados inválidos" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const {
      subscriberName,
      subscriberCpf,
      subscriberPhone,
      nomineeName,
      nomineePhone,
    } = {
      subscriberName: sanitizeInput(requestData.subscriberName || ""),
      subscriberCpf: sanitizeInput(requestData.subscriberCpf || ""),
      subscriberPhone: sanitizeInput(requestData.subscriberPhone || ""),
      nomineeName: sanitizeInput(requestData.nomineeName || ""),
      nomineePhone: sanitizeInput(requestData.nomineePhone || ""),
    };

    // Validate data
    const validation = validateReferralData({
      subscriberName,
      subscriberCpf,
      subscriberPhone,
      nomineeName,
      nomineePhone,
    });

    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Dados inválidos" 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Salvar indicação no banco
    const { data: referral, error: dbError } = await supabase
      .from("referrals")
      .insert({
        subscriber_name: subscriberName,
        subscriber_cpf: subscriberCpf,
        subscriber_phone: subscriberPhone,
        nominee_name: nomineeName,
        nominee_phone: nomineePhone,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError.message);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Erro interno. Tente novamente." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Enviar email de confirmação para o assinante
    const subscriberEmailResponse = await resend.emails.send({
      from: "GPNet <noreply@gpnetce.com.br>",
      to: ["indique@gpnetce.com.br"], // Email da empresa para receber notificações
      subject: "Nova Indicação Recebida - Programa de Indicações GPNet",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Nova Indicação Recebida!</h1>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #334155; margin-top: 0;">Dados do Assinante:</h2>
            <p><strong>Nome:</strong> ${subscriberName}</p>
            <p><strong>CPF:</strong> ${subscriberCpf}</p>
            <p><strong>Telefone:</strong> ${subscriberPhone}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #334155; margin-top: 0;">Pessoa Indicada:</h2>
            <p><strong>Nome:</strong> ${nomineeName}</p>
            <p><strong>Telefone:</strong> ${nomineePhone}</p>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Lembre-se:</strong> Ambos ganham 50% de desconto na próxima fatura quando a pessoa indicada contratar um plano!
            </p>
          </div>

          <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 30px;">
            GPNet - Internet de Qualidade<br>
            Este é um email automático do sistema de indicações.
          </p>
        </div>
      `,
    });

    if (subscriberEmailResponse.error) {
      console.error("Email error:", subscriberEmailResponse.error.message);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Indicação enviada com sucesso!",
        id: referral.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-referral-email function:", error.message);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Erro interno. Tente novamente mais tarde." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);