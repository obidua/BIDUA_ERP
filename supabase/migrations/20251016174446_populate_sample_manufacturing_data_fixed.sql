/*
  # Populate Sample Manufacturing Data

  ## Overview
  This migration adds comprehensive sample data for the manufacturing module to enable
  immediate testing and demonstration of the ERP system.

  ## Sample Data Includes:
  1. Products (raw materials, semi-finished, finished goods)
  2. Warehouses (main, branch locations)
  3. Vendors/Suppliers
  4. Production Lines
  5. Work Orders
  6. Inventory Stock
  7. Purchase Orders
  8. Quality Inspections
  9. Defect Records

  ## Note
  This data is for the first company in the system for demonstration purposes.
*/

-- Get the first company ID for sample data
DO $$
DECLARE
  v_company_id uuid;
  v_warehouse_main_id uuid;
  v_warehouse_branch_id uuid;
  v_product_raw_1_id uuid;
  v_product_raw_2_id uuid;
  v_product_semi_1_id uuid;
  v_product_finished_1_id uuid;
  v_vendor_1_id uuid;
  v_vendor_2_id uuid;
  v_production_line_1_id uuid;
  v_work_order_1_id uuid;
  v_po_1_id uuid;
BEGIN
  -- Get first company
  SELECT id INTO v_company_id FROM companies ORDER BY created_at LIMIT 1;

  IF v_company_id IS NULL THEN
    RAISE NOTICE 'No company found, skipping sample data';
    RETURN;
  END IF;

  -- Insert Warehouses
  INSERT INTO mfg_warehouses (company_id, warehouse_code, warehouse_name, warehouse_type, address, is_active)
  VALUES
    (v_company_id, 'WH-001', 'Main Warehouse', 'main', '{"street": "123 Industrial Ave", "city": "Manufacturing City", "state": "CA", "zip": "90001"}'::jsonb, true)
  RETURNING id INTO v_warehouse_main_id;

  INSERT INTO mfg_warehouses (company_id, warehouse_code, warehouse_name, warehouse_type, address, is_active)
  VALUES
    (v_company_id, 'WH-002', 'Branch Warehouse North', 'branch', '{"street": "456 North Rd", "city": "North City", "state": "CA", "zip": "90002"}'::jsonb, true)
  RETURNING id INTO v_warehouse_branch_id;

  -- Insert Products
  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'RM-001', 'Steel Sheet 2mm', 'raw_material', 'Raw Materials', 'Cold rolled steel sheet, 2mm thickness', 'KG', false, true, false, 500, 1000, 2.50, 0, true)
  RETURNING id INTO v_product_raw_1_id;

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'RM-002', 'Aluminum Bar 10mm', 'raw_material', 'Raw Materials', 'Aluminum bar, 10mm diameter', 'MTR', false, true, false, 200, 500, 5.00, 0, true)
  RETURNING id INTO v_product_raw_2_id;

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'RM-003', 'Plastic Pellets PP', 'raw_material', 'Raw Materials', 'Polypropylene plastic pellets', 'KG', false, true, false, 1000, 2000, 1.20, 0, true);

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'SF-001', 'Stamped Component A', 'semi_finished', 'Semi-Finished', 'Stamped steel component type A', 'PCS', false, false, true, 100, 200, 15.00, 0, true)
  RETURNING id INTO v_product_semi_1_id;

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'SF-002', 'Machined Housing B', 'semi_finished', 'Semi-Finished', 'CNC machined aluminum housing', 'PCS', false, false, true, 50, 100, 45.00, 0, true);

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'FG-001', 'Industrial Valve Model X', 'finished_good', 'Finished Goods', 'Heavy duty industrial valve, 2 inch', 'PCS', true, false, true, 20, 50, 150.00, 250.00, true)
  RETURNING id INTO v_product_finished_1_id;

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'FG-002', 'Pump Assembly Model Y', 'finished_good', 'Finished Goods', 'Electric water pump assembly', 'PCS', true, false, true, 10, 30, 320.00, 550.00, true);

  INSERT INTO mfg_products (company_id, product_code, product_name, product_type, category, description, unit_of_measure, is_sellable, is_purchasable, is_manufactured, reorder_level, reorder_quantity, cost_price, selling_price, is_active)
  VALUES
    (v_company_id, 'CON-001', 'Lubricating Oil', 'consumable', 'Consumables', 'Machine lubricating oil', 'LTR', false, true, false, 50, 100, 8.00, 0, true);

  -- Insert Vendors
  INSERT INTO mfg_vendors (company_id, vendor_code, vendor_name, vendor_type, contact_person, email, phone, address, payment_terms, lead_time_days, rating, is_active)
  VALUES
    (v_company_id, 'VEN-001', 'Steel Suppliers Inc', 'manufacturer', 'John Smith', 'john@steelsuppliers.com', '+1-555-0101', '{"street": "789 Steel Rd", "city": "Pittsburgh", "state": "PA", "zip": "15001"}'::jsonb, 'Net 30', 7, 5, true)
  RETURNING id INTO v_vendor_1_id;

  INSERT INTO mfg_vendors (company_id, vendor_code, vendor_name, vendor_type, contact_person, email, phone, address, payment_terms, lead_time_days, rating, is_active)
  VALUES
    (v_company_id, 'VEN-002', 'Aluminum Works Ltd', 'distributor', 'Jane Doe', 'jane@aluminumworks.com', '+1-555-0102', '{"street": "321 Metal Ave", "city": "Detroit", "state": "MI", "zip": "48001"}'::jsonb, 'Net 45', 14, 4, true)
  RETURNING id INTO v_vendor_2_id;

  INSERT INTO mfg_vendors (company_id, vendor_code, vendor_name, vendor_type, contact_person, email, phone, address, payment_terms, lead_time_days, rating, is_active)
  VALUES
    (v_company_id, 'VEN-003', 'Plastic Materials Corp', 'wholesaler', 'Bob Johnson', 'bob@plasticmat.com', '+1-555-0103', '{"street": "654 Polymer St", "city": "Houston", "state": "TX", "zip": "77001"}'::jsonb, 'Net 30', 10, 4, true);

  -- Insert Production Lines
  INSERT INTO mfg_production_lines (company_id, line_code, line_name, line_type, capacity_per_hour, efficiency_percentage, is_active)
  VALUES
    (v_company_id, 'LINE-001', 'Assembly Line 1', 'assembly_line', 50.00, 95.00, true)
  RETURNING id INTO v_production_line_1_id;

  INSERT INTO mfg_production_lines (company_id, line_code, line_name, line_type, capacity_per_hour, efficiency_percentage, is_active)
  VALUES
    (v_company_id, 'MACH-001', 'CNC Machine Center 1', 'machine', 20.00, 90.00, true);

  INSERT INTO mfg_production_lines (company_id, line_code, line_name, line_type, capacity_per_hour, efficiency_percentage, is_active)
  VALUES
    (v_company_id, 'MACH-002', 'Stamping Press 1', 'machine', 100.00, 92.00, true);

  -- Insert Work Orders
  INSERT INTO mfg_work_orders (company_id, work_order_number, product_id, quantity_planned, quantity_produced, quantity_good, quantity_rejected, unit_of_measure, work_order_type, priority, work_order_status, production_line_id, planned_start_date, planned_end_date, actual_start_date)
  VALUES
    (v_company_id, 'WO-2025-001', v_product_finished_1_id, 100, 75, 73, 2, 'PCS', 'production', 'high', 'in_progress', v_production_line_1_id, CURRENT_DATE - 5, CURRENT_DATE + 2, CURRENT_DATE - 5)
  RETURNING id INTO v_work_order_1_id;

  INSERT INTO mfg_work_orders (company_id, work_order_number, product_id, quantity_planned, quantity_produced, quantity_good, quantity_rejected, unit_of_measure, work_order_type, priority, work_order_status, production_line_id, planned_start_date, planned_end_date, actual_start_date)
  VALUES
    (v_company_id, 'WO-2025-002', v_product_semi_1_id, 200, 200, 198, 2, 'PCS', 'production', 'medium', 'completed', v_production_line_1_id, CURRENT_DATE - 10, CURRENT_DATE - 3, CURRENT_DATE - 10);

  INSERT INTO mfg_work_orders (company_id, work_order_number, product_id, quantity_planned, quantity_produced, quantity_good, quantity_rejected, unit_of_measure, work_order_type, priority, work_order_status, production_line_id, planned_start_date, planned_end_date)
  VALUES
    (v_company_id, 'WO-2025-003', v_product_finished_1_id, 150, 0, 0, 0, 'PCS', 'production', 'medium', 'released', v_production_line_1_id, CURRENT_DATE + 3, CURRENT_DATE + 10);

  INSERT INTO mfg_work_orders (company_id, work_order_number, product_id, quantity_planned, quantity_produced, quantity_good, quantity_rejected, unit_of_measure, work_order_type, priority, work_order_status, production_line_id, planned_start_date, planned_end_date)
  VALUES
    (v_company_id, 'WO-2025-004', v_product_semi_1_id, 300, 0, 0, 0, 'PCS', 'production', 'low', 'draft', v_production_line_1_id, CURRENT_DATE + 7, CURRENT_DATE + 14);

  -- Insert Inventory
  INSERT INTO mfg_inventory (company_id, product_id, warehouse_id, quantity_on_hand, quantity_reserved, bin_location, min_stock_level, max_stock_level)
  VALUES
    (v_company_id, v_product_raw_1_id, v_warehouse_main_id, 2500, 200, 'A-01-01', 500, 5000),
    (v_company_id, v_product_raw_2_id, v_warehouse_main_id, 1200, 100, 'A-01-02', 200, 2000),
    (v_company_id, v_product_semi_1_id, v_warehouse_main_id, 450, 50, 'B-01-01', 100, 1000),
    (v_company_id, v_product_finished_1_id, v_warehouse_main_id, 85, 20, 'C-01-01', 20, 200),
    (v_company_id, v_product_finished_1_id, v_warehouse_branch_id, 35, 5, 'C-01-01', 10, 100);

  -- Insert Purchase Orders
  INSERT INTO mfg_purchase_orders (company_id, po_number, po_date, vendor_id, delivery_date, warehouse_id, po_status, subtotal, tax_amount, total_amount, currency, payment_terms)
  VALUES
    (v_company_id, 'PO-2025-001', CURRENT_DATE - 15, v_vendor_1_id, CURRENT_DATE - 5, v_warehouse_main_id, 'received', 5000.00, 500.00, 5500.00, 'USD', 'Net 30')
  RETURNING id INTO v_po_1_id;

  INSERT INTO mfg_purchase_orders (company_id, po_number, po_date, vendor_id, delivery_date, warehouse_id, po_status, subtotal, tax_amount, total_amount, currency, payment_terms)
  VALUES
    (v_company_id, 'PO-2025-002', CURRENT_DATE - 10, v_vendor_2_id, CURRENT_DATE + 5, v_warehouse_main_id, 'confirmed', 3000.00, 300.00, 3300.00, 'USD', 'Net 45');

  INSERT INTO mfg_purchase_orders (company_id, po_number, po_date, vendor_id, delivery_date, warehouse_id, po_status, subtotal, tax_amount, total_amount, currency, payment_terms)
  VALUES
    (v_company_id, 'PO-2025-003', CURRENT_DATE - 3, v_vendor_1_id, CURRENT_DATE + 10, v_warehouse_main_id, 'sent', 7500.00, 750.00, 8250.00, 'USD', 'Net 30');

  -- Insert Quality Inspections
  INSERT INTO mfg_quality_inspections (company_id, inspection_number, inspection_date, inspection_type, product_id, quantity_inspected, quantity_accepted, quantity_rejected, inspection_result)
  VALUES
    (v_company_id, 'QI-2025-001', CURRENT_DATE - 5, 'incoming', v_product_raw_1_id, 1000, 995, 5, 'passed'),
    (v_company_id, 'QI-2025-002', CURRENT_DATE - 3, 'in_process', v_product_semi_1_id, 200, 198, 2, 'passed'),
    (v_company_id, 'QI-2025-003', CURRENT_DATE - 1, 'final', v_product_finished_1_id, 50, 48, 2, 'passed');

  -- Insert Quality Defects
  INSERT INTO mfg_quality_defects (company_id, defect_number, defect_date, defect_type, severity, source, product_id, work_order_id, quantity_affected, description, defect_status)
  VALUES
    (v_company_id, 'DEF-2025-001', CURRENT_DATE - 8, 'material', 'minor', 'internal', v_product_raw_1_id, NULL, 5, 'Surface scratches on steel sheets', 'closed'),
    (v_company_id, 'DEF-2025-002', CURRENT_DATE - 4, 'process', 'major', 'internal', v_product_semi_1_id, v_work_order_1_id, 2, 'Dimensional tolerance out of spec', 'action_taken'),
    (v_company_id, 'DEF-2025-003', CURRENT_DATE - 1, 'equipment', 'critical', 'internal', v_product_finished_1_id, v_work_order_1_id, 2, 'Assembly defect due to machine calibration', 'open');

  -- Insert Goods Receipts
  INSERT INTO mfg_goods_receipts (company_id, grn_number, grn_date, po_id, vendor_id, warehouse_id, grn_status)
  VALUES
    (v_company_id, 'GRN-2025-001', CURRENT_DATE - 5, v_po_1_id, v_vendor_1_id, v_warehouse_main_id, 'posted'),
    (v_company_id, 'GRN-2025-002', CURRENT_DATE - 2, v_po_1_id, v_vendor_1_id, v_warehouse_main_id, 'posted');

  RAISE NOTICE 'Sample manufacturing data inserted successfully for company %', v_company_id;
END $$;
