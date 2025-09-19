import React, { useState } from 'react';
import { Book, Search, ChevronRight, ChevronDown, LogOut, ArrowLeft } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'getting-started', 
    'development-guide', 
    'database-schema',
    'api-documentation',
    'frontend-guide',
    'deployment'
  ]);

  const navigationItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      children: [
        { id: 'overview', title: 'Project Overview' },
        { id: 'architecture', title: 'System Architecture' },
        { id: 'tech-stack', title: 'Technology Stack' },
        { id: 'setup', title: 'Development Setup' },
      ]
    },
    {
      id: 'database-design',
      title: 'Database Design',
      children: [
        { id: 'schema', title: 'Database Schema' },
        { id: 'relationships', title: 'Table Relationships' },
        { id: 'migrations', title: 'Migrations' },
      ]
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      children: [
        { id: 'api-overview', title: 'API Overview' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'endpoints', title: 'Endpoints' },
      ]
    },
    {
      id: 'frontend-guide',
      title: 'Frontend Guide',
      children: [
        { id: 'components', title: 'Components' },
        { id: 'routing', title: 'Routing' },
        { id: 'state-management', title: 'State Management' },
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      children: [
        { id: 'deployment', title: 'Deployment Guide' },
        { id: 'monitoring', title: 'Monitoring' },
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getContentForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">BIDUA ERP - Complete Development Guide</h1>
              <p className="text-xl text-gray-600 mb-8">
                A comprehensive Enterprise Resource Planning system for beauty and cosmetics businesses, 
                featuring integrated CRM and HRMS modules with role-based access control.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Full-Stack Architecture</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Frontend</h3>
                    <p className="text-sm text-gray-600">React + TypeScript + Tailwind CSS</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white font-bold">F</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Backend</h3>
                    <p className="text-sm text-gray-600">FastAPI + Python + Pydantic</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Database</h3>
                    <p className="text-sm text-gray-600">PostgreSQL + SQLAlchemy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Core Modules</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Relationship Management</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Lead management and tracking</li>
                      <li>• Sales pipeline visualization</li>
                      <li>• Customer support ticketing</li>
                      <li>• Sales analytics and reporting</li>
                      <li>• Lead source tracking</li>
                      <li>• Follow-up scheduling</li>
                      <li>• Deal value estimation</li>
                      <li>• Customer communication history</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Human Resource Management</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Employee information management</li>
                      <li>• Attendance and time tracking</li>
                      <li>• Leave management system</li>
                      <li>• Payroll processing</li>
                      <li>• Performance evaluations</li>
                      <li>• Task assignment and tracking</li>
                      <li>• Document management</li>
                      <li>• Geofence-based attendance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">User Roles & Access</h2>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Administrator</h3>
                    <p className="text-sm text-red-800 mb-2">Full system access, user management, system configuration</p>
                    <ul className="text-xs text-red-700 space-y-1">
                      <li>• Complete CRUD operations on all modules</li>
                      <li>• User account creation and management</li>
                      <li>• System settings and configuration</li>
                      <li>• Advanced reporting and analytics</li>
                      <li>• Audit log access</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">Manager</h3>
                    <p className="text-sm text-yellow-800 mb-2">Department management, team oversight, approval workflows</p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Department-specific data access</li>
                      <li>• Team member management</li>
                      <li>• Leave request approvals</li>
                      <li>• Performance review creation</li>
                      <li>• Task assignment and monitoring</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Employee</h3>
                    <p className="text-sm text-green-800 mb-2">Personal portal, self-service features, task management</p>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Personal dashboard and profile</li>
                      <li>• Attendance marking (clock in/out)</li>
                      <li>• Leave application submission</li>
                      <li>• Task progress updates</li>
                      <li>• Document access and download</li>
                      <li>• Salary slip viewing</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Documentation</h3>
                    <p className="text-sm text-blue-800 mb-2">Technical documentation access and management</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Complete system documentation</li>
                      <li>• API reference guides</li>
                      <li>• Database schema details</li>
                      <li>• Development setup guides</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Frontend</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• React 18.3.1 with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Vite for fast development</li>
                    <li>• React Router for navigation</li>
                    <li>• Lucide React for icons</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Backend</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• FastAPI framework</li>
                    <li>• Python 3.11+ runtime</li>
                    <li>• Pydantic for validation</li>
                    <li>• SQLAlchemy ORM</li>
                    <li>• JWT authentication</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Database</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• PostgreSQL 14+</li>
                    <li>• JSONB support</li>
                    <li>• Advanced indexing</li>
                    <li>• Alembic migrations</li>
                    <li>• Connection pooling</li>
                  </ul>
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
                BIDUA ERP follows a modern three-tier architecture with React frontend, FastAPI backend, and PostgreSQL database.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Architecture Layers</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Presentation Layer (React Frontend)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">React Application</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• TypeScript for type safety</li>
                        <li>• Tailwind CSS for styling</li>
                        <li>• React Router for navigation</li>
                        <li>• Lucide React for icons</li>
                        <li>• Responsive design patterns</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">State Management</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• React Hooks (useState, useEffect)</li>
                        <li>• Context API for global state</li>
                        <li>• Local storage for persistence</li>
                        <li>• Form state management</li>
                        <li>• Real-time data updates</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Components</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Modular component architecture</li>
                        <li>• Reusable UI components</li>
                        <li>• Role-based rendering</li>
                        <li>• Responsive design</li>
                        <li>• Accessibility features</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Business Logic Layer (FastAPI Backend)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">FastAPI Framework</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• RESTful API endpoints</li>
                        <li>• Automatic API documentation</li>
                        <li>• Request/Response validation</li>
                        <li>• Async/await support</li>
                        <li>• High-performance routing</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Authentication & Security</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• JWT token authentication</li>
                        <li>• Role-based access control</li>
                        <li>• Password hashing (bcrypt)</li>
                        <li>• CORS configuration</li>
                        <li>• Rate limiting</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Business Logic</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• CRM operations</li>
                        <li>• HRMS workflows</li>
                        <li>• Report generation</li>
                        <li>• File management</li>
                        <li>• Notification services</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">Data Layer (PostgreSQL Database)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">PostgreSQL Database</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ACID compliance</li>
                        <li>• Advanced indexing</li>
                        <li>• JSON/JSONB support</li>
                        <li>• Full-text search</li>
                        <li>• Concurrent connections</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">SQLAlchemy ORM</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Object-relational mapping</li>
                        <li>• Database migrations</li>
                        <li>• Query optimization</li>
                        <li>• Connection pooling</li>
                        <li>• Lazy loading</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Data Management</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Automated backups</li>
                        <li>• Data validation</li>
                        <li>• Audit trails</li>
                        <li>• Performance monitoring</li>
                        <li>• Data archiving</li>
                      </ul>
                    </div>
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
                Modern, scalable technologies chosen for performance, maintainability, and developer experience.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Full-Stack Technology Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">R</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Frontend</h3>
                  <p className="text-blue-600 font-medium">React + TypeScript</p>
                  <p className="text-sm text-gray-600 mt-2">Modern, component-based UI with type safety</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">F</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Backend</h3>
                  <p className="text-green-600 font-medium">FastAPI + Python</p>
                  <p className="text-sm text-gray-600 mt-2">High-performance async API framework</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">P</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Database</h3>
                  <p className="text-purple-600 font-medium">PostgreSQL</p>
                  <p className="text-sm text-gray-600 mt-2">Advanced relational database with JSON support</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Frontend Technologies</h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900">React 18.3.1</h3>
                    <p className="text-sm text-blue-800 mb-3">Modern React with hooks and functional components</p>
                    <div className="space-y-2 text-xs text-blue-700">
                      <div><strong>Features:</strong> Concurrent rendering, Suspense, Error boundaries</div>
                      <div><strong>Hooks Used:</strong> useState, useEffect, useContext, useCallback</div>
                      <div><strong>Patterns:</strong> Component composition, Custom hooks, HOCs</div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h3 className="font-semibold text-indigo-900">TypeScript 5.5.3</h3>
                    <p className="text-sm text-indigo-800 mb-3">Type-safe JavaScript for better development experience</p>
                    <div className="space-y-2 text-xs text-indigo-700">
                      <div><strong>Benefits:</strong> Compile-time error checking, IntelliSense, Refactoring</div>
                      <div><strong>Features:</strong> Interface definitions, Generic types, Enum support</div>
                      <div><strong>Configuration:</strong> Strict mode enabled, Path mapping</div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
                    <h3 className="font-semibold text-cyan-900">Tailwind CSS 3.4.1</h3>
                    <p className="text-sm text-cyan-800 mb-3">Utility-first CSS framework for rapid UI development</p>
                    <div className="space-y-2 text-xs text-cyan-700">
                      <div><strong>Features:</strong> Responsive design, Dark mode, Custom components</div>
                      <div><strong>Utilities:</strong> Flexbox, Grid, Spacing, Colors, Typography</div>
                      <div><strong>Customization:</strong> Custom color palette, Extended spacing</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Backend Technologies</h2>
                
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-semibold text-green-900">FastAPI 0.104+</h3>
                    <p className="text-sm text-green-800 mb-3">Modern, fast web framework for building APIs with Python</p>
                    <div className="space-y-2 text-xs text-green-700">
                      <div><strong>Features:</strong> Automatic API docs, Type hints, Async support</div>
                      <div><strong>Performance:</strong> High performance, comparable to NodeJS and Go</div>
                      <div><strong>Standards:</strong> OpenAPI, JSON Schema, OAuth2, JWT</div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                    <h3 className="font-semibold text-emerald-900">Python 3.11+</h3>
                    <p className="text-sm text-emerald-800 mb-3">Modern Python with latest performance improvements</p>
                    <div className="space-y-2 text-xs text-emerald-700">
                      <div><strong>Key Libraries:</strong> Pydantic, SQLAlchemy, Alembic, python-jose</div>
                      <div><strong>Features:</strong> Type hints, Async/await, Context managers</div>
                      <div><strong>Performance:</strong> Improved startup time, Better error messages</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="font-semibold text-purple-900">PostgreSQL 14+</h3>
                    <p className="text-sm text-purple-800 mb-3">Advanced open-source relational database</p>
                    <div className="space-y-2 text-xs text-purple-700">
                      <div><strong>Features:</strong> ACID compliance, JSONB support, Full-text search</div>
                      <div><strong>Extensions:</strong> UUID generation, PostGIS for geolocation</div>
                      <div><strong>Performance:</strong> Advanced indexing, Query optimization</div>
                    </div>
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
                Complete PostgreSQL database schema for the BIDUA ERP system with 19+ tables.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Core Tables Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Authentication</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• users - Core user accounts</li>
                    <li>• user_sessions - JWT token management</li>
                    <li>• roles - System roles</li>
                    <li>• permissions - Access permissions</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">CRM Module</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• leads - Sales prospects</li>
                    <li>• support_tickets - Customer support</li>
                    <li>• lead_activities - Interaction history</li>
                    <li>• ticket_comments - Support communication</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">HRMS Module</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• employees - Employee master data</li>
                    <li>• attendance_records - Daily attendance</li>
                    <li>• leave_requests - Leave management</li>
                    <li>• payroll_records - Salary processing</li>
                    <li>• tasks - Task management</li>
                    <li>• performance_reviews - Evaluations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Database Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Advanced PostgreSQL Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• JSONB columns for flexible data storage</li>
                    <li>• UUID primary keys for security</li>
                    <li>• Enum types for data consistency</li>
                    <li>• Triggers for automatic calculations</li>
                    <li>• Indexes for query optimization</li>
                    <li>• Foreign key constraints</li>
                    <li>• Check constraints for data validation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Security & Compliance</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Row-level security (RLS)</li>
                    <li>• Encrypted sensitive data</li>
                    <li>• Audit trail on all tables</li>
                    <li>• Soft delete patterns</li>
                    <li>• Data retention policies</li>
                    <li>• Backup and recovery</li>
                    <li>• GDPR compliance ready</li>
                  </ul>
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
                Complete Entity Relationship Diagram showing all table connections in the PostgreSQL database.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Primary Relationships</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">One-to-One Relationships</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 text-sm">users ↔ employees</h4>
                      <p className="text-xs text-blue-800">Each user can have one employee record</p>
                      <code className="text-xs text-blue-700">users.id ← employees.user_id (UNIQUE)</code>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-900 text-sm">employees ↔ bank_accounts</h4>
                      <p className="text-xs text-green-800">Each employee has one bank account</p>
                      <code className="text-xs text-green-700">employees.id ← bank_accounts.employee_id (UNIQUE)</code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">One-to-Many Relationships</h3>
                  <div className="space-y-3">
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-900 text-sm">employees → attendance_records</h4>
                      <p className="text-xs text-orange-800">One employee, many attendance records</p>
                      <code className="text-xs text-orange-700">employees.id ← attendance_records.employee_id</code>
                    </div>
                    <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500">
                      <h4 className="font-semibold text-teal-900 text-sm">employees → leave_requests</h4>
                      <p className="text-xs text-teal-800">One employee, many leave requests</p>
                      <code className="text-xs text-teal-700">employees.id ← leave_requests.employee_id</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Database Design Patterns</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Audit Trail Pattern</h3>
                  <p className="text-sm text-blue-800 mb-3">Every table includes audit fields</p>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <code className="text-xs text-gray-800">
                      created_at TIMESTAMP DEFAULT NOW()<br/>
                      updated_at TIMESTAMP DEFAULT NOW()
                    </code>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Soft Delete Pattern</h3>
                  <p className="text-sm text-green-800 mb-3">Logical deletion for data integrity</p>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <code className="text-xs text-gray-800">
                      is_active BOOLEAN DEFAULT TRUE<br/>
                      deleted_at TIMESTAMP NULL
                    </code>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">JSONB Storage Pattern</h3>
                  <p className="text-sm text-purple-800 mb-3">Flexible data storage for complex objects</p>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <code className="text-xs text-gray-800">
                      personal_details JSONB<br/>
                      bank_account JSONB<br/>
                      metadata JSONB
                    </code>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">FastAPI Documentation Overview</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete REST API documentation for the BIDUA ERP system with FastAPI backend, 
                including authentication, endpoints, and integration examples.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">API Base Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm block">http://localhost:8000/api</code>
                  <p className="text-xs text-gray-600 mt-1">FastAPI development server</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm block">Bearer JWT Token</code>
                  <p className="text-xs text-gray-600 mt-1">Required for protected endpoints</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content Type</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm block">application/json</code>
                  <p className="text-xs text-gray-600 mt-1">Request/response format</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">API Documentation</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm block">http://localhost:8000/docs</code>
                  <p className="text-xs text-gray-600 mt-1">Interactive Swagger UI</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">FastAPI Endpoints Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Authentication Endpoints</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                      <code>/auth/login</code>
                      <span className="text-gray-500">- User authentication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                      <code>/auth/me</code>
                      <span className="text-gray-500">- Current user info</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">POST</span>
                      <code>/auth/logout</code>
                      <span className="text-gray-500">- Session termination</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">HRMS Endpoints</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                      <code>/employees</code>
                      <span className="text-gray-500">- List employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                      <code>/attendance</code>
                      <span className="text-gray-500">- Mark attendance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                      <code>/leave-requests/{id}</code>
                      <span className="text-gray-500">- Update leave</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Documentation Section</h1>
            <p className="text-lg text-gray-600">
              This section is currently under development.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800">
                We're working on adding comprehensive documentation for this section. 
                Please check back later or explore other available sections.
              </p>
            </div>
          </div>
        );
    }
  };

  const filteredNavItems = navigationItems.map(section => ({
    ...section,
    children: section.children?.filter(child => 
      child.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (section.children && section.children.length > 0)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Documentation Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">BIDUA ERP</h1>
                <p className="text-sm text-gray-500">Development Docs</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Search */}
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

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
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
                {currentUser.role} • Documentation Access
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {filteredNavItems.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>{section.title}</span>
                    {section.children && (
                      isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {section.children && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => setActiveSection(child.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeSection === child.id
                              ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-500'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {child.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Development Documentation</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-indigo-600 font-medium">
              {navigationItems.find(section => 
                section.children?.some(child => child.id === activeSection)
              )?.title || 'Getting Started'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl">
            {getContentForSection(activeSection)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPortal;