// Mock TTS implementation for development
export async function generateTTS(text: string, voice: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`Generating TTS for text: "${text}" with voice: "${voice}"`);

  // Return fixed sample audio URL and duration
  return {
    audioUrl: 'https://jodzpnadsmtgpytxpnum.supabase.co/storage/v1/object/sign/nari-notebook/sample_fe.wav?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuYXJpLW5vdGVib29rL3NhbXBsZV9mZS53YXYiLCJpYXQiOjE3NDE4NTMzMDEsImV4cCI6MTc3MzM4OTMwMX0.DWUEZ3PmeFyYUWCbJN_EXxyvHZMzayZjh7PZ1DJ_wL4',
    duration: 5 // Fixed duration for sample audio in seconds
  };
}

// TODO: Implement real TTS service integration
// export async function generateTTS(text: string, voice: string) {
//   // Integration with actual TTS service will go here
// } 