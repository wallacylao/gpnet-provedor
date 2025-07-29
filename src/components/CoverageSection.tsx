
import { CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SVGCoverageMap from './SVGCoverageMap';

const CoverageSection = () => {
  const mainCities = [
    'Centro', 'Cohab II', 'Boa Vizinhança', 'Distrito Industrial',
    'Santo Antonio', 'Pedrinhas', 'Betania'
  ];

  const expandingAreas = [
    'Alto do Cristo', 'Parque Silvana', 'Campo dos Velhos',
    'Condomínio do Shopping', 'Parque Silvana 2'
  ];

  return (
    <section id="cobertura" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gpnet-green to-gpnet-blue bg-clip-text text-transparent">
              Cobertura
            </span>{' '}
            completa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos presente nas principais regiões da cidade com planos de expansão contínua
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* SVG Coverage Map */}
          <div className="relative">
            <SVGCoverageMap />
          </div>

          {/* Coverage areas */}
          <div className="space-y-8">
            <Card className="border-l-4 border-l-gpnet-green">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <CheckCircle className="w-6 h-6 text-gpnet-green mr-3" />
                  Áreas com Cobertura Completa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mainCities.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-gpnet-green rounded-full mr-3"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Instalação disponível em até 48 horas
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-gpnet-blue">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Clock className="w-6 h-6 text-gpnet-blue mr-3" />
                  Áreas em Expansão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {expandingAreas.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-gpnet-blue rounded-full mr-3"></div>
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Cobertura prevista para os próximos 6 meses
                </p>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-gpnet-green/10 to-gpnet-blue/10 rounded-xl p-6">
              <h4 className="font-semibold text-lg mb-2">Não encontrou sua região?</h4>
              <p className="text-gray-600 mb-4">
                Entre em contato conosco! Estamos sempre expandindo nossa rede para atender mais clientes.
              </p>
              <a
                href="https://gpnetce.com.br/app/inmap-auto-viability?campaignId=3&channelId=13"
                className="inline-block bg-gradient-to-r from-gpnet-green to-gpnet-blue text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Consultar Disponibilidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
