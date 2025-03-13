// Available voice types as an enum
export enum VoiceType {
  AMERICAN_MALE = "American Male",
  AMERICAN_FEMALE = "American Female"
}

// List of available voices for component rendering
export const AVAILABLE_VOICES = [
  {
    id: "am-male",
    name: VoiceType.AMERICAN_MALE,
    description: "American English male voice"
  },
  {
    id: "am-female",
    name: VoiceType.AMERICAN_FEMALE,
    description: "American English female voice"
  }
];

// Helper function to check if a voice is valid
export function isValidVoice(voice: string): boolean {
  return Object.values(VoiceType).includes(voice as VoiceType);
}

// Sample user ID for testing
export const SAMPLE_USER_ID = 'bfd358e3-a6fb-4758-84c9-aa833682d81b'; 