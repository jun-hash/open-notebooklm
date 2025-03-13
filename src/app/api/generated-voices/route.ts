import { NextResponse } from 'next/server';
import { getGeneratedVoices } from '@/lib/supabase';
import { SAMPLE_USER_ID } from '@/lib/voice-types';

export async function GET() {
  try {
    const generatedVoices = await getGeneratedVoices(SAMPLE_USER_ID);
    return NextResponse.json(generatedVoices);
  } catch (error) {
    console.error('Error fetching generated voices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch generated voices' },
      { status: 500 }
    );
  }
} 