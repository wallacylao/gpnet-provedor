
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Wifi, Router } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const PlansSection = () => {
  const whatsappNumber = '5588997129857';
  const { trackPlanClick } = useGoogleAnalytics();

  const handleWhatsAppClick = (plan: any) => {
    // Rastrear clique no plano para Analytics
    trackPlanClick(plan.name, plan.price.replace('R$ ', '').replace('/mês', ''));
    const message = `Olá! Vim do site da GPNet e tenho interesse no Plano ${plan.name} (${plan.speed} Mbps por ${plan.price}/mês). Gostaria de mais informações sobre contratação e disponibilidade na minha região.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const plans = [
    {
      name: 'Light',
      speed: '300',
      price: 'R$ 74,90',
      isPopular: false,
      features: [
        'Roteador Wi-Fi 5G incluso',
        'Suporte técnico 24h',
        'Instalação grátis',
        'Equipamento incluso em comodato'
      ]
    },
    {
      name: 'Plus',
      speed: '450',
      price: 'R$ 84,90',
      isPopular: true,
      features: [
        'Wi-Fi 5G incluso',
        '2 dispositivos cabeados',
        'Instalação grátis',
        'Equipamento incluso em comodato',
        'Suporte técnico 24h'
      ]
    },
    {
      name: 'Ultra',
      speed: '600',
      price: 'R$ 99,90',
      isPopular: false,
      features: [
        'Wi-Fi 6 incluso',
        'Roteador Mesh',
        '3 dispositivos cabeados',
        'Instalação grátis',
        'Equipamento incluso em comodato'
      ]
    },
    {
      name: 'Max',
      speed: '700',
      price: 'R$ 119,90',
      isPopular: false,
      features: [
        'Wi-Fi 6 incluso',
        '2 Roteadores Mesh',
        '4 dispositivos cabeados',
        'Instalação grátis',
        'Equipamento incluso em comodato'
      ]
    }
  ];

  // Schema markup for service offers
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Planos de Internet Fibra Óptica GPNet",
    "provider": {
      "@type": "LocalBusiness",
      "name": "GPNet"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planos de Internet Fibra Óptica",
      "itemListElement": plans.map(plan => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `Plano ${plan.name} ${plan.speed} Mbps`,
          "description": `Internet fibra óptica ${plan.speed} Mbps para casa com ${plan.features.join(', ')}`
        },
        "price": parseFloat(plan.price.replace('R$ ', '').replace('/mês', '').replace(',', '.')),
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0],
        "areaServed": {
          "@type": "City",
          "name": "Sobral",
          "addressRegion": "CE",
          "addressCountry": "BR"
        }
      }))
    }
  };

  return (
    <section id="planos" className="py-20 bg-gray-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Planos de Internet para Casa em Sobral{' '}
            <span className="bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
              com Fibra Óptica
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Internet fibra óptica Sobral com velocidade real garantida. Melhor internet para jogos e trabalho com suporte 24h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-105 animate-scale-in ${
                plan.isPopular
                  ? 'border-2 border-gpnet-blue shadow-xl'
                  : 'border border-gray-200 hover:border-gpnet-blue/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gpnet-green to-gpnet-blue text-white text-center py-2 text-sm font-semibold">
                  <Star className="inline w-4 h-4 mr-1" />
                  Mais Popular
                </div>
              )}

              <CardHeader className={`text-center ${plan.isPopular ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="flex items-center justify-center mb-4">
                  <Wifi className="w-8 h-8 text-gpnet-blue mr-2" />
                  <span className="text-4xl font-bold text-gray-900">{plan.speed}</span>
                  <span className="text-lg text-gray-500 ml-1">Mbps</span>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-gpnet-green mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleWhatsAppClick(plan)}
                  className={`w-full mt-6 py-3 rounded-lg transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-gpnet-green to-gpnet-blue hover:from-gpnet-green-dark hover:to-gpnet-blue-dark text-white shadow-lg'
                      : 'border-2 border-gpnet-blue text-gpnet-blue hover:bg-gpnet-blue hover:text-white'
                  }`}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  Assinar {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Todos os planos incluem Wi-Fi, instalação gratuita e equipamento em comodato
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Router className="w-4 h-4 mr-1" />
              <span>Equipamentos inclusos</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-1" />
              <span>Sem fidelidade</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-1" />
              <span>Velocidade garantida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
