import { NextResponse } from 'next/server';
import { addGeneratedVoice } from '@/lib/supabase';
import { generateTTS } from '@/lib/tts';
import { SAMPLE_USER_ID, isValidVoice } from '@/lib/voice-types';

export async function POST(request: Request) {
  try {
    const { text, voice } = await request.json();
    console.log('Request received:', { text, voice });

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (!voice || typeof voice !== 'string' || !isValidVoice(voice)) {
      return NextResponse.json(
        { error: 'Invalid voice. Available options: American Male, American Female' },
        { status: 400 }
      );
    }

    if (text.length > 500) {
      return NextResponse.json(
        { error: 'Text exceeds maximum length of 500 characters' },
        { status: 400 }
      );
    }

    console.log('Generating TTS...');
    // Generate audio using TTS service
    const { audioUrl, duration } = await generateTTS(text, voice);
    console.log('TTS generated:', { audioUrl, duration });

    console.log('Storing in Supabase...');
    // Store the generated voice in Supabase
    try {
      const generatedVoice = await addGeneratedVoice({
        userId: SAMPLE_USER_ID,
        text,
        voice,
        audioUrl,
        duration,
        isPublic: false
      });
      console.log('Voice stored successfully:', generatedVoice);
      return NextResponse.json(generatedVoice);
    } catch (supabaseError) {
      console.error('Supabase error details:', supabaseError);
      throw supabaseError;
    }
  } catch (error) {
    console.error('Error generating voice:', error);
    
    // Return more specific error messages
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate voice' },
      { status: 500 }
    );
  }
} 