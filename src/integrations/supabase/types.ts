export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  mayoreo: {
    Tables: {
      candidates: {
        Row: {
          connections: number | null
          description: string | null
          education: string | null
          experience: string | null
          filtered: boolean | null
          id: number
          image: string | null
          leadership?: string | null
          link: string | null
          location: string | null
          name: string | null
          opportunities?: string | null
          score: number | null
          search_id: string | null
          soft_skills?: string | null
          strengths?: string | null
          technical_score?: number | null
          title: string | null
        }
        Insert: {
          connections?: number | null
          description?: string | null
          education?: string | null
          experience?: string | null
          filtered?: boolean | null
          id?: number
          image?: string | null
          leadership?: string | null
          link?: string | null
          location?: string | null
          name?: string | null
          opportunities?: string | null
          score?: number | null
          search_id?: string | null
          soft_skills?: string | null
          strengths?: string | null
          technical_score?: number | null
          title?: string | null
        }
        Update: {
          connections?: number | null
          description?: string | null
          education?: string | null
          experience?: string | null
          filtered?: boolean | null
          id?: number
          image?: string | null
          leadership?: string | null
          link?: string | null
          location?: string | null
          name?: string | null
          opportunities?: string | null
          score?: number | null
          search_id?: string | null
          soft_skills?: string | null
          strengths?: string | null
          technical_score?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "searches"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location: string | null
          mission: string | null
          name: string
          vision: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          mission?: string | null
          name: string
          vision?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          mission?: string | null
          name?: string
          vision?: string | null
        }
        Relationships: []
      }
      searches: {
        Row: {
          company_id: string | null
          competence: boolean | null
          created_at: string
          id: string
          job_description: string | null
          job_requisition: string | null
          job_title: string
          keywords: string | null
          location: string
          reference: boolean
          webhook_response: Json | null
        }
        Insert: {
          company_id?: string | null
          competence?: boolean | null
          created_at?: string
          id?: string
          job_description?: string | null
          job_requisition?: string | null
          job_title: string
          keywords?: string | null
          location: string
          reference?: boolean
          webhook_response?: Json | null
        }
        Update: {
          company_id?: string | null
          competence?: boolean | null
          created_at?: string
          id?: string
          job_description?: string | null
          job_requisition?: string | null
          job_title?: string
          keywords?: string | null
          location?: string
          reference?: boolean
          webhook_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "searches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
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

type DefaultSchema = Database[Extract<keyof Database, "mayoreo">]

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
  mayoreo: {
    Enums: {},
  },
} as const
