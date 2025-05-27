
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInstagram } from '@/hooks/useInstagram';

const InstagramSection = () => {
  const { posts, profile, loading, error } = useInstagram('gpnetce');

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'hoje';
    if (diffInDays === 1) return '1 dia';
    if (diffInDays < 7) return `${diffInDays} dias`;
    if (diffInDays < 14) return '1 semana';
    return `${Math.floor(diffInDays / 7)} semanas`;
  };

  const generateMockEngagement = (index: number) => {
    const baseLikes = [127, 89, 156, 203, 94, 142];
    const baseComments = [23, 15, 31, 45, 18, 28];
    return {
      likes: baseLikes[index] || 100 + Math.floor(Math.random() * 100),
      comments: baseComments[index] || 10 + Math.floor(Math.random() * 20)
    };
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse flex items-center justify-center mb-4">
              <Instagram className="w-12 h-12 text-pink-600 mr-4" />
              <div className="h-12 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-600">Exibindo conteúdo de demonstração</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-12 h-12 text-pink-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Siga a{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                @{profile?.username || 'gpnetce'}
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompanhe nossas novidades, dicas técnicas e expansões da rede em tempo real
          </p>
        </div>

        {/* Instagram Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {posts.slice(0, 6).map((post, index) => {
            const engagement = generateMockEngagement(index);
            return (
              <Card
                key={post.id}
                className="group overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => window.open(post.permalink, '_blank', 'noopener,noreferrer')}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.media_url}
                    alt={`Post do @${profile?.username || 'gpnetce'} ${post.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center space-y-2">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="w-5 h-5 mr-1" />
                          <span className="text-sm font-semibold">{engagement.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 mr-1" />
                          <span className="text-sm font-semibold">{engagement.comments}</span>
                        </div>
                      </div>
                      <p className="text-xs opacity-90">{formatTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA to follow */}
        <div className="text-center">
          <Button
            onClick={() => window.open(`https://instagram.com/${profile?.username || 'gpnetce'}`, '_blank', 'noopener,noreferrer')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
          >
            <Instagram className="w-6 h-6 mr-3" />
            Siga-nos no Instagram
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="mt-6 flex items-center justify-center space-x-8 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profile?.followers_count ? (profile.followers_count / 1000).toFixed(1) + 'k' : '2.3k'}
              </div>
              <div className="text-sm">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profile?.media_count || '186'}
              </div>
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
