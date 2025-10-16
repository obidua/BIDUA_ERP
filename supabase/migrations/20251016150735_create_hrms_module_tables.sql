/*
  # HRMS Module - Human Resource Management System

  ## Overview
  Comprehensive HR management with recruitment, attendance, leave, payroll,
  performance, training, and employee lifecycle management.

  ## New Tables

  ### 1. `hrms_employees`
  Extended employee information (supplements users table)
  - Personal details and documentation
  - Bank account information
  - Emergency contacts
  - Employment history

  ### 2. `hrms_attendance`
  Time and attendance tracking
  - Clock in/out with geofencing
  - Break tracking
  - Overtime calculation
  - Shift management

  ### 3. `hrms_leaves`
  Leave management system
  - Multiple leave types
  - Leave balance tracking
  - Approval workflow
  - Leave calendar

  ### 4. `hrms_leave_types`
  Configurable leave type definitions
  - Annual, sick, casual, maternity, etc.
  - Leave accrual rules
  - Company-specific leave policies

  ### 5. `hrms_payroll`
  Payroll processing and salary management
  - Salary components (earnings/deductions)
  - Payroll runs
  - Tax calculations
  - Statutory compliance

  ### 6. `hrms_salary_components`
  Salary structure components
  - Basic, allowances, deductions
  - Formula-based calculations
  - Statutory components (PF, ESI, Tax)

  ### 7. `hrms_performance_reviews`
  Performance management and appraisals
  - Goal setting and tracking
  - 360-degree feedback
  - Rating scales
  - Performance improvement plans

  ### 8. `hrms_goals`
  Employee goals and OKRs
  - Individual and team goals
  - Progress tracking
  - Alignment with company objectives

  ### 9. `hrms_trainings`
  Training and development programs
  - Training courses
  - Attendance tracking
  - Certification management
  - Skill development

  ### 10. `hrms_job_postings`
  Recruitment and hiring
  - Job requisitions
  - Applicant tracking
  - Interview management
  - Offer management

  ### 11. `hrms_candidates`
  Candidate database
  - Resume database
  - Candidate pipeline
  - Communication history

  ### 12. `hrms_documents`
  Employee document management
  - Document categories
  - Version control
  - Expiry tracking
  - Secure storage

  ### 13. `hrms_expenses`
  Employee expense management
  - Expense claims
  - Approval workflow
  - Reimbursement tracking
  - Policy compliance

  ### 14. `hrms_shifts`
  Shift and roster management
  - Multiple shift patterns
  - Shift swaps
  - Rotation schedules

  ## Security
  - RLS enabled on all tables
  - Employees can view their own records
  - HR/Managers have broader access
  - Sensitive data protection
*/

-- HRMS Extended Employee Information
CREATE TABLE IF NOT EXISTS hrms_employees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  personal_email text,
  marital_status text CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed', 'other')),
  nationality text,
  blood_group text,
  identification_number text,
  passport_number text,
  passport_expiry date,
  work_permit_number text,
  work_permit_expiry date,
  bank_account_number text,
  bank_name text,
  bank_ifsc_code text,
  bank_branch text,
  pan_number text,
  aadhar_number text,
  pf_number text,
  esi_number text,
  uan_number text,
  previous_employment jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  skills text[],
  languages text[],
  hobbies text[],
  probation_end_date date,
  confirmation_date date,
  resignation_date date,
  last_working_date date,
  exit_reason text,
  exit_interview_notes text,
  rehire_eligible boolean DEFAULT true,
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Leave Types
CREATE TABLE IF NOT EXISTS hrms_leave_types (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  leave_name text NOT NULL,
  leave_code text NOT NULL,
  description text,
  days_per_year decimal(5,2),
  max_consecutive_days integer,
  min_days_notice integer,
  max_carry_forward decimal(5,2),
  is_paid boolean DEFAULT true,
  requires_attachment boolean DEFAULT false,
  gender_specific text CHECK (gender_specific IN ('all', 'male', 'female')),
  applicable_after_days integer DEFAULT 0,
  color text DEFAULT '#3B82F6',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, leave_code)
);

