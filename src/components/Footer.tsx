
import { Wifi, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Uso', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Portal do Cliente', href: '#' }
  ];

  const services = [
    { name: 'Internet Residencial', href: '#planos' },
    { name: 'Internet Empresarial', href: '#planos' },
    { name: 'Suporte Técnico', href: '#contato' },
    { name: 'Área de Cobertura', href: '#cobertura' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-cnet-green to-cnet-blue rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cnet-green to-cnet-blue bg-clip-text text-transparent">
                CNet
              </span>
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
                    className="text-gray-300 hover:text-cnet-green transition-colors duration-200 text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links Úteis</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cnet-green transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-cnet-blue mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Rua das Conexões, 123</p>
                  <p>Centro - São Paulo, SP</p>
                  <p>CEP: 01234-567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cnet-blue flex-shrink-0" />
                <div className="text-gray-300">
                  <p>(11) 3333-4444</p>
                  <p className="text-sm">WhatsApp: (11) 9 9999-8888</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-cnet-blue flex-shrink-0" />
                <div className="text-gray-300">
                  <p>contato@cnetprovedor.com.br</p>
                </div>
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
              © {currentYear} CNet Provedor de Internet. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>CNPJ: 12.345.678/0001-90</span>
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
