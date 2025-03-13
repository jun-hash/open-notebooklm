'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceGenerator } from '@/components/VoiceGenerator';
import { HistoryTab } from '@/components/HistoryTab';
import { getGeneratedVoices } from '@/lib/supabase';
import { SAMPLE_USER_ID } from '@/lib/voice-types';
import { Mic, Clock, Podcast } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // We're keeping the API call but not storing the results since 
        // we're no longer showing the generated voices in the UI
        await getGeneratedVoices(SAMPLE_USER_ID);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl -mt-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl -mt-8">
      <Tabs defaultValue="generate" className="w-full">
        <div className="tabs-container flex items-center gap-2 md:gap-4 mb-8 md:flex-row flex-col">
          <div className="tabs-list-wrapper w-full md:w-auto">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-[#151515] p-1 text-gray-400">
              <TabsTrigger 
                value="generate" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#C26833]/20 data-[state=active]:text-[#C26833] data-[state=active]:shadow-sm"
              >
                <Podcast className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#C26833]/20 data-[state=active]:text-[#C26833] data-[state=active]:shadow-sm"
              >
                <Clock className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger 
                value="voices" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#C26833]/20 data-[state=active]:text-[#C26833] data-[state=active]:shadow-sm"
              >
                <Mic className="w-4 h-4 mr-2" />
                Voices
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="search-wrapper w-full md:w-auto"></div>
        </div>

        <TabsContent value="generate" className="space-y-6">
          <VoiceGenerator />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>

        <TabsContent value="voices">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Voice Library</h2>
            <div className="bg-[#1A1A1A] rounded-lg p-6 text-center text-white/60">
              Coming soon - Voice management features
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
