import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating testimonials image with OpenAI');

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: 'A young professional person sitting comfortably with a modern laptop covered in GPNet logo stickers, in a cozy home office environment. Behind them, a decorative heart shape made of floating stars and sparkles in soft pink and lilac colors. The person looks happy and satisfied, representing a satisfied internet customer. Modern, clean aesthetic with warm lighting. The GPNet stickers should be clearly visible on the laptop. Rosa and lilac color palette with professional photography style.',
        n: 1,
        size: '1024x1024',
        quality: 'high',
        output_format: 'webp'
      }),
    });

    const data = await response.json();
    
    if (!data.data || !data.data[0]) {
      throw new Error('No image generated');
    }

    // For gpt-image-1, the response always contains base64 data
    const base64Image = data.data[0].b64_json;

    return new Response(
      JSON.stringify({ 
        imageUrl: `data:image/webp;base64,${base64Image}`,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image', 
        details: error.message,
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});