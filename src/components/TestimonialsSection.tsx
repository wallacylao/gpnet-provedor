import { useEffect, useCallback } from 'react';
import { Star, Heart, Quote, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    location: 'Centro, Sobral',
    rating: 5,
    comment: 'Internet super rápida e estável! Trabalho home office e nunca tive problemas. O suporte é excelente!',
    initials: 'MS'
  },
  {
    id: '2',
    name: 'João Oliveira',
    location: 'Cohab II, Sobral',
    rating: 5,
    comment: 'Melhor internet que já tive! Gaming sem lag e streaming em 4K sem travamentos. Recomendo!',
    initials: 'JO'
  },
  {
    id: '3',
    name: 'Ana Santos',
    location: 'Alto da Brasília, Sobral',
    rating: 5,
    comment: 'Excelente atendimento e instalação super rápida. A velocidade é exatamente o que foi prometido.',
    initials: 'AS'
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    location: 'Padre Palhano, Sobral',
    rating: 4,
    comment: 'Ótima qualidade de internet. Minha empresa funciona perfeitamente com a fibra da GPNet.',
    initials: 'CM'
  },
  {
    id: '5',
    name: 'Fernanda Costa',
    location: 'Derby, Sobral',
    rating: 5,
    comment: 'Mudou completamente minha experiência online. Aulas online sem problemas e Netflix em 4K!',
    initials: 'FC'
  },
  {
    id: '6',
    name: 'Roberto Lima',
    location: 'Cidade Dr. José Euclides, Sobral',
    rating: 5,
    comment: 'Técnicos muito competentes e atendimento nota 10. Internet estável 24 horas por dia.',
    initials: 'RL'
  },
  {
    id: '7',
    name: 'Lucia Andrade',
    location: 'Vila União, Sobral',
    rating: 4,
    comment: 'Preço justo e qualidade excelente. Minha família toda está satisfeita com a velocidade.',
    initials: 'LA'
  },
  {
    id: '8',
    name: 'Pedro Nascimento',
    location: 'Terrenos Novos, Sobral',
    rating: 5,
    comment: 'Desde que instalei não tive nenhum problema. Upload e download sempre na velocidade contratada.',
    initials: 'PN'
  }
];

const TestimonialsSection = () => {
  const { trackEvent } = useGoogleAnalytics();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    trackEvent('testimonial_carousel_slide', {
      slide_index: emblaApi.selectedScrollSnap()
    });
  }, [emblaApi, trackEvent]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);
  const totalReviews = testimonials.length;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-primary fill-primary/20" />
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Feedback de quem é{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              #gpnetlover
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Mais de <span className="font-semibold text-foreground">{totalReviews} clientes satisfeitos</span> em Sobral 
            compartilham suas experiências com nossa internet de fibra óptica
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(5)}
              </div>
              <span className="text-2xl font-bold text-foreground">{averageRating}</span>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div>
              <p className="text-sm text-muted-foreground">Baseado em</p>
              <p className="font-semibold text-foreground">{totalReviews} avaliações</p>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Carousel
            ref={emblaRef}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-primary/10 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="flex justify-between items-start mb-4">
                        <Quote className="w-8 h-8 text-primary/60" />
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>

                      {/* Comment */}
                      <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        "{testimonial.comment}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-primary hover:text-white transition-colors" />
            <CarouselNext className="hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-primary hover:text-white transition-colors" />
          </Carousel>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{averageRating}/5</div>
              <div className="text-sm text-muted-foreground">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Anos no Mercado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "GPNet Internet Fibra Óptica",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sobral",
            "addressRegion": "CE",
            "addressCountry": "BR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": totalReviews,
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": testimonials.map(testimonial => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": testimonial.name
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": testimonial.rating,
              "bestRating": "5",
              "worstRating": "1"
            },
            "reviewBody": testimonial.comment
          }))
        })}
      </script>
    </section>
  );
};

export default TestimonialsSection;