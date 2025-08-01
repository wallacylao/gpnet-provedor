
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { trackEvent } = useGoogleAnalytics();

  // Detectar rolagem da página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    // Se não estiver na página inicial, navegar primeiro para home
    if (location.pathname !== '/') {
      navigate('/');
      // Pequeno delay para garantir que a página carregou antes de fazer o scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Se já estiver na home, fazer scroll direto
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReferralsClick = () => {
    trackEvent('navigation_click', {
      page: 'indicacoes',
      source: 'header_menu'
    });
    navigate('/indicacoes');
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 backdrop-blur-md border-b border-gray-800 shadow-sm transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button onClick={handleLogoClick}>
              <img 
                src="/lovable-uploads/6e7cfe2d-d5e9-459f-b8b6-ad69267772b9.png" 
                alt="GPNet Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-8 md:h-10' : 'h-12 md:h-16'} w-auto`}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-200 hover:text-gpnet-green transition-colors duration-200"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('planos')}
              className="text-gray-200 hover:text-gpnet-green transition-colors duration-200"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection('cobertura')}
              className="text-gray-200 hover:text-gpnet-green transition-colors duration-200"
            >
              Cobertura
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-gray-200 hover:text-gpnet-green transition-colors duration-200"
            >
              Sobre
            </button>
            <button
              onClick={handleReferralsClick}
              className="text-gray-200 hover:text-gpnet-green transition-colors duration-200"
            >
              Indicações
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-gray-200 hover:text-gpnet-green transition-colors duration-200"
            >
              Contato
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              onClick={() => window.open('https://central.gpnetce.com.br', '_blank')}
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-4 py-2 rounded-lg transition-all duration-300"
            >
              Central do Assinante
            </Button>
            <Button
              onClick={() => scrollToSection('planos')}
              className="bg-gradient-to-r from-gpnet-green to-gpnet-blue hover:from-gpnet-green-dark hover:to-gpnet-blue-dark text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Assine Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-left text-gray-200 hover:text-gpnet-green transition-colors duration-200"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="text-left text-gray-200 hover:text-gpnet-green transition-colors duration-200"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection('cobertura')}
                className="text-left text-gray-200 hover:text-gpnet-green transition-colors duration-200"
              >
                Cobertura
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-left text-gray-200 hover:text-gpnet-green transition-colors duration-200"
              >
                Sobre
              </button>
              <button
                onClick={handleReferralsClick}
                className="text-left text-gray-200 hover:text-gpnet-green transition-colors duration-200"
              >
                Indicações
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-left text-gray-200 hover:text-gpnet-green transition-colors duration-200"
              >
                Contato
              </button>
              <Button
                onClick={() => window.open('https://central.gpnetce.com.br', '_blank')}
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-gray-900 w-full"
              >
                Central do Assinante
              </Button>
              <Button
                onClick={() => scrollToSection('planos')}
                className="bg-gradient-to-r from-gpnet-green to-gpnet-blue text-white px-6 py-2 rounded-lg shadow-lg w-full"
              >
                Assine Agora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
