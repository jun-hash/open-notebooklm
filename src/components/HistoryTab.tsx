'use client';

import { useState, useEffect } from 'react';
import { supabase, type GeneratedVoice } from '@/lib/supabase';
import { HistoryItem } from './HistoryItem';
import { Button } from './ui/button';
import { Loader2, RefreshCw, Search } from 'lucide-react';
import { Input } from './ui/input';

export function HistoryTab() {
  const [history, setHistory] = useState<GeneratedVoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('generated_voices')
        .select('*')
        .order('timestamp', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setHistory(data as GeneratedVoice[]);
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Failed to load history data');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHistory();
  }, []);
  
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('generated_voices')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update the local state to remove the deleted item
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      // You might want to show a toast notification here
    }
  };
  
  const filteredHistory = searchQuery
    ? history.filter(item => 
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.voice.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : history;
    
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="bg-[#1A1A1A] border-none pl-10 text-white/90 placeholder:text-white/60"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="border-none bg-[#1A1A1A] h-10 w-10 text-white/60 hover:text-white hover:bg-[#1A1A1A]/80"
          onClick={fetchHistory}
        >
          <RefreshCw size={16} />
        </Button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#D97A4D]" />
        </div>
      )}
      
      {error && (
        <div className="bg-red-900/20 border border-red-900 text-red-300 rounded-lg p-4">
          {error}
        </div>
      )}
      
      {!isLoading && !error && filteredHistory.length === 0 && (
        <div className="text-center text-white/60 py-12">
          {searchQuery ? 'No results found' : 'No voice generations found'}
        </div>
      )}
      
      <div className="space-y-4">
        {filteredHistory.map(item => (
          <HistoryItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
} 