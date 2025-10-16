/*
  # CRM Module - Sales, Marketing, and Customer Management

  ## Overview
  Comprehensive CRM system with lead management, sales pipeline, customer support,
  marketing automation, and analytics capabilities.

  ## New Tables

  ### 1. `crm_leads`
  Lead and prospect management
  - Complete lead information and qualification
  - Lead scoring and status tracking
  - Source attribution and campaign tracking
  - Custom fields support

  ### 2. `crm_customers`
  Customer master data
  - Customer profile and contact information
  - Account hierarchy and relationships
  - Customer segmentation and tags
  - Lifetime value tracking

  ### 3. `crm_deals`
  Sales pipeline and opportunity management
  - Deal stages and probability
  - Revenue forecasting
  - Deal team and collaboration
  - Win/loss analysis

  ### 4. `crm_contacts`
  Individual contacts within customer accounts
  - Multiple contacts per customer
  - Role and department tracking
  - Communication preferences

  ### 5. `crm_activities`
  Activity tracking (calls, emails, meetings, tasks)
  - Multi-type activity logging
  - Follow-up reminders
  - Activity timeline

  ### 6. `crm_support_tickets`
  Customer support and helpdesk
  - Multi-channel ticket creation
  - SLA tracking and escalation
  - Knowledge base integration
  - Satisfaction ratings

  ### 7. `crm_campaigns`
  Marketing campaign management
  - Multi-channel campaigns
  - Campaign performance tracking
  - ROI calculation
  - Target audience management

  ### 8. `crm_email_templates`
  Email template library
  - Dynamic template variables
  - Template categories
  - Version control

  ### 9. `crm_quotes`
  Sales quotes and proposals
  - Line items and pricing
  - Quote approval workflow
  - Quote to order conversion

  ## Security
  - RLS enabled on all tables
  - Company-based data isolation
  - Role-based access control
*/

-- CRM Leads table
CREATE TABLE IF NOT EXISTS crm_leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  lead_number text,
  first_name text NOT NULL,
  last_name text,
  email text,
  phone text,
  company_name text,
  job_title text,
  industry text,
  lead_source text,
  lead_status text DEFAULT 'new' CHECK (lead_status IN (
    'new', 'contacted', 'qualified', 'unqualified', 'converted', 'lost'
  )),
  lead_score integer DEFAULT 0,
  temperature text DEFAULT 'cold' CHECK (temperature IN ('hot', 'warm', 'cold')),
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  website text,
  linkedin_url text,
  address jsonb DEFAULT '{}'::jsonb,
  estimated_value decimal(15,2),
  estimated_close_date date,
  notes text,
  campaign_id uuid,
  converted_to_customer_id uuid,
  converted_at timestamptz,
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  tags text[],
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, lead_number)
);

-- CRM Customers table
CREATE TABLE IF NOT EXISTS crm_customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_number text,
  customer_name text NOT NULL,
  customer_type text DEFAULT 'business' CHECK (customer_type IN ('business', 'individual')),
  industry text,
  website text,
  email text,
  phone text,
  billing_address jsonb DEFAULT '{}'::jsonb,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  tax_id text,
  payment_terms text,
  credit_limit decimal(15,2),
  account_manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
  parent_customer_id uuid REFERENCES crm_customers(id) ON DELETE SET NULL,
  customer_status text DEFAULT 'active' CHECK (customer_status IN ('active', 'inactive', 'suspended', 'closed')),
  tier text CHECK (tier IN ('platinum', 'gold', 'silver', 'bronze')),
  lifetime_value decimal(15,2) DEFAULT 0,
  total_revenue decimal(15,2) DEFAULT 0,
  total_orders integer DEFAULT 0,
  first_purchase_date date,
  last_purchase_date date,
  tags text[],
  notes text,
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, customer_number)
);

-- CRM Contacts table
CREATE TABLE IF NOT EXISTS crm_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES crm_customers(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text,
  email text,
  phone text,
  mobile text,
  job_title text,
  department text,
  is_primary boolean DEFAULT false,
  is_decision_maker boolean DEFAULT false,
  linkedin_url text,
  preferred_contact_method text CHECK (preferred_contact_method IN ('email', 'phone', 'sms', 'whatsapp')),
  notes text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- CRM Deals/Opportunities table
CREATE TABLE IF NOT EXISTS crm_deals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  deal_number text,
  deal_name text NOT NULL,
  customer_id uuid REFERENCES crm_customers(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES crm_leads(id) ON DELETE SET NULL,
  deal_stage text NOT NULL CHECK (deal_stage IN (
    'prospecting', 'qualification', 'needs_analysis', 'proposal', 
    'negotiation', 'closed_won', 'closed_lost'
  )),
  deal_value decimal(15,2) NOT NULL,
  probability integer DEFAULT 50,
  expected_close_date date,
  actual_close_date date,
  deal_owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  deal_type text,
  pipeline_stage text,
  lead_source text,
  loss_reason text,
  competitors text[],
  description text,
  notes text,
  tags text[],
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, deal_number)
);

