import React from 'react';
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
  GitBranch, 
  Settings 
} from 'lucide-react';

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
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">BIDUA ERP System</h1>
              <p className="text-indigo-100">Comprehensive Enterprise Resource Planning Solution</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h3>
                <p className="text-gray-600 mb-4">
                  BIDUA ERP is a modern, comprehensive enterprise resource planning system designed 
                  specifically for beauty and cosmetics companies. It integrates CRM, HRMS, and 
                  reporting modules into a unified platform.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Customer Relationship Management (CRM)</li>
                  <li>• Human Resource Management System (HRMS)</li>
                  <li>• Advanced Reporting & Analytics</li>
                  <li>• Employee Self-Service Portal</li>
                  <li>• Documentation Management</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">Centralized Data Management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">Role-Based Access Control</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-700">Responsive Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">System Architecture</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Architecture Overview</h3>
              <p className="text-gray-600 mb-4">
                The BIDUA ERP system follows a modern, modular architecture with clear separation of concerns.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Frontend</h4>
                  <p className="text-sm text-gray-600">React + TypeScript</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Server className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Backend</h4>
                  <p className="text-sm text-gray-600">Supabase</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Database</h4>
                  <p className="text-sm text-gray-600">PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tech-stack':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Technology Stack</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend Technologies</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">React 18</p>
                      <p className="text-sm text-gray-600">UI Library</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">TypeScript</p>
                      <p className="text-sm text-gray-600">Type Safety</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Tailwind CSS</p>
                      <p className="text-sm text-gray-600">Styling Framework</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Vite</p>
                      <p className="text-sm text-gray-600">Build Tool</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend Technologies</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Server className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Supabase</p>
                      <p className="text-sm text-gray-600">Backend as a Service</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">PostgreSQL</p>
                      <p className="text-sm text-gray-600">Database</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Row Level Security</p>
                      <p className="text-sm text-gray-600">Data Protection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Development Setup</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js 18+ installed</li>
                <li>• npm or yarn package manager</li>
                <li>• Git for version control</li>
                <li>• Code editor (VS Code recommended)</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation Steps</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`# Clone the repository
git clone https://github.com/bidua/erp-system.git
cd erp-system/frontend

# Install dependencies
npm install

# Start development server
npm run dev`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schema':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Database Schema</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Tables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">users</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• id (uuid, primary key)</li>
                    <li>• username (text)</li>
                    <li>• email (text)</li>
                    <li>• role (enum)</li>
                    <li>• department (text)</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">employees</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• id (uuid, primary key)</li>
                    <li>• employee_id (text)</li>
                    <li>• name (text)</li>
                    <li>• email (text)</li>
                    <li>• department (text)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'relationships':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Table Relationships</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Entity Relationships</h3>
              <p className="text-gray-600 mb-4">
                The database follows a normalized structure with clear relationships between entities.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">One-to-Many Relationships</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Users → Tasks (one user can have many tasks)</li>
                    <li>• Employees → Attendance (one employee has many attendance records)</li>
                    <li>• Employees → Leave Requests (one employee can have many leave requests)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'migrations':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Database Migrations</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Migration Files</h3>
              <p className="text-gray-600 mb-4">
                Database migrations are stored in the `/supabase/migrations` directory.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800">
{`-- Example migration file
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'api-overview':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">API Overview</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">REST API Endpoints</h3>
              <p className="text-gray-600 mb-4">
                The system uses Supabase's auto-generated REST API for database operations.
              </p>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">GET</span>
                    <code className="text-sm">/rest/v1/employees</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Retrieve all employees</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">POST</span>
                    <code className="text-sm">/rest/v1/employees</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Create new employee</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Authentication</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication Flow</h3>
              <p className="text-gray-600 mb-4">
                The system uses Supabase Auth for secure user authentication and authorization.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800">
{`// Login example
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">API Endpoints</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Endpoints</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Employee Management</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">GET</span>
                      <code className="text-sm">/employees</code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">POST</span>
                      <code className="text-sm">/employees</code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">PUT</span>
                      <code className="text-sm">/employees/:id</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'components':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Components</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Component Structure</h3>
              <p className="text-gray-600 mb-4">
                The application is built using reusable React components organized by feature modules.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800">
{`src/
├── components/
│   ├── auth/
│   ├── crm/
│   ├── hrms/
│   ├── employee/
│   ├── dashboard/
│   └── common/`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'routing':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Routing</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Configuration</h3>
              <p className="text-gray-600 mb-4">
                The application uses React Router for client-side routing and navigation.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800">
{`// Main routes
/ - Dashboard (role-based)
/login - Authentication
/employee-portal - Employee self-service
/documentation - Documentation portal`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'state-management':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">State Management</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">State Architecture</h3>
              <p className="text-gray-600 mb-4">
                The application uses React's built-in state management with hooks for local state 
                and context for global state sharing.
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Local State</h4>
                  <p className="text-sm text-gray-600">useState and useEffect for component-level state</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Global State</h4>
                  <p className="text-sm text-gray-600">Props drilling for data sharing between components</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Deployment Guide</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Deployment</h3>
              <p className="text-gray-600 mb-4">
                Deploy the application to production using modern hosting platforms.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800">
{`# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Monitoring</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Monitor application performance and user activity using built-in analytics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Page load times</li>
                    <li>• API response times</li>
                    <li>• Error rates</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">User Analytics</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Active users</li>
                    <li>• Feature usage</li>
                    <li>• Session duration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Documentation Section</h2>
              <p className="text-gray-600">Select a section from the sidebar to view documentation.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {renderContent()}
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
          <p className="text-sm text-gray-500">© 2025 BIDUA ERP System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPortal;