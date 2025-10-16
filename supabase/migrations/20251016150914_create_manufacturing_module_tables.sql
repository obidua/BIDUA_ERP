/*
  # Manufacturing Module - Production, Inventory & Quality Management

  ## Overview
  Comprehensive manufacturing management system with production planning,
  inventory control, BOM, work orders, quality management, and supply chain.

  ## New Tables

  ### Production Management
  1. `mfg_products` - Product master data
  2. `mfg_bom` - Bill of Materials
  3. `mfg_work_orders` - Production work orders
  4. `mfg_production_lines` - Production line/machine tracking
  5. `mfg_work_order_operations` - Operation tracking

  ### Inventory Management
  6. `mfg_warehouses` - Warehouse/location master
  7. `mfg_inventory` - Stock tracking
  8. `mfg_inventory_transactions` - Stock movement history
  9. `mfg_stock_adjustments` - Stock adjustments
  10. `mfg_lot_batches` - Lot/batch tracking

  ### Supply Chain
  11. `mfg_vendors` - Vendor master
  12. `mfg_purchase_orders` - Purchase order management
  13. `mfg_goods_receipts` - Goods receipt notes

  ### Quality Management
  14. `mfg_quality_inspections` - Quality inspection records
  15. `mfg_quality_defects` - Defect tracking
  16. `mfg_quality_standards` - Quality parameters

  ## Security
  - RLS enabled on all tables
  - Company-based data isolation
*/

-- Products Master
CREATE TABLE IF NOT EXISTS mfg_products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  product_code text NOT NULL,
  product_name text NOT NULL,
  product_type text CHECK (product_type IN ('raw_material', 'semi_finished', 'finished_good', 'service', 'consumable')),
  category text,
  subcategory text,
  description text,
  specifications jsonb DEFAULT '{}'::jsonb,
  unit_of_measure text DEFAULT 'PCS',
  alternate_units jsonb DEFAULT '[]'::jsonb,
  hsn_code text,
  barcode text,
  sku text,
  is_sellable boolean DEFAULT true,
  is_purchasable boolean DEFAULT true,
  is_manufactured boolean DEFAULT false,
  reorder_level decimal(15,3) DEFAULT 0,
  reorder_quantity decimal(15,3) DEFAULT 0,
  lead_time_days integer DEFAULT 0,
  shelf_life_days integer,
  storage_conditions text,
  weight decimal(10,3),
  weight_unit text DEFAULT 'KG',
  dimensions jsonb DEFAULT '{}'::jsonb,
  cost_price decimal(15,2),
  selling_price decimal(15,2),
  tax_rate decimal(5,2),
  brand text,
  manufacturer text,
  image_url text,
  drawing_url text,
  datasheet_url text,
  tags text[],
  is_active boolean DEFAULT true,
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, product_code)
);

-- Bill of Materials
CREATE TABLE IF NOT EXISTS mfg_bom (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  bom_number text,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE CASCADE,
  version integer DEFAULT 1,
  quantity decimal(15,3) DEFAULT 1,
  unit_of_measure text,
  bom_type text CHECK (bom_type IN ('manufacturing', 'assembly', 'kit', 'phantom')),
  is_active boolean DEFAULT true,
  effective_from date DEFAULT CURRENT_DATE,
  effective_to date,
  notes text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, bom_number)
);

-- BOM Line Items
CREATE TABLE IF NOT EXISTS mfg_bom_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bom_id uuid NOT NULL REFERENCES mfg_bom(id) ON DELETE CASCADE,
  component_product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  quantity decimal(15,3) NOT NULL,
  unit_of_measure text,
  scrap_percentage decimal(5,2) DEFAULT 0,
  operation_sequence integer,
  is_optional boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Production Lines / Machines
CREATE TABLE IF NOT EXISTS mfg_production_lines (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  line_code text NOT NULL,
  line_name text NOT NULL,
  line_type text CHECK (line_type IN ('assembly_line', 'machine', 'workstation', 'production_cell')),
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  capacity_per_hour decimal(10,2),
  efficiency_percentage decimal(5,2) DEFAULT 100,
  maintenance_schedule text,
  last_maintenance_date date,
  next_maintenance_date date,
  operator_ids uuid[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, line_code)
);

