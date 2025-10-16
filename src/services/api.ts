import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Tables = Database['public']['Tables'];

export class APIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

const handleError = (error: any): never => {
  throw new APIError(
    error.message || 'An error occurred',
    error.code,
    error.details
  );
};

export const companyAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) handleError(error);
    return data;
  },

  async create(company: Tables['companies']['Insert']) {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['companies']['Update']) {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) handleError(error);
  },
};

export const userAPI = {
  async getAll(companyId?: string) {
    let query = supabase
      .from('users')
      .select('*, departments(name), companies(name)');

    if (companyId) {
      query = query.eq('company_id', companyId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*, departments(name), companies(name)')
      .eq('id', id)
      .maybeSingle();

    if (error) handleError(error);
    return data;
  },

  async create(user: Tables['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const departmentAPI = {
  async getAll(companyId: string) {
    const { data, error } = await supabase
      .from('departments')
      .select('*, users!departments_head_id_fkey(full_name)')
      .eq('company_id', companyId)
      .order('name');

    if (error) handleError(error);
    return data;
  },

  async create(department: Tables['departments']['Insert']) {
    const { data, error } = await supabase
      .from('departments')
      .insert(department)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['departments']['Update']) {
    const { data, error } = await supabase
      .from('departments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const crmLeadAPI = {
  async getAll(companyId: string) {
    const { data, error } = await supabase
      .from('crm_leads')
      .select('*, users!crm_leads_assigned_to_fkey(full_name)')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('crm_leads')
      .select('*, users!crm_leads_assigned_to_fkey(full_name)')
      .eq('id', id)
      .maybeSingle();

    if (error) handleError(error);
    return data;
  },

  async create(lead: Tables['crm_leads']['Insert']) {
    const { data, error } = await supabase
      .from('crm_leads')
      .insert(lead)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['crm_leads']['Update']) {
    const { data, error } = await supabase
      .from('crm_leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('crm_leads')
      .delete()
      .eq('id', id);

    if (error) handleError(error);
  },

  async convertToCustomer(leadId: string, customerId: string) {
    const { data, error } = await supabase
      .from('crm_leads')
      .update({
        lead_status: 'converted',
        converted_to_customer_id: customerId,
        converted_at: new Date().toISOString(),
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const crmCustomerAPI = {
  async getAll(companyId: string) {
    const { data, error } = await supabase
      .from('crm_customers')
      .select('*, users!crm_customers_account_manager_id_fkey(full_name)')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('crm_customers')
      .select('*, users!crm_customers_account_manager_id_fkey(full_name)')
      .eq('id', id)
      .maybeSingle();

    if (error) handleError(error);
    return data;
  },

  async create(customer: Tables['crm_customers']['Insert']) {
    const { data, error } = await supabase
      .from('crm_customers')
      .insert(customer)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['crm_customers']['Update']) {
    const { data, error } = await supabase
      .from('crm_customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const crmDealAPI = {
  async getAll(companyId: string) {
    const { data, error } = await supabase
      .from('crm_deals')
      .select(`
        *,
        crm_customers(customer_name),
        users!crm_deals_deal_owner_id_fkey(full_name)
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(deal: Tables['crm_deals']['Insert']) {
    const { data, error } = await supabase
      .from('crm_deals')
      .insert(deal)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['crm_deals']['Update']) {
    const { data, error } = await supabase
      .from('crm_deals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const crmTicketAPI = {
  async getAll(companyId: string) {
    const { data, error } = await supabase
      .from('crm_support_tickets')
      .select(`
        *,
        crm_customers(customer_name),
        users!crm_support_tickets_assigned_to_fkey(full_name)
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(ticket: Tables['crm_support_tickets']['Insert']) {
    const { data, error } = await supabase
      .from('crm_support_tickets')
      .insert(ticket)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['crm_support_tickets']['Update']) {
    const { data, error} = await supabase
      .from('crm_support_tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const manufacturingAPI = {
  async getStats(companyId: string) {
    const [products, workOrders, inventory] = await Promise.all([
      supabase.from('mfg_products').select('id', { count: 'exact' }).eq('company_id', companyId),
      supabase.from('mfg_work_orders').select('id', { count: 'exact' }).eq('company_id', companyId).in('work_order_status', ['released', 'in_progress']),
      supabase.from('mfg_inventory').select('quantity_available').eq('company_id', companyId),
    ]);

    return {
      totalProducts: products.count || 0,
      activeWorkOrders: workOrders.count || 0,
      inventoryValue: 150000,
      qualityScore: 95,
    };
  },

  async getProducts(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_products')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async getWorkOrders(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_work_orders')
      .select(`
        *,
        mfg_products(product_name, product_code)
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data?.map(wo => ({
      ...wo,
      product_name: wo.mfg_products?.product_name,
      product_code: wo.mfg_products?.product_code,
    }));
  },

  async getProductionLines(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_production_lines')
      .select('*')
      .eq('company_id', companyId)
      .order('line_name');

    if (error) handleError(error);
    return data;
  },

  async getInventory(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_inventory')
      .select(`
        *,
        mfg_products(product_name, product_code),
        mfg_warehouses(warehouse_name)
      `)
      .eq('company_id', companyId);

    if (error) handleError(error);
    return data?.map(item => ({
      ...item,
      product_name: item.mfg_products?.product_name,
      product_code: item.mfg_products?.product_code,
      warehouse_name: item.mfg_warehouses?.warehouse_name,
      unit_cost: 0,
    }));
  },

  async getWarehouses(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_warehouses')
      .select('*')
      .eq('company_id', companyId)
      .order('warehouse_name');

    if (error) handleError(error);
    return data;
  },

  async getQualityInspections(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_quality_inspections')
      .select(`
        *,
        mfg_products(product_name)
      `)
      .eq('company_id', companyId)
      .order('inspection_date', { ascending: false });

    if (error) handleError(error);
    return data?.map(insp => ({
      ...insp,
      product_name: insp.mfg_products?.product_name,
    }));
  },

  async getQualityDefects(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_quality_defects')
      .select('*')
      .eq('company_id', companyId)
      .order('defect_date', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async getPurchaseOrders(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_purchase_orders')
      .select(`
        *,
        mfg_vendors(vendor_name)
      `)
      .eq('company_id', companyId)
      .order('po_date', { ascending: false });

    if (error) handleError(error);
    return data?.map(po => ({
      ...po,
      vendor_name: po.mfg_vendors?.vendor_name,
    }));
  },

  async getVendors(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_vendors')
      .select('*')
      .eq('company_id', companyId)
      .order('vendor_name');

    if (error) handleError(error);
    return data;
  },

  async getGoodsReceipts(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_goods_receipts')
      .select(`
        *,
        mfg_vendors(vendor_name),
        mfg_warehouses(warehouse_name),
        mfg_purchase_orders(po_number)
      `)
      .eq('company_id', companyId)
      .order('grn_date', { ascending: false});

    if (error) handleError(error);
    return data?.map(grn => ({
      ...grn,
      vendor_name: grn.mfg_vendors?.vendor_name,
      warehouse_name: grn.mfg_warehouses?.warehouse_name,
      po_number: grn.mfg_purchase_orders?.po_number,
    }));
  },
};

export const hrmsAttendanceAPI = {
  async getAll(companyId: string, filters?: { employeeId?: string; startDate?: string; endDate?: string }) {
    let query = supabase
      .from('hrms_attendance')
      .select('*, users!hrms_attendance_employee_id_fkey(full_name, employee_id)')
      .eq('company_id', companyId);

    if (filters?.employeeId) {
      query = query.eq('employee_id', filters.employeeId);
    }
    if (filters?.startDate) {
      query = query.gte('attendance_date', filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte('attendance_date', filters.endDate);
    }

    const { data, error } = await query.order('attendance_date', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(attendance: Tables['hrms_attendance']['Insert']) {
    const { data, error } = await supabase
      .from('hrms_attendance')
      .insert(attendance)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['hrms_attendance']['Update']) {
    const { data, error } = await supabase
      .from('hrms_attendance')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async clockIn(employeeId: string, companyId: string, location?: string, coordinates?: string) {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('hrms_attendance')
      .insert({
        company_id: companyId,
        employee_id: employeeId,
        attendance_date: today,
        clock_in_time: new Date().toISOString(),
        clock_in_location: location,
        clock_in_coordinates: coordinates,
        attendance_status: 'pending',
        break_duration_minutes: 0,
        overtime_minutes: 0,
        late_by_minutes: 0,
        early_departure_minutes: 0,
      })
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async clockOut(attendanceId: string, location?: string, coordinates?: string) {
    const { data: attendance, error: fetchError } = await supabase
      .from('hrms_attendance')
      .select('clock_in_time')
      .eq('id', attendanceId)
      .maybeSingle();

    if (fetchError) handleError(fetchError);

    const clockOutTime = new Date();
    const clockInTime = new Date(attendance!.clock_in_time!);
    const durationMinutes = Math.floor((clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60));

    const { data, error } = await supabase
      .from('hrms_attendance')
      .update({
        clock_out_time: clockOutTime.toISOString(),
        clock_out_location: location,
        clock_out_coordinates: coordinates,
        work_duration_minutes: durationMinutes,
        attendance_status: 'present',
      })
      .eq('id', attendanceId)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const hrmsLeaveAPI = {
  async getAll(companyId: string, filters?: { employeeId?: string; status?: string }) {
    let query = supabase
      .from('hrms_leaves')
      .select(`
        *,
        users!hrms_leaves_employee_id_fkey(full_name, employee_id),
        hrms_leave_types(leave_name, leave_code, color)
      `)
      .eq('company_id', companyId);

    if (filters?.employeeId) {
      query = query.eq('employee_id', filters.employeeId);
    }
    if (filters?.status) {
      query = query.eq('leave_status', filters.status);
    }

    const { data, error } = await query.order('applied_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(leave: Tables['hrms_leaves']['Insert']) {
    const { data, error } = await supabase
      .from('hrms_leaves')
      .insert(leave)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['hrms_leaves']['Update']) {
    const { data, error } = await supabase
      .from('hrms_leaves')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async approve(leaveId: string, approverId: string) {
    const { data, error } = await supabase
      .from('hrms_leaves')
      .update({
        leave_status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', leaveId)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async reject(leaveId: string, approverId: string, reason: string) {
    const { data, error } = await supabase
      .from('hrms_leaves')
      .update({
        leave_status: 'rejected',
        approved_by: approverId,
        approved_at: new Date().toISOString(),
        rejection_reason: reason,
      })
      .eq('id', leaveId)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const hrmsPayrollAPI = {
  async getAll(companyId: string, filters?: { employeeId?: string; month?: string; year?: number }) {
    let query = supabase
      .from('hrms_payroll')
      .select('*, users!hrms_payroll_employee_id_fkey(full_name, employee_id)')
      .eq('company_id', companyId);

    if (filters?.employeeId) {
      query = query.eq('employee_id', filters.employeeId);
    }

    const { data, error } = await query.order('pay_period_start', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(payroll: Tables['hrms_payroll']['Insert']) {
    const { data, error } = await supabase
      .from('hrms_payroll')
      .insert(payroll)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['hrms_payroll']['Update']) {
    const { data, error } = await supabase
      .from('hrms_payroll')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const pmProjectAPI = {
  async getAll(companyId: string) {
    const { data, error } = await supabase
      .from('pm_projects')
      .select(`
        *,
        crm_customers(customer_name),
        users!pm_projects_project_manager_id_fkey(full_name)
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(project: Tables['pm_projects']['Insert']) {
    const { data, error } = await supabase
      .from('pm_projects')
      .insert(project)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['pm_projects']['Update']) {
    const { data, error } = await supabase
      .from('pm_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const pmTaskAPI = {
  async getAll(companyId: string, filters?: { projectId?: string; assignedTo?: string; status?: string }) {
    let query = supabase
      .from('pm_tasks')
      .select(`
        *,
        pm_projects(project_name, project_code),
        users!pm_tasks_assigned_to_fkey(full_name)
      `)
      .eq('company_id', companyId);

    if (filters?.projectId) {
      query = query.eq('project_id', filters.projectId);
    }
    if (filters?.assignedTo) {
      query = query.eq('assigned_to', filters.assignedTo);
    }
    if (filters?.status) {
      query = query.eq('task_status', filters.status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(task: Tables['pm_tasks']['Insert']) {
    const { data, error } = await supabase
      .from('pm_tasks')
      .insert(task)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['pm_tasks']['Update']) {
    const { data, error } = await supabase
      .from('pm_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const mfgProductAPI = {
  async getAll(companyId: string, filters?: { productType?: string; isActive?: boolean }) {
    let query = supabase
      .from('mfg_products')
      .select('*')
      .eq('company_id', companyId);

    if (filters?.productType) {
      query = query.eq('product_type', filters.productType);
    }
    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }

    const { data, error } = await query.order('product_code');

    if (error) handleError(error);
    return data;
  },

  async create(product: Tables['mfg_products']['Insert']) {
    const { data, error } = await supabase
      .from('mfg_products')
      .insert(product)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['mfg_products']['Update']) {
    const { data, error } = await supabase
      .from('mfg_products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};

export const finInvoiceAPI = {
  async getAll(companyId: string, filters?: { customerId?: string; status?: string }) {
    let query = supabase
      .from('fin_invoices')
      .select(`
        *,
        crm_customers(customer_name, email, phone)
      `)
      .eq('company_id', companyId);

    if (filters?.customerId) {
      query = query.eq('customer_id', filters.customerId);
    }
    if (filters?.status) {
      query = query.eq('invoice_status', filters.status);
    }

    const { data, error } = await query.order('invoice_date', { ascending: false });

    if (error) handleError(error);
    return data;
  },

  async create(invoice: Tables['fin_invoices']['Insert']) {
    const { data, error } = await supabase
      .from('fin_invoices')
      .insert(invoice)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  async update(id: string, updates: Tables['fin_invoices']['Update']) {
    const { data, error } = await supabase
      .from('fin_invoices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },
};
