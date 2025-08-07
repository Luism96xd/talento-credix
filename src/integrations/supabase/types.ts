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
  public: {
    Tables: {
      addp_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      addp_posicion_usuarios: {
        Row: {
          chat_id: string
          estado: string | null
          nombre: string | null
          vendedor: string
        }
        Insert: {
          chat_id: string
          estado?: string | null
          nombre?: string | null
          vendedor: string
        }
        Update: {
          chat_id?: string
          estado?: string | null
          nombre?: string | null
          vendedor?: string
        }
        Relationships: []
      }
      aida_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      api_configurations: {
        Row: {
          config_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
        }
        Insert: {
          config_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
        }
        Update: {
          config_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      aranceles_importacion: {
        Row: {
          arancel_base: string | null
          categoria_degravacion: string | null
          codigo_arancelario: string | null
          descripcion: string | null
        }
        Insert: {
          arancel_base?: string | null
          categoria_degravacion?: string | null
          codigo_arancelario?: string | null
          descripcion?: string | null
        }
        Update: {
          arancel_base?: string | null
          categoria_degravacion?: string | null
          codigo_arancelario?: string | null
          descripcion?: string | null
        }
        Relationships: []
      }
      articulos_beval_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      articulos_febeca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      articulos_magento: {
        Row: {
          created_at: string
          id_magento: string | null
          imagen: boolean | null
          sku: string | null
        }
        Insert: {
          created_at?: string
          id_magento?: string | null
          imagen?: boolean | null
          sku?: string | null
        }
        Update: {
          created_at?: string
          id_magento?: string | null
          imagen?: boolean | null
          sku?: string | null
        }
        Relationships: []
      }
      articulos_sillaca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      asistente_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      brands: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          target_audience: string | null
          tone_of_voice: string | null
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          target_audience?: string | null
          tone_of_voice?: string | null
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          target_audience?: string | null
          tone_of_voice?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      calculated_prices: {
        Row: {
          calculated_at: string
          calculated_price: number
          factors_applied: Json | null
          id: string
          price_list_id: string
          product_id: string
        }
        Insert: {
          calculated_at?: string
          calculated_price: number
          factors_applied?: Json | null
          id?: string
          price_list_id: string
          product_id: string
        }
        Update: {
          calculated_at?: string
          calculated_price?: number
          factors_applied?: Json | null
          id?: string
          price_list_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculated_prices_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calculated_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand_id: string
          business_goals: string | null
          content_ideas: string | null
          created_at: string
          description: string | null
          id: string
          status: string
          target_audience: string | null
          title: string
          updated_at: string
          webhook_response: Json | null
        }
        Insert: {
          brand_id: string
          business_goals?: string | null
          content_ideas?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          target_audience?: string | null
          title: string
          updated_at?: string
          webhook_response?: Json | null
        }
        Update: {
          brand_id?: string
          business_goals?: string | null
          content_ideas?: string | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          target_audience?: string | null
          title?: string
          updated_at?: string
          webhook_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string
          cv_file_id: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          photo_url: string | null
          process_id: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cv_file_id: string
          email?: string | null
          full_name: string
          id?: string
          phone?: string | null
          photo_url?: string | null
          process_id: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cv_file_id?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          photo_url?: string | null
          process_id?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_cv_file_id_fkey"
            columns: ["cv_file_id"]
            isOneToOne: false
            referencedRelation: "cv_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "recruitment_processes"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversacional: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      chat_memories: {
        Row: {
          created_at: string
          id: number
          memory: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          memory?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          memory?: string | null
          user?: string | null
        }
        Relationships: []
      }
      cliente: {
        Row: {
          Activo: string | null
          AgrupacionCliente: string | null
          CategoriaCliente: string | null
          CategoriaComercial: string | null
          Ciudad: string | null
          CodCliente: string | null
          CodCobrador: string | null
          CodVendedor: string | null
          ContribuyenteTipo: string | null
          CorreoElectronico: string | null
          Descuento: string | null
          DimensionCliente: string | null
          DivGeo1: string | null
          DivGeo2: string | null
          DivGeo3: string | null
          DivGeo4: string | null
          Estado: string | null
          FechaCreacion: string | null
          LimiteCredito: string | null
          Municipio: string | null
          NivelPrecioCliente: string | null
          NombreComercial: string | null
          NombreRegion: string | null
          NombreSupervisor: string | null
          NombreVendedor: string | null
          Pais: string | null
          RazonSocial: string | null
          Region: string | null
          RolVendedor: string | null
          Ruta: number | null
          SegmentoCliente: string | null
          SegmentoNaturaleza: string | null
          StatusVendedor: string | null
          Supervisor: string | null
          Zona: string | null
        }
        Insert: {
          Activo?: string | null
          AgrupacionCliente?: string | null
          CategoriaCliente?: string | null
          CategoriaComercial?: string | null
          Ciudad?: string | null
          CodCliente?: string | null
          CodCobrador?: string | null
          CodVendedor?: string | null
          ContribuyenteTipo?: string | null
          CorreoElectronico?: string | null
          Descuento?: string | null
          DimensionCliente?: string | null
          DivGeo1?: string | null
          DivGeo2?: string | null
          DivGeo3?: string | null
          DivGeo4?: string | null
          Estado?: string | null
          FechaCreacion?: string | null
          LimiteCredito?: string | null
          Municipio?: string | null
          NivelPrecioCliente?: string | null
          NombreComercial?: string | null
          NombreRegion?: string | null
          NombreSupervisor?: string | null
          NombreVendedor?: string | null
          Pais?: string | null
          RazonSocial?: string | null
          Region?: string | null
          RolVendedor?: string | null
          Ruta?: number | null
          SegmentoCliente?: string | null
          SegmentoNaturaleza?: string | null
          StatusVendedor?: string | null
          Supervisor?: string | null
          Zona?: string | null
        }
        Update: {
          Activo?: string | null
          AgrupacionCliente?: string | null
          CategoriaCliente?: string | null
          CategoriaComercial?: string | null
          Ciudad?: string | null
          CodCliente?: string | null
          CodCobrador?: string | null
          CodVendedor?: string | null
          ContribuyenteTipo?: string | null
          CorreoElectronico?: string | null
          Descuento?: string | null
          DimensionCliente?: string | null
          DivGeo1?: string | null
          DivGeo2?: string | null
          DivGeo3?: string | null
          DivGeo4?: string | null
          Estado?: string | null
          FechaCreacion?: string | null
          LimiteCredito?: string | null
          Municipio?: string | null
          NivelPrecioCliente?: string | null
          NombreComercial?: string | null
          NombreRegion?: string | null
          NombreSupervisor?: string | null
          NombreVendedor?: string | null
          Pais?: string | null
          RazonSocial?: string | null
          Region?: string | null
          RolVendedor?: string | null
          Ruta?: number | null
          SegmentoCliente?: string | null
          SegmentoNaturaleza?: string | null
          StatusVendedor?: string | null
          Supervisor?: string | null
          Zona?: string | null
        }
        Relationships: []
      }
      clientes_beval_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      clientes_cofersa_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      clientes_febeca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      clientes_sillaca_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      cotizador_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      culture_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      culture_embeddings2: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      customer_service_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      cv_files: {
        Row: {
          file_name: string
          file_path: string
          file_size: number
          id: string
          process_id: string
          uploaded_at: string
        }
        Insert: {
          file_name: string
          file_path: string
          file_size: number
          id?: string
          process_id: string
          uploaded_at?: string
        }
        Update: {
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          process_id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_files_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "recruitment_processes"
            referencedColumns: ["id"]
          },
        ]
      }
      division_geografica1: {
        Row: {
          division_geografica1: string
          nombre: string | null
        }
        Insert: {
          division_geografica1: string
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string
          nombre?: string | null
        }
        Relationships: []
      }
      division_geografica2: {
        Row: {
          division_geografica1: string | null
          division_geografica2: string | null
          nombre: string | null
        }
        Insert: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          nombre?: string | null
        }
        Relationships: []
      }
      division_geografica3: {
        Row: {
          division_geografica1: string | null
          division_geografica2: string | null
          division_geografica3: string | null
          nombre: string | null
        }
        Insert: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          nombre?: string | null
        }
        Relationships: []
      }
      division_geografica4: {
        Row: {
          division_geografica1: string | null
          division_geografica2: string | null
          division_geografica3: string | null
          division_geografica4: string | null
          nombre: string | null
        }
        Insert: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          division_geografica4?: string | null
          nombre?: string | null
        }
        Update: {
          division_geografica1?: string | null
          division_geografica2?: string | null
          division_geografica3?: string | null
          division_geografica4?: string | null
          nombre?: string | null
        }
        Relationships: []
      }
      documentos_aida: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_logistica: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_mayoreo: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_olo: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documentos_personal: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      education: {
        Row: {
          candidate_id: string
          created_at: string
          degree: string
          end_date: string | null
          field_of_study: string | null
          id: string
          institution: string
          is_current: boolean | null
          start_date: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          degree: string
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution: string
          is_current?: boolean | null
          start_date?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          degree?: string
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string
          is_current?: boolean | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      errores_vectorizados: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      errors: {
        Row: {
          created_at: string | null
          created_by: string
          description: string
          error_type: string
          files: Json | null
          id: string
          priority: string
          solutions: string[] | null
          status: string
          technology: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description: string
          error_type: string
          files?: Json | null
          id?: string
          priority?: string
          solutions?: string[] | null
          status?: string
          technology?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string
          error_type?: string
          files?: Json | null
          id?: string
          priority?: string
          solutions?: string[] | null
          status?: string
          technology?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "errors_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_management"
            referencedColumns: ["email"]
          },
        ]
      }
      factor_price_list_relations: {
        Row: {
          created_at: string
          factor_id: string
          id: string
          price_list_id: string
        }
        Insert: {
          created_at?: string
          factor_id: string
          id?: string
          price_list_id: string
        }
        Update: {
          created_at?: string
          factor_id?: string
          id?: string
          price_list_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "factor_price_list_relations_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "pricing_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "factor_price_list_relations_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      facturas_2025: {
        Row: {
          cliente: string | null
          division_geografica1: string | null
          division_geografica2: string | null
          FECHA: string | null
          invoice_number: string
          PEDIDO: string | null
          RUTA: string | null
          vendedor: string | null
          zona: string | null
        }
        Insert: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FECHA?: string | null
          invoice_number: string
          PEDIDO?: string | null
          RUTA?: string | null
          vendedor?: string | null
          zona?: string | null
        }
        Update: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FECHA?: string | null
          invoice_number?: string
          PEDIDO?: string | null
          RUTA?: string | null
          vendedor?: string | null
          zona?: string | null
        }
        Relationships: []
      }
      facturas_proveedores_olo: {
        Row: {
          created_at: string
          descripcion: string | null
          fecha_factura: string | null
          id: number
          impuesto: number | null
          monto_factura: number | null
          numero_factura: string | null
          orden_compra: string | null
          proveedor: string | null
          usuario: string | null
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          orden_compra?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          orden_compra?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Relationships: []
      }
      facturas_pushmoney: {
        Row: {
          antiguedad: number
          ced_juridica_cliente: string
          created_at: string
          documento_adjunto: string
          empresa: string
          fecha_factura: string
          id: string
          monto_asignado: number
          numero_factura: string
          vendedor: string
        }
        Insert: {
          antiguedad: number
          ced_juridica_cliente: string
          created_at?: string
          documento_adjunto: string
          empresa: string
          fecha_factura: string
          id: string
          monto_asignado: number
          numero_factura: string
          vendedor: string
        }
        Update: {
          antiguedad?: number
          ced_juridica_cliente?: string
          created_at?: string
          documento_adjunto?: string
          empresa?: string
          fecha_factura?: string
          id?: string
          monto_asignado?: number
          numero_factura?: string
          vendedor?: string
        }
        Relationships: []
      }
      fichas: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      flujos: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      flujos_local: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      generated_posts: {
        Row: {
          created_at: string
          file_path: string
          file_type: string
          id: string
          title: string
          url: string | null
        }
        Insert: {
          created_at?: string
          file_path: string
          file_type: string
          id?: string
          title: string
          url?: string | null
        }
        Update: {
          created_at?: string
          file_path?: string
          file_type?: string
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      global_factors: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      importaciones_cofersa: {
        Row: {
          ADUANA: string | null
          AGENTE: string | null
          "CANTIDAD BULTOS": string | null
          "CANTIDAD PRODUCTO UNIDAD COMERCIAL": string | null
          "CANTIDAD UNIDAD COMERCIAL": number | null
          "CANTIDAD UNIDAD F�SICA": string | null
          "CONDICI�N DE VENTA FACTURA": string | null
          DECLARANTE: string | null
          "DESCRIPCI�N": string | null
          "DESCRIPCI�N ALMAC�N": string | null
          "DESCRIPCI�N DE LA POSICION": string | null
          DESPACHO: string | null
          "ESTADO MERCADER�A": string | null
          FACTURA: string | null
          "FACTURA NRO ENV�O": string | null
          "FACTURA VALOR FOB": string | null
          FECHA: string | null
          "FECHA EMBARQUE FACTURA": string | null
          ITEM: string | null
          "L�NEA FACTURA": number | null
          MARCA: string | null
          MEDIO: string | null
          MODALIDAD: string | null
          MODELO: string | null
          MONEDA: string | null
          "MONEDA FACTURA": string | null
          "MONTO FACTURA": string | null
          "OTROS GASTOS": string | null
          "PA�S DE ADQUISICI�N": string | null
          "PA�S DE ORIGEN": string | null
          "PA�S ENTREGA FACTURA": string | null
          "PESO BRUTO": string | null
          "PESO NETO": string | null
          "POSICI�N ARANCELARIA": string | null
          "PRECIO UNITARIO U$S": string | null
          precio_unidad_mercancia: string | null
          PROVEEDOR: string | null
          "PUERTO EMBARQUE": string | null
          "RUC DEL IMPORTADOR": string | null
          "R�GIMEN": string | null
          "TIPO AFORO": string | null
          "TIPO BULTO": string | null
          "TIPO CAMBIO": string | null
          "TIPO CAMBIO FACTURA": string | null
          "TIPO CAMBIO VENTA": string | null
          "TIPO CARGA": string | null
          "TIPO DUA": string | null
          "TIPO UNIDAD COMERCIAL": string | null
          "TIPO UNIDAD F�SICA": string | null
          "TOTAL FACTURAS": string | null
          "VALOR CIF U$S": string | null
          "VALOR FLETE U$S": string | null
          "VALOR FOB U$S": string | null
          "VALOR MEDIO PORTADOR": string | null
          "VALOR SEGURO U$S": string | null
        }
        Insert: {
          ADUANA?: string | null
          AGENTE?: string | null
          "CANTIDAD BULTOS"?: string | null
          "CANTIDAD PRODUCTO UNIDAD COMERCIAL"?: string | null
          "CANTIDAD UNIDAD COMERCIAL"?: number | null
          "CANTIDAD UNIDAD F�SICA"?: string | null
          "CONDICI�N DE VENTA FACTURA"?: string | null
          DECLARANTE?: string | null
          "DESCRIPCI�N"?: string | null
          "DESCRIPCI�N ALMAC�N"?: string | null
          "DESCRIPCI�N DE LA POSICION"?: string | null
          DESPACHO?: string | null
          "ESTADO MERCADER�A"?: string | null
          FACTURA?: string | null
          "FACTURA NRO ENV�O"?: string | null
          "FACTURA VALOR FOB"?: string | null
          FECHA?: string | null
          "FECHA EMBARQUE FACTURA"?: string | null
          ITEM?: string | null
          "L�NEA FACTURA"?: number | null
          MARCA?: string | null
          MEDIO?: string | null
          MODALIDAD?: string | null
          MODELO?: string | null
          MONEDA?: string | null
          "MONEDA FACTURA"?: string | null
          "MONTO FACTURA"?: string | null
          "OTROS GASTOS"?: string | null
          "PA�S DE ADQUISICI�N"?: string | null
          "PA�S DE ORIGEN"?: string | null
          "PA�S ENTREGA FACTURA"?: string | null
          "PESO BRUTO"?: string | null
          "PESO NETO"?: string | null
          "POSICI�N ARANCELARIA"?: string | null
          "PRECIO UNITARIO U$S"?: string | null
          precio_unidad_mercancia?: string | null
          PROVEEDOR?: string | null
          "PUERTO EMBARQUE"?: string | null
          "RUC DEL IMPORTADOR"?: string | null
          "R�GIMEN"?: string | null
          "TIPO AFORO"?: string | null
          "TIPO BULTO"?: string | null
          "TIPO CAMBIO"?: string | null
          "TIPO CAMBIO FACTURA"?: string | null
          "TIPO CAMBIO VENTA"?: string | null
          "TIPO CARGA"?: string | null
          "TIPO DUA"?: string | null
          "TIPO UNIDAD COMERCIAL"?: string | null
          "TIPO UNIDAD F�SICA"?: string | null
          "TOTAL FACTURAS"?: string | null
          "VALOR CIF U$S"?: string | null
          "VALOR FLETE U$S"?: string | null
          "VALOR FOB U$S"?: string | null
          "VALOR MEDIO PORTADOR"?: string | null
          "VALOR SEGURO U$S"?: string | null
        }
        Update: {
          ADUANA?: string | null
          AGENTE?: string | null
          "CANTIDAD BULTOS"?: string | null
          "CANTIDAD PRODUCTO UNIDAD COMERCIAL"?: string | null
          "CANTIDAD UNIDAD COMERCIAL"?: number | null
          "CANTIDAD UNIDAD F�SICA"?: string | null
          "CONDICI�N DE VENTA FACTURA"?: string | null
          DECLARANTE?: string | null
          "DESCRIPCI�N"?: string | null
          "DESCRIPCI�N ALMAC�N"?: string | null
          "DESCRIPCI�N DE LA POSICION"?: string | null
          DESPACHO?: string | null
          "ESTADO MERCADER�A"?: string | null
          FACTURA?: string | null
          "FACTURA NRO ENV�O"?: string | null
          "FACTURA VALOR FOB"?: string | null
          FECHA?: string | null
          "FECHA EMBARQUE FACTURA"?: string | null
          ITEM?: string | null
          "L�NEA FACTURA"?: number | null
          MARCA?: string | null
          MEDIO?: string | null
          MODALIDAD?: string | null
          MODELO?: string | null
          MONEDA?: string | null
          "MONEDA FACTURA"?: string | null
          "MONTO FACTURA"?: string | null
          "OTROS GASTOS"?: string | null
          "PA�S DE ADQUISICI�N"?: string | null
          "PA�S DE ORIGEN"?: string | null
          "PA�S ENTREGA FACTURA"?: string | null
          "PESO BRUTO"?: string | null
          "PESO NETO"?: string | null
          "POSICI�N ARANCELARIA"?: string | null
          "PRECIO UNITARIO U$S"?: string | null
          precio_unidad_mercancia?: string | null
          PROVEEDOR?: string | null
          "PUERTO EMBARQUE"?: string | null
          "RUC DEL IMPORTADOR"?: string | null
          "R�GIMEN"?: string | null
          "TIPO AFORO"?: string | null
          "TIPO BULTO"?: string | null
          "TIPO CAMBIO"?: string | null
          "TIPO CAMBIO FACTURA"?: string | null
          "TIPO CAMBIO VENTA"?: string | null
          "TIPO CARGA"?: string | null
          "TIPO DUA"?: string | null
          "TIPO UNIDAD COMERCIAL"?: string | null
          "TIPO UNIDAD F�SICA"?: string | null
          "TOTAL FACTURAS"?: string | null
          "VALOR CIF U$S"?: string | null
          "VALOR FLETE U$S"?: string | null
          "VALOR FOB U$S"?: string | null
          "VALOR MEDIO PORTADOR"?: string | null
          "VALOR SEGURO U$S"?: string | null
        }
        Relationships: []
      }
      imprenta_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      indice_documentos_aida: {
        Row: {
          empresa: string
          estatus: string
          fechaModificacion: string
          id: number
          link: string
          nombre: string
          silo: string
          tipoDoc: string
        }
        Insert: {
          empresa: string
          estatus: string
          fechaModificacion: string
          id?: number
          link: string
          nombre: string
          silo: string
          tipoDoc: string
        }
        Update: {
          empresa?: string
          estatus?: string
          fechaModificacion?: string
          id?: number
          link?: string
          nombre?: string
          silo?: string
          tipoDoc?: string
        }
        Relationships: []
      }
      indice_documentos_visual: {
        Row: {
          aprobadoPor: string | null
          empresa: string | null
          estatus: string | null
          fechaAprobacion: string | null
          fechaModificacion: string | null
          link: string
          nombre: string
          silo: string | null
          tipoDoc: string | null
        }
        Insert: {
          aprobadoPor?: string | null
          empresa?: string | null
          estatus?: string | null
          fechaAprobacion?: string | null
          fechaModificacion?: string | null
          link: string
          nombre: string
          silo?: string | null
          tipoDoc?: string | null
        }
        Update: {
          aprobadoPor?: string | null
          empresa?: string | null
          estatus?: string | null
          fechaAprobacion?: string | null
          fechaModificacion?: string | null
          link?: string
          nombre?: string
          silo?: string | null
          tipoDoc?: string | null
        }
        Relationships: []
      }
      info_categorizacion_epa: {
        Row: {
          categoria: string | null
          codigo_arancelario: string
          descripcion_larga: string | null
          familia: string | null
          linea: string | null
          nombre_categoria: string | null
          subfamilia: string | null
        }
        Insert: {
          categoria?: string | null
          codigo_arancelario: string
          descripcion_larga?: string | null
          familia?: string | null
          linea?: string | null
          nombre_categoria?: string | null
          subfamilia?: string | null
        }
        Update: {
          categoria?: string | null
          codigo_arancelario?: string
          descripcion_larga?: string | null
          familia?: string | null
          linea?: string | null
          nombre_categoria?: string | null
          subfamilia?: string | null
        }
        Relationships: []
      }
      instagram_posts: {
        Row: {
          campaign_id: string | null
          caption: string
          created_at: string
          id: string
          image_url: string
        }
        Insert: {
          campaign_id?: string | null
          caption: string
          created_at?: string
          id?: string
          image_url: string
        }
        Update: {
          campaign_id?: string | null
          caption?: string
          created_at?: string
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "instagram_posts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_grupo_marca: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_pushmoney: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories_viaticos: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      olo_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      opinions: {
        Row: {
          category: string | null
          content: string
          created_at: string
          department: string
          enviado: string
          id: string
          plan: string | null
          sentiment: string
          summary: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          department: string
          enviado?: string
          id?: string
          plan?: string | null
          sentiment?: string
          summary?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          department?: string
          enviado?: string
          id?: string
          plan?: string | null
          sentiment?: string
          summary?: string | null
        }
        Relationships: []
      }
      price_approval_items: {
        Row: {
          approval_request_id: string
          created_at: string
          current_price: number
          factors_applied: Json | null
          id: string
          new_price: number
          price_list_id: string
          product_id: string
        }
        Insert: {
          approval_request_id: string
          created_at?: string
          current_price: number
          factors_applied?: Json | null
          id?: string
          new_price: number
          price_list_id: string
          product_id: string
        }
        Update: {
          approval_request_id?: string
          created_at?: string
          current_price?: number
          factors_applied?: Json | null
          id?: string
          new_price?: number
          price_list_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_approval_items_approval_request_id_fkey"
            columns: ["approval_request_id"]
            isOneToOne: false
            referencedRelation: "price_approval_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_approval_items_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_approval_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      price_approval_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          id: string
          rejected_at: string | null
          rejection_reason: string | null
          request_type: string
          requested_by: string | null
          status: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          request_type?: string
          requested_by?: string | null
          status?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          id?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          request_type?: string
          requested_by?: string | null
          status?: string
        }
        Relationships: []
      }
      price_change_results: {
        Row: {
          change_percentage: number
          created_at: string
          current_price: number
          factors_applied: string[] | null
          id: string
          is_decrease: boolean
          new_price: number
          price_list_id: string
          product_id: string
        }
        Insert: {
          change_percentage: number
          created_at?: string
          current_price: number
          factors_applied?: string[] | null
          id?: string
          is_decrease?: boolean
          new_price: number
          price_list_id: string
          product_id: string
        }
        Update: {
          change_percentage?: number
          created_at?: string
          current_price?: number
          factors_applied?: string[] | null
          id?: string
          is_decrease?: boolean
          new_price?: number
          price_list_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_change_results_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_change_results_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      price_lists: {
        Row: {
          base_type: string
          based_on: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
          variation_percent: number | null
          zone_type: string | null
        }
        Insert: {
          base_type: string
          based_on?: string | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          variation_percent?: number | null
          zone_type?: string | null
        }
        Update: {
          base_type?: string
          based_on?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          variation_percent?: number | null
          zone_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_lists_based_on_fkey"
            columns: ["based_on"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      pricing_factors: {
        Row: {
          created_at: string
          id: string
          name: string
          operation: string
          scope: string
          type: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          operation: string
          scope: string
          type: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          operation?: string
          scope?: string
          type?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      pricing_products: {
        Row: {
          brand: string | null
          code: string
          cost: number
          created_at: string
          description: string
          factors: Json | null
          id: string
          imported: boolean
          margin: number
          origin: string | null
          supplier: string | null
          updated_at: string
        }
        Insert: {
          brand?: string | null
          code: string
          cost: number
          created_at?: string
          description: string
          factors?: Json | null
          id?: string
          imported?: boolean
          margin: number
          origin?: string | null
          supplier?: string | null
          updated_at?: string
        }
        Update: {
          brand?: string | null
          code?: string
          cost?: number
          created_at?: string
          description?: string
          factors?: Json | null
          id?: string
          imported?: boolean
          margin?: number
          origin?: string | null
          supplier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      product_factors: {
        Row: {
          created_at: string
          factor_id: string
          id: string
          product_id: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          factor_id: string
          id?: string
          product_id: string
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          factor_id?: string
          id?: string
          product_id?: string
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_factors_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "pricing_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_factors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "pricing_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      products: {
        Row: {
          ACTIVO: string | null
          ARTICULO: string
          category: string | null
          DESCRIPCION: string | null
          DISPONIBILIDAD: number | null
          EXISTENCIA: number | null
          FACTOR_EMPAQUE: number | null
          FACTOR_VENTA: number | null
          marca: string | null
          subcategory: string | null
          U_ORIGEN: string | null
          UNIDAD_EMPAQUE: string | null
          UNIDAD_VENTA: string | null
        }
        Insert: {
          ACTIVO?: string | null
          ARTICULO: string
          category?: string | null
          DESCRIPCION?: string | null
          DISPONIBILIDAD?: number | null
          EXISTENCIA?: number | null
          FACTOR_EMPAQUE?: number | null
          FACTOR_VENTA?: number | null
          marca?: string | null
          subcategory?: string | null
          U_ORIGEN?: string | null
          UNIDAD_EMPAQUE?: string | null
          UNIDAD_VENTA?: string | null
        }
        Update: {
          ACTIVO?: string | null
          ARTICULO?: string
          category?: string | null
          DESCRIPCION?: string | null
          DISPONIBILIDAD?: number | null
          EXISTENCIA?: number | null
          FACTOR_EMPAQUE?: number | null
          FACTOR_VENTA?: number | null
          marca?: string | null
          subcategory?: string | null
          U_ORIGEN?: string | null
          UNIDAD_EMPAQUE?: string | null
          UNIDAD_VENTA?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      recruitment_processes: {
        Row: {
          created_at: string
          google_drive_folder: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          google_drive_folder?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          google_drive_folder?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      reference_files: {
        Row: {
          campaign_id: string | null
          created_at: string
          file_path: string
          file_type: string
          id: string
          title: string
          url: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          file_path: string
          file_type: string
          id?: string
          title: string
          url?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          file_path?: string
          file_type?: string
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reference_files_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_venezuela: {
        Row: {
          cedula: string
          chat_id: string
          codigo: string | null
          correo: string
          empresa: string
          estado: string | null
          fecha_creacion: string
          id: number
          nombre: string
          rol: string
          telefono: string
        }
        Insert: {
          cedula: string
          chat_id: string
          codigo?: string | null
          correo: string
          empresa: string
          estado?: string | null
          fecha_creacion?: string
          id?: number
          nombre: string
          rol: string
          telefono: string
        }
        Update: {
          cedula?: string
          chat_id?: string
          codigo?: string | null
          correo?: string
          empresa?: string
          estado?: string | null
          fecha_creacion?: string
          id?: number
          nombre?: string
          rol?: string
          telefono?: string
        }
        Relationships: []
      }
      rutas: {
        Row: {
          DESCRIPCION: string | null
          FECHA_CREACION: string | null
          RUTA: string
        }
        Insert: {
          DESCRIPCION?: string | null
          FECHA_CREACION?: string | null
          RUTA: string
        }
        Update: {
          DESCRIPCION?: string | null
          FECHA_CREACION?: string | null
          RUTA?: string
        }
        Relationships: []
      }
      tabla_sillaca_gm: {
        Row: {
          Columnas: string | null
          Escala: string | null
          Longitud: string | null
          PermiteNulos: string | null
          Precision: string | null
          Tablas: string | null
          TipoDatos: string | null
        }
        Insert: {
          Columnas?: string | null
          Escala?: string | null
          Longitud?: string | null
          PermiteNulos?: string | null
          Precision?: string | null
          Tablas?: string | null
          TipoDatos?: string | null
        }
        Update: {
          Columnas?: string | null
          Escala?: string | null
          Longitud?: string | null
          PermiteNulos?: string | null
          Precision?: string | null
          Tablas?: string | null
          TipoDatos?: string | null
        }
        Relationships: []
      }
      ubicaciones_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      user_management: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_visual: {
        Row: {
          Administrador: boolean | null
          created_at: string
          department: string | null
          email: string
          encrypted_password: string | null
          full_name: string
          id: string
          is_active: boolean
          last_login: string | null
          role: string
          roles: string[] | null
          updated_at: string
          user_id: number
        }
        Insert: {
          Administrador?: boolean | null
          created_at?: string
          department?: string | null
          email: string
          encrypted_password?: string | null
          full_name: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          role?: string
          roles?: string[] | null
          updated_at?: string
          user_id?: number
        }
        Update: {
          Administrador?: boolean | null
          created_at?: string
          department?: string | null
          email?: string
          encrypted_password?: string | null
          full_name?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          role?: string
          roles?: string[] | null
          updated_at?: string
          user_id?: number
        }
        Relationships: []
      }
      user_visual_roles: {
        Row: {
          created_at: string
          description: string | null
          empresas: string[] | null
          id: string
          name: string
          silos: string[] | null
          tipos_doc: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          empresas?: string[] | null
          id?: string
          name: string
          silos?: string[] | null
          tipos_doc?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          empresas?: string[] | null
          id?: string
          name?: string
          silos?: string[] | null
          tipos_doc?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      ventas_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      viaticos_olo: {
        Row: {
          clasificacion: string | null
          created_at: string
          descripcion: string | null
          fecha_factura: string | null
          id: number
          impuesto: number | null
          monto_factura: number | null
          numero_factura: string | null
          proveedor: string | null
          usuario: string | null
        }
        Insert: {
          clasificacion?: string | null
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Update: {
          clasificacion?: string | null
          created_at?: string
          descripcion?: string | null
          fecha_factura?: string | null
          id?: number
          impuesto?: number | null
          monto_factura?: number | null
          numero_factura?: string | null
          proveedor?: string | null
          usuario?: string | null
        }
        Relationships: []
      }
      work_experience: {
        Row: {
          candidate_id: string
          company: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          position: string
          start_date: string | null
        }
        Insert: {
          candidate_id: string
          company: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position: string
          start_date?: string | null
        }
        Update: {
          candidate_id?: string
          company?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          position?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_experience_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      create_user_admin: {
        Args:
          | {
              p_email: string
              p_full_name: string
              p_password: string
              p_role: string
              p_department?: string
            }
          | {
              p_email: string
              p_full_name: string
              p_password: string
              p_role: string
              p_department?: string
              p_administrador?: boolean
            }
        Returns: string
      }
      get_all_management_users: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          email: string
          full_name: string
          role: string
          department: string
          permissions: string[]
          is_active: boolean
          is_approved: boolean
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_by_auth_id: {
        Args: { user_auth_id: string }
        Returns: {
          id: string
          email: string
          full_name: string
          role: string
          department: string
          permissions: string[]
          is_active: boolean
          is_approved: boolean
        }[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_articulos_beval: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_articulos_febeca: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_articulos_sillaca: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_beval: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_cofersa: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_febeca: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_clientes_sillaca: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_culture: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_culture2: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_aida: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_aida_test: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_logistica: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_mayoreo: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_olo: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_documentos_personal: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_errores_vectorizados: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_fichas: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_flujos: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_flujos_local: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_product_images: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_user_department: {
        Args: { user_id: string; new_department: string }
        Returns: boolean
      }
      update_user_role: {
        Args: { user_id: string; new_role: string }
        Returns: boolean
      }
      update_user_status: {
        Args: { user_id: string; field_name: string; field_value: boolean }
        Returns: boolean
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      permission_type: "read" | "write" | "admin"
      user_role:
        | "compras"
        | "gerente"
        | "supervisor"
        | "admin"
        | "responsable_comercial"
        | "usuario"
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
  public: {
    Enums: {
      permission_type: ["read", "write", "admin"],
      user_role: [
        "compras",
        "gerente",
        "supervisor",
        "admin",
        "responsable_comercial",
        "usuario",
      ],
    },
  },
} as const
