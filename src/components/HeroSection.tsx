
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Headphones, Wifi, Radio, Satellite, Cable } from 'lucide-react';

const HeroSection = () => {
  const scrollToPlans = () => {
    const element = document.getElementById('planos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14">
      {/* Enhanced Background with telecom elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gpnet-green/20 via-white to-gpnet-blue/20">
        {/* Animated network lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A8FF00" />
                <stop offset="100%" stopColor="#30D5C8" />
              </linearGradient>
            </defs>
            {/* Network connection lines */}
            <path d="M100,200 Q300,100 500,200 T900,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
            <path d="M200,400 Q400,300 600,400 T1000,400" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse delay-500" />
            <path d="M150,600 Q350,500 550,600 T950,600" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse delay-1000" />
            
            {/* Connection nodes */}
            <circle cx="100" cy="200" r="6" fill="#A8FF00" className="animate-pulse" />
            <circle cx="500" cy="200" r="6" fill="#30D5C8" className="animate-pulse delay-300" />
            <circle cx="900" cy="200" r="6" fill="#A8FF00" className="animate-pulse delay-600" />
            <circle cx="200" cy="400" r="6" fill="#30D5C8" className="animate-pulse delay-200" />
            <circle cx="600" cy="400" r="6" fill="#A8FF00" className="animate-pulse delay-800" />
            <circle cx="1000" cy="400" r="6" fill="#30D5C8" className="animate-pulse delay-400" />
          </svg>
        </div>

        {/* Floating telecom icons */}
        <div className="absolute inset-0 opacity-5">
          <Wifi className="absolute top-32 left-16 w-20 h-20 text-gpnet-green animate-pulse" />
          <Radio className="absolute top-20 right-32 w-16 h-16 text-gpnet-blue animate-pulse delay-1000 rotate-12" />
          <Satellite className="absolute bottom-40 left-1/4 w-24 h-24 text-gpnet-green animate-pulse delay-2000" />
          <Cable className="absolute bottom-32 right-20 w-18 h-18 text-gpnet-blue animate-pulse delay-500 -rotate-12" />
          <Wifi className="absolute top-1/2 right-16 w-14 h-14 text-gpnet-green animate-pulse delay-1500" />
          <Radio className="absolute bottom-20 left-32 w-16 h-16 text-gpnet-blue animate-pulse delay-700 rotate-45" />
        </div>

        {/* Data flow particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-2 h-2 bg-gpnet-green rounded-full animate-ping"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-gpnet-blue rounded-full animate-ping delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gpnet-green rounded-full animate-ping delay-600"></div>
          <div className="absolute top-2/3 left-3/4 w-1 h-1 bg-gpnet-blue rounded-full animate-ping delay-900"></div>
          <div className="absolute top-3/4 right-0 w-2 h-2 bg-gpnet-green rounded-full animate-ping delay-1200"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Enhanced main heading with more impact */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              Conecte-se ao{' '}
              <span className="bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
                futuro
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-700">
              Internet ultra-rápida que{' '}
              <span className="text-gpnet-blue font-bold">transforma</span>{' '}
              sua experiência digital
            </h2>
          </div>

          {/* Enhanced subtitle with more emotion */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Mais do que velocidade: oferecemos a <strong>liberdade</strong> de navegar, trabalhar, 
            estudar e se divertir <strong>sem limites</strong>. Sua conexão com o mundo nunca foi tão forte.
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={scrollToPlans}
              className="bg-gradient-to-r from-gpnet-green to-gpnet-blue hover:from-gpnet-green-dark hover:to-gpnet-blue-dark text-white px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold border-2 border-transparent hover:border-white/20"
            >
              Descobrir planos
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gpnet-blue text-gpnet-blue hover:bg-gpnet-blue hover:text-white px-10 py-5 rounded-xl transition-all duration-300 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:shadow-xl"
            >
              Fale conosco agora
            </Button>
          </div>

          {/* Enhanced feature highlights with better visual hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Velocidade Real</h3>
              <p className="text-gray-600 text-center text-lg">Até <strong className="text-gpnet-blue">700 Mbps</strong> de velocidade garantida para toda sua família</p>
            </div>

            <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Rede Inteligente</h3>
              <p className="text-gray-600 text-center text-lg">Infraestrutura com <strong className="text-gpnet-green">redundância total</strong> e monitoramento 24h</p>
            </div>

            <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20">
              <div className="w-20 h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Suporte Humano</h3>
              <p className="text-gray-600 text-center text-lg">Atendimento <strong className="text-gpnet-blue">local e personalizado</strong> quando você precisar</p>
            </div>
          </div>

          {/* New trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gpnet-green rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">+5.000 clientes conectados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gpnet-blue rounded-full animate-pulse delay-300"></div>
              <span className="text-sm font-medium">99,8% de disponibilidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gpnet-green rounded-full animate-pulse delay-600"></div>
              <span className="text-sm font-medium">Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
