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
      campaigns: {
        Row: {
          brand_id: string
          created_at: string
          description: string | null
          id: string
          status: string
          title: string
          updated_at: string
          webhook_response: Json | null
        }
        Insert: {
          brand_id: string
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          title: string
          updated_at?: string
          webhook_response?: Json | null
        }
        Update: {
          brand_id?: string
          created_at?: string
          description?: string | null
          id?: string
          status?: string
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
      devolucion_lineas: {
        Row: {
          description: string | null
          id: number
          invoice_number: number
          novedad: boolean | null
          price: number | null
          product_id: number
          quantity: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          invoice_number: number
          novedad?: boolean | null
          price?: number | null
          product_id: number
          quantity?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          invoice_number?: number
          novedad?: boolean | null
          price?: number | null
          product_id?: number
          quantity?: number | null
        }
        Relationships: []
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
      documentos_aida_test: {
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
      facturas_2021: {
        Row: {
          cliente: string | null
          division_geografica1: string | null
          division_geografica2: string | null
          FACTURA: string
          FECHA: string | null
          PEDIDO: string | null
          RUTA: string | null
          ZONA: string | null
        }
        Insert: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA: string
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: string | null
        }
        Update: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA?: string
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: string | null
        }
        Relationships: []
      }
      facturas_2022: {
        Row: {
          cliente: string | null
          division_geografica1: string | null
          division_geografica2: string | null
          FACTURA: string
          FECHA: string | null
          PEDIDO: string | null
          RUTA: string | null
          ZONA: number | null
        }
        Insert: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA: string
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: number | null
        }
        Update: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA?: string
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: number | null
        }
        Relationships: []
      }
      facturas_2023: {
        Row: {
          cliente: string | null
          division_geografica1: string | null
          division_geografica2: string | null
          FACTURA: string
          FECHA: string | null
          PEDIDO: string | null
          RUTA: string | null
          ZONA: string | null
        }
        Insert: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA: string
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: string | null
        }
        Update: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA?: string
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: string | null
        }
        Relationships: []
      }
      facturas_2024: {
        Row: {
          cliente: string | null
          division_geografica1: string | null
          division_geografica2: string | null
          FACTURA: string | null
          FECHA: string | null
          PEDIDO: string | null
          RUTA: string | null
          ZONA: string | null
        }
        Insert: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA?: string | null
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: string | null
        }
        Update: {
          cliente?: string | null
          division_geografica1?: string | null
          division_geografica2?: string | null
          FACTURA?: string | null
          FECHA?: string | null
          PEDIDO?: string | null
          RUTA?: string | null
          ZONA?: string | null
        }
        Relationships: []
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
      indice_documentos_aida: {
        Row: {
          empresa: string | null
          estatus: string | null
          fechaModificacion: string | null
          id: number
          link: string | null
          nombre: string | null
          silo: string | null
          tipoDoc: string | null
        }
        Insert: {
          empresa?: string | null
          estatus?: string | null
          fechaModificacion?: string | null
          id?: number
          link?: string | null
          nombre?: string | null
          silo?: string | null
          tipoDoc?: string | null
        }
        Update: {
          empresa?: string | null
          estatus?: string | null
          fechaModificacion?: string | null
          id?: number
          link?: string | null
          nombre?: string | null
          silo?: string | null
          tipoDoc?: string | null
        }
        Relationships: []
      }
      indice_documentos_aida_test: {
        Row: {
          empresa: string | null
          estatus: string | null
          fechaModificacion: string | null
          id: number
          link: string | null
          nombre: string | null
          silo: string | null
          tipoDoc: string | null
        }
        Insert: {
          empresa?: string | null
          estatus?: string | null
          fechaModificacion?: string | null
          id?: number
          link?: string | null
          nombre?: string | null
          silo?: string | null
          tipoDoc?: string | null
        }
        Update: {
          empresa?: string | null
          estatus?: string | null
          fechaModificacion?: string | null
          id?: number
          link?: string | null
          nombre?: string | null
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
      lineas_factura: {
        Row: {
          invoice_number: string | null
          price: number | null
          product_description: string | null
          product_id: string | null
          quantity: number | null
          subtotal: number | null
        }
        Insert: {
          invoice_number?: string | null
          price?: number | null
          product_description?: string | null
          product_id?: string | null
          quantity?: number | null
          subtotal?: number | null
        }
        Update: {
          invoice_number?: string | null
          price?: number | null
          product_description?: string | null
          product_id?: string | null
          quantity?: number | null
          subtotal?: number | null
        }
        Relationships: []
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
      reference_files: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
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
      match_fichas: {
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
      match_products_sillaca: {
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
