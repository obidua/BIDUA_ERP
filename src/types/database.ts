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
          company_size: string
          subscription_plan: string
          subscription_status: string
          logo_url: string | null
          primary_color: string
          currency: string
          timezone: string
          country: string
          tax_id: string | null
          address: Json
          contact_info: Json
          enabled_modules: Json
          settings: Json
          trial_ends_at: string | null
          subscription_ends_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
      }
      users: {
        Row: {
          id: string
          company_id: string
          employee_id: string | null
          username: string
          full_name: string
          email: string
          phone: string | null
          avatar_url: string | null
          role: string
          department_id: string | null
          designation: string | null
          manager_id: string | null
          date_of_birth: string | null
          gender: string | null
          address: Json
          emergency_contact: Json
          joining_date: string
          employment_type: string
          is_active: boolean
          last_login: string | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      departments: {
        Row: {
          id: string
          company_id: string
          name: string
          code: string | null
          head_id: string | null
          parent_department_id: string | null
          description: string | null
          cost_center: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['departments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['departments']['Insert']>
      }
      crm_leads: {
        Row: {
          id: string
          company_id: string
          lead_number: string | null
          first_name: string
          last_name: string | null
          email: string | null
          phone: string | null
          company_name: string | null
          job_title: string | null
          industry: string | null
          lead_source: string | null
          lead_status: string
          lead_score: number
          temperature: string
          assigned_to: string | null
          website: string | null
          linkedin_url: string | null
          address: Json
          estimated_value: number | null
          estimated_close_date: string | null
          notes: string | null
          campaign_id: string | null
          converted_to_customer_id: string | null
          converted_at: string | null
          last_contacted_at: string | null
          next_follow_up_at: string | null
          tags: string[] | null
          custom_fields: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['crm_leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['crm_leads']['Insert']>
      }
      crm_customers: {
        Row: {
          id: string
          company_id: string
          customer_number: string | null
          customer_name: string
          customer_type: string
          industry: string | null
          website: string | null
          email: string | null
          phone: string | null
          billing_address: Json
          shipping_address: Json
          tax_id: string | null
          payment_terms: string | null
          credit_limit: number | null
          account_manager_id: string | null
          parent_customer_id: string | null
          customer_status: string
          tier: string | null
          lifetime_value: number
          total_revenue: number
          total_orders: number
          first_purchase_date: string | null
          last_purchase_date: string | null
          tags: string[] | null
          notes: string | null
          custom_fields: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['crm_customers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['crm_customers']['Insert']>
      }
      crm_deals: {
        Row: {
          id: string
          company_id: string
          deal_number: string | null
          deal_name: string
          customer_id: string | null
          lead_id: string | null
          deal_stage: string
          deal_value: number
          probability: number
          expected_close_date: string | null
          actual_close_date: string | null
          deal_owner_id: string | null
          deal_type: string | null
          pipeline_stage: string | null
          lead_source: string | null
          loss_reason: string | null
          competitors: string[] | null
          description: string | null
          notes: string | null
          tags: string[] | null
          custom_fields: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['crm_deals']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['crm_deals']['Insert']>
      }
      crm_support_tickets: {
        Row: {
          id: string
          company_id: string
          ticket_number: string | null
          subject: string
          description: string
          customer_id: string | null
          contact_id: string | null
          ticket_type: string | null
          priority: string
          ticket_status: string
          assigned_to: string | null
          assigned_team: string | null
          channel: string | null
          sla_due_date: string | null
          first_response_at: string | null
          resolved_at: string | null
          closed_at: string | null
          resolution_notes: string | null
          satisfaction_rating: number | null
          satisfaction_comment: string | null
          tags: string[] | null
          attachments: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['crm_support_tickets']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['crm_support_tickets']['Insert']>
      }
      hrms_employees: {
        Row: {
          id: string
          user_id: string
          company_id: string
          personal_email: string | null
          marital_status: string | null
          nationality: string | null
          blood_group: string | null
          identification_number: string | null
          passport_number: string | null
          passport_expiry: string | null
          work_permit_number: string | null
          work_permit_expiry: string | null
          bank_account_number: string | null
          bank_name: string | null
          bank_ifsc_code: string | null
          bank_branch: string | null
          pan_number: string | null
          aadhar_number: string | null
          pf_number: string | null
          esi_number: string | null
          uan_number: string | null
          previous_employment: Json
          education: Json
          certifications: Json
          skills: string[] | null
          languages: string[] | null
          hobbies: string[] | null
          probation_end_date: string | null
          confirmation_date: string | null
          resignation_date: string | null
          last_working_date: string | null
          exit_reason: string | null
          exit_interview_notes: string | null
          rehire_eligible: boolean
          custom_fields: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['hrms_employees']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['hrms_employees']['Insert']>
      }
      hrms_attendance: {
        Row: {
          id: string
          company_id: string
          employee_id: string
          attendance_date: string
          shift_id: string | null
          clock_in_time: string | null
          clock_out_time: string | null
          clock_in_location: string | null
          clock_out_location: string | null
          clock_in_coordinates: string | null
          clock_out_coordinates: string | null
          is_within_geofence: boolean | null
          work_duration_minutes: number | null
          break_duration_minutes: number
          overtime_minutes: number
          attendance_status: string
          late_by_minutes: number
          early_departure_minutes: number
          notes: string | null
          approved_by: string | null
          approved_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['hrms_attendance']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['hrms_attendance']['Insert']>
      }
      hrms_leaves: {
        Row: {
          id: string
          company_id: string
          employee_id: string
          leave_type_id: string
          start_date: string
          end_date: string
          days_count: number
          half_day: boolean
          half_day_period: string | null
          reason: string
          leave_status: string
          applied_at: string
          approved_by: string | null
          approved_at: string | null
          rejection_reason: string | null
          attachment_url: string | null
          delegate_to: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['hrms_leaves']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['hrms_leaves']['Insert']>
      }
      hrms_payroll: {
        Row: {
          id: string
          company_id: string
          employee_id: string
          pay_period_start: string
          pay_period_end: string
          payment_date: string | null
          basic_salary: number
          gross_salary: number
          total_earnings: number
          total_deductions: number
          net_salary: number
          earnings_breakdown: Json
          deductions_breakdown: Json
          days_worked: number | null
          days_in_month: number | null
          leaves_taken: number | null
          overtime_hours: number | null
          overtime_amount: number
          bonus_amount: number
          payroll_status: string
          payment_method: string | null
          payment_reference: string | null
          notes: string | null
          processed_by: string | null
          approved_by: string | null
          approved_at: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['hrms_payroll']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['hrms_payroll']['Insert']>
      }
      pm_projects: {
        Row: {
          id: string
          company_id: string
          project_code: string
          project_name: string
          project_type: string | null
          description: string | null
          client_id: string | null
          project_manager_id: string | null
          department_id: string | null
          start_date: string | null
          target_end_date: string | null
          actual_end_date: string | null
          project_status: string
          priority: string
          budget_amount: number | null
          actual_cost: number
          billing_type: string | null
          hourly_rate: number | null
          estimated_hours: number | null
          actual_hours: number
          progress_percentage: number
          methodology: string | null
          repository_url: string | null
          documentation_url: string | null
          tags: string[] | null
          custom_fields: Json
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pm_projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pm_projects']['Insert']>
      }
      pm_tasks: {
        Row: {
          id: string
          company_id: string
          project_id: string
          task_number: string | null
          task_title: string
          description: string | null
          task_type: string | null
          parent_task_id: string | null
          milestone_id: string | null
          sprint_id: string | null
          assigned_to: string | null
          reported_by: string | null
          priority: string
          task_status: string
          start_date: string | null
          due_date: string | null
          completion_date: string | null
          estimated_hours: number | null
          actual_hours: number
          story_points: number | null
          progress_percentage: number
          dependencies: string[] | null
          blocked_reason: string | null
          tags: string[] | null
          watchers: string[] | null
          custom_fields: Json
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pm_tasks']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pm_tasks']['Insert']>
      }
      mfg_products: {
        Row: {
          id: string
          company_id: string
          product_code: string
          product_name: string
          product_type: string | null
          category: string | null
          subcategory: string | null
          description: string | null
          specifications: Json
          unit_of_measure: string
          alternate_units: Json
          hsn_code: string | null
          barcode: string | null
          sku: string | null
          is_sellable: boolean
          is_purchasable: boolean
          is_manufactured: boolean
          reorder_level: number
          reorder_quantity: number
          lead_time_days: number
          shelf_life_days: number | null
          storage_conditions: string | null
          weight: number | null
          weight_unit: string
          dimensions: Json
          cost_price: number | null
          selling_price: number | null
          tax_rate: number | null
          brand: string | null
          manufacturer: string | null
          image_url: string | null
          drawing_url: string | null
          datasheet_url: string | null
          tags: string[] | null
          is_active: boolean
          custom_fields: Json
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['mfg_products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['mfg_products']['Insert']>
      }
      fin_invoices: {
        Row: {
          id: string
          company_id: string
          invoice_number: string | null
          invoice_date: string
          due_date: string | null
          customer_id: string
          billing_address: Json
          shipping_address: Json
          project_id: string | null
          quote_id: string | null
          invoice_status: string
          subtotal: number
          discount_amount: number
          tax_amount: number
          total_amount: number
          paid_amount: number
          currency: string
          exchange_rate: number
          payment_terms: string | null
          notes: string | null
          terms_and_conditions: string | null
          sent_at: string | null
          journal_entry_id: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['fin_invoices']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['fin_invoices']['Insert']>
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
