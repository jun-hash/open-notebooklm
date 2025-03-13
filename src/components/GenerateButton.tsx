'use client';

import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function GenerateButton({ 
  onClick, 
  isLoading = false, 
  disabled = false 
}: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="bg-[#D97A4D] hover:bg-[#D97A4D]/90 text-white rounded-md px-4 h-9 text-sm font-medium"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate"
      )}
    </Button>
  );
} 