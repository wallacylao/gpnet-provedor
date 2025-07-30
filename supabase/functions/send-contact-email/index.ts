
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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const NAME_PATTERN = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
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
    .eq("endpoint", "send-contact-email")
    .gte("window_start", windowStart.toISOString());
  
  if (existingRequests && existingRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Record this request
  await supabase
    .from("rate_limits")
    .insert({
      ip_address: ipAddress,
      endpoint: "send-contact-email",
      request_count: 1,
      window_start: now.toISOString()
    });
  
  return true;
}

// Input sanitization and validation
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

function validateContactData(data: ContactEmailRequest): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || !NAME_PATTERN.test(data.name)) {
    errors.push("Nome inválido");
  }
  
  if (!data.email || !EMAIL_PATTERN.test(data.email)) {
    errors.push("Email inválido");
  }
  
  if (!data.phone || !PHONE_PATTERN.test(data.phone)) {
    errors.push("Telefone inválido");
  }
  
  if (!data.message || data.message.length < 10 || data.message.length > 1000) {
    errors.push("Mensagem deve ter entre 10 e 1000 caracteres");
  }
  
  return { isValid: errors.length === 0, errors };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
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
    let requestData: ContactEmailRequest;
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
      name,
      email,
      phone,
      message,
    } = {
      name: sanitizeInput(requestData.name || ""),
      email: sanitizeInput(requestData.email || ""),
      phone: sanitizeInput(requestData.phone || ""),
      message: sanitizeInput(requestData.message || ""),
    };

    // Validate data
    const validation = validateContactData({
      name,
      email,
      phone,
      message,
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

    // Save contact message to database
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone,
        message,
      });

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

    // Verificar se a chave da API do Resend está configurada
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Erro de configuração do servidor" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "GPNet <noreply@gpnetce.com.br>",
      to: ["sac@gpnetce.com.br"],
      subject: `Nova mensagem de contato - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #22c55e; margin: 0; font-size: 24px;">Nova Mensagem de Contato</h1>
              <p style="color: #666; margin: 5px 0 0 0;">GPNet Provedor de Internet</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Dados do Cliente</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 100px;">Nome:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">E-mail:</td>
                  <td style="padding: 8px 0; color: #333;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Telefone:</td>
                  <td style="padding: 8px 0; color: #333;">${phone}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 16px;">Mensagem:</h3>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Esta mensagem foi enviada através do formulário de contato do site GPNet
              </p>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
                Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' })}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Email error:", emailResponse.error.message);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email enviado com sucesso!",
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error.message);
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