-- HRMS Leaves
CREATE TABLE IF NOT EXISTS hrms_leaves (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  leave_type_id uuid NOT NULL REFERENCES hrms_leave_types(id) ON DELETE RESTRICT,
  start_date date NOT NULL,
  end_date date NOT NULL,
  days_count decimal(5,2) NOT NULL,
  half_day boolean DEFAULT false,
  half_day_period text CHECK (half_day_period IN ('first_half', 'second_half')),
  reason text NOT NULL,
  leave_status text DEFAULT 'pending' CHECK (leave_status IN (
    'pending', 'approved', 'rejected', 'cancelled', 'withdrawn'
  )),
  applied_at timestamptz DEFAULT now(),
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  rejection_reason text,
  attachment_url text,
  delegate_to uuid REFERENCES users(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Shifts
CREATE TABLE IF NOT EXISTS hrms_shifts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  shift_name text NOT NULL,
  shift_code text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  grace_period_minutes integer DEFAULT 0,
  break_duration_minutes integer DEFAULT 0,
  working_hours decimal(5,2),
  is_night_shift boolean DEFAULT false,
  days_of_week integer[] DEFAULT '{1,2,3,4,5}'::integer[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, shift_code)
);

-- HRMS Attendance
CREATE TABLE IF NOT EXISTS hrms_attendance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  attendance_date date NOT NULL,
  shift_id uuid REFERENCES hrms_shifts(id) ON DELETE SET NULL,
  clock_in_time timestamptz,
  clock_out_time timestamptz,
  clock_in_location text,
  clock_out_location text,
  clock_in_coordinates point,
  clock_out_coordinates point,
  is_within_geofence boolean,
  work_duration_minutes integer,
  break_duration_minutes integer DEFAULT 0,
  overtime_minutes integer DEFAULT 0,
  attendance_status text DEFAULT 'pending' CHECK (attendance_status IN (
    'present', 'absent', 'half_day', 'late', 'on_leave', 'holiday', 'weekend', 'pending'
  )),
  late_by_minutes integer DEFAULT 0,
  early_departure_minutes integer DEFAULT 0,
  notes text,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, employee_id, attendance_date)
);

-- HRMS Salary Components
CREATE TABLE IF NOT EXISTS hrms_salary_components (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  component_name text NOT NULL,
  component_code text NOT NULL,
  component_type text NOT NULL CHECK (component_type IN ('earning', 'deduction', 'employer_contribution')),
  calculation_type text DEFAULT 'fixed' CHECK (calculation_type IN ('fixed', 'percentage', 'formula')),
  calculation_value decimal(15,2),
  calculation_formula text,
  is_taxable boolean DEFAULT true,
  is_statutory boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, component_code)
);

-- HRMS Payroll
CREATE TABLE IF NOT EXISTS hrms_payroll (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pay_period_start date NOT NULL,
  pay_period_end date NOT NULL,
  payment_date date,
  basic_salary decimal(15,2) NOT NULL,
  gross_salary decimal(15,2) NOT NULL,
  total_earnings decimal(15,2) NOT NULL,
  total_deductions decimal(15,2) NOT NULL,
  net_salary decimal(15,2) NOT NULL,
  earnings_breakdown jsonb DEFAULT '{}'::jsonb,
  deductions_breakdown jsonb DEFAULT '{}'::jsonb,
  days_worked decimal(5,2),
  days_in_month integer,
  leaves_taken decimal(5,2),
  overtime_hours decimal(5,2),
  overtime_amount decimal(15,2) DEFAULT 0,
  bonus_amount decimal(15,2) DEFAULT 0,
  payroll_status text DEFAULT 'draft' CHECK (payroll_status IN (
    'draft', 'processed', 'approved', 'paid', 'on_hold', 'cancelled'
  )),
  payment_method text CHECK (payment_method IN ('bank_transfer', 'cash', 'cheque', 'wallet')),
  payment_reference text,
  notes text,
  processed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, employee_id, pay_period_start, pay_period_end)
);

