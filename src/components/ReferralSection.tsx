import { Gift, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ReferralSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Programa de Indicações
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Indique um amigo e ganhem juntos! <span className="text-primary font-semibold">50% de desconto</span> na próxima fatura para vocês dois.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">Benefício Mútuo</h3>
                    <p className="text-muted-foreground">
                      Tanto você quanto a pessoa indicada ganham 50% de desconto na próxima fatura quando ela contratar qualquer plano da GPNet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">Processo Simples</h3>
                    <p className="text-muted-foreground">
                      Preencha um formulário rápido com seus dados e os dados da pessoa indicada. Nossa equipe faz todo o resto!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How it works */}
          <div className="bg-white/50 rounded-2xl p-8 mb-12 border border-primary/10">
            <h3 className="text-2xl font-semibold text-center mb-8">Como Funciona</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold mb-2">Indique</h4>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário com os dados da pessoa que você quer indicar
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold mb-2">Contato</h4>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe entra em contato com a pessoa indicada
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold mb-2">Desconto</h4>
                <p className="text-sm text-muted-foreground">
                  Quando ela contratar, ambos ganham 50% de desconto
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para Indicar e Economizar?
              </h3>
              <p className="text-white/90 mb-6 max-w-md mx-auto">
                Compartilhe a qualidade da GPNet com seus amigos e ganhem juntos!
              </p>
              <Link to="/indicacoes">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Fazer Indicação Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralSection;