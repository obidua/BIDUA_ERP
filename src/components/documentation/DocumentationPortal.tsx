import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Code, 
  Database, 
  Settings, 
  Users,
  Building2,
  Menu,
  X,
  LogOut,
  Search,
  Home,
  Layers,
  GitBranch,
  Server,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react';

interface DocumentationPortalProps {
  currentUser: any;
  onLogout: () => void;
}

const DocumentationPortal: React.FC<DocumentationPortalProps> = ({
  currentUser,
  onLogout
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigationSections = [
    {
      title: 'Getting Started',
      items: [
        { id: 'overview', name: 'Project Overview', icon: Home },
        { id: 'architecture', name: 'System Architecture', icon: Layers },
        { id: 'tech-stack', name: 'Technology Stack', icon: Code },
        { id: 'setup', name: 'Development Setup', icon: Settings },
      ]
    },
    {
      title: 'Database Design',
      items: [
        { id: 'schema', name: 'Database Schema', icon: Database },
        { id: 'relationships', name: 'Table Relationships', icon: GitBranch },
        { id: 'migrations', name: 'Migrations', icon: Server },
      ]
    },
    {
      title: 'API Documentation',
      items: [
        { id: 'api-overview', name: 'API Overview', icon: Globe },
        { id: 'authentication', name: 'Authentication', icon: Shield },
        { id: 'endpoints', name: 'Endpoints', icon: Zap },
      ]
    },
    {
      title: 'Frontend Guide',
      items: [
        { id: 'components', name: 'Components', icon: Smartphone },
        { id: 'routing', name: 'Routing', icon: GitBranch },
        { id: 'state-management', name: 'State Management', icon: Target },
      ]
    },
    {
      title: 'Deployment',
      items: [
        { id: 'deployment', name: 'Deployment Guide', icon: Server },
        { id: 'monitoring', name: 'Monitoring', icon: AlertTriangle },
      ]
    }
  ];

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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
              <p className="text-lg text-gray-600 mb-6">
                RESTful API endpoints for the BIDUA ERP system.
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
{`# Clone the repository
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Backend Setup</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`# Navigate to backend directory
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

# Start development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000`}
                  </pre>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Setup</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`# Install PostgreSQL (Ubuntu/Debian)
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

  const filteredSections = navigationSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">BIDUA Docs</h1>
            <p className="text-xs text-gray-500">Technical Documentation</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center space-x-3 p-6 border-b border-gray-200">
            <div className="bg-indigo-600 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BIDUA Documentation</h1>
              <p className="text-sm text-gray-500">Technical Reference</p>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 md:p-6 border-b border-gray-200 mt-16 md:mt-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">
                  {currentUser.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.username}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {currentUser.role} • {currentUser.department}
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
            {filteredSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm ${
                          activeSection === item.id
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 md:p-6 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-8 mt-16 md:mt-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white p-4 md:p-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-gray-600">
              © 2025 BIDUA ERP System. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Download className="w-4 h-4 inline mr-1" />
                Download PDF
              </button>
              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                <ExternalLink className="w-4 h-4 inline mr-1" />
                GitHub
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DocumentationPortal;