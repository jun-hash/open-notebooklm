# Nari - Voice Generation App

This is a Next.js project for generating and cloning voices using text-to-speech technology.

## Features

- Text-to-speech generation with multiple voice options
- Voice cloning capability (coming soon)
- History of generated voices
- Custom voice management
- Audio playback with controls

## Tech Stack

- Next.js 15.2.2 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Supabase for backend and storage
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Supabase account and project

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nari-voice-app.git
cd nari-voice-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up Supabase:

- Create a new Supabase project
- Create a `generated_voices` table with the following schema:
  - `id`: uuid (primary key)
  - `user_id`: uuid (optional)
  - `text`: text
  - `voice`: text
  - `audio_url`: text
  - `duration`: integer
  - `timestamp`: timestamp with timezone
  - `is_public`: boolean
  - `likes_count`: integer
  - `comments`: text array (optional)

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: React components
- `src/lib`: Utility functions and API clients
- `src/app/api`: API route handlers

## License

MIT

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
