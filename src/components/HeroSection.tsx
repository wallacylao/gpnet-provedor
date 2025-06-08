
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1525829528215-ffae12a76ac8',
      alt: 'Sala de estar moderna com sofá e mesa'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
      alt: 'Pessoas trabalhando com laptops em escritório'
    },
    {
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093',
      alt: 'Laptop moderno em mesa de vidro'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToPlans = () => {
    const element = document.getElementById('planos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14">
      {/* Slider Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={`${slide.image}?auto=format&fit=crop&w=1920&h=1080`}
              alt={slide.alt}
              className="w-full h-full object-cover md:object-cover object-center"
              style={{
                objectPosition: 'center 30%'
              }}
            />
            <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
          </div>
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gpnet-green/20 via-transparent to-gpnet-blue/20"></div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gpnet-green scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading with enhanced styling */}
          <div className="mb-4 md:mb-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-2 md:mb-4 text-white drop-shadow-2xl">
              Conecte-se ao{' '}
              <span className="bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
                futuro
              </span>
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold text-white/90 drop-shadow-lg">
              Internet ultra-rápida que{' '}
              <span className="text-gpnet-green font-bold">transforma</span>{' '}
              sua experiência digital
            </h2>
          </div>

          {/* Enhanced subtitle */}
          <p className="text-base md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in delay-300">
            Mais do que velocidade: oferecemos a <strong className="text-gpnet-green">liberdade</strong> de navegar, trabalhar, 
            estudar e se divertir <strong className="text-gpnet-blue">sem limites</strong>. Sua conexão com o mundo nunca foi tão forte.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 animate-fade-in delay-500">
            <Button
              onClick={scrollToPlans}
              className="bg-gradient-to-r from-gpnet-green to-gpnet-blue hover:from-gpnet-green-dark hover:to-gpnet-blue-dark text-white px-6 md:px-10 py-3 md:py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-base md:text-lg font-semibold border-2 border-transparent hover:border-white/20"
            >
              Descobrir planos
              <ArrowRight className="ml-2 w-4 h-4 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gpnet-blue px-6 md:px-10 py-3 md:py-5 rounded-xl transition-all duration-300 text-base md:text-lg font-semibold backdrop-blur-sm bg-white/10 hover:shadow-xl"
            >
              Fale conosco agora
            </Button>
          </div>

          {/* Feature highlights with sequential animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20">
            <div className="group flex flex-col items-center p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 animate-fade-in delay-700">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">Velocidade Real</h3>
              <p className="text-gray-600 text-center text-sm md:text-lg">Até <strong className="text-gpnet-blue">700 Mbps</strong> de velocidade garantida para toda sua família</p>
            </div>

            <div className="group flex flex-col items-center p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 animate-fade-in delay-1000">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">Rede Inteligente</h3>
              <p className="text-gray-600 text-center text-sm md:text-lg">Infraestrutura com <strong className="text-gpnet-green">redundância total</strong> e monitoramento 24h</p>
            </div>

            <div className="group flex flex-col items-center p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 animate-fade-in delay-[1300ms]">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">Suporte Humano</h3>
              <p className="text-gray-600 text-center text-sm md:text-lg">Atendimento <strong className="text-gpnet-blue">local e personalizado</strong> quando você precisar</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 md:mt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-white/80 animate-fade-in delay-[1600ms]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gpnet-green rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-medium">+5.000 clientes conectados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gpnet-blue rounded-full animate-pulse delay-300"></div>
              <span className="text-xs md:text-sm font-medium">99,8% de disponibilidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gpnet-green rounded-full animate-pulse delay-600"></div>
              <span className="text-xs md:text-sm font-medium">Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
