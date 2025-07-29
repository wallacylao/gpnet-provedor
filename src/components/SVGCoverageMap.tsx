import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, CheckCircle, X } from 'lucide-react';

interface AreaInfo {
  id: string;
  name: string;
  status: 'active' | 'expanding';
  installTime: string;
  description: string;
}

const SVGCoverageMap = () => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<AreaInfo | null>(null);

  const areas: AreaInfo[] = [
    { id: 'centro', name: 'Centro', status: 'active', installTime: '24-48h', description: 'Região central com cobertura completa e velocidades até 1GB.' },
    { id: 'cohab2', name: 'Cohab II', status: 'active', installTime: '24-48h', description: 'Área residencial com ótima qualidade de sinal.' },
    { id: 'boa-vizinhanca', name: 'Boa Vizinhança', status: 'active', installTime: '24-48h', description: 'Bairro com infraestrutura consolidada.' },
    { id: 'distrito-industrial', name: 'Distrito Industrial', status: 'active', installTime: '24-48h', description: 'Zona industrial com conectividade empresarial.' },
    { id: 'santo-antonio', name: 'Santo Antonio', status: 'active', installTime: '24-48h', description: 'Região com cobertura estável.' },
    { id: 'pedrinhas', name: 'Pedrinhas', status: 'active', installTime: '24-48h', description: 'Área residencial atendida.' },
    { id: 'betania', name: 'Betania', status: 'active', installTime: '24-48h', description: 'Bairro com boa cobertura.' },
    { id: 'alto-cristo', name: 'Alto do Cristo', status: 'expanding', installTime: '3-6 meses', description: 'Expansão prevista para breve.' },
    { id: 'parque-silvana', name: 'Parque Silvana', status: 'expanding', installTime: '3-6 meses', description: 'Nova área em desenvolvimento.' },
    { id: 'campo-velhos', name: 'Campo dos Velhos', status: 'expanding', installTime: '3-6 meses', description: 'Região em processo de expansão.' },
    { id: 'condominio-shopping', name: 'Condomínio do Shopping', status: 'expanding', installTime: '3-6 meses', description: 'Área próxima ao shopping em expansão.' },
    { id: 'parque-silvana2', name: 'Parque Silvana 2', status: 'expanding', installTime: '3-6 meses', description: 'Continuação da expansão do Parque Silvana.' }
  ];

  const getAreaInfo = (areaId: string) => areas.find(area => area.id === areaId);

  const handleAreaClick = (areaId: string) => {
    const area = getAreaInfo(areaId);
    if (area) {
      setSelectedArea(area);
    }
  };

  return (
    <div className="relative">
      {/* SVG Map */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 relative overflow-hidden">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-96 max-w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sobral city outline */}
          <path
            d="M50 80 L350 80 L350 220 L50 220 Z"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="5,5"
          />

          {/* Active Areas (Green) */}
          {/* Centro */}
          <polygon
            points="180,120 220,120 220,160 180,160"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('centro')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('centro')}
          />

          {/* Cohab II */}
          <polygon
            points="80,100 140,100 140,140 80,140"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('cohab2')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('cohab2')}
          />

          {/* Boa Vizinhança */}
          <polygon
            points="260,100 320,100 320,140 260,140"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('boa-vizinhanca')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('boa-vizinhanca')}
          />

          {/* Distrito Industrial */}
          <polygon
            points="300,160 360,160 360,200 300,200"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('distrito-industrial')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('distrito-industrial')}
          />

          {/* Santo Antonio */}
          <polygon
            points="80,160 140,160 140,200 80,200"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('santo-antonio')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('santo-antonio')}
          />

          {/* Pedrinhas */}
          <polygon
            points="150,180 200,180 200,220 150,220"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('pedrinhas')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('pedrinhas')}
          />

          {/* Betania */}
          <polygon
            points="230,180 280,180 280,220 230,220"
            fill="hsl(var(--gpnet-green) / 0.7)"
            stroke="hsl(var(--gpnet-green))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('betania')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('betania')}
          />

          {/* Expanding Areas (Blue) */}
          {/* Alto do Cristo */}
          <polygon
            points="150,90 200,90 200,110 150,110"
            fill="hsl(var(--gpnet-blue) / 0.7)"
            stroke="hsl(var(--gpnet-blue))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('alto-cristo')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('alto-cristo')}
          />

          {/* Parque Silvana */}
          <polygon
            points="60,210 110,210 110,240 60,240"
            fill="hsl(var(--gpnet-blue) / 0.7)"
            stroke="hsl(var(--gpnet-blue))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('parque-silvana')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('parque-silvana')}
          />

          {/* Campo dos Velhos */}
          <polygon
            points="320,210 370,210 370,240 320,240"
            fill="hsl(var(--gpnet-blue) / 0.7)"
            stroke="hsl(var(--gpnet-blue))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('campo-velhos')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('campo-velhos')}
          />

          {/* Condomínio do Shopping */}
          <polygon
            points="240,90 290,90 290,110 240,110"
            fill="hsl(var(--gpnet-blue) / 0.7)"
            stroke="hsl(var(--gpnet-blue))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('condominio-shopping')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('condominio-shopping')}
          />

          {/* Parque Silvana 2 */}
          <polygon
            points="120,210 170,210 170,240 120,240"
            fill="hsl(var(--gpnet-blue) / 0.7)"
            stroke="hsl(var(--gpnet-blue))"
            strokeWidth="2"
            className="cursor-pointer hover:fill-opacity-90 transition-all duration-300"
            onMouseEnter={() => setHoveredArea('parque-silvana2')}
            onMouseLeave={() => setHoveredArea(null)}
            onClick={() => handleAreaClick('parque-silvana2')}
          />

          {/* Tower icons */}
          <g className="animate-pulse">
            <circle cx="200" cy="140" r="4" fill="hsl(var(--gpnet-green))" />
            <rect x="198" y="132" width="4" height="8" fill="hsl(var(--gpnet-green))" />
          </g>
          
          <g className="animate-pulse delay-500">
            <circle cx="280" cy="170" r="4" fill="hsl(var(--gpnet-green))" />
            <rect x="278" y="162" width="4" height="8" fill="hsl(var(--gpnet-green))" />
          </g>

          {/* City label */}
          <text x="200" y="50" textAnchor="middle" className="text-lg font-bold fill-gray-700">
            Sobral - CE
          </text>
        </svg>

        {/* Tooltip */}
        {hoveredArea && (
          <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-3 z-10 max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              {getAreaInfo(hoveredArea)?.status === 'active' ? (
                <CheckCircle className="w-4 h-4 text-gpnet-green" />
              ) : (
                <Clock className="w-4 h-4 text-gpnet-blue" />
              )}
              <span className="font-semibold">{getAreaInfo(hoveredArea)?.name}</span>
            </div>
            <p className="text-sm text-gray-600">
              {getAreaInfo(hoveredArea)?.status === 'active' ? 'Cobertura ativa' : 'Em expansão'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Clique para mais detalhes
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gpnet-green/70 border-2 border-gpnet-green rounded"></div>
              <span>Cobertura Ativa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gpnet-blue/70 border-2 border-gpnet-blue rounded"></div>
              <span>Em Expansão</span>
            </div>
          </div>
        </div>
      </div>

      {/* Area Details Modal */}
      {selectedArea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {selectedArea.name}
              </CardTitle>
              <button
                onClick={() => setSelectedArea(null)}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                {selectedArea.status === 'active' ? (
                  <CheckCircle className="w-5 h-5 text-gpnet-green" />
                ) : (
                  <Clock className="w-5 h-5 text-gpnet-blue" />
                )}
                <span className="font-medium">
                  {selectedArea.status === 'active' ? 'Cobertura Ativa' : 'Em Expansão'}
                </span>
              </div>

              <div>
                <h4 className="font-medium mb-1">Tempo de Instalação:</h4>
                <p className="text-gray-600">{selectedArea.installTime}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Informações:</h4>
                <p className="text-gray-600">{selectedArea.description}</p>
              </div>

              <div className="pt-4 border-t">
                <a
                  href="https://gpnetce.com.br/app/inmap-auto-viability?campaignId=3&channelId=13"
                  className="inline-block w-full text-center bg-gradient-to-r from-gpnet-green to-gpnet-blue text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar Disponibilidade
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SVGCoverageMap;