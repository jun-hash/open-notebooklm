import { NextResponse } from 'next/server';
import { deleteGeneratedVoice } from '@/lib/supabase';
import { SAMPLE_USER_ID } from '@/lib/voice-types';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Voice ID is required' },
        { status: 400 }
      );
    }

    await deleteGeneratedVoice(id, SAMPLE_USER_ID);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting generated voice:', error);
    return NextResponse.json(
      { error: 'Failed to delete generated voice' },
      { status: 500 }
    );
  }
} 