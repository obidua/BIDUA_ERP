/*
  # Financial Management & Accounting Module

  Comprehensive accounting with invoicing, bills, payments, and banking.
*/

-- Fiscal Years
CREATE TABLE IF NOT EXISTS fin_fiscal_years (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  fiscal_year text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_closed boolean DEFAULT false,
  closed_at timestamptz,
  closed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(company_id, fiscal_year)
);

-- Chart of Accounts
CREATE TABLE IF NOT EXISTS fin_chart_of_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  account_code text NOT NULL,
  account_name text NOT NULL,
  account_type text NOT NULL CHECK (account_type IN (
    'asset', 'liability', 'equity', 'revenue', 'expense'
  )),
  account_subtype text,
  parent_account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  description text,
  currency text DEFAULT 'INR',
  opening_balance decimal(15,2) DEFAULT 0,
  current_balance decimal(15,2) DEFAULT 0,
  is_system_account boolean DEFAULT false,
  is_bank_account boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, account_code)
);

-- Bank Accounts (create first to avoid forward reference)
CREATE TABLE IF NOT EXISTS fin_bank_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  account_code text NOT NULL,
  bank_name text NOT NULL,
  account_number text NOT NULL,
  account_type text CHECK (account_type IN ('checking', 'savings', 'credit_card', 'line_of_credit', 'other')),
  branch text,
  ifsc_code text,
  swift_code text,
  currency text DEFAULT 'INR',
  opening_balance decimal(15,2) DEFAULT 0,
  current_balance decimal(15,2) DEFAULT 0,
  gl_account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  is_primary boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, account_code)
);

-- Journal Entries
CREATE TABLE IF NOT EXISTS fin_journal_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  entry_number text,
  entry_date date NOT NULL,
  fiscal_year_id uuid REFERENCES fin_fiscal_years(id) ON DELETE RESTRICT,
  entry_type text CHECK (entry_type IN ('manual', 'system', 'opening_balance', 'closing', 'adjustment')),
  reference_type text,
  reference_id uuid,
  reference_number text,
  description text,
  total_debit decimal(15,2) NOT NULL,
  total_credit decimal(15,2) NOT NULL,
  entry_status text DEFAULT 'draft' CHECK (entry_status IN ('draft', 'posted', 'reversed')),
  posted_by uuid REFERENCES users(id) ON DELETE SET NULL,
  posted_at timestamptz,
  reversed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  reversed_at timestamptz,
  reversal_entry_id uuid REFERENCES fin_journal_entries(id) ON DELETE SET NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, entry_number),
  CHECK (total_debit = total_credit)
);

-- Journal Entry Lines
CREATE TABLE IF NOT EXISTS fin_journal_entry_lines (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_entry_id uuid NOT NULL REFERENCES fin_journal_entries(id) ON DELETE CASCADE,
  account_id uuid NOT NULL REFERENCES fin_chart_of_accounts(id) ON DELETE RESTRICT,
  line_description text,
  debit_amount decimal(15,2) DEFAULT 0,
  credit_amount decimal(15,2) DEFAULT 0,
  entity_type text,
  entity_id uuid,
  project_id uuid REFERENCES pm_projects(id) ON DELETE SET NULL,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  CHECK ((debit_amount > 0 AND credit_amount = 0) OR (debit_amount = 0 AND credit_amount > 0))
);

-- Tax Codes
CREATE TABLE IF NOT EXISTS fin_tax_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  tax_name text NOT NULL,
  tax_code text NOT NULL,
  tax_type text CHECK (tax_type IN ('sales_tax', 'vat', 'gst', 'income_tax', 'withholding_tax', 'other')),
  tax_rate decimal(5,2) NOT NULL,
  is_compound boolean DEFAULT false,
  account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, tax_code)
);

