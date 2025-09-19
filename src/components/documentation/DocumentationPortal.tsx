import React, { useState } from 'react';
import { 
  BookOpen,
  Download,
  Code,
  Database,
  Server,
  Globe,
  Shield,
  Zap,
  Smartphone,
  Target,
  AlertTriangle,
  Home,
  Layers,
  Settings,
  GitBranch,
  Clock
} from 'lucide-react';
import { documentationSections } from '../../data/mockData';

interface DocumentationPortalProps {
  currentUser: any;
  activeSection: string;
  onLogout: () => void;
}

const DocumentationPortal: React.FC<DocumentationPortalProps> = ({ 
  currentUser,
  activeSection,
  onLogout
}) => {

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">BIDUA ERP System Documentation</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete technical documentation for the BIDUA Enterprise Resource Planning system.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Project Status</h3>
                    <p className="text-blue-800">
                      Currently transitioning from static React frontend to full-stack application with FastAPI backend and PostgreSQL database.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">CRM Module</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Customer Relationship Management with leads, pipeline, and support ticketing.
                </p>
                <div className="flex items-center text-sm text-indigo-600">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">HRMS Module</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Human Resource Management with attendance, payroll, and performance tracking.
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Reports Module</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Analytics and reporting dashboard with business intelligence features.
                </p>
                <div className="flex items-center text-sm text-purple-600">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Progress</h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Frontend Development</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      100% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    React frontend with TypeScript, Tailwind CSS, and responsive design completed.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Backend Development</h3>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      0% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    FastAPI backend with Python to be implemented next.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Database Setup</h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      0% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    PostgreSQL database schema and migrations to be created.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">System Architecture</h1>
              <p className="text-lg text-gray-600 mb-6">
                Overview of the BIDUA ERP system architecture and component relationships.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Three-Tier Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Presentation Layer</h3>
                  <p className="text-sm text-gray-600">React + TypeScript frontend with responsive design</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <Server className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Layer</h3>
                  <p className="text-sm text-gray-600">FastAPI backend with Python business logic</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <Database className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Layer</h3>
                  <p className="text-sm text-gray-600">PostgreSQL database with optimized schema</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Component Flow</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white p-2 rounded">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">User Interface</h4>
                    <p className="text-sm text-gray-600">React components handle user interactions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-600 text-white p-2 rounded">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">API Communication</h4>
                    <p className="text-sm text-gray-600">HTTP requests to FastAPI endpoints</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-purple-600 text-white p-2 rounded">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Processing</h4>
                    <p className="text-sm text-gray-600">Business logic and database operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tech-stack':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h1>
              <p className="text-lg text-gray-600 mb-6">
                Modern technologies powering the BIDUA ERP system.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Smartphone className="w-6 h-6 mr-2 text-blue-600" />
                  Frontend Technologies
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">React 18</span>
                    <span className="text-sm text-blue-600">UI Framework</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">TypeScript</span>
                    <span className="text-sm text-blue-600">Type Safety</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">Tailwind CSS</span>
                    <span className="text-sm text-blue-600">Styling</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">Vite</span>
                    <span className="text-sm text-blue-600">Build Tool</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">React Router</span>
                    <span className="text-sm text-blue-600">Navigation</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Server className="w-6 h-6 mr-2 text-green-600" />
                  Backend Technologies
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">FastAPI</span>
                    <span className="text-sm text-green-600">Web Framework</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">Python 3.11+</span>
                    <span className="text-sm text-green-600">Runtime</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">SQLAlchemy</span>
                    <span className="text-sm text-green-600">ORM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">Pydantic</span>
                    <span className="text-sm text-green-600">Data Validation</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">JWT</span>
                    <span className="text-sm text-green-600">Authentication</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-purple-600" />
                  Database & Tools
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">PostgreSQL 15</span>
                    <span className="text-sm text-purple-600">Database</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">Alembic</span>
                    <span className="text-sm text-purple-600">Migrations</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">Redis</span>
                    <span className="text-sm text-purple-600">Caching</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">Docker</span>
                    <span className="text-sm text-purple-600">Containerization</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-orange-600" />
                  DevOps & Deployment
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-gray-900">Nginx</span>
                    <span className="text-sm text-orange-600">Web Server</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-gray-900">Gunicorn</span>
                    <span className="text-sm text-orange-600">WSGI Server</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-gray-900">GitHub Actions</span>
                    <span className="text-sm text-orange-600">CI/CD</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-gray-900">AWS/DigitalOcean</span>
                    <span className="text-sm text-orange-600">Cloud Hosting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schema':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Schema</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete PostgreSQL database schema for all modules.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Tables</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">users</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Column</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Type</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Constraints</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">id</td>
                          <td className="py-2 px-3">UUID</td>
                          <td className="py-2 px-3">PRIMARY KEY</td>
                          <td className="py-2 px-3">Unique user identifier</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">username</td>
                          <td className="py-2 px-3">VARCHAR(50)</td>
                          <td className="py-2 px-3">UNIQUE, NOT NULL</td>
                          <td className="py-2 px-3">Login username</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">email</td>
                          <td className="py-2 px-3">VARCHAR(255)</td>
                          <td className="py-2 px-3">UNIQUE, NOT NULL</td>
                          <td className="py-2 px-3">User email address</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">password_hash</td>
                          <td className="py-2 px-3">VARCHAR(255)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Hashed password</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">role</td>
                          <td className="py-2 px-3">ENUM</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">admin, manager, employee, documentation</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">department</td>
                          <td className="py-2 px-3">VARCHAR(100)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">User department</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">is_active</td>
                          <td className="py-2 px-3">BOOLEAN</td>
                          <td className="py-2 px-3">DEFAULT TRUE</td>
                          <td className="py-2 px-3">Account status</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-mono">created_at</td>
                          <td className="py-2 px-3">TIMESTAMP</td>
                          <td className="py-2 px-3">DEFAULT NOW()</td>
                          <td className="py-2 px-3">Account creation time</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">employees</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Column</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Type</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Constraints</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">id</td>
                          <td className="py-2 px-3">UUID</td>
                          <td className="py-2 px-3">PRIMARY KEY</td>
                          <td className="py-2 px-3">Unique employee identifier</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">employee_id</td>
                          <td className="py-2 px-3">VARCHAR(20)</td>
                          <td className="py-2 px-3">UNIQUE, NOT NULL</td>
                          <td className="py-2 px-3">Company employee ID</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">user_id</td>
                          <td className="py-2 px-3">UUID</td>
                          <td className="py-2 px-3">FOREIGN KEY</td>
                          <td className="py-2 px-3">Reference to users table</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">name</td>
                          <td className="py-2 px-3">VARCHAR(255)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Full name</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">designation</td>
                          <td className="py-2 px-3">VARCHAR(100)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Job title</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">salary</td>
                          <td className="py-2 px-3">DECIMAL(10,2)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Annual salary</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-mono">joining_date</td>
                          <td className="py-2 px-3">DATE</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Date of joining</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">leads</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Column</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Type</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Constraints</th>
                          <th className="text-left py-2 px-3 font-medium text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">id</td>
                          <td className="py-2 px-3">UUID</td>
                          <td className="py-2 px-3">PRIMARY KEY</td>
                          <td className="py-2 px-3">Unique lead identifier</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">name</td>
                          <td className="py-2 px-3">VARCHAR(255)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Lead contact name</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">company</td>
                          <td className="py-2 px-3">VARCHAR(255)</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Company name</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">status</td>
                          <td className="py-2 px-3">ENUM</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">hot, warm, cold</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3 font-mono">stage</td>
                          <td className="py-2 px-3">ENUM</td>
                          <td className="py-2 px-3">NOT NULL</td>
                          <td className="py-2 px-3">Sales pipeline stage</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-mono">value</td>
                          <td className="py-2 px-3">DECIMAL(12,2)</td>
                          <td className="py-2 px-3">DEFAULT 0</td>
                          <td className="py-2 px-3">Potential deal value</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api-overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">FastAPI Documentation</h1>
              <p className="text-lg text-gray-600 mb-6">
                RESTful API endpoints for the BIDUA ERP system built with FastAPI.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Base URL</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm font-mono text-gray-800">
                  https://api.bidua.com/v1
                </code>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                    <div>
                      <span className="font-mono text-sm">POST /auth/login</span>
                      <p className="text-xs text-gray-600">User authentication</p>
                    </div>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">POST</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <span className="font-mono text-sm">POST /auth/refresh</span>
                      <p className="text-xs text-gray-600">Refresh JWT token</p>
                    </div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">POST</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded border border-red-200">
                    <div>
                      <span className="font-mono text-sm">POST /auth/logout</span>
                      <p className="text-xs text-gray-600">User logout</p>
                    </div>
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">POST</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">CRM Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <span className="font-mono text-sm">GET /crm/leads</span>
                      <p className="text-xs text-gray-600">Get all leads</p>
                    </div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">GET</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                    <div>
                      <span className="font-mono text-sm">POST /crm/leads</span>
                      <p className="text-xs text-gray-600">Create new lead</p>
                    </div>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">POST</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded border border-yellow-200">
                    <div>
                      <span className="font-mono text-sm">PUT /crm/leads/{"{id}"}</span>
                      <p className="text-xs text-gray-600">Update lead</p>
                    </div>
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">PUT</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">HRMS Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <span className="font-mono text-sm">GET /hrms/employees</span>
                      <p className="text-xs text-gray-600">Get all employees</p>
                    </div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">GET</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                    <div>
                      <span className="font-mono text-sm">POST /hrms/attendance</span>
                      <p className="text-xs text-gray-600">Mark attendance</p>
                    </div>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">POST</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded border border-purple-200">
                    <div>
                      <span className="font-mono text-sm">GET /hrms/payroll</span>
                      <p className="text-xs text-gray-600">Get payroll data</p>
                    </div>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">GET</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports Endpoints</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                    <div>
                      <span className="font-mono text-sm">GET /reports/dashboard</span>
                      <p className="text-xs text-gray-600">Dashboard metrics</p>
                    </div>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">GET</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                    <div>
                      <span className="font-mono text-sm">GET /reports/analytics</span>
                      <p className="text-xs text-gray-600">Business analytics</p>
                    </div>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">GET</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">FastAPI Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Automatic Documentation</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Interactive API docs at /docs</li>
                    <li>• ReDoc documentation at /redoc</li>
                    <li>• OpenAPI 3.0 specification</li>
                    <li>• Automatic request/response validation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Performance Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Async/await support</li>
                    <li>• High performance with Starlette</li>
                    <li>• Built-in data validation</li>
                    <li>• Dependency injection system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Development Setup</h1>
              <p className="text-lg text-gray-600 mb-6">
                Step-by-step guide to set up the development environment.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900">Node.js 18+ & npm</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900">Python 3.11+</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-900">PostgreSQL 15+</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-900">Git & Docker</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Frontend Setup</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{\`# Clone the repository
git clone https://github.com/bidua/erp-system.git
cd erp-system/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build`}
                  </pre>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">FastAPI Backend Setup</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{\`# Navigate to backend directory
cd ../backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
alembic upgrade head

# Start FastAPI development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000`}
                  </pre>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Setup</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{\`# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE bidua_erp;
CREATE USER bidua_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE bidua_erp TO bidua_user;
\\q

# Test connection
psql -h localhost -U bidua_user -d bidua_erp`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'relationships':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Table Relationships</h1>
              <p className="text-lg text-gray-600 mb-6">
                Database relationships and foreign key constraints in the BIDUA ERP system.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Entity Relationship Diagram</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center text-gray-600">
                  <Database className="w-16 h-16 mx-auto mb-4" />
                  <p>ERD visualization would be displayed here</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Relationships</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <h4 className="font-medium text-gray-900">users → employees</h4>
                    <p className="text-sm text-gray-600">One-to-One relationship via user_id</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <h4 className="font-medium text-gray-900">employees → attendance</h4>
                    <p className="text-sm text-gray-600">One-to-Many via employee_id</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded border border-purple-200">
                    <h4 className="font-medium text-gray-900">employees → tasks</h4>
                    <p className="text-sm text-gray-600">One-to-Many via assigned_to</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Foreign Key Constraints</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                    <h4 className="font-medium text-gray-900">leads.assigned_to</h4>
                    <p className="text-sm text-gray-600">References employees.employee_id</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <h4 className="font-medium text-gray-900">leave_requests.employee_id</h4>
                    <p className="text-sm text-gray-600">References employees.employee_id</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                    <h4 className="font-medium text-gray-900">payroll.employee_id</h4>
                    <p className="text-sm text-gray-600">References employees.employee_id</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'migrations':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Migrations</h1>
              <p className="text-lg text-gray-600 mb-6">
                Database migration strategy and version control using Alembic.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Migration Commands</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Create Migration</h4>
                  <code className="text-sm text-gray-800">alembic revision --autogenerate -m "description"</code>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Apply Migrations</h4>
                  <code className="text-sm text-gray-800">alembic upgrade head</code>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Rollback Migration</h4>
                  <code className="text-sm text-gray-800">alembic downgrade -1</code>
                </div>
              </div>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication System</h1>
              <p className="text-lg text-gray-600 mb-6">
                JWT-based authentication implementation with FastAPI.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Flow</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-600 text-white p-2 rounded">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Login Request</h4>
                    <p className="text-sm text-gray-600">User submits credentials to /auth/login</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-600 text-white p-2 rounded">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Token Generation</h4>
                    <p className="text-sm text-gray-600">Server validates and returns JWT token</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-600 text-white p-2 rounded">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Protected Requests</h4>
                    <p className="text-sm text-gray-600">Client includes token in Authorization header</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'endpoints':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints Reference</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete reference for all FastAPI endpoints in the BIDUA ERP system.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">CRM Module Endpoints</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm">GET /api/v1/crm/leads</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Retrieve all leads with optional filtering</p>
                    <div className="text-xs text-gray-500">
                      <strong>Query Parameters:</strong> status, stage, assigned_to, limit, offset
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm">POST /api/v1/crm/leads</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Create a new lead</p>
                    <div className="text-xs text-gray-500">
                      <strong>Required Fields:</strong> name, email, company, status, stage
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">HRMS Module Endpoints</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm">GET /api/v1/hrms/employees</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Get employee list with pagination</p>
                    <div className="text-xs text-gray-500">
                      <strong>Query Parameters:</strong> department, status, limit, offset
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm">POST /api/v1/hrms/attendance</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Mark employee attendance</p>
                    <div className="text-xs text-gray-500">
                      <strong>Required Fields:</strong> employee_id, date, clock_in, status
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'components':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">React Components Guide</h1>
              <p className="text-lg text-gray-600 mb-6">
                Component architecture and usage patterns in the BIDUA ERP frontend.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Component Structure</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{\`src/components/
├── auth/
│   └── LoginForm.tsx
├── layout/
│   └── Sidebar.tsx
├── dashboard/
│   └── Dashboard.tsx
├── crm/
│   ├── CRMModule.tsx
│   ├── LeadsManagement.tsx
│   └── SalesPipeline.tsx
├── hrms/
│   ├── HRMSModule.tsx
│   ├── EmployeeManagement.tsx
│   └── AttendanceManagement.tsx
└── employee/
    ├── EmployeePortal.tsx
    └── EmployeeDashboard.tsx`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'routing':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Routing System</h1>
              <p className="text-lg text-gray-600 mb-6">
                React Router implementation and navigation patterns.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Route Structure</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{\`Routes:
/ - Main application (protected)
  ├── dashboard - Executive dashboard
  ├── crm - Customer relationship management
  ├── hrms - Human resource management
  ├── reports - Analytics and reporting
  ├── employee-portal - Employee self-service
  ├── documentation-portal - Technical docs
  └── settings - System configuration`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'state-management':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">State Management</h1>
              <p className="text-lg text-gray-600 mb-6">
                How application state is managed across components.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">State Architecture</h2>
              <p className="text-gray-600 mb-4">
                The application uses React's built-in state management with useState hooks for local state and prop drilling for shared state.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Main App State
const [currentUser, setCurrentUser] = useState<User | null>(null);
const [leads, setLeads] = useState(mockLeads);
const [employees, setEmployees] = useState(mockEmployees);
const [tasks, setTasks] = useState(mockTasks);`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Deployment Guide</h1>
              <p className="text-lg text-gray-600 mb-6">
                Production deployment instructions for the BIDUA ERP system.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Docker Deployment</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`# Build and run with Docker Compose
docker-compose up -d

# Scale services
docker-compose up -d --scale api=3

# View logs
docker-compose logs -f api`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Monitoring & Logging</h1>
              <p className="text-lg text-gray-600 mb-6">
                System monitoring, logging, and performance tracking.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Monitoring Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Application Monitoring</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• FastAPI built-in metrics</li>
                    <li>• Prometheus for metrics collection</li>
                    <li>• Grafana for visualization</li>
                    <li>• Health check endpoints</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Logging</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Structured JSON logging</li>
                    <li>• Log aggregation with ELK stack</li>
                    <li>• Error tracking with Sentry</li>
                    <li>• Audit trail for sensitive operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Documentation Section</h2>
            <p className="text-gray-600">Select a section from the sidebar to view documentation.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {renderContent()}
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors mx-auto">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
          <p className="text-sm text-gray-500 mt-4">© 2025 BIDUA ERP System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPortal;