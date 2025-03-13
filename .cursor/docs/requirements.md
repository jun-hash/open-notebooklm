# Requirements Specification

## Technical Requirements

### Frontend
- **Framework**: Next.js with React.
- **UI Library**: shadcn/ui with Tailwind CSS for styling.
- **Audio Handling**: HTML5 Audio API or Howler.js.
- **Responsiveness**: Fully responsive design for desktop and mobile.

### Backend
- **Framework**: Supabase for database, storage, and Edge Functions.
- **Database**: Supabase PostgreSQL with `generated_voices` and `voices` tables.
- **Storage**: Supabase Storage for audio files in 'audio_files' bucket.
- **TTS Engine**: Open-source Tacotron 2 or similar.
- **Voice Cloning**: YourTTS or VALL-E for cloning functionality.
- **API Endpoints**:
  - `POST /functions/v1/generate-voice`: Generate audio from text.
  - `GET /rest/v1/generated_voices`: Fetch history.
  - (Future) `GET /api/explore`: Fetch public voices.

### Performance
- Optimize for fast load times with lazy-loaded audio.
- Ensure smooth playback without buffering delays.

### Security
- Protect user data with Supabase Auth (optional).
- Ensure only opted-in voices are public in Explore feature.

## Development Milestones
1. **Phase 1 (1-2 weeks)**: Set up project, implement Text Input and Generate button.
2. **Phase 2 (2-3 weeks)**: Add Audio Upload, Playback, and History management.
3. **Phase 3 (1-2 weeks)**: Polish UI/UX and optimize performance.
4. **Phase 4 (Future)**: Implement Explore Voices feature.

## Constraints
- English-only voices ("American Female", "American Male").
- Character limit of 500 for text input.
- Audio upload limit: 10-60 seconds, max 10MB.