'use client';

import { useState } from 'react';
import { Play, Pause, Download, ThumbsUp, Trash2 } from 'lucide-react';
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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  const togglePlayPause = () => {
    if (!audio) {
      const newAudio = new Audio(item.audio_url);
      newAudio.addEventListener('timeupdate', handleTimeUpdate);
      newAudio.addEventListener('ended', handleEnded);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audio) {
      audio.currentTime = newTime;
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
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 w-full">
      <div className="flex items-start gap-4">
        <Button
          onClick={togglePlayPause}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-[#D97A4D] hover:bg-[#D97A4D]/90 text-white shrink-0 mt-1"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-white/90 mb-1">{item.voice}</div>
              <div className="text-xs text-white/60">{formatDate(item.timestamp)}</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60"
                onClick={handleDownload}
              >
                <Download size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60"
              >
                <ThumbsUp size={16} className={cn(item.likes_count > 0 ? "text-[#D97A4D]" : "")} />
              </Button>
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-white/10 text-white/60"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </div>
          
          <div className="text-sm text-white/80 line-clamp-2">{item.text}</div>
          
          <div className="pt-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={item.duration}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
              disabled={!audio}
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(item.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 