-- Invoices
CREATE TABLE IF NOT EXISTS fin_invoices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  invoice_number text,
  invoice_date date NOT NULL,
  due_date date,
  customer_id uuid NOT NULL REFERENCES crm_customers(id) ON DELETE RESTRICT,
  billing_address jsonb DEFAULT '{}'::jsonb,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  project_id uuid REFERENCES pm_projects(id) ON DELETE SET NULL,
  quote_id uuid REFERENCES crm_quotes(id) ON DELETE SET NULL,
  invoice_status text DEFAULT 'draft' CHECK (invoice_status IN (
    'draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded'
  )),
  subtotal decimal(15,2) NOT NULL,
  discount_amount decimal(15,2) DEFAULT 0,
  tax_amount decimal(15,2) DEFAULT 0,
  total_amount decimal(15,2) NOT NULL,
  paid_amount decimal(15,2) DEFAULT 0,
  balance_due decimal(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
  currency text DEFAULT 'INR',
  exchange_rate decimal(10,4) DEFAULT 1,
  payment_terms text,
  notes text,
  terms_and_conditions text,
  sent_at timestamptz,
  journal_entry_id uuid REFERENCES fin_journal_entries(id) ON DELETE SET NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, invoice_number)
);

-- Invoice Items
CREATE TABLE IF NOT EXISTS fin_invoice_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id uuid NOT NULL REFERENCES fin_invoices(id) ON DELETE CASCADE,
  product_id uuid REFERENCES mfg_products(id) ON DELETE SET NULL,
  item_description text NOT NULL,
  quantity decimal(15,3) DEFAULT 1,
  unit_price decimal(15,2) NOT NULL,
  discount_percentage decimal(5,2) DEFAULT 0,
  tax_code_id uuid REFERENCES fin_tax_codes(id) ON DELETE SET NULL,
  tax_amount decimal(15,2) DEFAULT 0,
  line_total decimal(15,2) NOT NULL,
  account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Payments Received
CREATE TABLE IF NOT EXISTS fin_payments_received (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  payment_number text,
  payment_date date NOT NULL,
  customer_id uuid NOT NULL REFERENCES crm_customers(id) ON DELETE RESTRICT,
  payment_method text CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'credit_card', 'debit_card', 'upi', 'wallet', 'other')),
  reference_number text,
  amount_received decimal(15,2) NOT NULL,
  currency text DEFAULT 'INR',
  exchange_rate decimal(10,4) DEFAULT 1,
  bank_account_id uuid REFERENCES fin_bank_accounts(id) ON DELETE SET NULL,
  deposit_to_account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  notes text,
  journal_entry_id uuid REFERENCES fin_journal_entries(id) ON DELETE SET NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, payment_number)
);

