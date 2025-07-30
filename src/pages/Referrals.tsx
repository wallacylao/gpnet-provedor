import { useState } from 'react';
import { ArrowLeft, Users, Gift, CheckCircle, Phone, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useReferralForm } from '@/hooks/useReferralForm';
import { useCaptcha } from '@/hooks/useCaptcha';

const Referrals = () => {
  const { formData, errors, isSubmitting, handleInputChange, submitForm } = useReferralForm();
  const captcha = useCaptcha();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar CAPTCHA primeiro
    if (!captcha.isValid) {
      setCaptchaError('Por favor, resolva a operação matemática corretamente');
      return;
    }
    
    setCaptchaError('');
    const success = await submitForm();
    if (success) {
      captcha.reset();
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Indicação Enviada com Sucesso!</h1>
            <p className="text-muted-foreground mb-8">
              Obrigado por participar do nosso programa de indicações. Nossa equipe entrará em contato em breve para dar continuidade ao processo.
            </p>
            <div className="space-y-4">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto">
                  Voltar ao Site
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto ml-0 sm:ml-4"
              >
                Fazer Nova Indicação
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao site
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Programa de Indicações GPNet
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Indique um amigo e ganhem juntos! <strong>50% de desconto</strong> na próxima fatura para vocês dois.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Users className="w-5 h-5" />
              <span>Benefício mútuo garantido</span>
            </div>
          </div>

          {/* How it Works */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Preencha o Formulário</h3>
                <p className="text-sm text-muted-foreground">
                  Informe seus dados e os dados da pessoa que você está indicando
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Aguarde o Contato</h3>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe entrará em contato com a pessoa indicada
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Ganhem Juntos</h3>
                <p className="text-sm text-muted-foreground">
                  Quando o indicado contratar, ambos ganham 50% de desconto
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Formulário de Indicação</CardTitle>
              <CardDescription className="text-center">
                Preencha os dados abaixo para participar do programa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados do Assinante */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">
                    Seus Dados (Assinante Atual)
                  </h3>
                  
                  <div>
                    <Label htmlFor="subscriberName">Nome Completo *</Label>
                    <Input
                      id="subscriberName"
                      value={formData.subscriberName}
                      onChange={(e) => handleInputChange('subscriberName', e.target.value)}
                      placeholder="Seu nome completo"
                      className={errors.subscriberName ? 'border-destructive' : ''}
                    />
                    {errors.subscriberName && (
                      <p className="text-sm text-destructive mt-1">{errors.subscriberName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subscriberCpf">CPF *</Label>
                    <Input
                      id="subscriberCpf"
                      value={formData.subscriberCpf}
                      onChange={(e) => handleInputChange('subscriberCpf', e.target.value)}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className={errors.subscriberCpf ? 'border-destructive' : ''}
                    />
                    {errors.subscriberCpf && (
                      <p className="text-sm text-destructive mt-1">{errors.subscriberCpf}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subscriberPhone">Telefone *</Label>
                    <Input
                      id="subscriberPhone"
                      value={formData.subscriberPhone}
                      onChange={(e) => handleInputChange('subscriberPhone', e.target.value)}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      className={errors.subscriberPhone ? 'border-destructive' : ''}
                    />
                    {errors.subscriberPhone && (
                      <p className="text-sm text-destructive mt-1">{errors.subscriberPhone}</p>
                    )}
                  </div>
                </div>

                {/* Dados do Indicado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">
                    Dados da Pessoa Indicada
                  </h3>
                  
                  <div>
                    <Label htmlFor="nomineeName">Nome Completo *</Label>
                    <Input
                      id="nomineeName"
                      value={formData.nomineeName}
                      onChange={(e) => handleInputChange('nomineeName', e.target.value)}
                      placeholder="Nome completo da pessoa indicada"
                      className={errors.nomineeName ? 'border-destructive' : ''}
                    />
                    {errors.nomineeName && (
                      <p className="text-sm text-destructive mt-1">{errors.nomineeName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="nomineePhone">Telefone *</Label>
                    <Input
                      id="nomineePhone"
                      value={formData.nomineePhone}
                      onChange={(e) => handleInputChange('nomineePhone', e.target.value)}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      className={errors.nomineePhone ? 'border-destructive' : ''}
                    />
                    {errors.nomineePhone && (
                      <p className="text-sm text-destructive mt-1">{errors.nomineePhone}</p>
                    )}
                  </div>
                 </div>

                 {/* CAPTCHA */}
                 <div className="bg-gray-50 p-4 rounded-lg border">
                   <Label className="block text-sm font-medium text-gray-700 mb-3">
                     Verificação de Segurança *
                   </Label>
                   <div className="flex items-center space-x-4">
                     <div className="flex items-center space-x-2">
                       <span className="text-lg font-semibold text-gray-800">
                         {captcha.captcha?.question} =
                       </span>
                       <Input
                         type="number"
                         value={captcha.userAnswer}
                         onChange={(e) => captcha.handleAnswerChange(e.target.value)}
                         placeholder="?"
                         className={`w-20 text-center ${captchaError ? 'border-destructive' : captcha.isValid ? 'border-green-500' : ''}`}
                         disabled={isSubmitting}
                       />
                       <Button
                         type="button"
                         variant="outline"
                         size="sm"
                         onClick={captcha.refreshCaptcha}
                         disabled={isSubmitting}
                         className="p-2"
                       >
                         <RefreshCw className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                   {captchaError && (
                     <p className="text-destructive text-sm mt-2">{captchaError}</p>
                   )}
                   {captcha.isValid && (
                     <p className="text-green-600 text-sm mt-2">✓ Verificação concluída</p>
                   )}
                 </div>

                 <Button 
                   type="submit" 
                   size="lg" 
                   className="w-full"
                   disabled={isSubmitting || !captcha.isValid}
                 >
                  {isSubmitting ? 'Enviando...' : 'Enviar Indicação'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obrigatórios. Ao enviar, você concorda que entraremos em contato com a pessoa indicada.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp Contact */}
          <div className="text-center mt-8">
            <Card className="max-w-md mx-auto bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <p className="text-sm text-green-800 mb-4">
                  Tem dúvidas? Fale conosco no WhatsApp!
                </p>
                <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                  <a 
                    href="https://wa.me/5511999999999?text=Olá! Tenho dúvidas sobre o programa de indicações."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chamar no WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;