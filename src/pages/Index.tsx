
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlansSection from '@/components/PlansSection';
import CoverageSection from '@/components/CoverageSection';
import AboutSection from '@/components/AboutSection';
import InstagramSection from '@/components/InstagramSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PlansSection />
        <CoverageSection />
        <AboutSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