-- Payment Allocations
CREATE TABLE IF NOT EXISTS fin_payment_allocations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_id uuid NOT NULL REFERENCES fin_payments_received(id) ON DELETE CASCADE,
  invoice_id uuid NOT NULL REFERENCES fin_invoices(id) ON DELETE CASCADE,
  allocated_amount decimal(15,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Bills
CREATE TABLE IF NOT EXISTS fin_bills (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  bill_number text,
  bill_date date NOT NULL,
  due_date date,
  vendor_id uuid NOT NULL REFERENCES mfg_vendors(id) ON DELETE RESTRICT,
  vendor_invoice_number text,
  purchase_order_id uuid REFERENCES mfg_purchase_orders(id) ON DELETE SET NULL,
  bill_status text DEFAULT 'draft' CHECK (bill_status IN (
    'draft', 'submitted', 'partially_paid', 'paid', 'overdue', 'cancelled'
  )),
  subtotal decimal(15,2) NOT NULL,
  discount_amount decimal(15,2) DEFAULT 0,
  tax_amount decimal(15,2) DEFAULT 0,
  total_amount decimal(15,2) NOT NULL,
  paid_amount decimal(15,2) DEFAULT 0,
  balance_due decimal(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
  currency text DEFAULT 'INR',
  exchange_rate decimal(10,4) DEFAULT 1,
  payment_terms text,
  notes text,
  journal_entry_id uuid REFERENCES fin_journal_entries(id) ON DELETE SET NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, bill_number)
);

-- Bill Items
CREATE TABLE IF NOT EXISTS fin_bill_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id uuid NOT NULL REFERENCES fin_bills(id) ON DELETE CASCADE,
  product_id uuid REFERENCES mfg_products(id) ON DELETE SET NULL,
  item_description text NOT NULL,
  quantity decimal(15,3) DEFAULT 1,
  unit_price decimal(15,2) NOT NULL,
  discount_percentage decimal(5,2) DEFAULT 0,
  tax_code_id uuid REFERENCES fin_tax_codes(id) ON DELETE SET NULL,
  tax_amount decimal(15,2) DEFAULT 0,
  line_total decimal(15,2) NOT NULL,
  account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Payments Made
CREATE TABLE IF NOT EXISTS fin_payments_made (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  payment_number text,
  payment_date date NOT NULL,
  vendor_id uuid NOT NULL REFERENCES mfg_vendors(id) ON DELETE RESTRICT,
  payment_method text CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'credit_card', 'debit_card', 'upi', 'wallet', 'other')),
  reference_number text,
  amount_paid decimal(15,2) NOT NULL,
  currency text DEFAULT 'INR',
  exchange_rate decimal(10,4) DEFAULT 1,
  bank_account_id uuid REFERENCES fin_bank_accounts(id) ON DELETE SET NULL,
  payment_from_account_id uuid REFERENCES fin_chart_of_accounts(id) ON DELETE SET NULL,
  notes text,
  journal_entry_id uuid REFERENCES fin_journal_entries(id) ON DELETE SET NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, payment_number)
);

-- Bill Payment Allocations
CREATE TABLE IF NOT EXISTS fin_bill_payment_allocations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_id uuid NOT NULL REFERENCES fin_payments_made(id) ON DELETE CASCADE,
  bill_id uuid NOT NULL REFERENCES fin_bills(id) ON DELETE CASCADE,
  allocated_amount decimal(15,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Bank Transactions
CREATE TABLE IF NOT EXISTS fin_bank_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  bank_account_id uuid NOT NULL REFERENCES fin_bank_accounts(id) ON DELETE CASCADE,
  transaction_date date NOT NULL,
  transaction_type text CHECK (transaction_type IN ('deposit', 'withdrawal', 'transfer', 'fee', 'interest', 'other')),
  description text,
  reference_number text,
  debit_amount decimal(15,2) DEFAULT 0,
  credit_amount decimal(15,2) DEFAULT 0,
  balance decimal(15,2),
  is_reconciled boolean DEFAULT false,
  reconciliation_id uuid,
  matched_entry_id uuid REFERENCES fin_journal_entries(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_fin_invoices_customer ON fin_invoices(customer_id);
CREATE INDEX idx_fin_invoices_status ON fin_invoices(invoice_status);
CREATE INDEX idx_fin_bills_vendor ON fin_bills(vendor_id);
CREATE INDEX idx_fin_bank_transactions_account ON fin_bank_transactions(bank_account_id, transaction_date);

-- Enable RLS
ALTER TABLE fin_fiscal_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_journal_entry_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_tax_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_payments_received ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_payment_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_payments_made ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_bill_payment_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE fin_bank_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view invoices in company"
  ON fin_invoices FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Authorized users can manage invoices"
  ON fin_invoices FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Finance team can view financial data"
  ON fin_journal_entries FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'accountant', 'manager')));

CREATE POLICY "Finance team can manage financial data"
  ON fin_journal_entries FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'accountant')))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'accountant')));

-- Triggers
CREATE TRIGGER update_fin_invoices_updated_at BEFORE UPDATE ON fin_invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fin_bills_updated_at BEFORE UPDATE ON fin_bills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
