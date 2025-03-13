'use client';

import { useState } from 'react';
import { Textarea } from './ui/textarea';

interface TextInputProps {
  maxLength?: number;
  onChange?: (text: string) => void;
}

export function TextInput({ maxLength = 500, onChange }: TextInputProps) {
  const [text, setText] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
      onChange?.(newText);
    }
  };
  
  return (
    <Textarea
      value={text}
      onChange={handleChange}
      placeholder="Hello and welcome to Nari.

Try out one of our default voices, or test a random voice.

For best results with voice cloning, upload 10 to 60 seconds of high quality audio.

You can click the microphone to clone your own voice instantly, or drag and drop a pre-recorded voice.

Have fun and enjoy!"
      className="min-h-[200px] resize-none bg-transparent border-0 text-white/90 placeholder:text-white/60 focus-visible:ring-0 p-0 text-base"
    />
  );
} 