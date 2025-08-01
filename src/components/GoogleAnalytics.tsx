import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const GoogleAnalytics = () => {
  const { preferences } = useCookieConsent();

  useEffect(() => {
    // Só carrega o script se o usuário consentiu com analytics
    if (preferences.analytics && typeof window !== 'undefined') {
      // Verifica se o script já foi carregado
      if (!window.gtag) {
        // Inicializa o dataLayer
        if (!window.dataLayer) {
          window.dataLayer = [];
        }

        // Define a função gtag
        window.gtag = function() {
          window.dataLayer?.push(arguments);
        };

        // Configuração inicial com timestamp
        window.gtag('js', new Date());
        
        // Configuração do GA4 com configurações de privacidade
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true, // Anonimizar IP para LGPD
          allow_google_signals: false, // Desabilitar sinais do Google
          allow_ad_personalization_signals: false // Desabilitar personalização de anúncios
        });

        console.log('Google Analytics carregado com consentimento');
      }
    } else if (!preferences.analytics && window.gtag) {
      // Se o usuário revogou o consentimento, podemos enviar um evento de opt-out
      window.gtag('config', 'G-XXXXXXXXXX', {
        send_page_view: false
      });
    }
  }, [preferences.analytics]);

  // Este componente não renderiza nada na UI
  return null;
};

export default GoogleAnalytics;