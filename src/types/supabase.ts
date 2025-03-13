export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      voices: {
        Row: {
          id: string
          name: string
          description: string | null
          original_audio_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          original_audio_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          original_audio_url?: string | null
          created_at?: string
        }
      }
      generated_voices: {
        Row: {
          id: string
          user_id: string
          text: string
          voice: string
          audio_url: string
          duration: number
          timestamp: string
          is_public: boolean
          likes_count: number
          comments: string[]
        }
        Insert: {
          id?: string
          user_id: string
          text: string
          voice: string
          audio_url: string
          duration: number
          timestamp?: string
          is_public?: boolean
          likes_count?: number
          comments?: string[]
        }
        Update: {
          id?: string
          user_id?: string
          text?: string
          voice?: string
          audio_url?: string
          duration?: number
          timestamp?: string
          is_public?: boolean
          likes_count?: number
          comments?: string[]
        }
      }
      users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 