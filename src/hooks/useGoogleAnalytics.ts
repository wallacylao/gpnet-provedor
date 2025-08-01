import { useEffect } from 'react';
import { useCookieConsent } from './useCookieConsent';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const useGoogleAnalytics = () => {
  const { preferences } = useCookieConsent();

  useEffect(() => {
    // Só carrega Analytics se o usuário consentiu
    if (preferences.analytics && typeof window !== 'undefined') {
      // Inicializa o dataLayer se não existir
      if (!window.dataLayer) {
        window.dataLayer = [];
      }

      // Define a função gtag
      window.gtag = function() {
        window.dataLayer?.push(arguments);
      };

      // Configuração inicial
      window.gtag('js', new Date());
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [preferences.analytics]);

  // Função para rastrear eventos personalizados
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (preferences.analytics && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  // Função para rastrear conversões (cliques nos planos)
  const trackPlanClick = (planName: string, planPrice: string) => {
    trackEvent('plan_click', {
      plan_name: planName,
      plan_price: planPrice,
      value: parseFloat(planPrice.replace(',', '.')),
      currency: 'BRL'
    });
  };

  // Função para rastrear cliques no WhatsApp
  const trackWhatsAppClick = (source: string = 'floating_button') => {
    trackEvent('whatsapp_click', {
      source: source,
      contact_method: 'whatsapp'
    });
  };

  // Função para rastrear envio de formulários
  const trackFormSubmit = (formType: string) => {
    trackEvent('form_submit', {
      form_type: formType
    });
  };

  // Função para rastrear navegação entre páginas
  const trackPageView = (pagePath: string, pageTitle: string) => {
    if (preferences.analytics && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  return {
    trackEvent,
    trackPlanClick,
    trackWhatsAppClick,
    trackFormSubmit,
    trackPageView,
    isAnalyticsEnabled: preferences.analytics
  };
};