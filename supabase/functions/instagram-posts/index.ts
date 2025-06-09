
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get Instagram Access Token from Supabase secrets
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    
    if (!accessToken) {
      console.error('Instagram access token not found');
      return returnMockData();
    }

    console.log('Instagram access token found, attempting to fetch data...');

    // Fetch Instagram profile data with better error handling
    try {
      const profileUrl = `https://graph.instagram.com/me?fields=followers_count,media_count,username&access_token=${accessToken}`;
      console.log('Fetching profile from:', profileUrl);
      
      const profileResponse = await fetch(profileUrl);
      
      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error('Profile API error:', profileResponse.status, errorText);
        throw new Error(`Profile API returned ${profileResponse.status}: ${errorText}`);
      }

      const profileData = await profileResponse.json();
      console.log('Profile data received:', profileData);

      // Check if profile data has error
      if (profileData.error) {
        console.error('Instagram profile API error:', profileData.error);
        throw new Error(`Instagram API error: ${profileData.error.message}`);
      }

      // Fetch Instagram media with better error handling
      const mediaUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink,timestamp&limit=6&access_token=${accessToken}`;
      console.log('Fetching media from:', mediaUrl);

      const mediaResponse = await fetch(mediaUrl);

      if (!mediaResponse.ok) {
        const errorText = await mediaResponse.text();
        console.error('Media API error:', mediaResponse.status, errorText);
        throw new Error(`Media API returned ${mediaResponse.status}: ${errorText}`);
      }

      const mediaData = await mediaResponse.json();
      console.log('Media data received:', mediaData);

      // Check if media data has error
      if (mediaData.error) {
        console.error('Instagram media API error:', mediaData.error);
        throw new Error(`Instagram API error: ${mediaData.error.message}`);
      }

      const posts: InstagramPost[] = mediaData.data?.map((post: any) => ({
        id: post.id,
        media_type: post.media_type,
        media_url: post.media_url,
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp
      })) || [];

      const profile: InstagramProfile = {
        followers_count: profileData.followers_count || 0,
        media_count: profileData.media_count || 0,
        username: profileData.username || 'gpnetce'
      };

      console.log(`Successfully fetched ${posts.length} Instagram posts for @${profile.username}`);

      return Response.json({
        posts,
        profile
      }, { headers: corsHeaders });

    } catch (apiError) {
      console.error('Instagram API Error:', apiError);
      console.log('Falling back to mock data due to API error');
      return returnMockData();
    }

  } catch (error) {
    console.error('General Error:', error);
    return returnMockData();
  }
});

function returnMockData() {
  console.log('Returning mock Instagram data');
  return Response.json({
    posts: [
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
    ],
    profile: {
      followers_count: 2347,
      media_count: 186,
      username: 'gpnetce'
    }
  }, { headers: corsHeaders });
}
