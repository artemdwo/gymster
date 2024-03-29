export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          exercise_id: number
          exercise_name: string
          notes: string | null
          tags: string[] | null
          workout_id: number
        }
        Insert: {
          exercise_id?: number
          exercise_name: string
          notes?: string | null
          tags?: string[] | null
          workout_id: number
        }
        Update: {
          exercise_id?: number
          exercise_name?: string
          notes?: string | null
          tags?: string[] | null
          workout_id?: number
        }
      }
      sets: {
        Row: {
          exercise_id: number
          reps: number
          set_id: number
          set_number: number
          tags: string[] | null
          weight: number
        }
        Insert: {
          exercise_id: number
          reps: number
          set_id?: number
          set_number: number
          tags?: string[] | null
          weight: number
        }
        Update: {
          exercise_id?: number
          reps?: number
          set_id?: number
          set_number?: number
          tags?: string[] | null
          weight?: number
        }
      }
      user_profiles: {
        Row: {
          created_at: string
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          updated_at?: string
          user_id?: string
          username?: string
        }
      }
      workouts: {
        Row: {
          notes: string | null
          tags: string[] | null
          user_id: string
          workout_date: string
          workout_id: number
          workout_name: string
        }
        Insert: {
          notes?: string | null
          tags?: string[] | null
          user_id: string
          workout_date: string
          workout_id?: number
          workout_name: string
        }
        Update: {
          notes?: string | null
          tags?: string[] | null
          user_id?: string
          workout_date?: string
          workout_id?: number
          workout_name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_exercises_policy: {
        Args: {
          user_id: string
          exercise_id: number
        }
        Returns: boolean
      }
      check_sets_policy: {
        Args: {
          user_id: string
          set_id: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

