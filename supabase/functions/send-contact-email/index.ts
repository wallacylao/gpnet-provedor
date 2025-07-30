
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("🚀 Edge Function iniciada");
  console.log("Método da requisição:", req.method);
  console.log("Headers da requisição:", Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("✅ Retornando resposta CORS para OPTIONS");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Lendo body da requisição...");
    const requestBody = await req.text();
    console.log("Body bruto recebido:", requestBody);

    let parsedData: ContactEmailRequest;
    try {
      parsedData = JSON.parse(requestBody);
      console.log("✅ JSON parseado com sucesso:", parsedData);
    } catch (parseError) {
      console.error("❌ Erro ao fazer parse do JSON:", parseError);
      throw new Error("JSON inválido recebido");
    }

    const { name, email, phone, message } = parsedData;

    console.log("📧 Dados extraídos para envio:");
    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Telefone:", phone);
    console.log("Mensagem:", message?.substring(0, 50) + "...");

    // Verificar se a chave da API do Resend está configurada
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("🔑 RESEND_API_KEY configurada:", resendApiKey ? "SIM" : "NÃO");
    console.log("🔑 Primeiros caracteres da chave:", resendApiKey?.substring(0, 10) + "...");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY não configurada");
    }

    console.log("📤 Enviando email via Resend...");

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

    console.log("✅ Resposta do Resend:");
    console.log("ID do email:", emailResponse.data?.id);
    console.log("Objeto completo:", JSON.stringify(emailResponse, null, 2));

    if (emailResponse.error) {
      console.error("❌ Erro retornado pelo Resend:", emailResponse.error);
      throw new Error(`Erro do Resend: ${JSON.stringify(emailResponse.error)}`);
    }

    console.log("🎉 Email enviado com sucesso!");

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
    console.error("💥 ERRO NA EDGE FUNCTION:");
    console.error("Tipo:", typeof error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Objeto completo:", JSON.stringify(error, null, 2));
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Erro interno do servidor. Tente novamente.",
        details: error.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