-- HRMS Goals
CREATE TABLE IF NOT EXISTS hrms_goals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_title text NOT NULL,
  goal_description text,
  goal_type text CHECK (goal_type IN ('individual', 'team', 'company')),
  goal_category text,
  start_date date,
  target_date date,
  completion_date date,
  progress_percentage integer DEFAULT 0,
  goal_status text DEFAULT 'in_progress' CHECK (goal_status IN (
    'not_started', 'in_progress', 'completed', 'cancelled', 'on_hold'
  )),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  measurement_criteria text,
  current_value text,
  target_value text,
  weightage integer DEFAULT 100,
  parent_goal_id uuid REFERENCES hrms_goals(id) ON DELETE SET NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Performance Reviews
CREATE TABLE IF NOT EXISTS hrms_performance_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  review_period_start date NOT NULL,
  review_period_end date NOT NULL,
  review_type text CHECK (review_type IN ('annual', 'mid_year', 'quarterly', 'probation', '360_degree')),
  overall_rating decimal(3,2),
  technical_rating decimal(3,2),
  communication_rating decimal(3,2),
  teamwork_rating decimal(3,2),
  leadership_rating decimal(3,2),
  strengths text,
  areas_of_improvement text,
  achievements text,
  goals_for_next_period text,
  reviewer_comments text,
  employee_comments text,
  review_status text DEFAULT 'draft' CHECK (review_status IN (
    'draft', 'submitted', 'acknowledged', 'completed'
  )),
  submitted_at timestamptz,
  acknowledged_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Trainings
CREATE TABLE IF NOT EXISTS hrms_trainings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  training_name text NOT NULL,
  training_type text CHECK (training_type IN ('technical', 'soft_skills', 'compliance', 'safety', 'leadership', 'product', 'other')),
  trainer_name text,
  trainer_type text CHECK (trainer_type IN ('internal', 'external')),
  training_mode text CHECK (training_mode IN ('online', 'offline', 'hybrid')),
  start_date date,
  end_date date,
  duration_hours decimal(5,2),
  location text,
  max_participants integer,
  cost_per_participant decimal(15,2),
  description text,
  objectives text,
  prerequisites text,
  materials_url text,
  training_status text DEFAULT 'scheduled' CHECK (training_status IN (
    'scheduled', 'in_progress', 'completed', 'cancelled'
  )),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Training Attendees
CREATE TABLE IF NOT EXISTS hrms_training_attendees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  training_id uuid NOT NULL REFERENCES hrms_trainings(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  registration_status text DEFAULT 'registered' CHECK (registration_status IN (
    'registered', 'attended', 'absent', 'cancelled'
  )),
  attendance_percentage decimal(5,2),
  assessment_score decimal(5,2),
  feedback_rating integer CHECK (feedback_rating BETWEEN 1 AND 5),
  feedback_comments text,
  certificate_issued boolean DEFAULT false,
  certificate_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(training_id, employee_id)
);

-- HRMS Job Postings
CREATE TABLE IF NOT EXISTS hrms_job_postings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  job_title text NOT NULL,
  job_code text,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  hiring_manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
  employment_type text CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern', 'consultant')),
  job_location text,
  remote_allowed boolean DEFAULT false,
  experience_required text,
  min_salary decimal(15,2),
  max_salary decimal(15,2),
  positions_available integer DEFAULT 1,
  job_description text,
  requirements text,
  responsibilities text,
  benefits text,
  skills_required text[],
  posting_date date DEFAULT CURRENT_DATE,
  closing_date date,
  job_status text DEFAULT 'draft' CHECK (job_status IN (
    'draft', 'active', 'on_hold', 'closed', 'filled'
  )),
  application_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, job_code)
);

