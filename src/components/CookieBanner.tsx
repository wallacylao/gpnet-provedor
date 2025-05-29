
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Settings, Cookie } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const { showBanner, preferences, acceptAll, acceptNecessary, updatePreferences, setShowBanner } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(preferences);

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    updatePreferences(tempPreferences);
    setShowSettings(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 border-t border-gray-700">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-gpnet-green mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Este site utiliza cookies</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência de navegação, personalizar conteúdo e analisar o tráfego do site. 
                  Alguns cookies são necessários para o funcionamento do site, enquanto outros nos ajudam a entender como você interage com nosso conteúdo.{' '}
                  <Link to="/politica-privacidade" className="text-gpnet-green hover:underline">
                    Saiba mais na nossa Política de Privacidade
                  </Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Configurações de Cookies</DialogTitle>
                    <DialogDescription>
                      Escolha quais cookies você deseja aceitar
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies Necessários</h4>
                        <p className="text-sm text-gray-600">Essenciais para o funcionamento do site</p>
                      </div>
                      <Switch checked={true} disabled />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies de Análise</h4>
                        <p className="text-sm text-gray-600">Nos ajudam a melhorar o site</p>
                      </div>
                      <Switch 
                        checked={tempPreferences.analytics}
                        onCheckedChange={(checked) => 
                          setTempPreferences(prev => ({ ...prev, analytics: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Cookies de Marketing</h4>
                        <p className="text-sm text-gray-600">Para personalizar anúncios</p>
                      </div>
                      <Switch 
                        checked={tempPreferences.marketing}
                        onCheckedChange={(checked) => 
                          setTempPreferences(prev => ({ ...prev, marketing: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSavePreferences} className="flex-1">
                      Salvar Preferências
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm"
                onClick={acceptNecessary}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Apenas Necessários
              </Button>

              <Button 
                onClick={acceptAll}
                size="sm"
                className="bg-gpnet-green text-black hover:bg-gpnet-green-dark"
              >
                Aceitar Todos
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-white p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