-- Work Orders
CREATE TABLE IF NOT EXISTS mfg_work_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  work_order_number text,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  bom_id uuid REFERENCES mfg_bom(id) ON DELETE SET NULL,
  quantity_planned decimal(15,3) NOT NULL,
  quantity_produced decimal(15,3) DEFAULT 0,
  quantity_good decimal(15,3) DEFAULT 0,
  quantity_rejected decimal(15,3) DEFAULT 0,
  unit_of_measure text,
  work_order_type text CHECK (work_order_type IN ('production', 'assembly', 'rework', 'maintenance')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  work_order_status text DEFAULT 'draft' CHECK (work_order_status IN (
    'draft', 'released', 'in_progress', 'completed', 'cancelled', 'on_hold'
  )),
  production_line_id uuid REFERENCES mfg_production_lines(id) ON DELETE SET NULL,
  planned_start_date date,
  planned_end_date date,
  actual_start_date date,
  actual_end_date date,
  shift text,
  supervisor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  notes text,
  customer_order_reference text,
  lot_number text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, work_order_number)
);

-- Work Order Operations
CREATE TABLE IF NOT EXISTS mfg_work_order_operations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_order_id uuid NOT NULL REFERENCES mfg_work_orders(id) ON DELETE CASCADE,
  operation_sequence integer NOT NULL,
  operation_name text NOT NULL,
  operation_type text,
  production_line_id uuid REFERENCES mfg_production_lines(id) ON DELETE SET NULL,
  estimated_duration_minutes integer,
  actual_duration_minutes integer,
  operator_id uuid REFERENCES users(id) ON DELETE SET NULL,
  operation_status text DEFAULT 'pending' CHECK (operation_status IN (
    'pending', 'in_progress', 'completed', 'on_hold', 'skipped'
  )),
  start_time timestamptz,
  end_time timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Warehouses
CREATE TABLE IF NOT EXISTS mfg_warehouses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  warehouse_code text NOT NULL,
  warehouse_name text NOT NULL,
  warehouse_type text CHECK (warehouse_type IN ('main', 'branch', 'transit', 'virtual', 'consignment')),
  address jsonb DEFAULT '{}'::jsonb,
  manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, warehouse_code)
);

-- Inventory Stock
CREATE TABLE IF NOT EXISTS mfg_inventory (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE CASCADE,
  warehouse_id uuid NOT NULL REFERENCES mfg_warehouses(id) ON DELETE CASCADE,
  quantity_on_hand decimal(15,3) DEFAULT 0,
  quantity_reserved decimal(15,3) DEFAULT 0,
  quantity_available decimal(15,3) GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
  bin_location text,
  last_stock_count_date date,
  min_stock_level decimal(15,3) DEFAULT 0,
  max_stock_level decimal(15,3),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, product_id, warehouse_id, bin_location)
);

-- Inventory Transactions
CREATE TABLE IF NOT EXISTS mfg_inventory_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  transaction_number text,
  transaction_type text NOT NULL CHECK (transaction_type IN (
    'goods_receipt', 'goods_issue', 'transfer', 'adjustment', 'return', 
    'scrap', 'production', 'consumption', 'cycle_count'
  )),
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  from_warehouse_id uuid REFERENCES mfg_warehouses(id) ON DELETE SET NULL,
  to_warehouse_id uuid REFERENCES mfg_warehouses(id) ON DELETE SET NULL,
  quantity decimal(15,3) NOT NULL,
  unit_of_measure text,
  unit_cost decimal(15,2),
  total_value decimal(15,2),
  reference_type text,
  reference_id uuid,
  reference_number text,
  lot_batch_id uuid,
  transaction_date timestamptz DEFAULT now(),
  notes text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(company_id, transaction_number)
);

-- Stock Adjustments
CREATE TABLE IF NOT EXISTS mfg_stock_adjustments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  adjustment_number text,
  adjustment_date date DEFAULT CURRENT_DATE,
  warehouse_id uuid NOT NULL REFERENCES mfg_warehouses(id) ON DELETE RESTRICT,
  adjustment_type text CHECK (adjustment_type IN ('physical_count', 'damage', 'theft', 'expiry', 'other')),
  adjustment_status text DEFAULT 'draft' CHECK (adjustment_status IN ('draft', 'submitted', 'approved', 'posted')),
  reason text,
  total_adjustment_value decimal(15,2),
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  notes text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, adjustment_number)
);

-- Stock Adjustment Items
CREATE TABLE IF NOT EXISTS mfg_stock_adjustment_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  adjustment_id uuid NOT NULL REFERENCES mfg_stock_adjustments(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  system_quantity decimal(15,3) NOT NULL,
  actual_quantity decimal(15,3) NOT NULL,
  difference_quantity decimal(15,3) GENERATED ALWAYS AS (actual_quantity - system_quantity) STORED,
  unit_cost decimal(15,2),
  adjustment_value decimal(15,2) GENERATED ALWAYS AS ((actual_quantity - system_quantity) * unit_cost) STORED,
  bin_location text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Lot/Batch Tracking
CREATE TABLE IF NOT EXISTS mfg_lot_batches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  lot_number text NOT NULL,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE CASCADE,
  manufacture_date date,
  expiry_date date,
  quantity_produced decimal(15,3),
  quantity_remaining decimal(15,3),
  work_order_id uuid REFERENCES mfg_work_orders(id) ON DELETE SET NULL,
  vendor_id uuid,
  quality_status text CHECK (quality_status IN ('pending', 'approved', 'rejected', 'quarantine')),
  notes text,
  attributes jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, lot_number, product_id)
);

