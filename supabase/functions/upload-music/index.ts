import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the form data from the request
    const formData = await req.formData()
    const file = formData.get('file') as File
    const metadata = JSON.parse(formData.get('metadata') as string)

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Upload to Bunny CDN
    const bunnyStorageName = Deno.env.get('BUNNY_STORAGE_ZONE_NAME')
    const bunnyApiKey = Deno.env.get('BUNNY_API_KEY')
    const bunnyStorageHost = Deno.env.get('BUNNY_STORAGE_HOST')

    const fileName = `${crypto.randomUUID()}-${file.name}`
    const bunnyUrl = `https://${bunnyStorageHost}/${bunnyStorageName}/${fileName}`

    // Upload file to Bunny CDN
    const uploadResponse = await fetch(bunnyUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': bunnyApiKey!,
        'Content-Type': file.type,
      },
      body: file,
    })

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload to Bunny CDN')
    }

    // Get the user information from the auth header
    const authHeader = req.headers.get('Authorization')?.split(' ')[1]
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader!)

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Save file metadata to Supabase
    const { data: songData, error: insertError } = await supabase
      .from('songs')
      .insert({
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        genre: metadata.genres,
        duration: metadata.duration,
        file_url: bunnyUrl,
        bunny_id: fileName,
        artwork_url: metadata.artworkUrl,
        created_by: user.id
      })
      .select()
      .single()

    if (insertError) {
      throw new Error('Failed to save song metadata')
    }

    console.log('Successfully uploaded song:', {
      fileName,
      metadata,
      songData
    })

    return new Response(
      JSON.stringify({ 
        message: 'Upload successful',
        song: songData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Upload error:', error)

    return new Response(
      JSON.stringify({ 
        error: 'Upload failed', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})