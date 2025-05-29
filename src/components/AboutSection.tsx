
import { Shield, Headphones, Zap, Users, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const pillars = [
    {
      icon: Shield,
      title: 'Rede Redundante',
      description: 'Infraestrutura com múltiplos caminhos e backup automático para garantir conexão 24/7'
    },
    {
      icon: Clock,
      title: 'SLA de Atendimento',
      description: 'Compromisso com tempo de resposta e solução de problemas em até 4 horas'
    },
    {
      icon: Headphones,
      title: 'Suporte Local',
      description: 'Equipe técnica especializada na sua região para atendimento rápido e personalizado'
    }
  ];

  const stats = [
    { number: '14+', label: 'Anos de experiência' },
    { number: '1000+', label: 'Clientes atendidos' },
    { number: '99.9%', label: 'Uptime garantido' },
    { number: '24/7', label: 'Suporte técnico' }
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre a{' '}
            <span className="bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
              GPNet
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos um provedor de internet comprometido em oferecer conectividade de qualidade, 
            com foco na experiência do cliente e tecnologia de ponta.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 text-gpnet-blue mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Conectar pessoas e empresas através de uma internet rápida, estável e confiável, 
                proporcionando experiências digitais excepcionais com atendimento humanizado e 
                soluções tecnológicas inovadoras.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <pillar.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-gpnet-green to-gpnet-blue rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-gpnet-blue mb-4" />
              <h3 className="text-xl font-bold mb-4">Compromisso com o Cliente</h3>
              <p className="text-gray-600 leading-relaxed">
                Nosso foco está em oferecer não apenas internet de qualidade, mas uma experiência 
                completa de atendimento. Cada cliente é único e merece soluções personalizadas 
                para suas necessidades.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8">
              <Zap className="w-12 h-12 text-gpnet-green mb-4" />
              <h3 className="text-xl font-bold mb-4">Tecnologia Avançada</h3>
              <p className="text-gray-600 leading-relaxed">
                Investimos constantemente em infraestrutura de ponta, utilizando fibra óptica 
                e equipamentos de última geração para garantir a melhor experiência de navegação 
                para nossos clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