-- HRMS Candidates
CREATE TABLE IF NOT EXISTS hrms_candidates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  job_posting_id uuid REFERENCES hrms_job_postings(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text,
  current_location text,
  preferred_location text,
  current_company text,
  current_designation text,
  total_experience_years decimal(4,1),
  current_ctc decimal(15,2),
  expected_ctc decimal(15,2),
  notice_period_days integer,
  resume_url text,
  linkedin_url text,
  portfolio_url text,
  skills text[],
  source text,
  candidate_status text DEFAULT 'applied' CHECK (candidate_status IN (
    'applied', 'screening', 'shortlisted', 'interview_scheduled', 
    'interviewed', 'offered', 'rejected', 'hired', 'withdrawn'
  )),
  rating integer CHECK (rating BETWEEN 1 AND 5),
  notes text,
  applied_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Interviews
CREATE TABLE IF NOT EXISTS hrms_interviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id uuid NOT NULL REFERENCES hrms_candidates(id) ON DELETE CASCADE,
  job_posting_id uuid REFERENCES hrms_job_postings(id) ON DELETE SET NULL,
  interview_round text,
  interview_type text CHECK (interview_type IN ('phone', 'video', 'in_person', 'technical', 'hr', 'managerial')),
  interview_date date,
  interview_time time,
  duration_minutes integer,
  interviewer_ids uuid[],
  location text,
  meeting_link text,
  interview_status text DEFAULT 'scheduled' CHECK (interview_status IN (
    'scheduled', 'completed', 'cancelled', 'rescheduled', 'no_show'
  )),
  feedback text,
  rating integer CHECK (rating BETWEEN 1 AND 5),
  recommendation text CHECK (recommendation IN ('strong_hire', 'hire', 'maybe', 'no_hire', 'strong_no_hire')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Documents
CREATE TABLE IF NOT EXISTS hrms_documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid REFERENCES users(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text CHECK (document_type IN (
    'resume', 'offer_letter', 'appointment_letter', 'contract', 'salary_slip',
    'form_16', 'experience_letter', 'relieving_letter', 'id_proof', 'address_proof',
    'education_certificate', 'bank_details', 'pf_documents', 'tax_documents', 'other'
  )),
  document_url text NOT NULL,
  file_size integer,
  mime_type text,
  version integer DEFAULT 1,
  is_verified boolean DEFAULT false,
  verified_by uuid REFERENCES users(id) ON DELETE SET NULL,
  verified_at timestamptz,
  expiry_date date,
  is_public boolean DEFAULT false,
  tags text[],
  uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- HRMS Expenses
CREATE TABLE IF NOT EXISTS hrms_expenses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expense_number text,
  expense_date date NOT NULL,
  expense_category text,
  merchant_name text,
  amount decimal(15,2) NOT NULL,
  currency text DEFAULT 'INR',
  description text,
  receipt_url text,
  billable_to_client boolean DEFAULT false,
  client_id uuid,
  project_id uuid,
  expense_status text DEFAULT 'draft' CHECK (expense_status IN (
    'draft', 'submitted', 'approved', 'rejected', 'reimbursed'
  )),
  submitted_at timestamptz,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  rejection_reason text,
  reimbursed_at timestamptz,
  payment_reference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, expense_number)
);

-- Create indexes
CREATE INDEX idx_hrms_employees_user_id ON hrms_employees(user_id);
CREATE INDEX idx_hrms_employees_company_id ON hrms_employees(company_id);
CREATE INDEX idx_hrms_leaves_employee_id ON hrms_leaves(employee_id);
CREATE INDEX idx_hrms_leaves_status ON hrms_leaves(leave_status);
CREATE INDEX idx_hrms_attendance_employee_date ON hrms_attendance(employee_id, attendance_date);
CREATE INDEX idx_hrms_payroll_employee_id ON hrms_payroll(employee_id);
CREATE INDEX idx_hrms_payroll_period ON hrms_payroll(pay_period_start, pay_period_end);
CREATE INDEX idx_hrms_goals_employee_id ON hrms_goals(employee_id);
CREATE INDEX idx_hrms_reviews_employee_id ON hrms_performance_reviews(employee_id);
CREATE INDEX idx_hrms_candidates_job_id ON hrms_candidates(job_posting_id);
CREATE INDEX idx_hrms_documents_employee_id ON hrms_documents(employee_id);
CREATE INDEX idx_hrms_expenses_employee_id ON hrms_expenses(employee_id);

-- Enable RLS on all HRMS tables
ALTER TABLE hrms_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_salary_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_training_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Sample - employees can view their own data, HR/managers have broader access)

