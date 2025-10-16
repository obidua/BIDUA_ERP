/*
  # Multi-Tenant ERP System - Company and Authentication Setup

  ## Overview
  This migration establishes the foundation for a multi-tenant ERP/CRM/HRM system
  that can serve manufacturers, IT companies, service providers, and more.

  ## New Tables
  
  ### 1. `companies`
  Central tenant/organization table
  - `id` (uuid, primary key)
  - `name` (text) - Company name
  - `industry_type` (text) - Manufacturing, IT, Services, Retail, Healthcare, etc.
  - `company_size` (text) - Small, Medium, Large, Enterprise
  - `subscription_plan` (text) - Basic, Professional, Enterprise, Custom
  - `subscription_status` (text) - trial, active, suspended, cancelled
  - `logo_url` (text) - Company logo
  - `primary_color` (text) - Brand color for white-label
  - `currency` (text) - Default currency (INR, USD, EUR, etc.)
  - `timezone` (text) - Company timezone
  - `country` (text) - Operating country for compliance
  - `tax_id` (text) - GST/VAT/Tax registration number
  - `address` (jsonb) - Complete address object
  - `contact_info` (jsonb) - Phone, email, website
  - `enabled_modules` (jsonb) - Array of enabled modules
  - `settings` (jsonb) - Company-specific settings
  - `trial_ends_at` (timestamptz) - Trial expiry date
  - `subscription_ends_at` (timestamptz) - Subscription renewal date
  - `is_active` (boolean) - Account status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `users`
  Extended user table (links to auth.users)
  - `id` (uuid, primary key, references auth.users)
  - `company_id` (uuid, references companies)
  - `employee_id` (text) - Company employee ID
  - `username` (text, unique)
  - `full_name` (text)
  - `email` (text, unique)
  - `phone` (text)
  - `avatar_url` (text)
  - `role` (text) - super_admin, admin, manager, employee, etc.
  - `department_id` (uuid, references departments)
  - `designation` (text)
  - `manager_id` (uuid, references users)
  - `date_of_birth` (date)
  - `gender` (text)
  - `address` (jsonb)
  - `emergency_contact` (jsonb)
  - `joining_date` (date)
  - `employment_type` (text) - full_time, part_time, contract, intern
  - `is_active` (boolean)
  - `last_login` (timestamptz)
  - `preferences` (jsonb) - User preferences
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `departments`
  Department management
  - `id` (uuid, primary key)
  - `company_id` (uuid, references companies)
  - `name` (text) - Sales, Marketing, HR, Production, etc.
  - `code` (text) - Department code
  - `head_id` (uuid, references users) - Department head
  - `parent_department_id` (uuid) - For sub-departments
  - `description` (text)
  - `cost_center` (text) - For accounting
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `roles_permissions`
  Role-based access control
  - `id` (uuid, primary key)
  - `company_id` (uuid, references companies)
  - `role_name` (text) - Custom role name
  - `permissions` (jsonb) - Granular permissions object
  - `description` (text)
  - `is_system_role` (boolean) - System vs custom role
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access data from their company
  - Admins have broader access within their company
  - Super admins can manage multiple companies
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table (Multi-tenant master)
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  industry_type text NOT NULL CHECK (industry_type IN (
    'manufacturing', 'it_software', 'services', 'retail', 'ecommerce',
    'healthcare', 'education', 'construction', 'hospitality', 'logistics',
    'finance', 'real_estate', 'agriculture', 'consulting', 'nonprofit', 'other'
  )),
  company_size text DEFAULT 'small' CHECK (company_size IN ('small', 'medium', 'large', 'enterprise')),
  subscription_plan text DEFAULT 'trial' CHECK (subscription_plan IN ('trial', 'basic', 'professional', 'enterprise', 'custom')),
  subscription_status text DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'suspended', 'cancelled')),
  logo_url text,
  primary_color text DEFAULT '#4F46E5',
  currency text DEFAULT 'INR',
  timezone text DEFAULT 'Asia/Kolkata',
  country text DEFAULT 'India',
  tax_id text,
  address jsonb DEFAULT '{}'::jsonb,
  contact_info jsonb DEFAULT '{}'::jsonb,
  enabled_modules jsonb DEFAULT '["dashboard", "crm", "hrms", "reports", "settings"]'::jsonb,
  settings jsonb DEFAULT '{}'::jsonb,
  trial_ends_at timestamptz,
  subscription_ends_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  code text,
  head_id uuid,
  parent_department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  description text,
  cost_center text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, code)
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id text,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  avatar_url text,
  role text DEFAULT 'employee' CHECK (role IN (
    'super_admin', 'admin', 'manager', 'employee', 'hr', 'accountant', 
    'sales', 'support', 'developer', 'designer', 'analyst', 'custom'
  )),
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  designation text,
  manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  address jsonb DEFAULT '{}'::jsonb,
  emergency_contact jsonb DEFAULT '{}'::jsonb,
  joining_date date DEFAULT CURRENT_DATE,
  employment_type text DEFAULT 'full_time' CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern', 'consultant')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, employee_id)
);

-- Roles and Permissions table
CREATE TABLE IF NOT EXISTS roles_permissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  role_name text NOT NULL,
  permissions jsonb DEFAULT '{}'::jsonb,
  description text,
  is_system_role boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, role_name)
);

-- Add foreign key for department head after users table is created
ALTER TABLE departments ADD CONSTRAINT departments_head_id_fkey 
  FOREIGN KEY (head_id) REFERENCES users(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_department_id ON users(department_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_employee_id ON users(company_id, employee_id);
CREATE INDEX IF NOT EXISTS idx_departments_company_id ON departments(company_id);
CREATE INDEX IF NOT EXISTS idx_roles_company_id ON roles_permissions(company_id);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Users can view their own company"
  ON companies FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their company"
  ON companies FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  );

-- RLS Policies for users
CREATE POLICY "Users can view users in their company"
  ON users FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can manage users in their company"
  ON users FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'hr')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'hr')
    )
  );

-- RLS Policies for departments
CREATE POLICY "Users can view departments in their company"
  ON departments FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'hr')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'hr')
    )
  );

-- RLS Policies for roles_permissions
CREATE POLICY "Users can view roles in their company"
  ON roles_permissions FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    ) OR company_id IS NULL
  );

CREATE POLICY "Admins can manage roles"
  ON roles_permissions FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_permissions_updated_at BEFORE UPDATE ON roles_permissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