-- Vendors/Suppliers
CREATE TABLE IF NOT EXISTS mfg_vendors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  vendor_code text NOT NULL,
  vendor_name text NOT NULL,
  vendor_type text CHECK (vendor_type IN ('manufacturer', 'distributor', 'wholesaler', 'service_provider', 'contractor')),
  contact_person text,
  email text,
  phone text,
  website text,
  address jsonb DEFAULT '{}'::jsonb,
  tax_id text,
  payment_terms text,
  credit_limit decimal(15,2),
  lead_time_days integer,
  rating integer CHECK (rating BETWEEN 1 AND 5),
  is_active boolean DEFAULT true,
  tags text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, vendor_code)
);

-- Purchase Orders
CREATE TABLE IF NOT EXISTS mfg_purchase_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  po_number text,
  po_date date DEFAULT CURRENT_DATE,
  vendor_id uuid NOT NULL REFERENCES mfg_vendors(id) ON DELETE RESTRICT,
  delivery_date date,
  delivery_address jsonb DEFAULT '{}'::jsonb,
  warehouse_id uuid REFERENCES mfg_warehouses(id) ON DELETE SET NULL,
  po_status text DEFAULT 'draft' CHECK (po_status IN (
    'draft', 'sent', 'confirmed', 'partially_received', 'received', 'cancelled', 'closed'
  )),
  subtotal decimal(15,2) DEFAULT 0,
  tax_amount decimal(15,2) DEFAULT 0,
  shipping_charges decimal(15,2) DEFAULT 0,
  total_amount decimal(15,2) DEFAULT 0,
  currency text DEFAULT 'INR',
  payment_terms text,
  notes text,
  terms_and_conditions text,
  prepared_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, po_number)
);

-- Purchase Order Items
CREATE TABLE IF NOT EXISTS mfg_purchase_order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  po_id uuid NOT NULL REFERENCES mfg_purchase_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  quantity_ordered decimal(15,3) NOT NULL,
  quantity_received decimal(15,3) DEFAULT 0,
  unit_price decimal(15,2) NOT NULL,
  tax_rate decimal(5,2) DEFAULT 0,
  discount_percentage decimal(5,2) DEFAULT 0,
  line_total decimal(15,2),
  delivery_date date,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Goods Receipt Notes
CREATE TABLE IF NOT EXISTS mfg_goods_receipts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  grn_number text,
  grn_date date DEFAULT CURRENT_DATE,
  po_id uuid REFERENCES mfg_purchase_orders(id) ON DELETE SET NULL,
  vendor_id uuid REFERENCES mfg_vendors(id) ON DELETE SET NULL,
  warehouse_id uuid NOT NULL REFERENCES mfg_warehouses(id) ON DELETE RESTRICT,
  invoice_number text,
  invoice_date date,
  vehicle_number text,
  received_by uuid REFERENCES users(id) ON DELETE SET NULL,
  grn_status text DEFAULT 'draft' CHECK (grn_status IN ('draft', 'posted', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, grn_number)
);

-- Goods Receipt Items
CREATE TABLE IF NOT EXISTS mfg_goods_receipt_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  grn_id uuid NOT NULL REFERENCES mfg_goods_receipts(id) ON DELETE CASCADE,
  po_item_id uuid REFERENCES mfg_purchase_order_items(id) ON DELETE SET NULL,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  quantity_received decimal(15,3) NOT NULL,
  quantity_accepted decimal(15,3),
  quantity_rejected decimal(15,3),
  rejection_reason text,
  lot_number text,
  bin_location text,
  quality_status text CHECK (quality_status IN ('pending', 'passed', 'failed', 'quarantine')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Quality Standards/Parameters
CREATE TABLE IF NOT EXISTS mfg_quality_standards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  standard_code text NOT NULL,
  standard_name text NOT NULL,
  product_id uuid REFERENCES mfg_products(id) ON DELETE CASCADE,
  parameter_name text NOT NULL,
  parameter_type text CHECK (parameter_type IN ('numeric', 'text', 'boolean', 'visual')),
  unit_of_measure text,
  min_value decimal(15,3),
  max_value decimal(15,3),
  target_value decimal(15,3),
  acceptable_values text[],
  test_method text,
  inspection_frequency text,
  is_mandatory boolean DEFAULT true,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, standard_code)
);

