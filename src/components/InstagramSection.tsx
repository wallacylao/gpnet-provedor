
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InstagramSection = () => {
  // Mock Instagram posts data
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop',
      caption: 'Internet de alta velocidade chegando em mais bairros! 🚀 #CNetFibra #InternetRapida',
      likes: 127,
      comments: 23,
      timeAgo: '2 dias'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
      caption: 'Tecnologia de fibra óptica para conexão estável 24/7 💪 #FibraOptica #Tecnologia',
      likes: 89,
      comments: 15,
      timeAgo: '4 dias'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
      caption: 'Trabalhe de casa com a velocidade que você precisa! 💻 #HomeOffice #InternetCNet',
      likes: 156,
      comments: 31,
      timeAgo: '1 semana'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=400&fit=crop',
      caption: 'Setup perfeito para gaming com nossa internet ultra! 🎮 #Gaming #InternetGamer',
      likes: 203,
      comments: 45,
      timeAgo: '1 semana'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop',
      caption: 'Nossa equipe técnica sempre pronta para te atender! 👷‍♂️ #SuporteTecnico #CNet',
      likes: 94,
      comments: 18,
      timeAgo: '2 semanas'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=400&fit=crop',
      caption: 'Expansão da rede chegando em novos pontos da cidade! 🏢 #Expansao #NovaCobertura',
      likes: 142,
      comments: 28,
      timeAgo: '2 semanas'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-12 h-12 text-pink-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Siga a{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                @cnet_provedor
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompanhe nossas novidades, dicas técnicas e expansões da rede em tempo real
          </p>
        </div>

        {/* Instagram Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={`Post do Instagram ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center space-y-2">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-1" />
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 mr-1" />
                        <span className="text-sm font-semibold">{post.comments}</span>
                      </div>
                    </div>
                    <p className="text-xs opacity-90">{post.timeAgo}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA to follow */}
        <div className="text-center">
          <Button
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
          >
            <Instagram className="w-6 h-6 mr-3" />
            Siga-nos no Instagram
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="mt-6 flex items-center justify-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2.3k</div>
              <div className="text-sm">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">180</div>
              <div className="text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm">Avaliação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
