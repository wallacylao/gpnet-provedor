
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const { showBanner, acceptAll, setShowBanner } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 lg:left-auto lg:right-6 lg:max-w-md bg-gray-900 text-white p-4 rounded-xl shadow-lg z-50 border border-gray-700">
      <div className="flex items-start gap-3">
        <Cookie className="w-5 h-5 text-gpnet-green mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Usamos cookies pra melhorar a navegação.{' '}
            <Link to="/politica-privacidade" className="text-gpnet-green hover:underline">
              Leia a Política de Privacidade
            </Link>.
          </p>
          <div className="flex gap-2 items-center">
            <Button 
              onClick={acceptAll}
              size="sm"
              className="bg-gpnet-green text-black hover:bg-gpnet-green-dark"
            >
              Entendi
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-white p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