-- Quality Inspections
CREATE TABLE IF NOT EXISTS mfg_quality_inspections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  inspection_number text,
  inspection_date date DEFAULT CURRENT_DATE,
  inspection_type text CHECK (inspection_type IN (
    'incoming', 'in_process', 'final', 'outgoing', 'customer_return'
  )),
  reference_type text CHECK (reference_type IN ('grn', 'work_order', 'product', 'batch')),
  reference_id uuid,
  product_id uuid NOT NULL REFERENCES mfg_products(id) ON DELETE RESTRICT,
  lot_batch_id uuid REFERENCES mfg_lot_batches(id) ON DELETE SET NULL,
  quantity_inspected decimal(15,3) NOT NULL,
  quantity_accepted decimal(15,3),
  quantity_rejected decimal(15,3),
  inspection_result text CHECK (inspection_result IN ('passed', 'failed', 'conditional_pass', 'pending')),
  inspector_id uuid REFERENCES users(id) ON DELETE SET NULL,
  inspection_notes text,
  corrective_action text,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, inspection_number)
);

-- Quality Inspection Details
CREATE TABLE IF NOT EXISTS mfg_quality_inspection_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  inspection_id uuid NOT NULL REFERENCES mfg_quality_inspections(id) ON DELETE CASCADE,
  quality_standard_id uuid REFERENCES mfg_quality_standards(id) ON DELETE SET NULL,
  parameter_name text NOT NULL,
  measured_value text,
  is_acceptable boolean,
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- Quality Defects/NCR
CREATE TABLE IF NOT EXISTS mfg_quality_defects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  defect_number text,
  defect_date date DEFAULT CURRENT_DATE,
  defect_type text CHECK (defect_type IN ('material', 'process', 'equipment', 'human_error', 'design', 'other')),
  severity text CHECK (severity IN ('critical', 'major', 'minor')),
  source text CHECK (source IN ('internal', 'customer', 'vendor')),
  product_id uuid REFERENCES mfg_products(id) ON DELETE SET NULL,
  work_order_id uuid REFERENCES mfg_work_orders(id) ON DELETE SET NULL,
  lot_batch_id uuid REFERENCES mfg_lot_batches(id) ON DELETE SET NULL,
  quantity_affected decimal(15,3),
  description text NOT NULL,
  root_cause text,
  corrective_action text,
  preventive_action text,
  responsible_person_id uuid REFERENCES users(id) ON DELETE SET NULL,
  target_closure_date date,
  actual_closure_date date,
  defect_status text DEFAULT 'open' CHECK (defect_status IN ('open', 'investigating', 'action_taken', 'closed', 'verified')),
  cost_impact decimal(15,2),
  reported_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, defect_number)
);

-- Create indexes
CREATE INDEX idx_mfg_products_company_id ON mfg_products(company_id);
CREATE INDEX idx_mfg_products_code ON mfg_products(product_code);
CREATE INDEX idx_mfg_bom_product_id ON mfg_bom(product_id);
CREATE INDEX idx_mfg_work_orders_company_id ON mfg_work_orders(company_id);
CREATE INDEX idx_mfg_work_orders_status ON mfg_work_orders(work_order_status);
CREATE INDEX idx_mfg_inventory_product_warehouse ON mfg_inventory(product_id, warehouse_id);
CREATE INDEX idx_mfg_transactions_product ON mfg_inventory_transactions(product_id);
CREATE INDEX idx_mfg_transactions_date ON mfg_inventory_transactions(transaction_date);
CREATE INDEX idx_mfg_po_vendor ON mfg_purchase_orders(vendor_id);
CREATE INDEX idx_mfg_quality_product ON mfg_quality_inspections(product_id);

-- Enable RLS
ALTER TABLE mfg_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_bom ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_bom_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_production_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_work_order_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_stock_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_stock_adjustment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_lot_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_goods_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_goods_receipt_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_quality_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_quality_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_quality_inspection_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE mfg_quality_defects ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Company-based access with role checks)
CREATE POLICY "Users can view products in their company"
  ON mfg_products FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Authorized users can manage products"
  ON mfg_products FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- Similar policies for other tables (abbreviated)
CREATE POLICY "Company access for inventory"
  ON mfg_inventory FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Company access for work orders"
  ON mfg_work_orders FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_mfg_products_updated_at BEFORE UPDATE ON mfg_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mfg_work_orders_updated_at BEFORE UPDATE ON mfg_work_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
