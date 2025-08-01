
import { MessageCircle } from 'lucide-react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const WhatsAppButton = () => {
  const phoneNumber = "5588997129857";
  const message = "Olá! Gostaria de saber mais sobre os planos da GPNet.";
  const { trackWhatsAppClick } = useGoogleAnalytics();

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('floating_button');
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Fale conosco no WhatsApp
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>

      {/* Pulse animation */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
    </button>
  );
};

export default WhatsAppButton;
