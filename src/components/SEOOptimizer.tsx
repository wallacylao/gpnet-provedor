import { useEffect } from 'react';

const SEOOptimizer = () => {
  useEffect(() => {
    // Dispara evento quando o conteúdo é carregado para pre-rendering
    const handleDOMLoaded = () => {
      if (typeof window !== 'undefined') {
        // Cria evento personalizado para indicar que o conteúdo foi renderizado
        window.dispatchEvent(new CustomEvent('render-complete'));
        
        // Adiciona mais informações semânticas ao DOM para SEO
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', 
            metaKeywords.getAttribute('content') + 
            ', internet para gaming, internet para streaming, internet para home office, provedor local Sobral'
          );
        }

        // Adiciona structured data adicional
        const additionalSchema = {
          "@context": "https://schema.org",
          "@type": "ProfessionalService", 
          "name": "GPNet Internet Fibra Óptica",
          "description": "Provedor de internet fibra óptica de alta velocidade em Sobral, Ceará",
          "serviceType": "Internet Service Provider",
          "areaServed": "Sobral, CE",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Planos de Internet Fibra Óptica",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Internet Fibra Óptica 200MB",
                "description": "Plano de internet fibra óptica 200 Mbps para residências",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "79.90",
                  "priceCurrency": "BRL"
                }
              },
              {
                "@type": "Offer", 
                "name": "Internet Fibra Óptica 400MB",
                "description": "Plano de internet fibra óptica 400 Mbps para residências",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "99.90",
                  "priceCurrency": "BRL"
                }
              }
            ]
          }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(additionalSchema);
        document.head.appendChild(script);
      }
    };

    // Executa quando o DOM está pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMLoaded);
    } else {
      handleDOMLoaded();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMLoaded);
    };
  }, []);

  return null; // Componente invisível
};

export default SEOOptimizer;