import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Voice related functions
export async function getAvailableVoices() {
  const { data, error } = await supabase
    .from('voices')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data;
}

export async function getGeneratedVoices(userId: string) {
  const { data, error } = await supabase
    .from('generated_voices')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false });
    
  if (error) throw error;
  return data;
}

export async function addGeneratedVoice({
  userId,
  text,
  voice,
  audioUrl,
  duration,
  isPublic = false
}: {
  userId: string;
  text: string;
  voice: string;
  audioUrl: string;
  duration: number;
  isPublic?: boolean;
}) {
  const { data, error } = await supabase
    .from('generated_voices')
    .insert({
      user_id: userId,
      text,
      voice,
      audio_url: audioUrl,
      duration,
      is_public: isPublic
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function deleteGeneratedVoice(id: string, userId: string) {
  const { error } = await supabase
    .from('generated_voices')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
    
  if (error) throw error;
}

export async function updateGeneratedVoice(
  id: string,
  userId: string,
  updates: { is_public?: boolean; likes_count?: number; comments?: string[] }
) {
  const { data, error } = await supabase
    .from('generated_voices')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('voices')
      .select('name')
      .limit(1);
      
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Unknown error occurred' };
  }
}

// Types for our database tables
export type GeneratedVoice = {
  id: string;
  user_id?: string;
  text: string;
  voice: string;
  audio_url: string;
  duration: number;
  timestamp: string;
  is_public: boolean;
  likes_count: number;
  comments?: string[];
}; 