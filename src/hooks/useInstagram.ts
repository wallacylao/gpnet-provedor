
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramProfile {
  followers_count: number;
  media_count: number;
  username: string;
}

interface InstagramResponse {
  posts: InstagramPost[];
  profile: InstagramProfile;
}

export const useInstagram = (username: string = 'gpnetce') => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching Instagram data...');

        // Call the Supabase edge function
        const { data, error } = await supabase.functions.invoke('instagram-posts');

        if (error) {
          console.error('Supabase function error:', error);
          throw new Error('Erro ao buscar dados do Instagram');
        }

        const instagramData: InstagramResponse = data;

        if (!instagramData || !instagramData.posts || !instagramData.profile) {
          throw new Error('Dados do Instagram não encontrados');
        }

        console.log(`Successfully loaded ${instagramData.posts.length} Instagram posts`);

        setPosts(instagramData.posts);
        setProfile(instagramData.profile);
      } catch (err) {
        console.error('Instagram fetch error:', err);
        setError('Erro ao carregar dados do Instagram');
        
        // Fallback para dados mock em caso de erro
        const mockPosts: InstagramPost[] = [
          {
            id: '1',
            media_type: 'IMAGE',
            media_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
            caption: '🚀 Internet de fibra óptica chegando em mais bairros de Fortaleza! Velocidade real garantida para sua casa e empresa. #GPNet #FibraOptica #Fortaleza',
            permalink: 'https://instagram.com/p/mock1/',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            media_type: 'IMAGE',
            media_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop',
            caption: '💻 Trabalhe de casa com a velocidade que você precisa! Nossa rede de fibra óptica garante estabilidade 24/7. #HomeOffice #InternetRapida #GPNet',
            permalink: 'https://instagram.com/p/mock2/',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            media_type: 'IMAGE',
            media_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
            caption: '⚡ Tecnologia de ponta para conexão sem limites! Nossos técnicos especializados garantem a melhor experiência. #Tecnologia #Inovacao #GPNet',
            permalink: 'https://instagram.com/p/mock3/',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '4',
            media_type: 'IMAGE',
            media_url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=400&fit=crop',
            caption: '🎮 Gaming sem lag com nossa internet ultra! Ping baixo e velocidade alta para a melhor experiência. #Gaming #InternetGamer #GPNet',
            permalink: 'https://instagram.com/p/mock4/',
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '5',
            media_type: 'IMAGE',
            media_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop',
            caption: '👷‍♂️ Nossa equipe técnica sempre pronta para te atender! Suporte local e especializado em Fortaleza. #SuporteTecnico #EquipeGPNet',
            permalink: 'https://instagram.com/p/mock5/',
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '6',
            media_type: 'IMAGE',
            media_url: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=400&fit=crop',
            caption: '🏢 Expansão da rede chegando em novos pontos da cidade! Conectividade de qualidade para todos. #Expansao #NovaCobertura #GPNet',
            permalink: 'https://instagram.com/p/mock6/',
            timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        const mockProfile: InstagramProfile = {
          followers_count: 2347,
          media_count: 186,
          username: 'gpnetce'
        };

        setPosts(mockPosts);
        setProfile(mockProfile);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramData();
  }, [username]);

  return { posts, profile, loading, error };
};
