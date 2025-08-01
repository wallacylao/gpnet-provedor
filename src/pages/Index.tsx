
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlansSection from '@/components/PlansSection';
import CoverageSection from '@/components/CoverageSection';
import AboutSection from '@/components/AboutSection';
import ReferralSection from '@/components/ReferralSection';
import InstagramSection from '@/components/InstagramSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import WhatsAppButton from '@/components/WhatsAppButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { useEffect } from 'react';

const Index = () => {
  const { trackPageView } = useGoogleAnalytics();

  useEffect(() => {
    trackPageView('/', 'Home - GPNet Internet Fibra Óptica');
  }, [trackPageView]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PlansSection />
        <CoverageSection />
        <AboutSection />
        <ReferralSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
      <GoogleAnalytics />
    </div>
  );
};

export default Index;
