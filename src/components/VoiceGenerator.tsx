'use client';

import { useState } from 'react';
import { Mic, Upload } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { TextInput } from './TextInput';
import { GenerateButton } from './GenerateButton';
import { AudioPlayer } from './AudioPlayer';
import type { Database } from '@/types/supabase';
import { AVAILABLE_VOICES, VoiceType } from '@/lib/voice-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type GeneratedVoice = Database['public']['Tables']['generated_voices']['Row'];

export function VoiceGenerator() {
  const [selectedVoice, setSelectedVoice] = useState<string>(VoiceType.AMERICAN_FEMALE);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVoice, setGeneratedVoice] = useState<GeneratedVoice | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (error) setError(null);
  };

  const handleGenerate = async () => {
    if (!inputText.trim() || !selectedVoice) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          voice: selectedVoice,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate voice');
      }

      const result = await response.json();
      setGeneratedVoice(result);
    } catch (error) {
      console.error('Error generating voice:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setGeneratedVoice(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Text Input Area */}
      <div className="bg-[#1A1A1A] rounded-lg p-6">
        <TextInput maxLength={500} onChange={handleTextChange} />
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Options Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-[#1A1A1A] p-4 rounded-lg">
        {/* Voice Selection */}
        <Select
          value={selectedVoice}
          onValueChange={setSelectedVoice}
        >
          <SelectTrigger className="bg-[#262626] border-none text-white/80 w-auto">
            <SelectValue placeholder="Select voice" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1A1A] border-[#333333]">
            {AVAILABLE_VOICES.map((voice) => (
              <SelectItem key={voice.id} value={voice.name} className="text-white/80 focus:bg-[#262626] focus:text-white">
                {voice.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Language Selection (Fixed) */}
        <div className="flex items-center gap-2 bg-[#262626] px-3 py-1.5 rounded-md">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="#f0f0f0" d="M0 85.33h512v341.33H0z"/>
              <path fill="#d80027" d="M0 85.33h512v42.67H0zm0 85.34h512v42.67H0zm0 85.33h512v42.67H0zm0 85.33h512v42.67H0z"/>
              <path fill="#2e52b2" d="M0 85.33h256v183.8H0z"/>
              <path fill="#f0f0f0" d="m99.82 160.62-19.74 14.36 7.54 23.22-19.74-14.35-19.74 14.35 7.54-23.22-19.74-14.36h24.4l7.54-23.22 7.54 23.22h24.4zM181.8 160.62l-19.74 14.36 7.54 23.22-19.74-14.35-19.74 14.35 7.54-23.22-19.74-14.36h24.4l7.54-23.22 7.54 23.22h24.4zM99.82 219.13l-19.74 14.36 7.54 23.22-19.74-14.36-19.74 14.36 7.54-23.22-19.74-14.36h24.4l7.54-23.22 7.54 23.22h24.4zM181.8 219.13l-19.74 14.36 7.54 23.22-19.74-14.36-19.74 14.36 7.54-23.22-19.74-14.36h24.4l7.54-23.22 7.54 23.22h24.4zM99.82 102.11l-19.74 14.35 7.54 23.22-19.74-14.35-19.74 14.35 7.54-23.22-19.74-14.35h24.4l7.54-23.22 7.54 23.22h24.4zM181.8 102.11l-19.74 14.35 7.54 23.22-19.74-14.35-19.74 14.35 7.54-23.22-19.74-14.35h24.4l7.54-23.22 7.54 23.22h24.4z"/>
            </svg>
            <span className="text-sm text-white/80">English (US)</span>
          </span>
        </div>

        <div className="h-4 w-px bg-white/10" />
        <button className="text-sm text-white/80 flex items-center gap-2">
          <Mic size={16} />
          Clone Voice
        </button>
        <button className="text-sm text-white/80 flex items-center gap-2">
          <Upload size={16} />
          Upload
        </button>
        <div className="flex-1" />
        <div className="text-sm text-white/60">{inputText.length}</div>
        <GenerateButton
          onClick={handleGenerate}
          isLoading={isGenerating}
          disabled={!inputText.trim() || !selectedVoice}
        />
      </div>

      {/* Audio Player - Only show when generated */}
      {generatedVoice && (
        <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/80">{generatedVoice.voice} • </span>
              <span className="text-sm text-white/60">
                {new Date(generatedVoice.timestamp).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
          <AudioPlayer
            audioUrl={generatedVoice.audio_url}
            duration={generatedVoice.duration}
          />
        </div>
      )}
    </div>
  );
} 