
import { MapPin, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          {/* Map placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
              {/* Stylized map representation */}
              <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-xl"></div>
              
              {/* Coverage points */}
              <div className="absolute top-8 left-12 w-4 h-4 bg-gpnet-green rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-16 w-4 h-4 bg-gpnet-green rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-12 left-8 w-4 h-4 bg-gpnet-green rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-8 right-12 w-4 h-4 bg-gpnet-green rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gpnet-blue rounded-full animate-pulse delay-1000"></div>

              {/* Central content */}
              <div className="text-center z-10">
                <MapPin className="w-16 h-16 text-gpnet-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Mapa de Cobertura</h3>
                <p className="text-gray-600">Visualização das áreas atendidas</p>
              </div>
            </div>
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
