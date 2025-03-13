import { NextResponse } from 'next/server';
import { testSupabaseConnection } from '@/lib/supabase';

export async function GET() {
  const result = await testSupabaseConnection();
  
  if (!result.success) {
    return NextResponse.json(
      { error: result.error || 'Connection test failed' },
      { status: 500 }
    );
  }
  
  return NextResponse.json({ success: true });
} 