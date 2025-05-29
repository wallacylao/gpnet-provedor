import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFormValidation } from '@/hooks/useFormValidation';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const { toast } = useToast();
  const { validateForm, sanitizeInput } = useFormValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("=== INÍCIO DO PROCESSO DE ENVIO ===");
    console.log("Estado isLoading:", isLoading);
    
    if (isLoading) {
      console.log("❌ Formulário já está sendo processado, interrompendo");
      return;
    }

    console.log("✅ Iniciando processo de envio...");
    console.log("Dados do formulário original:", formData);

    // Sanitizar dados
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      message: sanitizeInput(formData.message)
    };

    console.log("Dados sanitizados:", sanitizedData);

    // Validar formulário
    console.log("🔍 Iniciando validação...");
    const validation = validateForm(sanitizedData);
    console.log("Resultado da validação:", validation);
    
    if (!validation.isValid) {
      console.log("❌ Validação falhou, erros:", validation.errors);
      setFieldErrors(validation.errors);
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive"
      });
      return;
    }

    console.log("✅ Validação passou, definindo estado de loading");
    setFieldErrors({});
    setIsLoading(true);

    try {
      console.log("📤 Preparando para enviar para Edge Function...");
      console.log("URL do Supabase:", import.meta.env.VITE_SUPABASE_URL);
      console.log("Dados que serão enviados:", sanitizedData);

      console.log("🚀 Chamando supabase.functions.invoke...");
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: sanitizedData
      });

      console.log("📥 Resposta da Edge Function:");
      console.log("Data:", data);
      console.log("Error:", error);

      if (error) {
        console.error("❌ Erro retornado pela Edge Function:", error);
        throw error;
      }

      console.log("✅ Email enviado com sucesso!");

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em até 2 horas. Obrigado!",
      });

      // Reset form
      console.log("🔄 Resetando formulário...");
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (error: any) {
      console.error("💥 ERRO CAPTURADO:", error);
      console.error("Tipo do erro:", typeof error);
      console.error("Propriedades do erro:", Object.keys(error));
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
      
      let errorMessage = "Erro interno do servidor. Tente novamente.";
      
      if (error.message?.includes('fetch')) {
        errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
        console.log("🌐 Erro identificado como problema de rede");
      } else if (error.message?.includes('timeout')) {
        errorMessage = "A solicitação demorou muito para responder. Tente novamente.";
        console.log("⏰ Erro identificado como timeout");
      } else if (error.message?.includes('FunctionsError')) {
        errorMessage = "Erro na função do servidor. Verifique os logs.";
        console.log("🔧 Erro identificado como FunctionsError");
      }

      console.log("📢 Exibindo toast de erro:", errorMessage);

      toast({
        title: "Erro ao enviar mensagem",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      console.log("🏁 Finalizando processo, setando isLoading=false");
      setIsLoading(false);
      console.log("=== FIM DO PROCESSO DE ENVIO ===");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      details: '(88) 9 9712-9857',
      subtitle: 'WhatsApp: (88) 9 9712-9857'
    },
    {
      icon: Mail,
      title: 'E-mail',
      details: 'contato@gpnetce.com.br',
      subtitle: 'suporte@gpnetce.com.br'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      details: 'Rua 4, 43',
      subtitle: 'Cohab II - Sobral, CE'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      details: 'Segunda a Sexta: 8h às 18h',
      subtitle: 'Sábado: 8h às 12h'
    }
  ];

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em{' '}
            <span className="bg-gradient-to-r from-cnet-green to-cnet-blue bg-clip-text text-transparent">
              contato
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos prontos para atender você! Fale conosco e descubra como nossa internet 
            pode transformar sua experiência digital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageSquare className="w-7 h-7 text-cnet-blue mr-3" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-cnet-green to-cnet-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      <p className="text-gray-700 font-medium">{info.details}</p>
                      <p className="text-gray-500 text-sm">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <Phone className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">Ligue Agora</div>
                  <div className="text-sm opacity-90">(88) 9 9712-9857</div>
                </div>
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <MessageSquare className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm opacity-90">Chat direto</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
              <p className="text-gray-600">
                Preencha o formulário e entraremos em contato em até 2 horas
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className={`w-full ${fieldErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    className={`w-full ${fieldErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(88) 9 9999-9999"
                    className={`w-full ${fieldErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Conte-nos como podemos ajudar você..."
                    rows={5}
                    className={`w-full ${fieldErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                    required
                  />
                  {fieldErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{fieldErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cnet-green to-cnet-blue hover:from-cnet-green-dark hover:to-cnet-blue-dark text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
