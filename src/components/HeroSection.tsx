
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react';

const HeroSection = () => {
  const scrollToPlans = () => {
    const element = document.getElementById('planos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cnet-green/10 via-white to-cnet-blue/10">
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-cnet-green rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-cnet-blue rounded-lg rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 border-2 border-cnet-green rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-cnet-blue rounded-lg rotate-12 animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Internet de{' '}
            <span className="bg-gradient-to-r from-cnet-green to-cnet-blue bg-clip-text text-transparent">
              alta velocidade
            </span>{' '}
            para sua casa e empresa
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            GPNet - Conexão estável, suporte local e tecnologia de ponta para você navegar sem limites
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToPlans}
              className="bg-gradient-to-r from-cnet-green to-cnet-blue hover:from-cnet-green-dark hover:to-cnet-blue-dark text-white px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Confira nossos planos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-cnet-blue text-cnet-blue hover:bg-cnet-blue hover:text-white px-8 py-4 rounded-lg transition-all duration-300 text-lg"
            >
              Fale conosco
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cnet-green to-cnet-blue rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Velocidade Máxima</h3>
              <p className="text-gray-600 text-center">Até 800 Mbps de velocidade real para sua navegação</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cnet-green to-cnet-blue rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rede Redundante</h3>
              <p className="text-gray-600 text-center">Infraestrutura robusta com backup garantido</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cnet-green to-cnet-blue rounded-full flex items-center justify-center mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Local</h3>
              <p className="text-gray-600 text-center">Atendimento próximo e especializado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
