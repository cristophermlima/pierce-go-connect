export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string | null
          creator_id: string
          id: string
          image: string | null
          location: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          id?: string
          image?: string | null
          location: string
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          id?: string
          image?: string | null
          location?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_event_organizer: boolean | null
          is_supplier: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_event_organizer?: boolean | null
          is_supplier?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_event_organizer?: boolean | null
          is_supplier?: boolean | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          created_at: string | null
          environment_rating: number | null
          event_date: string | null
          event_id: string | null
          event_name: string | null
          id: string
          images: string[] | null
          organization_rating: number | null
          overall_rating: number
          quality_rating: number | null
          safety_rating: number | null
          supplier_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string | null
          environment_rating?: number | null
          event_date?: string | null
          event_id?: string | null
          event_name?: string | null
          id?: string
          images?: string[] | null
          organization_rating?: number | null
          overall_rating: number
          quality_rating?: number | null
          safety_rating?: number | null
          supplier_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string | null
          environment_rating?: number | null
          event_date?: string | null
          event_id?: string | null
          event_name?: string | null
          id?: string
          images?: string[] | null
          organization_rating?: number | null
          overall_rating?: number
          quality_rating?: number | null
          safety_rating?: number | null
          supplier_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          location: string | null
          start_date: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          location?: string | null
          start_date: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location?: string | null
          start_date?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          created_at: string | null
          creator_id: string | null
          id: string
          image: string | null
          location: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          id?: string
          image?: string | null
          location: string
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          id?: string
          image?: string | null
          location?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      travel_plans: {
        Row: {
          accommodation_name: string | null
          accommodation_type: string | null
          check_in: string | null
          check_out: string | null
          created_at: string | null
          departure_date: string | null
          event_id: string | null
          id: string
          notes: string | null
          return_date: string | null
          transport_type: string | null
          user_id: string
        }
        Insert: {
          accommodation_name?: string | null
          accommodation_type?: string | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          departure_date?: string | null
          event_id?: string | null
          id?: string
          notes?: string | null
          return_date?: string | null
          transport_type?: string | null
          user_id: string
        }
        Update: {
          accommodation_name?: string | null
          accommodation_type?: string | null
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          departure_date?: string | null
          event_id?: string | null
          id?: string
          notes?: string | null
          return_date?: string | null
          transport_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_plans_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
