import React from 'react';
import { GitBranch, Database, Users, UserCheck, Building, FileText } from 'lucide-react';

const TableRelationships: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Table Relationships</h1>
        <p className="text-lg text-gray-600 mb-6">
          Visual representation of database relationships and foreign key constraints in the BIDUA ERP system.
        </p>
      </div>

      {/* Relationship Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Entity Relationship Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-3">
              <Users className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-600">5 tables</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-3">
              <Building className="w-8 h-8 text-green-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">CRM Module</h3>
            <p className="text-sm text-gray-600">8 tables</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-3">
              <UserCheck className="w-8 h-8 text-purple-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">HRMS Module</h3>
            <p className="text-sm text-gray-600">12 tables</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 p-4 rounded-lg mb-3">
              <FileText className="w-8 h-8 text-orange-600 mx-auto" />
            </div>
            <h3 className="font-semibold text-gray-900">Support Tables</h3>
            <p className="text-sm text-gray-600">6 tables</p>
          </div>
        </div>
      </div>

      {/* Core Relationships */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Core Entity Relationships</h2>

        {/* User-Employee Relationship */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GitBranch className="w-5 h-5 text-blue-600 mr-2" />
            User ↔ Employee Relationship
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">users</h4>
              <p className="text-sm text-blue-800 mb-2">Authentication & Login</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• id (Primary Key)</li>
                <li>• email (Unique)</li>
                <li>• password_hash</li>
                <li>• role</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <GitBranch className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-xs text-gray-600">One-to-One</p>
                <p className="text-xs text-gray-500">user_id FK</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">employees</h4>
              <p className="text-sm text-purple-800 mb-2">HR Information</p>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• id (Primary Key)</li>
                <li>• user_id (Foreign Key)</li>
                <li>• employee_id (Unique)</li>
                <li>• department, salary</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Employee Hierarchical Relationship */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GitBranch className="w-5 h-5 text-green-600 mr-2" />
            Employee Hierarchy (Self-Referencing)
          </h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Manager-Employee Relationship</h4>
            <p className="text-sm text-green-800 mb-3">Self-referencing foreign key for organizational hierarchy</p>
            <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`employees.manager_id → employees.id (Self-referencing FK)

Example:
- Priya Sharma (Sales Manager) → manager_id: NULL
- Amit Patel (Marketing Executive) → manager_id: Priya's ID
- Rahul Verma (Marketing Specialist) → manager_id: Amit's ID`}
            </pre>
          </div>
        </div>

        {/* CRM Relationships */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GitBranch className="w-5 h-5 text-orange-600 mr-2" />
            CRM Module Relationships
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">leads → employees</h4>
                <p className="text-sm text-orange-800 mb-2">Lead assignment to sales representatives</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`leads.assigned_to → employees.id`}
                </pre>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">support_tickets → leads</h4>
                <p className="text-sm text-red-800 mb-2">Support tickets linked to customers</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`support_tickets.customer_id → leads.id`}
                </pre>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">tasks → leads (Optional)</h4>
              <p className="text-sm text-yellow-800 mb-2">Tasks can be associated with specific customers/leads</p>
              <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`tasks.customer_id → leads.id (Optional FK)`}
              </pre>
            </div>
          </div>
        </div>

        {/* HRMS Relationships */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GitBranch className="w-5 h-5 text-purple-600 mr-2" />
            HRMS Module Relationships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">attendance → employees</h4>
                <p className="text-sm text-purple-800 mb-2">Daily attendance records</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`attendance.employee_id → employees.id`}
                </pre>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">leave_requests → employees</h4>
                <p className="text-sm text-teal-800 mb-2">Leave applications and approvals</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`leave_requests.employee_id → employees.id
leave_requests.approved_by → employees.id`}
                </pre>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">payroll → employees</h4>
                <p className="text-sm text-indigo-800 mb-2">Salary and payment records</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`payroll.employee_id → employees.id`}
                </pre>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-900 mb-2">performance_reviews → employees</h4>
                <p className="text-sm text-pink-800 mb-2">Performance evaluations</p>
                <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs">
{`performance_reviews.employee_id → employees.id
performance_reviews.reviewer_id → employees.id`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Task Relationships */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GitBranch className="w-5 h-5 text-cyan-600 mr-2" />
            Task Management Relationships
          </h3>
          <div className="bg-cyan-50 p-4 rounded-lg">
            <h4 className="font-semibold text-cyan-900 mb-2">Task Assignment & Comments</h4>
            <p className="text-sm text-cyan-800 mb-3">Complex relationships for task management</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`-- Task assignments
tasks.assigned_to → employees.id
tasks.assigned_by → employees.id

-- Task comments
task_comments.task_id → tasks.id
task_comments.author_id → users.id`}
              </pre>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`-- Optional customer link
tasks.customer_id → leads.id

-- Task tags (many-to-many)
task_tags.task_id → tasks.id
task_tags.tag → VARCHAR`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Relationship Constraints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Foreign Key Constraints</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">CASCADE Deletes</h4>
            <p className="text-sm text-red-800 mb-2">When parent record is deleted, child records are also deleted</p>
            <ul className="text-xs text-red-700 space-y-1">
              <li>• user_sessions → users (CASCADE)</li>
              <li>• attendance → employees (CASCADE)</li>
              <li>• leave_requests → employees (CASCADE)</li>
              <li>• task_comments → tasks (CASCADE)</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">SET NULL</h4>
            <p className="text-sm text-yellow-800 mb-2">When parent record is deleted, foreign key is set to NULL</p>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• employees.user_id → users (SET NULL)</li>
              <li>• employees.manager_id → employees (SET NULL)</li>
              <li>• leads.assigned_to → employees (SET NULL)</li>
              <li>• tasks.assigned_to → employees (SET NULL)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Indexes for Performance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Indexes</h3>
        <p className="text-gray-600 mb-4">Optimized indexes for better query performance</p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- User and authentication indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);

-- Employee indexes
CREATE INDEX idx_employees_employee_id ON employees(employee_id);
CREATE INDEX idx_employees_user_id ON employees(user_id);
CREATE INDEX idx_employees_manager_id ON employees(manager_id);
CREATE INDEX idx_employees_department ON employees(department);

-- CRM indexes
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_status_stage ON leads(status, stage);
CREATE INDEX idx_support_tickets_assigned_to ON support_tickets(assigned_to);
CREATE INDEX idx_support_tickets_customer_id ON support_tickets(customer_id);

-- HRMS indexes
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX idx_payroll_employee_month_year ON payroll(employee_id, month, year);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_task_comments_task_id ON task_comments(task_id);

-- Document and audit indexes
CREATE INDEX idx_documents_employee_id ON documents(employee_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);`}
        </pre>
      </div>
    </div>
  );
};

export default TableRelationships;