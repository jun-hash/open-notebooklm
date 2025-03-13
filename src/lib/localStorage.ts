import { v4 as uuidv4 } from 'uuid';

// Types based on our ERD
export type Voice = {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  is_cloned: boolean;
  original_audio_url?: string;
  user_id?: string;
  created_at: string;
};

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

// Local storage keys
const VOICES_KEY = 'nari_voices';
const GENERATED_VOICES_KEY = 'nari_generated_voices';

// Default voices
const defaultVoices: Voice[] = [
  {
    id: uuidv4(),
    name: 'British Female',
    description: 'British accent female voice',
    is_default: true,
    is_cloned: false,
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'American Male',
    description: 'American accent male voice',
    is_default: true,
    is_cloned: false,
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'American Female',
    description: 'American accent female voice',
    is_default: true,
    is_cloned: false,
    created_at: new Date().toISOString()
  }
];

// Initialize local storage with default data if empty
export function initLocalStorage(): void {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(VOICES_KEY)) {
    localStorage.setItem(VOICES_KEY, JSON.stringify(defaultVoices));
  }
  
  if (!localStorage.getItem(GENERATED_VOICES_KEY)) {
    localStorage.setItem(GENERATED_VOICES_KEY, JSON.stringify([]));
  }
}

// Voice functions
export function getVoices(): Voice[] {
  if (typeof window === 'undefined') return defaultVoices;
  
  const voices = localStorage.getItem(VOICES_KEY);
  return voices ? JSON.parse(voices) : defaultVoices;
}

export function addVoice(voice: Omit<Voice, 'id' | 'created_at'>): Voice {
  if (typeof window === 'undefined') return {} as Voice;
  
  const newVoice: Voice = {
    ...voice,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  
  const voices = getVoices();
  voices.push(newVoice);
  localStorage.setItem(VOICES_KEY, JSON.stringify(voices));
  
  return newVoice;
}

// Generated voice functions
export function getGeneratedVoices(): GeneratedVoice[] {
  if (typeof window === 'undefined') return [];
  
  const generatedVoices = localStorage.getItem(GENERATED_VOICES_KEY);
  return generatedVoices ? JSON.parse(generatedVoices) : [];
}

export function addGeneratedVoice(voice: Omit<GeneratedVoice, 'id' | 'timestamp'>): GeneratedVoice {
  if (typeof window === 'undefined') return {} as GeneratedVoice;
  
  const newGeneratedVoice: GeneratedVoice = {
    ...voice,
    id: uuidv4(),
    timestamp: new Date().toISOString()
  };
  
  const generatedVoices = getGeneratedVoices();
  generatedVoices.unshift(newGeneratedVoice); // Add to beginning for newest first
  localStorage.setItem(GENERATED_VOICES_KEY, JSON.stringify(generatedVoices));
  
  return newGeneratedVoice;
}

export function deleteGeneratedVoice(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const generatedVoices = getGeneratedVoices();
  const filteredVoices = generatedVoices.filter(voice => voice.id !== id);
  
  if (filteredVoices.length === generatedVoices.length) {
    return false; // Nothing was deleted
  }
  
  localStorage.setItem(GENERATED_VOICES_KEY, JSON.stringify(filteredVoices));
  return true;
}

// Mock TTS function (simulates API call)
export async function generateTTS(text: string, voiceName: string): Promise<{ audioUrl: string, duration: number }> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would call an actual TTS service
  // For now, we'll return a mock URL
  return {
    audioUrl: `https://example.com/audio/${voiceName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.mp3`,
    duration: Math.floor(text.length / 20) // Rough estimate of audio duration in seconds
  };
} 