-- Employees: View own records, HR/Managers: View all
CREATE POLICY "Employees can view own extended info"
  ON hrms_employees FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
    )
  );

CREATE POLICY "HR can manage employee info"
  ON hrms_employees FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr')
    )
  );

-- Leave policies
CREATE POLICY "Employees can view own leaves"
  ON hrms_leaves FOR SELECT
  TO authenticated
  USING (
    employee_id = auth.uid() OR
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
    )
  );

CREATE POLICY "Employees can apply for leaves"
  ON hrms_leaves FOR INSERT
  TO authenticated
  WITH CHECK (employee_id = auth.uid());

CREATE POLICY "HR/Managers can manage leaves"
  ON hrms_leaves FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
    )
  );

-- Attendance policies
CREATE POLICY "Employees can view own attendance"
  ON hrms_attendance FOR SELECT
  TO authenticated
  USING (
    employee_id = auth.uid() OR
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')
    )
  );

CREATE POLICY "Employees can mark attendance"
  ON hrms_attendance FOR INSERT
  TO authenticated
  WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Employees can update own attendance"
  ON hrms_attendance FOR UPDATE
  TO authenticated
  USING (employee_id = auth.uid())
  WITH CHECK (employee_id = auth.uid());

CREATE POLICY "HR can manage all attendance"
  ON hrms_attendance FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr')
    )
  );

-- Payroll policies (sensitive data)
CREATE POLICY "Employees can view own payroll"
  ON hrms_payroll FOR SELECT
  TO authenticated
  USING (
    employee_id = auth.uid() OR
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'accountant')
    )
  );

CREATE POLICY "HR/Accountants can manage payroll"
  ON hrms_payroll FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'accountant')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr', 'accountant')
    )
  );

-- Generic policies for other tables (company-based access)
CREATE POLICY "Users can view leave types in company"
  ON hrms_leave_types FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "HR can manage leave types"
  ON hrms_leave_types FOR ALL
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr')
    )
  )
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'hr')
    )
  );

-- Similar policies for other tables (abbreviated for brevity)
CREATE POLICY "Company users can view goals"
  ON hrms_goals FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage own goals"
  ON hrms_goals FOR ALL
  TO authenticated
  USING (employee_id = auth.uid() OR company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')))
  WITH CHECK (employee_id = auth.uid() OR company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'hr', 'manager')));

CREATE POLICY "Company users can view documents"
  ON hrms_documents FOR SELECT
  TO authenticated
  USING (
    employee_id = auth.uid() OR is_public = true OR
    company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'hr'))
  );

CREATE POLICY "Users can manage own documents"
  ON hrms_documents FOR ALL
  TO authenticated
  USING (employee_id = auth.uid() OR company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'hr')))
  WITH CHECK (employee_id = auth.uid() OR company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'hr')));

-- Triggers for updated_at columns
CREATE TRIGGER update_hrms_employees_updated_at BEFORE UPDATE ON hrms_employees
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hrms_leaves_updated_at BEFORE UPDATE ON hrms_leaves
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hrms_attendance_updated_at BEFORE UPDATE ON hrms_attendance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hrms_payroll_updated_at BEFORE UPDATE ON hrms_payroll
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hrms_goals_updated_at BEFORE UPDATE ON hrms_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hrms_reviews_updated_at BEFORE UPDATE ON hrms_performance_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hrms_expenses_updated_at BEFORE UPDATE ON hrms_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
