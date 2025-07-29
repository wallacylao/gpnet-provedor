import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReferralRequest {
  subscriberName: string;
  subscriberCpf: string;
  subscriberPhone: string;
  nomineeName: string;
  nomineePhone: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const {
      subscriberName,
      subscriberCpf,
      subscriberPhone,
      nomineeName,
      nomineePhone,
    }: ReferralRequest = await req.json();

    console.log("Processing referral:", { subscriberName, nomineeName });

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
      console.error("Database error:", dbError);
      throw new Error("Erro ao salvar indicação");
    }

    // Enviar email de confirmação para o assinante
    const subscriberEmailResponse = await resend.emails.send({
      from: "GPNet <noreply@gpnet.com.br>",
      to: ["contato@gpnet.com.br"], // Email da empresa para receber notificações
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
      console.error("Email error:", subscriberEmailResponse.error);
    } else {
      console.log("Email sent successfully:", subscriberEmailResponse);
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
    console.error("Error in send-referral-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Erro interno do servidor" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);