
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Wifi } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cnet-green to-cnet-blue rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cnet-green to-cnet-blue bg-clip-text text-transparent">
              CNet
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-cnet-blue transition-colors duration-200"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('planos')}
              className="text-gray-700 hover:text-cnet-blue transition-colors duration-200"
            >
              Planos
            </button>
            <button
              onClick={() => scrollToSection('cobertura')}
              className="text-gray-700 hover:text-cnet-blue transition-colors duration-200"
            >
              Cobertura
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-cnet-blue transition-colors duration-200"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-gray-700 hover:text-cnet-blue transition-colors duration-200"
            >
              Contato
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('planos')}
              className="bg-gradient-to-r from-cnet-green to-cnet-blue hover:from-cnet-green-dark hover:to-cnet-blue-dark text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Assine Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-left text-gray-700 hover:text-cnet-blue transition-colors duration-200"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="text-left text-gray-700 hover:text-cnet-blue transition-colors duration-200"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection('cobertura')}
                className="text-left text-gray-700 hover:text-cnet-blue transition-colors duration-200"
              >
                Cobertura
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-left text-gray-700 hover:text-cnet-blue transition-colors duration-200"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-left text-gray-700 hover:text-cnet-blue transition-colors duration-200"
              >
                Contato
              </button>
              <Button
                onClick={() => scrollToSection('planos')}
                className="bg-gradient-to-r from-cnet-green to-cnet-blue text-white px-6 py-2 rounded-lg shadow-lg w-full"
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
