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
      companies: {
        Row: {
          id: string
          name: string
          industry_type: string
          active_modules: string[]
          subscription_tier: string
          created_at: string
          updated_at: string
          settings: Json
        }
        Insert: {
          id?: string
          name: string
          industry_type: string
          active_modules?: string[]
          subscription_tier?: string
          created_at?: string
          updated_at?: string
          settings?: Json
        }
        Update: {
          id?: string
          name?: string
          industry_type?: string
          active_modules?: string[]
          subscription_tier?: string
          created_at?: string
          updated_at?: string
          settings?: Json
        }
      }
      users: {
        Row: {
          id: string
          company_id: string
          email: string
          username: string
          full_name: string
          role: string
          department: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          email: string
          username: string
          full_name: string
          role?: string
          department?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          email?: string
          username?: string
          full_name?: string
          role?: string
          department?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      production_orders: {
        Row: {
          id: string
          company_id: string
          order_number: string
          product_name: string
          quantity: number
          unit: string
          status: string
          priority: string
          planned_start_date: string
          planned_end_date: string
          actual_start_date: string | null
          actual_end_date: string | null
          assigned_line: string
          notes: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          order_number: string
          product_name: string
          quantity: number
          unit?: string
          status?: string
          priority?: string
          planned_start_date: string
          planned_end_date: string
          actual_start_date?: string | null
          actual_end_date?: string | null
          assigned_line: string
          notes?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          order_number?: string
          product_name?: string
          quantity?: number
          unit?: string
          status?: string
          priority?: string
          planned_start_date?: string
          planned_end_date?: string
          actual_start_date?: string | null
          actual_end_date?: string | null
          assigned_line?: string
          notes?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      bom_items: {
        Row: {
          id: string
          company_id: string
          product_name: string
          component_name: string
          quantity: number
          unit: string
          cost_per_unit: number
          supplier: string
          lead_time_days: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          product_name: string
          component_name: string
          quantity: number
          unit?: string
          cost_per_unit: number
          supplier: string
          lead_time_days?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          product_name?: string
          component_name?: string
          quantity?: number
          unit?: string
          cost_per_unit?: number
          supplier?: string
          lead_time_days?: number
          created_at?: string
          updated_at?: string
        }
      }
      inventory_items: {
        Row: {
          id: string
          company_id: string
          item_name: string
          item_code: string
          category: string
          quantity: number
          unit: string
          reorder_level: number
          location: string
          supplier: string
          cost_per_unit: number
          last_restock_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          item_name: string
          item_code: string
          category: string
          quantity: number
          unit?: string
          reorder_level?: number
          location: string
          supplier: string
          cost_per_unit: number
          last_restock_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          item_name?: string
          item_code?: string
          category?: string
          quantity?: number
          unit?: string
          reorder_level?: number
          location?: string
          supplier?: string
          cost_per_unit?: number
          last_restock_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      quality_inspections: {
        Row: {
          id: string
          company_id: string
          production_order_id: string
          inspector_name: string
          inspection_date: string
          status: string
          defects_found: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          production_order_id: string
          inspector_name: string
          inspection_date: string
          status?: string
          defects_found?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          production_order_id?: string
          inspector_name?: string
          inspection_date?: string
          status?: string
          defects_found?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
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
