export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  mayoreo: {
    Tables: {
      candidates: {
        Row: {
          connections: number | null
          created_at: string | null
          description: string | null
          education: string | null
          experience: string | null
          filtered: boolean | null
          id: number
          image: string | null
          leadership: string | null
          link: string | null
          location: string | null
          name: string | null
          opportunities: string | null
          score: number | null
          search_id: string | null
          soft_skills: string | null
          strengths: string | null
          technical_score: number | null
          title: string | null
        }
        Insert: {
          connections?: number | null
          created_at?: string | null
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
          created_at?: string | null
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
      cv_results: {
        Row: {
          candidate_name: string | null
          cons: string[] | null
          created_at: string | null
          file_url: string | null
          id: string
          justification: string | null
          overall_score: number | null
          process_id: string | null
          pros: string[] | null
          reward_factor_explanation: string | null
          reward_factor_score: string | null
          risk_factor_explanation: string | null
          risk_factor_score: string | null
        }
        Insert: {
          candidate_name?: string | null
          cons?: string[] | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          justification?: string | null
          overall_score?: number | null
          process_id?: string | null
          pros?: string[] | null
          reward_factor_explanation?: string | null
          reward_factor_score?: string | null
          risk_factor_explanation?: string | null
          risk_factor_score?: string | null
        }
        Update: {
          candidate_name?: string | null
          cons?: string[] | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          justification?: string | null
          overall_score?: number | null
          process_id?: string | null
          pros?: string[] | null
          reward_factor_explanation?: string | null
          reward_factor_score?: string | null
          risk_factor_explanation?: string | null
          risk_factor_score?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_results_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          company_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      google_search: {
        Row: {
          created_at: string
          hasMoreResults: boolean | null
          id: number
          image: string | null
          link: string | null
          metadata: string | null
          name: string | null
          search_id: string | null
          snippet: string | null
          startIndex: number | null
          title: string | null
        }
        Insert: {
          created_at?: string
          hasMoreResults?: boolean | null
          id?: number
          image?: string | null
          link?: string | null
          metadata?: string | null
          name?: string | null
          search_id?: string | null
          snippet?: string | null
          startIndex?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string
          hasMoreResults?: boolean | null
          id?: number
          image?: string | null
          link?: string | null
          metadata?: string | null
          name?: string | null
          search_id?: string | null
          snippet?: string | null
          startIndex?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_search_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "searches"
            referencedColumns: ["id"]
          },
        ]
      }
      group_analysis: {
        Row: {
          content: string | null
          created_at: string
          file_url: string | null
          id: number
          period_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: number
          period_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: number
          period_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grupal_analysis_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "reporting_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      managers: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          system: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          system?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          system?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "managers_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      module_permissions: {
        Row: {
          id: string
          module: string
          permission: "read" | "write" | "admin"
          role:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
        }
        Insert: {
          id?: string
          module: string
          permission: "read" | "write" | "admin"
          role:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
        }
        Update: {
          id?: string
          module?: string
          permission?: "read" | "write" | "admin"
          role?:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
        }
        Relationships: []
      }
      monthly_reports: {
        Row: {
          created_at: string | null
          department: string
          due_date: string | null
          file_url: string | null
          id: string
          individual_analysis: string | null
          period_id: string
          status: string
          submitted_at: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department: string
          due_date?: string | null
          file_url?: string | null
          id?: string
          individual_analysis?: string | null
          period_id: string
          status?: string
          submitted_at?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string
          due_date?: string | null
          file_url?: string | null
          id?: string
          individual_analysis?: string | null
          period_id?: string
          status?: string
          submitted_at?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_reports_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "reporting_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monthly_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_configs: {
        Row: {
          channel: string
          created_at: string | null
          created_by: string | null
          frequency_type: string
          frequency_value: Json | null
          id: string
          is_active: boolean | null
          name: string
          notification_days: number | null
          notification_timing: string | null
          notification_type: string
          overdue_days: number | null
          reference_date_type: string | null
          specific_date: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          channel: string
          created_at?: string | null
          created_by?: string | null
          frequency_type: string
          frequency_value?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          notification_days?: number | null
          notification_timing?: string | null
          notification_type: string
          overdue_days?: number | null
          reference_date_type?: string | null
          specific_date?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          created_by?: string | null
          frequency_type?: string
          frequency_value?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          notification_days?: number | null
          notification_timing?: string | null
          notification_type?: string
          overdue_days?: number | null
          reference_date_type?: string | null
          specific_date?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      process_cv_files: {
        Row: {
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          process_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          process_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          process_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "process_cv_files_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      report_answers: {
        Row: {
          answer_content: string
          created_at: string | null
          id: string
          question_id: string
          report_id: string
          updated_at: string | null
        }
        Insert: {
          answer_content: string
          created_at?: string | null
          id?: string
          question_id: string
          report_id: string
          updated_at?: string | null
        }
        Update: {
          answer_content?: string
          created_at?: string | null
          id?: string
          question_id?: string
          report_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "report_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_answers_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "monthly_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_questions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          question_order: number
          question_text: string
          report_template_id: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          question_order: number
          question_text: string
          report_template_id?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          question_order?: number
          question_text?: string
          report_template_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_questions_report_template_id_fkey"
            columns: ["report_template_id"]
            isOneToOne: false
            referencedRelation: "report_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      report_templates: {
        Row: {
          created_at: string
          id: number
          template_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          template_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          template_name?: string | null
        }
        Relationships: []
      }
      reporting_periods: {
        Row: {
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          month: number
          name: string
          status: string
          updated_at: string | null
          year: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          month: number
          name: string
          status?: string
          updated_at?: string | null
          year: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          month?: number
          name?: string
          status?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
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
          sheet_url: string | null
          user_id: string | null
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
          sheet_url?: string | null
          user_id?: string | null
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
          sheet_url?: string | null
          user_id?: string | null
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
      system_profiles: {
        Row: {
          created_at: string
          id: number
          profile_id: string | null
          system_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id?: string | null
          system_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: string | null
          system_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "system_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_progress: {
        Row: {
          created_at: string
          data: string | null
          id: string
          status: string | null
          step: number
          task_id: string
          url: string | null
        }
        Insert: {
          created_at?: string
          data?: string | null
          id?: string
          status?: string | null
          step: number
          task_id: string
          url?: string | null
        }
        Update: {
          created_at?: string
          data?: string | null
          id?: string
          status?: string | null
          step?: number
          task_id?: string
          url?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          file_count: number | null
          id: string
          status: string
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          created_at?: string | null
          file_count?: number | null
          id?: string
          status?: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          created_at?: string | null
          file_count?: number | null
          id?: string
          status?: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_configs: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          webhook_type: string
          webhook_url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          webhook_type: string
          webhook_url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          webhook_type?: string
          webhook_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_reports_with_answers: {
        Args: { _period_id?: string; _user_id?: string }
        Returns: {
          report_id: string
          user_id: string
          user_name: string
          period_name: string
          period_month: number
          period_year: number
          department: string
          status: string
          created_at: string
          answers: Json
        }[]
      }
      get_user_permissions: {
        Args: { _user_id: string; _module: string }
        Returns: {
          permission: "read" | "write" | "admin"
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role:
            | "director"
            | "compras"
            | "gerente"
            | "supervisor"
            | "admin"
            | "responsable_comercial"
            | "usuario"
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
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  mayoreo: {
    Enums: {},
  },
} as const
