/*
  # Project Management Module - For IT/Software/Service Companies

  ## Overview
  Comprehensive project management system with projects, tasks, sprints,
  time tracking, resource allocation, and collaboration features.

  ## New Tables
  Projects, Tasks, Sprints, Time Tracking, Issues, Releases, etc.

  ## Security
  - RLS enabled on all tables
  - Project-based access control
*/

-- Projects
CREATE TABLE IF NOT EXISTS pm_projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_code text NOT NULL,
  project_name text NOT NULL,
  project_type text CHECK (project_type IN (
    'software_development', 'web_development', 'mobile_app', 'consulting',
    'implementation', 'support', 'research', 'internal', 'other'
  )),
  description text,
  client_id uuid REFERENCES crm_customers(id) ON DELETE SET NULL,
  project_manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  start_date date,
  target_end_date date,
  actual_end_date date,
  project_status text DEFAULT 'planning' CHECK (project_status IN (
    'planning', 'active', 'on_hold', 'completed', 'cancelled', 'archived'
  )),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  budget_amount decimal(15,2),
  actual_cost decimal(15,2) DEFAULT 0,
  billing_type text CHECK (billing_type IN ('fixed_price', 'time_and_material', 'milestone_based', 'retainer', 'non_billable')),
  hourly_rate decimal(10,2),
  estimated_hours decimal(10,2),
  actual_hours decimal(10,2) DEFAULT 0,
  progress_percentage integer DEFAULT 0,
  methodology text CHECK (methodology IN ('waterfall', 'agile', 'scrum', 'kanban', 'hybrid')),
  repository_url text,
  documentation_url text,
  tags text[],
  custom_fields jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, project_code)
);

-- Project Members/Team
CREATE TABLE IF NOT EXISTS pm_project_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_role text CHECK (project_role IN (
    'project_manager', 'tech_lead', 'developer', 'designer', 'qa',
    'business_analyst', 'scrum_master', 'product_owner', 'stakeholder', 'other'
  )),
  allocation_percentage decimal(5,2) DEFAULT 100,
  hourly_rate decimal(10,2),
  start_date date,
  end_date date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Milestones
CREATE TABLE IF NOT EXISTS pm_milestones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  milestone_name text NOT NULL,
  description text,
  target_date date NOT NULL,
  completion_date date,
  milestone_status text DEFAULT 'pending' CHECK (milestone_status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  deliverables text[],
  approval_required boolean DEFAULT false,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  payment_percentage decimal(5,2),
  invoice_amount decimal(15,2),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sprints (for Agile projects)
CREATE TABLE IF NOT EXISTS pm_sprints (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  sprint_name text NOT NULL,
  sprint_number integer,
  sprint_goal text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  sprint_status text DEFAULT 'planned' CHECK (sprint_status IN ('planned', 'active', 'completed', 'cancelled')),
  planned_story_points integer,
  completed_story_points integer DEFAULT 0,
  velocity decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks
CREATE TABLE IF NOT EXISTS pm_tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  task_number text,
  task_title text NOT NULL,
  description text,
  task_type text CHECK (task_type IN ('task', 'story', 'bug', 'feature', 'enhancement', 'documentation', 'research', 'other')),
  parent_task_id uuid REFERENCES pm_tasks(id) ON DELETE SET NULL,
  milestone_id uuid REFERENCES pm_milestones(id) ON DELETE SET NULL,
  sprint_id uuid REFERENCES pm_sprints(id) ON DELETE SET NULL,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  reported_by uuid REFERENCES users(id) ON DELETE SET NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  task_status text DEFAULT 'todo' CHECK (task_status IN (
    'todo', 'in_progress', 'code_review', 'testing', 'blocked', 'completed', 'cancelled'
  )),
  start_date date,
  due_date date,
  completion_date date,
  estimated_hours decimal(10,2),
  actual_hours decimal(10,2) DEFAULT 0,
  story_points integer,
  progress_percentage integer DEFAULT 0,
  dependencies uuid[],
  blocked_reason text,
  tags text[],
  watchers uuid[],
  custom_fields jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, task_number)
);

