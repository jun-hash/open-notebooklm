'use client';

import { useState } from 'react';
import { Play, Pause, Heart, MessageSquare, Share2, Trash2 } from 'lucide-react';
import type { Database } from '@/types/supabase';
import { deleteGeneratedVoice, updateGeneratedVoice } from '@/lib/supabase';

type GeneratedVoice = Database['public']['Tables']['generated_voices']['Row'];

interface VoiceListProps {
  generatedVoices: GeneratedVoice[];
}

const SAMPLE_USER_ID = 'bfd358e3-a6fb-4758-84c9-aa833682d81b';

export function VoiceList({ generatedVoices: initialVoices }: VoiceListProps) {
  const [voices, setVoices] = useState(initialVoices);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const handleLike = async (voice: GeneratedVoice) => {
    try {
      const updatedVoice = await updateGeneratedVoice(voice.id, SAMPLE_USER_ID, {
        likes_count: (voice.likes_count || 0) + 1
      });
      setVoices(voices.map(v => v.id === voice.id ? updatedVoice : v));
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGeneratedVoice(id, SAMPLE_USER_ID);
      setVoices(voices.filter(voice => voice.id !== id));
    } catch (error) {
      console.error('Error deleting voice:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Generated Voices</h2>
      
      {voices.length === 0 ? (
        <div className="bg-[#1A1A1A] rounded-lg p-6 text-center text-white/60">
          No generated voices yet
        </div>
      ) : (
        <div className="space-y-4">
          {voices.map((voice) => (
            <div key={voice.id} className="bg-[#1A1A1A] rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-white/80">{voice.text}</p>
                  <p className="text-xs text-white/60">
                    {new Date(voice.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(voice.id)}
                  className="text-white/60 hover:text-white/80"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePlay(voice.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  {playingId === voice.id ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </button>
                
                <button
                  onClick={() => handleLike(voice)}
                  className="flex items-center gap-1 text-sm text-white/60 hover:text-white/80"
                >
                  <Heart size={16} />
                  {voice.likes_count || 0}
                </button>
                
                <button className="flex items-center gap-1 text-sm text-white/60 hover:text-white/80">
                  <MessageSquare size={16} />
                  {voice.comments?.length || 0}
                </button>
                
                <button className="flex items-center gap-1 text-sm text-white/60 hover:text-white/80">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 