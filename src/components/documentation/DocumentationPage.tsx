import React from 'react';
import { 
  Database, 
  GitBranch, 
  Users, 
  Building2, 
  FileText, 
  Clock, 
  Calendar, 
  DollarSign,
  CheckSquare,
  BarChart3,
  Shield,
  MapPin,
  ArrowRight,
  Code,
  Server,
  Globe
} from 'lucide-react';

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">BIDUA ERP Documentation</h1>
              <p className="text-gray-600">Complete system architecture and database schema</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Project Overview */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <p className="text-gray-700 mb-4">
                BIDUA ERP is a comprehensive Enterprise Resource Planning system designed for beauty product companies. 
                It integrates Customer Relationship Management (CRM) and Human Resource Management System (HRMS) functionalities 
                to streamline business operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">CRM Module</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">HRMS Module</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Reports & Analytics</span>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Technology Stack</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Frontend</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Lucide React for icons</li>
                  <li>• React Router for navigation</li>
                  <li>• Vite for build tooling</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Server className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Backend</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• FastAPI (Python)</li>
                  <li>• Pydantic for data validation</li>
                  <li>• SQLAlchemy ORM</li>
                  <li>• JWT for authentication</li>
                  <li>• Uvicorn ASGI server</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Database className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Database</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• PostgreSQL 15+</li>
                  <li>• UUID primary keys</li>
                  <li>• JSONB for metadata</li>
                  <li>• Geospatial data support</li>
                  <li>• Row-level security</li>
                </ul>
              </div>
            </div>
          </section>

          {/* System Architecture */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <GitBranch className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">System Architecture</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Flow</h3>
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">React Frontend</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 transform md:transform-none rotate-90 md:rotate-0" />
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                      <Server className="w-5 h-5 text-green-600" />
                      <span className="font-medium">FastAPI Backend</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 transform md:transform-none rotate-90 md:rotate-0" />
                    <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                      <Database className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">PostgreSQL DB</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Frontend Responsibilities</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• User interface and experience</li>
                      <li>• Client-side routing and navigation</li>
                      <li>• Form validation and state management</li>
                      <li>• API communication and error handling</li>
                      <li>• Real-time data updates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Backend Responsibilities</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• RESTful API endpoints</li>
                      <li>• Authentication and authorization</li>
                      <li>• Business logic and data validation</li>
                      <li>• Database operations and queries</li>
                      <li>• File upload and storage management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Database Schema */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Database Schema</h2>
            </div>

            {/* Core Tables */}
            <div className="space-y-8">
              {/* Users Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">users (Authentication)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">username</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, UNIQUE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Login username</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">email</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, UNIQUE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">User email address</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">password_hash</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Hashed password</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">role</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">admin, manager, employee</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">is_active</td>
                        <td className="px-6 py-4 text-sm text-gray-700">BOOLEAN</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, DEFAULT TRUE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Account status</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">created_at</td>
                        <td className="px-6 py-4 text-sm text-gray-700">TIMESTAMPTZ</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, DEFAULT NOW()</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Creation timestamp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Employees Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">employees (HRMS Core)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">user_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UNIQUE, FK → users(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Link to user account</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, UNIQUE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Internal ID (BID001)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">name</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Full name</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">department</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Department name</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">designation</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Job title</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">manager_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Reporting manager</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">salary</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NUMERIC</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Annual salary</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">leads (CRM)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">name</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Lead's full name</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">company</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Company name</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">status</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">hot, warm, cold</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">stage</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Sales pipeline stage</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">value</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NUMERIC</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Deal value</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">assigned_to_employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Assigned sales rep</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance Records Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">attendance_records (HRMS)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Employee reference</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">date</td>
                        <td className="px-6 py-4 text-sm text-gray-700">DATE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Attendance date</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">clock_in</td>
                        <td className="px-6 py-4 text-sm text-gray-700">TIME</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Clock-in time</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">latitude</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NUMERIC</td>
                        <td className="px-6 py-4 text-sm text-gray-700">-</td>
                        <td className="px-6 py-4 text-sm text-gray-700">GPS latitude</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">longitude</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NUMERIC</td>
                        <td className="px-6 py-4 text-sm text-gray-700">-</td>
                        <td className="px-6 py-4 text-sm text-gray-700">GPS longitude</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">is_within_geofence</td>
                        <td className="px-6 py-4 text-sm text-gray-700">BOOLEAN</td>
                        <td className="px-6 py-4 text-sm text-gray-700">DEFAULT FALSE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Within office premises</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckSquare className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">tasks (Project Management)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">title</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Task title</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">assigned_to_employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Task assignee</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">assigned_by_employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Task creator</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">priority</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">low, medium, high, urgent</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">progress</td>
                        <td className="px-6 py-4 text-sm text-gray-700">INTEGER</td>
                        <td className="px-6 py-4 text-sm text-gray-700">DEFAULT 0</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Progress percentage (0-100)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">customer_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">FK → leads(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Associated customer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Leave Requests Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">leave_requests (HRMS)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Employee requesting leave</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">leave_type</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">casual, sick, annual, etc.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">start_date</td>
                        <td className="px-6 py-4 text-sm text-gray-700">DATE</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Leave start date</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">status</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">pending, approved, rejected</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">approved_by_employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Approving manager</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payroll Records Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">payroll_records (HRMS)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">PRIMARY KEY</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">employee_id</td>
                        <td className="px-6 py-4 text-sm text-gray-700">UUID</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL, FK → employees(id)</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Employee reference</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">month</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Payroll month</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">basic_salary</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NUMERIC</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Basic salary amount</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">net_salary</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NUMERIC</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">Final salary after deductions</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">status</td>
                        <td className="px-6 py-4 text-sm text-gray-700">VARCHAR</td>
                        <td className="px-6 py-4 text-sm text-gray-700">NOT NULL</td>
                        <td className="px-6 py-4 text-sm text-gray-700">draft, processed, paid</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* API Endpoints */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Server className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">API Endpoints</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Authentication APIs */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">POST /auth/login</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Auth</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /auth/me</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Profile</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">POST /auth/logout</span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Logout</span>
                  </div>
                </div>
              </div>

              {/* CRM APIs */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CRM Module</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /leads</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">List</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">POST /leads</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Create</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">PUT /leads/{id}</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Update</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /support-tickets</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Support</span>
                  </div>
                </div>
              </div>

              {/* HRMS APIs */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">HRMS Module</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /employees</span>
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">Employees</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">POST /attendance</span>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">Attendance</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /leave-requests</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Leaves</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /payroll</span>
                    <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">Payroll</span>
                  </div>
                </div>
              </div>

              {/* Task Management APIs */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /tasks</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">List</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">POST /tasks</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Create</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">GET /tasks/{id}/comments</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Comments</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-900">PUT /tasks/{id}</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Update</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* System Flow */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <GitBranch className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">System Flow</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Authentication Flow</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">User Login</p>
                      <p className="text-xs text-gray-600">Enter credentials</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Validation</p>
                      <p className="text-xs text-gray-600">Check credentials</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">JWT Token</p>
                      <p className="text-xs text-gray-600">Generate token</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">Dashboard</p>
                      <p className="text-xs text-gray-600">Role-based access</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Marking Flow</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-teal-50 rounded-lg">
                      <MapPin className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Location Request</p>
                      <p className="text-xs text-gray-600">Get GPS coordinates</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Geofence Check</p>
                      <p className="text-xs text-gray-600">Validate location</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Clock In/Out</p>
                      <p className="text-xs text-gray-600">Record timestamp</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Database className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Store Record</p>
                      <p className="text-xs text-gray-600">Save to database</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Calculate Hours</p>
                      <p className="text-xs text-gray-600">Update totals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Database Relationships */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <GitBranch className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Database Relationships</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Relationships</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">User → Employee</h4>
                      <p className="text-sm text-gray-600">One-to-One relationship linking authentication to HR records</p>
                      <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                        users.id ← employees.user_id
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Employee → Manager</h4>
                      <p className="text-sm text-gray-600">Self-referencing relationship for organizational hierarchy</p>
                      <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                        employees.id ← employees.manager_id
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Employee → Tasks</h4>
                      <p className="text-sm text-gray-600">One-to-Many for task assignments</p>
                      <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                        employees.id ← tasks.assigned_to_employee_id
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Lead → Tasks</h4>
                      <p className="text-sm text-gray-600">One-to-Many for customer-related tasks</p>
                      <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                        leads.id ← tasks.customer_id
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Overview */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <CheckSquare className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">CRM Features</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Lead management and tracking</li>
                  <li>• Sales pipeline visualization</li>
                  <li>• Customer support ticketing</li>
                  <li>• Sales analytics and reporting</li>
                  <li>• Lead assignment and routing</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">HRMS Features</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Employee information management</li>
                  <li>• GPS-based attendance tracking</li>
                  <li>• Leave request workflow</li>
                  <li>• Payroll processing</li>
                  <li>• Performance evaluations</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckSquare className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Task creation and assignment</li>
                  <li>• Progress tracking and updates</li>
                  <li>• Comment and collaboration system</li>
                  <li>• Priority and deadline management</li>
                  <li>• Work report submissions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security & Compliance */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Security & Compliance</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Measures</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• JWT-based authentication</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Password hashing with bcrypt</li>
                    <li>• HTTPS encryption in transit</li>
                    <li>• Database encryption at rest</li>
                    <li>• Input validation and sanitization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Privacy</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Employee data access controls</li>
                    <li>• Audit trails for sensitive operations</li>
                    <li>• Geolocation data protection</li>
                    <li>• Document access permissions</li>
                    <li>• Personal data anonymization options</li>
                    <li>• GDPR compliance considerations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Development Guidelines */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Development Guidelines</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend Best Practices</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Component-based architecture</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Responsive design principles</li>
                    <li>• Error boundary implementation</li>
                    <li>• Performance optimization</li>
                    <li>• Accessibility compliance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend Best Practices</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• RESTful API design</li>
                    <li>• Pydantic data validation</li>
                    <li>• Database connection pooling</li>
                    <li>• Async/await for performance</li>
                    <li>• Comprehensive error handling</li>
                    <li>• API documentation with OpenAPI</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Deployment Architecture */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <Server className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Deployment Architecture</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Environment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Globe className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900">Frontend</h4>
                    <p className="text-sm text-gray-600 mt-2">Deployed on Vercel/Netlify with CDN</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Server className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900">Backend API</h4>
                    <p className="text-sm text-gray-600 mt-2">FastAPI on AWS/GCP with load balancing</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Database className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-900">Database</h4>
                    <p className="text-sm text-gray-600 mt-2">PostgreSQL with automated backups</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Future Enhancements */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Future Enhancements</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Planned Features</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Mobile application (React Native)</li>
                    <li>• Real-time notifications (WebSocket)</li>
                    <li>• Advanced analytics dashboard</li>
                    <li>• Integration with accounting software</li>
                    <li>• AI-powered insights and recommendations</li>
                    <li>• Multi-language support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Improvements</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Microservices architecture</li>
                    <li>• Redis caching layer</li>
                    <li>• Elasticsearch for advanced search</li>
                    <li>• Docker containerization</li>
                    <li>• CI/CD pipeline automation</li>
                    <li>• Monitoring and logging (ELK stack)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;