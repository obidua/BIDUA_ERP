import { supabase } from '../lib/supabase';

export interface WorkOrder {
  id?: string;
  company_id: string;
  work_order_number: string;
  product_id: string;
  quantity_to_produce: number;
  status?: string;
  priority?: string;
  scheduled_start_date: string;
  scheduled_end_date: string;
  actual_start_date?: string | null;
  actual_end_date?: string | null;
  production_line_id?: string | null;
  notes?: string | null;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id?: string;
  company_id: string;
  product_code: string;
  product_name: string;
  category: string;
  unit_of_measure: string;
  production_time_minutes?: number;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BOMItem {
  id?: string;
  company_id: string;
  bom_id: string;
  item_type: string;
  item_id: string;
  quantity_required: number;
  unit_of_measure: string;
  waste_percentage?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BOM {
  id?: string;
  company_id: string;
  product_id: string;
  version: string;
  is_active?: boolean;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface InventoryItem {
  id?: string;
  company_id: string;
  warehouse_id: string;
  item_type: string;
  item_id: string;
  quantity_on_hand: number;
  reserved_quantity?: number;
  reorder_level?: number;
  reorder_quantity?: number;
  last_restock_date?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface QualityInspection {
  id?: string;
  company_id: string;
  work_order_id: string;
  quality_standard_id?: string | null;
  inspection_date: string;
  inspector_id: string;
  status?: string;
  overall_result?: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const manufacturingService = {
  // Work Orders
  async createWorkOrder(workOrder: WorkOrder) {
    const { data, error } = await supabase
      .from('mfg_work_orders')
      .insert(workOrder)
      .select('*, mfg_products(*), mfg_production_lines(*), users!mfg_work_orders_created_by_fkey(*)')
      .single();

    if (error) throw error;
    return data;
  },

  async getWorkOrders(companyId: string, filters?: { status?: string; priority?: string }) {
    let query = supabase
      .from('mfg_work_orders')
      .select('*, mfg_products(*), mfg_production_lines(*), users!mfg_work_orders_created_by_fkey(*)')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getWorkOrder(workOrderId: string) {
    const { data, error } = await supabase
      .from('mfg_work_orders')
      .select('*, mfg_products(*), mfg_production_lines(*), users!mfg_work_orders_created_by_fkey(*)')
      .eq('id', workOrderId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateWorkOrder(workOrderId: string, updates: Partial<WorkOrder>) {
    const { data, error } = await supabase
      .from('mfg_work_orders')
      .update(updates)
      .eq('id', workOrderId)
      .select('*, mfg_products(*), mfg_production_lines(*)')
      .single();

    if (error) throw error;
    return data;
  },

  async deleteWorkOrder(workOrderId: string) {
    const { error } = await supabase
      .from('mfg_work_orders')
      .delete()
      .eq('id', workOrderId);

    if (error) throw error;
  },

  // Products
  async createProduct(product: Product) {
    const { data, error } = await supabase
      .from('mfg_products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getProducts(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_products')
      .select('*')
      .eq('company_id', companyId)
      .order('product_name');

    if (error) throw error;
    return data;
  },

  async getProduct(productId: string) {
    const { data, error } = await supabase
      .from('mfg_products')
      .select('*')
      .eq('id', productId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // BOM Management
  async createBOM(bom: BOM) {
    const { data, error } = await supabase
      .from('mfg_bom')
      .insert(bom)
      .select('*, mfg_products(*)')
      .single();

    if (error) throw error;
    return data;
  },

  async getBOMs(companyId: string, productId?: string) {
    let query = supabase
      .from('mfg_bom')
      .select('*, mfg_products(*)')
      .eq('company_id', companyId);

    if (productId) {
      query = query.eq('product_id', productId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createBOMItem(bomItem: BOMItem) {
    const { data, error } = await supabase
      .from('mfg_bom_items')
      .insert(bomItem)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getBOMItems(bomId: string) {
    const { data, error } = await supabase
      .from('mfg_bom_items')
      .select('*')
      .eq('bom_id', bomId)
      .order('created_at');

    if (error) throw error;
    return data;
  },

  // Inventory Management
  async getInventory(companyId: string, warehouseId?: string) {
    let query = supabase
      .from('mfg_inventory')
      .select('*, mfg_warehouses(*)')
      .eq('company_id', companyId);

    if (warehouseId) {
      query = query.eq('warehouse_id', warehouseId);
    }

    const { data, error } = await query.order('quantity_on_hand', { ascending: true });
    if (error) throw error;
    return data;
  },

  async updateInventory(inventoryId: string, updates: Partial<InventoryItem>) {
    const { data, error } = await supabase
      .from('mfg_inventory')
      .update(updates)
      .eq('id', inventoryId)
      .select('*, mfg_warehouses(*)')
      .single();

    if (error) throw error;
    return data;
  },

  async getLowStockItems(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_inventory')
      .select('*, mfg_warehouses(*)')
      .eq('company_id', companyId)
      .lt('quantity_on_hand', supabase.raw('reorder_level'));

    if (error) throw error;
    return data;
  },

  // Quality Inspections
  async createQualityInspection(inspection: QualityInspection) {
    const { data, error } = await supabase
      .from('mfg_quality_inspections')
      .insert(inspection)
      .select('*, mfg_work_orders(*), users!mfg_quality_inspections_inspector_id_fkey(*)')
      .single();

    if (error) throw error;
    return data;
  },

  async getQualityInspections(companyId: string, workOrderId?: string) {
    let query = supabase
      .from('mfg_quality_inspections')
      .select('*, mfg_work_orders(*), users!mfg_quality_inspections_inspector_id_fkey(*)')
      .eq('company_id', companyId);

    if (workOrderId) {
      query = query.eq('work_order_id', workOrderId);
    }

    const { data, error } = await query.order('inspection_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateQualityInspection(inspectionId: string, updates: Partial<QualityInspection>) {
    const { data, error } = await supabase
      .from('mfg_quality_inspections')
      .update(updates)
      .eq('id', inspectionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Warehouses
  async getWarehouses(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_warehouses')
      .select('*')
      .eq('company_id', companyId)
      .order('warehouse_name');

    if (error) throw error;
    return data;
  },

  // Production Lines
  async getProductionLines(companyId: string) {
    const { data, error } = await supabase
      .from('mfg_production_lines')
      .select('*')
      .eq('company_id', companyId)
      .order('line_name');

    if (error) throw error;
    return data;
  },
};
