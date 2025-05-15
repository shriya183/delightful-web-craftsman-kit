
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { journalContent } = await req.json();
    
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch Gemini API key from the database
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from('api_key')
      .select('key_value')
      .eq('name', 'GEMINI_API_KEY')
      .single();
    
    if (apiKeyError || !apiKeyData) {
      console.error('Error fetching Gemini API key:', apiKeyError);
      return new Response(
        JSON.stringify({ error: 'API key not found in database' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const apiKey = apiKeyData.key_value;

    // Format the prompt for Gemini
    const prompt = `
    Based on this journal entry, create three reflections that are emotionally intelligent and insightful:

    Journal Entry: "${journalContent}"

    Please return exactly THREE reflections in this exact format:
    1. ✨ CELEBRATION: [An affirming reflection on effort or truth in the entry]
    2. ⚡ WARNING: [A gentle reflection highlighting potential risks or blind spots]
    3. 🌱 NUDGE: [A suggestion for a small next action]

    Each reflection should be compassionate, specific to the journal content, and no longer than two sentences.
    `;

    // Call Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      return new Response(
        JSON.stringify({ error: 'Error calling Gemini API', details: data }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);

    // Parse the reflections from the response
    const reflections = parseReflections(generatedText);

    return new Response(
      JSON.stringify({ success: true, reflections }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-reflections function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Helper function to parse reflections from the Gemini response
function parseReflections(text: string) {
  const celebrationRegex = /✨\s*CELEBRATION:?\s*(.*?)(?=\d|\n\s*\d|$)/i;
  const warningRegex = /⚡\s*WARNING:?\s*(.*?)(?=\d|\n\s*\d|$)/i;
  const nudgeRegex = /🌱\s*NUDGE:?\s*(.*?)(?=$)/i;

  const celebrationMatch = text.match(celebrationRegex);
  const warningMatch = text.match(warningRegex);
  const nudgeMatch = text.match(nudgeRegex);

  return {
    celebration: celebrationMatch ? celebrationMatch[1].trim() : "Great effort in journaling today.",
    warning: warningMatch ? warningMatch[1].trim() : "Consider potential challenges that might arise.",
    nudge: nudgeMatch ? nudgeMatch[1].trim() : "Take a small step forward tomorrow."
  };
}
