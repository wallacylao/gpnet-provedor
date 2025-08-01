import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';

// Import hero images
import homeInternetDesktop from '@/assets/hero-home-internet-desktop.webp';
import homeInternetMobile from '@/assets/hero-home-internet-mobile.webp';
import familyConnectedDesktop from '@/assets/hero-family-connected-desktop.webp';
import familyConnectedMobile from '@/assets/hero-family-connected-mobile.webp';
import networkInfrastructureDesktop from '@/assets/hero-network-infrastructure-desktop.webp';
import networkInfrastructureMobile from '@/assets/hero-network-infrastructure-mobile.webp';
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      desktopImage: homeInternetDesktop,
      mobileImage: homeInternetMobile,
      alt: "Pessoa em casa usando internet ultra-rápida"
    },
    {
      desktopImage: familyConnectedDesktop,
      mobileImage: familyConnectedMobile,
      alt: "Família conectada com dispositivos simultâneos"
    },
    {
      desktopImage: networkInfrastructureDesktop,
      mobileImage: networkInfrastructureMobile,
      alt: "Infraestrutura de rede futurista"
    }
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const scrollToPlans = () => {
    const element = document.getElementById('planos');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14">
      {/* Slider Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <picture>
              <source 
                media="(min-width: 768px)" 
                srcSet={slide.desktopImage} 
              />
              <img
                src={slide.mobileImage}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                width="1920"
                height="1080"
              />
            </picture>
            <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
          </div>)}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gpnet-green/20 via-transparent to-gpnet-blue/20"></div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-gpnet-green scale-125' : 'bg-white/50 hover:bg-white/75'}`} />)}
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading with enhanced styling and SEO optimization */}
          <div className="mb-4 md:mb-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-2 md:mb-4 text-white drop-shadow-2xl">
              Internet fibra óptica{' '}
              <span className="bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
                ultra rápida
              </span>{' '}
              em Sobral
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold text-white/90 drop-shadow-lg">
              Planos de internet para casa com{' '}
              <span className="text-gpnet-green font-bold">suporte 24h</span>{' '}
              e velocidade garantida
            </h2>
          </div>

          {/* Enhanced subtitle with SEO keywords */}
          <p className="text-base md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in delay-300">
            A <strong className="text-gpnet-green">melhor internet para jogos em Sobral</strong>: fibra óptica com velocidade real, 
            <strong className="text-gpnet-blue"> internet com suporte 24h</strong> e planos flexíveis. Conecte-se sem limites!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 animate-fade-in delay-500">
            <Button onClick={scrollToPlans} className="bg-gradient-to-r from-gpnet-green to-gpnet-blue hover:from-gpnet-green-dark hover:to-gpnet-blue-dark text-white px-6 md:px-10 py-3 md:py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-base md:text-lg font-semibold border-2 border-transparent hover:border-white/20">
              Descobrir planos
              <ArrowRight className="ml-2 w-4 h-4 md:w-6 md:h-6" />
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gpnet-blue px-6 md:px-10 py-3 md:py-5 rounded-xl transition-all duration-300 text-base md:text-lg font-semibold backdrop-blur-sm bg-white/10 hover:shadow-xl">
              Fale conosco agora
            </Button>
          </div>

          {/* Feature highlights with sequential animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20">
            <div className="group flex flex-col items-center p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 animate-fade-in delay-700">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">Fibra Óptica Real</h3>
              <p className="text-gray-600 text-center text-sm md:text-lg">Até <strong className="text-gpnet-blue">800 Mbps</strong> de internet fibra óptica garantida em Sobral</p>
            </div>

            <div className="group flex flex-col items-center p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 animate-fade-in delay-1000">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">Internet Estável</h3>
              <p className="text-gray-600 text-center text-sm md:text-lg">Rede com <strong className="text-gpnet-green">99,9% de disponibilidade</strong> e monitoramento 24h em Sobral</p>
            </div>

            <div className="group flex flex-col items-center p-4 md:p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 animate-fade-in delay-[1300ms]">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-6 h-6 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">Suporte 24h</h3>
              <p className="text-gray-600 text-center text-sm md:text-lg">Internet com suporte 24h <strong className="text-gpnet-blue">local em Sobral</strong> quando você precisar</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 md:mt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-white/80 animate-fade-in delay-[1600ms]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gpnet-green rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-medium">+500 clientes conectados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gpnet-blue rounded-full animate-pulse delay-300"></div>
              <span className="text-xs md:text-sm font-medium">99,9% de disponibilidade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gpnet-green rounded-full animate-pulse delay-600"></div>
              <span className="text-xs md:text-sm font-medium">Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;