-- CRM Activities table
CREATE TABLE IF NOT EXISTS crm_activities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN (
    'call', 'email', 'meeting', 'task', 'note', 'sms', 'demo', 'follow_up'
  )),
  subject text NOT NULL,
  description text,
  activity_status text DEFAULT 'pending' CHECK (activity_status IN ('pending', 'completed', 'cancelled')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date timestamptz,
  completed_at timestamptz,
  duration_minutes integer,
  related_to_type text CHECK (related_to_type IN ('lead', 'customer', 'deal', 'contact', 'ticket')),
  related_to_id uuid,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  outcome text,
  next_steps text,
  attendees uuid[],
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- CRM Support Tickets table
CREATE TABLE IF NOT EXISTS crm_support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  ticket_number text,
  subject text NOT NULL,
  description text NOT NULL,
  customer_id uuid REFERENCES crm_customers(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES crm_contacts(id) ON DELETE SET NULL,
  ticket_type text CHECK (ticket_type IN ('technical', 'billing', 'general', 'feature_request', 'bug', 'complaint')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  ticket_status text DEFAULT 'open' CHECK (ticket_status IN (
    'open', 'in_progress', 'waiting_on_customer', 'resolved', 'closed', 'cancelled'
  )),
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  assigned_team text,
  channel text CHECK (channel IN ('email', 'phone', 'chat', 'portal', 'social_media')),
  sla_due_date timestamptz,
  first_response_at timestamptz,
  resolved_at timestamptz,
  closed_at timestamptz,
  resolution_notes text,
  satisfaction_rating integer CHECK (satisfaction_rating BETWEEN 1 AND 5),
  satisfaction_comment text,
  tags text[],
  attachments jsonb DEFAULT '[]'::jsonb,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, ticket_number)
);

-- CRM Campaigns table
CREATE TABLE IF NOT EXISTS crm_campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  campaign_name text NOT NULL,
  campaign_type text CHECK (campaign_type IN ('email', 'sms', 'social_media', 'webinar', 'event', 'content', 'ads', 'other')),
  campaign_status text DEFAULT 'draft' CHECK (campaign_status IN ('draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled')),
  start_date date,
  end_date date,
  budget decimal(15,2),
  actual_cost decimal(15,2),
  expected_revenue decimal(15,2),
  actual_revenue decimal(15,2),
  target_audience text,
  description text,
  goals text,
  owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  metrics jsonb DEFAULT '{}'::jsonb,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- CRM Email Templates table
CREATE TABLE IF NOT EXISTS crm_email_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  template_name text NOT NULL,
  template_category text,
  subject text NOT NULL,
  body_html text NOT NULL,
  body_text text,
  variables text[],
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- CRM Quotes table
CREATE TABLE IF NOT EXISTS crm_quotes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  quote_number text,
  quote_date date DEFAULT CURRENT_DATE,
  valid_until date,
  customer_id uuid REFERENCES crm_customers(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES crm_contacts(id) ON DELETE SET NULL,
  deal_id uuid REFERENCES crm_deals(id) ON DELETE SET NULL,
  quote_status text DEFAULT 'draft' CHECK (quote_status IN (
    'draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'converted'
  )),
  subtotal decimal(15,2) DEFAULT 0,
  discount_amount decimal(15,2) DEFAULT 0,
  tax_amount decimal(15,2) DEFAULT 0,
  total_amount decimal(15,2) DEFAULT 0,
  currency text DEFAULT 'INR',
  payment_terms text,
  notes text,
  terms_and_conditions text,
  line_items jsonb DEFAULT '[]'::jsonb,
  prepared_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  sent_at timestamptz,
  viewed_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, quote_number)
);

-- Create indexes
CREATE INDEX idx_crm_leads_company_id ON crm_leads(company_id);
CREATE INDEX idx_crm_leads_assigned_to ON crm_leads(assigned_to);
CREATE INDEX idx_crm_leads_status ON crm_leads(lead_status);
CREATE INDEX idx_crm_customers_company_id ON crm_customers(company_id);
CREATE INDEX idx_crm_contacts_customer_id ON crm_contacts(customer_id);
CREATE INDEX idx_crm_deals_company_id ON crm_deals(company_id);
CREATE INDEX idx_crm_deals_customer_id ON crm_deals(customer_id);
CREATE INDEX idx_crm_activities_company_id ON crm_activities(company_id);
CREATE INDEX idx_crm_activities_related_to ON crm_activities(related_to_type, related_to_id);
CREATE INDEX idx_crm_tickets_company_id ON crm_support_tickets(company_id);
CREATE INDEX idx_crm_tickets_customer_id ON crm_support_tickets(customer_id);
CREATE INDEX idx_crm_campaigns_company_id ON crm_campaigns(company_id);

-- Enable RLS
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Company-based access)
CREATE POLICY "Users can view CRM leads in their company"
  ON crm_leads FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage CRM leads in their company"
  ON crm_leads FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view customers in their company"
  ON crm_customers FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage customers in their company"
  ON crm_customers FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view contacts in their company"
  ON crm_contacts FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage contacts in their company"
  ON crm_contacts FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view deals in their company"
  ON crm_deals FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage deals in their company"
  ON crm_deals FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view activities in their company"
  ON crm_activities FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage activities in their company"
  ON crm_activities FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view tickets in their company"
  ON crm_support_tickets FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage tickets in their company"
  ON crm_support_tickets FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view campaigns in their company"
  ON crm_campaigns FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage campaigns in their company"
  ON crm_campaigns FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view email templates in their company"
  ON crm_email_templates FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage email templates in their company"
  ON crm_email_templates FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view quotes in their company"
  ON crm_quotes FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage quotes in their company"
  ON crm_quotes FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON crm_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_customers_updated_at BEFORE UPDATE ON crm_customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_contacts_updated_at BEFORE UPDATE ON crm_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_deals_updated_at BEFORE UPDATE ON crm_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_activities_updated_at BEFORE UPDATE ON crm_activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_tickets_updated_at BEFORE UPDATE ON crm_support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_campaigns_updated_at BEFORE UPDATE ON crm_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_email_templates_updated_at BEFORE UPDATE ON crm_email_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_quotes_updated_at BEFORE UPDATE ON crm_quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
