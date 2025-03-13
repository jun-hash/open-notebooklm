'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, ThumbsUp, Trash2, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';
import type { GeneratedVoice } from '@/lib/supabase';

interface HistoryItemProps {
  item: GeneratedVoice;
  onDelete?: (id: string) => void;
}

export function HistoryItem({ item, onDelete }: HistoryItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio(item.audio_url);
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', () => setIsLoaded(true));
    
    // Clean up
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', () => setIsLoaded(true));
    };
  }, [item.audio_url]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.audio_url;
    link.download = `voice-${item.id}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="bg-[#111] rounded-lg overflow-hidden">
      {/* Header with text content */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-white/60" />
            <h3 className="text-white font-medium line-clamp-1">{item.text}</h3>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60"
              onClick={handleDownload}
            >
              <Download size={14} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60"
            >
              <ThumbsUp size={14} className={cn(item.likes_count > 0 ? "text-[#D97A4D]" : "")} />
            </Button>
            {onDelete && (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 size={14} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
          <span>{item.voice}</span>
          <span>•</span>
          <span>{formatDate(item.timestamp)}</span>
        </div>
      </div>
      
      {/* Audio player */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayPause}
            className="text-[#D97A4D] hover:text-[#E89263] transition-colors"
            disabled={!isLoaded}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <span className="text-xs text-white/80">
            {formatTime(currentTime)}
          </span>
          
          <Slider
            value={[currentTime]}
            min={0}
            max={item.duration}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          
          <span className="text-xs text-white/60">
            {formatTime(item.duration)}
          </span>
        </div>
      </div>
      
      <style jsx global>{`
        [data-slot="slider-thumb"] {
          background-color: #D97A4D !important;
          border-color: #D97A4D !important;
        }
        [data-slot="slider-range"] {
          background-color: #D97A4D !important;
        }
      `}</style>
    </div>
  );
} 