-- Task Comments
CREATE TABLE IF NOT EXISTS pm_task_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id uuid NOT NULL REFERENCES pm_tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  comment_text text NOT NULL,
  comment_type text DEFAULT 'comment' CHECK (comment_type IN ('comment', 'status_change', 'assignment', 'attachment', 'mention')),
  metadata jsonb DEFAULT '{}'::jsonb,
  is_internal boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Task Attachments
CREATE TABLE IF NOT EXISTS pm_task_attachments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id uuid NOT NULL REFERENCES pm_tasks(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  mime_type text,
  uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Time Entries
CREATE TABLE IF NOT EXISTS pm_time_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  task_id uuid REFERENCES pm_tasks(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entry_date date NOT NULL,
  start_time time,
  end_time time,
  duration_hours decimal(10,2) NOT NULL,
  description text,
  is_billable boolean DEFAULT true,
  billing_rate decimal(10,2),
  billing_amount decimal(15,2),
  time_entry_status text DEFAULT 'draft' CHECK (time_entry_status IN ('draft', 'submitted', 'approved', 'invoiced')),
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Issues/Bugs
CREATE TABLE IF NOT EXISTS pm_issues (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  issue_number text,
  issue_title text NOT NULL,
  description text,
  issue_type text CHECK (issue_type IN ('bug', 'defect', 'incident', 'vulnerability', 'technical_debt')),
  severity text CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  issue_status text DEFAULT 'open' CHECK (issue_status IN (
    'open', 'in_progress', 'resolved', 'closed', 'reopened', 'wont_fix', 'duplicate'
  )),
  reported_by uuid REFERENCES users(id) ON DELETE SET NULL,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  environment text CHECK (environment IN ('production', 'staging', 'development', 'testing')),
  browser text,
  os text,
  steps_to_reproduce text,
  expected_behavior text,
  actual_behavior text,
  resolution text,
  related_task_id uuid REFERENCES pm_tasks(id) ON DELETE SET NULL,
  duplicate_of uuid REFERENCES pm_issues(id) ON DELETE SET NULL,
  reported_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  closed_at timestamptz,
  tags text[],
  attachments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, issue_number)
);

-- Releases/Deployments
CREATE TABLE IF NOT EXISTS pm_releases (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
  release_name text NOT NULL,
  release_number text NOT NULL,
  release_type text CHECK (release_type IN ('major', 'minor', 'patch', 'hotfix')),
  release_status text DEFAULT 'planned' CHECK (release_status IN (
    'planned', 'in_progress', 'testing', 'deployed', 'rolled_back', 'cancelled'
  )),
  environment text CHECK (environment IN ('development', 'staging', 'production')),
  planned_date date,
  actual_date date,
  release_notes text,
  breaking_changes text,
  features text[],
  bug_fixes text[],
  deployed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  repository_tag text,
  build_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, project_id, release_number)
);

-- Create indexes
CREATE INDEX idx_pm_projects_company_id ON pm_projects(company_id);
CREATE INDEX idx_pm_tasks_project_id ON pm_tasks(project_id);
CREATE INDEX idx_pm_tasks_assigned_to ON pm_tasks(assigned_to);
CREATE INDEX idx_pm_time_entries_user ON pm_time_entries(user_id, entry_date);
CREATE INDEX idx_pm_time_entries_project ON pm_time_entries(project_id);
CREATE INDEX idx_pm_project_members_user ON pm_project_members(user_id);

-- Enable RLS
ALTER TABLE pm_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_task_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE pm_releases ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view projects in their company"
  ON pm_projects FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Managers can manage projects"
  ON pm_projects FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view tasks in their company"
  ON pm_tasks FOR SELECT
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can manage tasks in their company"
  ON pm_tasks FOR ALL
  TO authenticated
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()))
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view own time entries"
  ON pm_time_entries FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    company_id IN (SELECT company_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager', 'accountant'))
  );

CREATE POLICY "Users can manage own time entries"
  ON pm_time_entries FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Triggers
CREATE TRIGGER update_pm_projects_updated_at BEFORE UPDATE ON pm_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pm_tasks_updated_at BEFORE UPDATE ON pm_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
