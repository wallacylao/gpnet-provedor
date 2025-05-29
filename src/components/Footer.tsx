
import { Wifi, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const helpLinks = [
    { name: 'Perguntas Frequentes', href: '/faq' },
    { name: 'Portal do Cliente', href: 'https://gpnetce.com.br/central_assinante_web/login', external: true },
    { name: 'Suporte Técnico', href: '#contato' },
    { name: 'Área de Cobertura', href: '#cobertura' }
  ];

  const transparencyLinks = [
    { name: 'Política de Privacidade', href: '/politica-privacidade' },
    { name: 'Termos e Contratos', href: '/termos-contratos' }
  ];

  const services = [
    { name: 'Internet Residencial', href: '#planos' },
    { name: 'Internet Empresarial', href: '#planos' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (link: any) => {
    if (link.external) {
      window.open(link.href, '_blank');
    } else if (link.href.startsWith('#')) {
      scrollToSection(link.href);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/6e7cfe2d-d5e9-459f-b8b6-ad69267772b9.png" 
                alt="GPNet Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conectando você ao futuro com internet de alta velocidade, 
              tecnologia avançada e atendimento personalizado.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Serviços</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-gray-300 hover:text-gpnet-green transition-colors duration-200 text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Ajuda</h3>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  {link.external || link.href.startsWith('#') ? (
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-gray-300 hover:text-gpnet-green transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-gpnet-green transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Transparência</h3>
            <ul className="space-y-3">
              {transparencyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-gpnet-green transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info - Moved to bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-6">Contato</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gpnet-blue mt-0.5 flex-shrink-0" />
              <div className="text-gray-300">
                <p>Rua 4, 43</p>
                <p>Cohab II - Sobral, CE</p>
                <p>CEP: 62050-700</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gpnet-blue flex-shrink-0" />
              <div className="text-gray-300">
                <p>(88) 9 9712-9857</p>
                <p className="text-sm">WhatsApp: (88) 9 9712-9857</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gpnet-blue flex-shrink-0" />
              <div className="text-gray-300">
                <p>contato@gpnetce.com.br</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} GPNet Provedor de Internet. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>CNPJ: 19.936.971/0001-76</span>
              <span>•</span>
              <span>Anatel: SCM 123456</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
