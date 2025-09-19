import React, { useState } from 'react';
import { ArrowLeft, Book, Search, ChevronRight, ChevronDown, Home, Users, UserCheck, BarChart3, Settings, Clock, Calendar, DollarSign, FileText, Shield, Globe, Zap, CheckCircle, AlertTriangle, Info, Database, Code, GitBranch, Layers, Network, Server, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('project-overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['project-structure', 'development-guide', 'database-schema']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationItems = [
    {
      id: 'project-structure',
      title: 'Project Structure',
      icon: Layers,
      children: [
        { id: 'project-overview', title: 'Project Overview' },
        { id: 'architecture', title: 'System Architecture' },
        { id: 'tech-stack', title: 'Technology Stack' },
        { id: 'folder-structure', title: 'Folder Structure' }
      ]
    },
    {
      id: 'development-guide',
      title: 'Development Guide',
      icon: Code,
      children: [
        { id: 'setup-environment', title: 'Environment Setup' },
        { id: 'frontend-setup', title: 'Frontend Setup (React)' },
        { id: 'backend-setup', title: 'Backend Setup (FastAPI)' },
        { id: 'database-setup', title: 'Database Setup (PostgreSQL)' },
        { id: 'deployment', title: 'Deployment Guide' }
      ]
    },
    {
      id: 'database-schema',
      title: 'Database Schema',
      icon: Database,
      children: [
        { id: 'schema-overview', title: 'Schema Overview' },
        { id: 'user-tables', title: 'User & Authentication' },
        { id: 'crm-tables', title: 'CRM Tables' },
        { id: 'hrms-tables', title: 'HRMS Tables' },
        { id: 'relationships', title: 'Table Relationships' }
      ]
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      icon: Server,
      children: [
        { id: 'api-overview', title: 'API Overview' },
        { id: 'auth-endpoints', title: 'Authentication Endpoints' },
        { id: 'crm-endpoints', title: 'CRM Endpoints' },
        { id: 'hrms-endpoints', title: 'HRMS Endpoints' },
        { id: 'file-endpoints', title: 'File Management Endpoints' }
      ]
    },
    {
      id: 'portal-communication',
      title: 'Portal Communication',
      icon: Network,
      children: [
        { id: 'communication-overview', title: 'Communication Overview' },
        { id: 'admin-portal', title: 'Admin Portal Flow' },
        { id: 'manager-portal', title: 'Manager Portal Flow' },
        { id: 'employee-portal', title: 'Employee Portal Flow' },
        { id: 'data-flow', title: 'Data Flow Diagrams' }
      ]
    },
    {
      id: 'features',
      title: 'Feature Documentation',
      icon: Monitor,
      children: [
        { id: 'crm-features', title: 'CRM Features' },
        { id: 'hrms-features', title: 'HRMS Features' },
        { id: 'reporting-features', title: 'Reporting Features' },
        { id: 'security-features', title: 'Security Features' }
      ]
    }
  ];

  const getContentForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'project-overview':
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
                <Layers className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Full-Stack Architecture</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">Frontend</h3>
                    <p className="text-sm text-gray-600">React + TypeScript + Tailwind CSS</p>
                  </div>
                  <div className="text-center">
                    <Server className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900">Backend</h3>
                    <p className="text-sm text-gray-600">FastAPI + Python + Pydantic</p>
                  </div>
                  <div className="text-center">
                    <Database className="w-12 h-12 text-purple-600 mx-auto mb-3" />
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
                    <Users className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Relationship Management</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Lead management and tracking</li>
                      <li>• Sales pipeline visualization</li>
                      <li>• Customer support ticketing</li>
                      <li>• Sales analytics and reporting</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <UserCheck className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Human Resource Management</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Employee information management</li>
                      <li>• Attendance and time tracking</li>
                      <li>• Leave management system</li>
                      <li>• Payroll processing</li>
                      <li>• Performance evaluations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">User Roles & Access</h2>
                
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Administrator</h3>
                    <p className="text-sm text-red-800">Full system access, user management, system configuration</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">Manager</h3>
                    <p className="text-sm text-yellow-800">Department management, team oversight, approval workflows</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Employee</h3>
                    <p className="text-sm text-green-800">Personal portal, self-service features, task management</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Development Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-800">Frontend (React)</span>
                      <span className="text-sm font-semibold text-blue-900">✅ Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-800">Backend (FastAPI)</span>
                      <span className="text-sm font-semibold text-yellow-700">🚧 In Progress</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-800">Database (PostgreSQL)</span>
                      <span className="text-sm font-semibold text-yellow-700">🚧 In Progress</span>
                    </div>
                  </div>
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
                BIDUA ERP follows a modern three-tier architecture with clear separation of concerns.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Architecture Diagram</h2>
              
              {/* Architecture Layers */}
              <div className="space-y-6">
                {/* Presentation Layer */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Monitor className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-blue-900">Presentation Layer (Frontend)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">React Application</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• TypeScript for type safety</li>
                        <li>• Tailwind CSS for styling</li>
                        <li>• React Router for navigation</li>
                        <li>• Lucide React for icons</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">State Management</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• React Hooks (useState, useEffect)</li>
                        <li>• Context API for global state</li>
                        <li>• Local storage for persistence</li>
                        <li>• Form state management</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Components</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Modular component architecture</li>
                        <li>• Reusable UI components</li>
                        <li>• Role-based rendering</li>
                        <li>• Responsive design</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Business Logic Layer */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Server className="w-6 h-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-green-900">Business Logic Layer (Backend)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">FastAPI Framework</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• RESTful API endpoints</li>
                        <li>• Automatic API documentation</li>
                        <li>• Request/Response validation</li>
                        <li>• Async/await support</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Authentication & Security</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• JWT token authentication</li>
                        <li>• Role-based access control</li>
                        <li>• Password hashing (bcrypt)</li>
                        <li>• CORS configuration</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Business Logic</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• CRM operations</li>
                        <li>• HRMS workflows</li>
                        <li>• Report generation</li>
                        <li>• File management</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Layer */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Database className="w-6 h-6 text-purple-600 mr-3" />
                    <h3 className="text-xl font-semibold text-purple-900">Data Layer (Database)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">PostgreSQL Database</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ACID compliance</li>
                        <li>• Advanced indexing</li>
                        <li>• JSON support</li>
                        <li>• Full-text search</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">SQLAlchemy ORM</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Object-relational mapping</li>
                        <li>• Database migrations</li>
                        <li>• Query optimization</li>
                        <li>• Connection pooling</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Data Management</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Automated backups</li>
                        <li>• Data validation</li>
                        <li>• Audit trails</li>
                        <li>• Performance monitoring</li>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Frontend Technologies */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Monitor className="w-6 h-6 text-blue-600 mr-3" />
                  Frontend Stack
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">React 18.3.1</h3>
                    <p className="text-sm text-blue-800 mb-2">Modern React with hooks and functional components</p>
                    <div className="text-xs text-blue-700">
                      <strong>Features:</strong> Concurrent rendering, Suspense, Error boundaries
                    </div>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-semibold text-indigo-900 mb-2">TypeScript</h3>
                    <p className="text-sm text-indigo-800 mb-2">Type-safe JavaScript for better development experience</p>
                    <div className="text-xs text-indigo-700">
                      <strong>Benefits:</strong> Compile-time error checking, IntelliSense, Refactoring support
                    </div>
                  </div>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <h3 className="font-semibold text-cyan-900 mb-2">Tailwind CSS</h3>
                    <p className="text-sm text-cyan-800 mb-2">Utility-first CSS framework for rapid UI development</p>
                    <div className="text-xs text-cyan-700">
                      <strong>Features:</strong> Responsive design, Dark mode support, Custom components
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Vite</h3>
                    <p className="text-sm text-purple-800 mb-2">Fast build tool and development server</p>
                    <div className="text-xs text-purple-700">
                      <strong>Benefits:</strong> Hot module replacement, Fast builds, ES modules
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend Technologies */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Server className="w-6 h-6 text-green-600 mr-3" />
                  Backend Stack
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">FastAPI</h3>
                    <p className="text-sm text-green-800 mb-2">Modern, fast web framework for building APIs</p>
                    <div className="text-xs text-green-700">
                      <strong>Features:</strong> Automatic API docs, Type hints, Async support, Validation
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h3 className="font-semibold text-emerald-900 mb-2">Python 3.11+</h3>
                    <p className="text-sm text-emerald-800 mb-2">Modern Python with latest performance improvements</p>
                    <div className="text-xs text-emerald-700">
                      <strong>Libraries:</strong> Pydantic, SQLAlchemy, Alembic, python-jose
                    </div>
                  </div>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h3 className="font-semibold text-teal-900 mb-2">SQLAlchemy</h3>
                    <p className="text-sm text-teal-800 mb-2">Python SQL toolkit and Object-Relational Mapping</p>
                    <div className="text-xs text-teal-700">
                      <strong>Features:</strong> ORM, Query builder, Connection pooling, Migrations
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">PostgreSQL</h3>
                    <p className="text-sm text-blue-800 mb-2">Advanced open-source relational database</p>
                    <div className="text-xs text-blue-700">
                      <strong>Features:</strong> ACID compliance, JSON support, Full-text search, Indexing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schema-overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Schema Overview</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete database schema design for the BIDUA ERP system with all tables, relationships, and constraints.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Schema Design Principles</h3>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Normalized database design (3NF)</li>
                    <li>• Proper foreign key relationships</li>
                    <li>• Indexed columns for performance</li>
                    <li>• Audit trails for data tracking</li>
                    <li>• Soft deletes for data integrity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  Authentication & Users
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>users</strong> - System users and authentication
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>user_sessions</strong> - Active user sessions
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>user_permissions</strong> - Role-based permissions
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  CRM Tables
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>leads</strong> - Sales leads and prospects
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>customers</strong> - Customer information
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>support_tickets</strong> - Customer support tickets
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>lead_activities</strong> - Lead interaction history
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
                  HRMS Tables
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>employees</strong> - Employee master data
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>attendance</strong> - Daily attendance records
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>leave_requests</strong> - Leave applications
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>payroll</strong> - Salary and payment records
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>performance_reviews</strong> - Performance evaluations
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 text-orange-600 mr-2" />
                  Supporting Tables
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>tasks</strong> - Task management
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>documents</strong> - File storage metadata
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>notifications</strong> - System notifications
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <strong>audit_logs</strong> - System activity tracking
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'user-tables':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">User & Authentication Tables</h1>
              <p className="text-lg text-gray-600 mb-6">
                Database schema for user management, authentication, and role-based access control.
              </p>
            </div>

            <div className="space-y-6">
              {/* Users Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    users
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">Core user information and authentication data</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Unique user identifier</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">username</td><td className="px-6 py-4 text-sm">VARCHAR(50)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Login username</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">User email address</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">password_hash</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Hashed password (bcrypt)</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">role</td><td className="px-6 py-4 text-sm">ENUM</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">admin, manager, employee</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">department</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">User department</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">is_active</td><td className="px-6 py-4 text-sm">BOOLEAN</td><td className="px-6 py-4 text-sm">DEFAULT TRUE</td><td className="px-6 py-4 text-sm">Account status</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Account creation time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Sessions Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-green-900 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    user_sessions
                  </h3>
                  <p className="text-sm text-green-700 mt-1">Active user sessions and JWT token management</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Session identifier</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">user_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Reference to users.id</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">token_hash</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Hashed JWT token</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">expires_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Token expiration time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Session creation time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">ip_address</td><td className="px-6 py-4 text-sm">INET</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Client IP address</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">user_agent</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Client user agent</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">SQL Schema Creation</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'employee',
    department VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles enum
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee');

-- User sessions table
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Indexes for performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);`}
              </pre>
            </div>
          </div>
        );

      case 'crm-tables':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">CRM Database Tables</h1>
              <p className="text-lg text-gray-600 mb-6">
                Database schema for Customer Relationship Management module including leads, customers, and support tickets.
              </p>
            </div>

            <div className="space-y-6">
              {/* Leads Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    leads
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">Sales leads and prospect information</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Unique lead identifier</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Lead full name</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Contact email</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">phone</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Contact phone number</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">company</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Company name</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">lead_status</td><td className="px-6 py-4 text-sm">DEFAULT 'warm'</td><td className="px-6 py-4 text-sm">hot, warm, cold</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">stage</td><td className="px-6 py-4 text-sm">lead_stage</td><td className="px-6 py-4 text-sm">DEFAULT 'lead'</td><td className="px-6 py-4 text-sm">Sales pipeline stage</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">value</td><td className="px-6 py-4 text-sm">DECIMAL(12,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Potential deal value</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">source</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Lead source</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">assigned_to</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Assigned employee ID</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">last_contact</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Last contact date</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">next_follow_up</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Next follow-up date</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">notes</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Additional notes</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Record creation time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">updated_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Last update time</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Support Tickets Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-green-900 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    support_tickets
                  </h3>
                  <p className="text-sm text-green-700 mt-1">Customer support and service tickets</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Unique ticket identifier</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">title</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Ticket title/subject</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">description</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Detailed description</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">customer_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Reference to leads.id</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">customer_name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Customer name</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">priority</td><td className="px-6 py-4 text-sm">ticket_priority</td><td className="px-6 py-4 text-sm">DEFAULT 'medium'</td><td className="px-6 py-4 text-sm">low, medium, high, urgent</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">ticket_status</td><td className="px-6 py-4 text-sm">DEFAULT 'open'</td><td className="px-6 py-4 text-sm">open, in-progress, resolved</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">assigned_to</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Assigned employee ID</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">category</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Ticket category</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">created_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">DEFAULT NOW()</td><td className="px-6 py-4 text-sm">Ticket creation time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">resolved_at</td><td className="px-6 py-4 text-sm">TIMESTAMP</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Resolution timestamp</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hrms-tables':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">HRMS Database Tables</h1>
              <p className="text-lg text-gray-600 mb-6">
                Database schema for Human Resource Management System including employees, attendance, payroll, and performance data.
              </p>
            </div>

            <div className="space-y-6">
              {/* Employees Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-purple-900 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    employees
                  </h3>
                  <p className="text-sm text-purple-700 mt-1">Employee master data and personal information</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Unique employee identifier</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Employee ID (BID001, etc.)</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">user_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Reference to users.id</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">name</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Full name</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">email</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">UNIQUE, NOT NULL</td><td className="px-6 py-4 text-sm">Work email</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">phone</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Contact number</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">department</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Department name</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">designation</td><td className="px-6 py-4 text-sm">VARCHAR(100)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Job title</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">manager_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Reference to employees.id</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">joining_date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Date of joining</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">salary</td><td className="px-6 py-4 text-sm">DECIMAL(10,2)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Base salary</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">employee_status</td><td className="px-6 py-4 text-sm">DEFAULT 'active'</td><td className="px-6 py-4 text-sm">active, inactive, terminated</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">address</td><td className="px-6 py-4 text-sm">TEXT</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Home address</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">emergency_contact</td><td className="px-6 py-4 text-sm">VARCHAR(20)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Emergency contact number</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">personal_details</td><td className="px-6 py-4 text-sm">JSONB</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">DOB, gender, marital status</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">bank_account</td><td className="px-6 py-4 text-sm">JSONB</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Bank account details</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-orange-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-orange-900 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    attendance
                  </h3>
                  <p className="text-sm text-orange-700 mt-1">Daily attendance and time tracking records</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Column</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraints</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 text-sm font-mono">id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">PRIMARY KEY</td><td className="px-6 py-4 text-sm">Unique attendance record</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">employee_id</td><td className="px-6 py-4 text-sm">UUID</td><td className="px-6 py-4 text-sm">FOREIGN KEY</td><td className="px-6 py-4 text-sm">Reference to employees.id</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">date</td><td className="px-6 py-4 text-sm">DATE</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Attendance date</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">clock_in</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Clock in time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">clock_out</td><td className="px-6 py-4 text-sm">TIME</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">Clock out time</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">total_hours</td><td className="px-6 py-4 text-sm">DECIMAL(4,2)</td><td className="px-6 py-4 text-sm">DEFAULT 0</td><td className="px-6 py-4 text-sm">Total working hours</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">status</td><td className="px-6 py-4 text-sm">attendance_status</td><td className="px-6 py-4 text-sm">DEFAULT 'present'</td><td className="px-6 py-4 text-sm">present, absent, late, half-day</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">location</td><td className="px-6 py-4 text-sm">VARCHAR(255)</td><td className="px-6 py-4 text-sm">NOT NULL</td><td className="px-6 py-4 text-sm">Work location</td></tr>
                      <tr><td className="px-6 py-4 text-sm font-mono">coordinates</td><td className="px-6 py-4 text-sm">POINT</td><td className="px-6 py-4 text-sm">NULL</td><td className="px-6 py-4 text-sm">GPS coordinates</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'frontend-setup':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Frontend Setup (React)</h1>
              <p className="text-lg text-gray-600 mb-6">
                Step-by-step guide to set up the React frontend with TypeScript and Tailwind CSS.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Prerequisites</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Node.js 18+ installed</li>
                  <li>• npm or yarn package manager</li>
                  <li>• Git for version control</li>
                  <li>• VS Code (recommended IDE)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Project Initialization</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Create new React project with Vite
npm create vite@latest bidua-erp-frontend -- --template react-ts

# Navigate to project directory
cd bidua-erp-frontend

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node

# Initialize Tailwind CSS
npx tailwindcss init -p`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Project Structure</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── layout/
│   │   └── Sidebar.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   ├── crm/
│   │   ├── CRMModule.tsx
│   │   ├── LeadsManagement.tsx
│   │   ├── SalesPipeline.tsx
│   │   └── CustomerSupport.tsx
│   ├── hrms/
│   │   ├── HRMSModule.tsx
│   │   ├── EmployeeManagement.tsx
│   │   ├── AttendanceManagement.tsx
│   │   ├── LeaveManagement.tsx
│   │   └── PayrollManagement.tsx
│   ├── employee/
│   │   ├── EmployeePortal.tsx
│   │   ├── EmployeeDashboard.tsx
│   │   └── EmployeeProfile.tsx
│   └── common/
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
├── types/
│   └── index.ts
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── storage.ts
├── hooks/
│   ├── useAuth.ts
│   └── useApi.ts
├── utils/
│   ├── constants.ts
│   └── helpers.ts
└── App.tsx`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Environment Configuration</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .env file
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0

# .env.production
VITE_API_BASE_URL=https://api.bidua.com
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">4. API Service Setup</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: \`Bearer \${this.token}\` }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.statusText}\`);
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'backend-setup':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Backend Setup (FastAPI)</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete guide to set up the FastAPI backend with PostgreSQL database integration.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Prerequisites</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• Python 3.11+ installed</li>
                  <li>• PostgreSQL 14+ installed</li>
                  <li>• pip package manager</li>
                  <li>• Virtual environment (venv/conda)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Project Setup</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Create project directory
mkdir bidua-erp-backend
cd bidua-erp-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary
pip install alembic python-jose[cryptography] passlib[bcrypt]
pip install python-multipart pydantic-settings python-dotenv`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Project Structure</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`app/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration settings
├── database.py            # Database connection and session
├── models/
│   ├── __init__.py
│   ├── user.py           # User model
│   ├── employee.py       # Employee model
│   ├── lead.py           # Lead model
│   ├── attendance.py     # Attendance model
│   └── task.py           # Task model
├── schemas/
│   ├── __init__.py
│   ├── user.py           # User Pydantic schemas
│   ├── employee.py       # Employee schemas
│   ├── lead.py           # Lead schemas
│   └── common.py         # Common schemas
├── api/
│   ├── __init__.py
│   ├── auth.py           # Authentication endpoints
│   ├── users.py          # User management endpoints
│   ├── employees.py      # Employee endpoints
│   ├── leads.py          # Lead endpoints
│   ├── attendance.py     # Attendance endpoints
│   └── tasks.py          # Task endpoints
├── core/
│   ├── __init__.py
│   ├── security.py       # Password hashing, JWT
│   ├── permissions.py    # Role-based access control
│   └── exceptions.py     # Custom exceptions
├── services/
│   ├── __init__.py
│   ├── auth_service.py   # Authentication business logic
│   ├── employee_service.py
│   ├── lead_service.py
│   └── notification_service.py
└── alembic/              # Database migrations
    ├── versions/
    └── env.py`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Main Application (main.py)</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users, employees, leads, attendance, tasks
from app.database import engine
from app.models import user, employee, lead, attendance as att_model, task

# Create database tables
user.Base.metadata.create_all(bind=engine)
employee.Base.metadata.create_all(bind=engine)
lead.Base.metadata.create_all(bind=engine)
att_model.Base.metadata.create_all(bind=engine)
task.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BIDUA ERP API",
    description="Enterprise Resource Planning System API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(employees.router, prefix="/api/employees", tags=["employees"])
app.include_router(leads.router, prefix="/api/leads", tags=["leads"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["attendance"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {"message": "BIDUA ERP API is running"}`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'database-setup':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Setup (PostgreSQL)</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete PostgreSQL database setup with tables, relationships, and initial data.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Database Configuration</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# PostgreSQL Installation (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE bidua_erp;
CREATE USER bidua_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE bidua_erp TO bidua_user;
\\q`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Connection (database.py)</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Database URL
SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"

# Create engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`}
                </pre>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Schema Creation Script</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`-- Create ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee');
CREATE TYPE lead_status AS ENUM ('hot', 'warm', 'cold');
CREATE TYPE lead_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'half-day');
CREATE TYPE leave_type AS ENUM ('casual', 'sick', 'annual', 'maternity', 'emergency');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed', 'cancelled');
CREATE TYPE payroll_status AS ENUM ('draft', 'processed', 'paid');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'employee',
    department VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    joining_date DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    status employee_status DEFAULT 'active',
    address TEXT NOT NULL,
    emergency_contact VARCHAR(20) NOT NULL,
    personal_details JSONB,
    bank_account JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255) NOT NULL,
    status lead_status DEFAULT 'warm',
    stage lead_stage DEFAULT 'lead',
    value DECIMAL(12,2) DEFAULT 0,
    source VARCHAR(100),
    assigned_to UUID REFERENCES employees(id) ON DELETE SET NULL,
    last_contact DATE,
    next_follow_up DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Continue with other tables...`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'communication-overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Portal Communication Overview</h1>
              <p className="text-lg text-gray-600 mb-6">
                Understanding how different user portals communicate with the backend and share data.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Communication Flow</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-red-100 p-4 rounded-lg mb-4">
                    <Shield className="w-12 h-12 text-red-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-red-900">Admin Portal</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Full system access</li>
                    <li>• User management</li>
                    <li>• System configuration</li>
                    <li>• All module access</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                    <Users className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-yellow-900">Manager Portal</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Department management</li>
                    <li>• Team oversight</li>
                    <li>• Approval workflows</li>
                    <li>• Reporting access</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg mb-4">
                    <User className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-900">Employee Portal</h3>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Personal dashboard</li>
                    <li>• Self-service features</li>
                    <li>• Task management</li>
                    <li>• Document access</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Network className="w-5 h-5 text-blue-600 mr-2" />
                  API Communication Pattern
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Authentication Flow</h4>
                    <p className="text-sm text-blue-800">JWT token-based authentication with role verification</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">2. Role-Based Access</h4>
                    <p className="text-sm text-green-800">Middleware checks user permissions for each endpoint</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">3. Data Filtering</h4>
                    <p className="text-sm text-purple-800">Backend filters data based on user role and department</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Database className="w-5 h-5 text-purple-600 mr-2" />
                  Data Access Patterns
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Admin Access</h4>
                    <p className="text-sm text-red-800">Full CRUD operations on all tables</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Manager Access</h4>
                    <p className="text-sm text-yellow-800">Department-filtered data with approval rights</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Employee Access</h4>
                    <p className="text-sm text-green-800">Personal data only with limited modifications</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation Overview</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete REST API documentation for all endpoints with request/response examples.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">API Base Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">http://localhost:8000/api</code>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">Bearer JWT Token</code>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content Type</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">application/json</code>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">API Documentation</h4>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">http://localhost:8000/docs</code>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">API Modules</h2>
                
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      Authentication API
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">User login, logout, and token management</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                        <code>/auth/login</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">POST</span>
                        <code>/auth/logout</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                        <code>/auth/me</code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="w-5 h-5 text-green-600 mr-2" />
                      CRM API
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Leads, customers, and support ticket management</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                        <code>/leads</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                        <code>/leads</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">PUT</span>
                        <code>/leads/{id}</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">DELETE</span>
                        <code>/leads/{id}</code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <UserCheck className="w-5 h-5 text-purple-600 mr-2" />
                      HRMS API
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Employee, attendance, and payroll management</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                        <code>/employees</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">POST</span>
                        <code>/attendance</code>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">GET</span>
                        <code>/payroll/{employee_id}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Request/Response Examples</h2>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Login Request Example</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "bidua123"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-here",
    "username": "admin",
    "email": "admin@bidua.com",
    "role": "admin",
    "department": "IT"
  }
}`}
                  </pre>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Create Lead Example</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/leads
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "+91 98765 43210",
  "company": "ABC Corp",
  "status": "warm",
  "stage": "lead",
  "value": 500000,
  "source": "Website"
}

Response:
{
  "id": "uuid-here",
  "name": "John Doe",
  "email": "john@company.com",
  "company": "ABC Corp",
  "status": "warm",
  "stage": "lead",
  "value": 500000,
  "created_at": "2025-01-15T10:30:00Z"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-flow':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Flow Diagrams</h1>
              <p className="text-lg text-gray-600 mb-6">
                Visual representation of how data flows between different components of the BIDUA ERP system.
              </p>
            </div>

            <div className="space-y-8">
              {/* User Authentication Flow */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  User Authentication Flow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-lg mb-2">
                      <Monitor className="w-8 h-8 text-blue-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">1. Login Form</h4>
                    <p className="text-xs text-gray-600">User enters credentials</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-lg mb-2">
                      <Server className="w-8 h-8 text-green-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">2. API Validation</h4>
                    <p className="text-xs text-gray-600">FastAPI validates credentials</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-4 rounded-lg mb-2">
                      <Database className="w-8 h-8 text-purple-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">3. Database Query</h4>
                    <p className="text-xs text-gray-600">PostgreSQL user lookup</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 p-4 rounded-lg mb-2">
                      <CheckCircle className="w-8 h-8 text-orange-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">4. JWT Token</h4>
                    <p className="text-xs text-gray-600">Return access token</p>
                  </div>
                </div>
              </div>

              {/* CRM Data Flow */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  CRM Data Flow
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Lead Creation</h4>
                      <p className="text-sm text-blue-800 mb-2">Frontend → API → Database</p>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Form validation</li>
                        <li>• API request with JWT</li>
                        <li>• Database insertion</li>
                        <li>• Real-time updates</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Pipeline Updates</h4>
                      <p className="text-sm text-green-800 mb-2">Status changes trigger workflows</p>
                      <ul className="text-xs text-green-700 space-y-1">
                        <li>• Stage progression</li>
                        <li>• Notification triggers</li>
                        <li>• Audit log creation</li>
                        <li>• Analytics updates</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Reporting</h4>
                      <p className="text-sm text-purple-800 mb-2">Aggregated data for insights</p>
                      <ul className="text-xs text-purple-700 space-y-1">
                        <li>• Real-time calculations</li>
                        <li>• Cached results</li>
                        <li>• Export functionality</li>
                        <li>• Dashboard updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* HRMS Data Flow */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <UserCheck className="w-6 h-6 text-purple-600 mr-3" />
                  HRMS Data Flow
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Attendance Tracking</h4>
                      <p className="text-sm text-orange-800 mb-2">Real-time clock in/out system</p>
                      <ul className="text-xs text-orange-700 space-y-1">
                        <li>• GPS location capture</li>
                        <li>• Geofence validation</li>
                        <li>• Automatic calculations</li>
                        <li>• Manager notifications</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-teal-900 mb-2">Leave Management</h4>
                      <p className="text-sm text-teal-800 mb-2">Approval workflow system</p>
                      <ul className="text-xs text-teal-700 space-y-1">
                        <li>• Application submission</li>
                        <li>• Manager approval</li>
                        <li>• Balance calculations</li>
                        <li>• Calendar integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">BIDUA ERP Development Documentation</h1>
              <p className="text-xl text-gray-600 mb-8">
                Complete technical documentation for developing the BIDUA Enterprise Resource Planning system 
                with React frontend, FastAPI backend, and PostgreSQL database.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
              <div className="text-center">
                <Code className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Progress</h2>
                <p className="text-gray-600 mb-6">
                  Track the development progress of converting static frontend to full-stack application
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">Frontend Complete</h3>
                    <p className="text-sm text-gray-600">React UI with all components</p>
                    <div className="mt-2 bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-full"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">100% Complete</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">Backend In Progress</h3>
                    <p className="text-sm text-gray-600">FastAPI development</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full w-1/3"></div>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">30% Complete</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">Database Pending</h3>
                    <p className="text-sm text-gray-600">PostgreSQL setup</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full w-1/6"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">15% Complete</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Quick Navigation</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => setActiveSection('architecture')}
                    className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Layers className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">System Architecture</h3>
                        <p className="text-sm text-gray-600">Three-tier architecture overview</p>
                      </div>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveSection('schema-overview')}
                    className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Database className="w-6 h-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Database Schema</h3>
                        <p className="text-sm text-gray-600">Complete database design</p>
                      </div>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveSection('api-overview')}
                    className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Server className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">API Documentation</h3>
                        <p className="text-sm text-gray-600">REST API endpoints and examples</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Development Phases</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">Phase 1: Frontend (Completed)</h3>
                    </div>
                    <ul className="text-sm text-green-800 space-y-1 ml-8">
                      <li>• React components and UI</li>
                      <li>• TypeScript integration</li>
                      <li>• Responsive design</li>
                      <li>• Role-based views</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-900">Phase 2: Backend (In Progress)</h3>
                    </div>
                    <ul className="text-sm text-yellow-800 space-y-1 ml-8">
                      <li>• FastAPI application setup</li>
                      <li>• Authentication system</li>
                      <li>• API endpoints development</li>
                      <li>• Business logic implementation</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Phase 3: Database (Planned)</h3>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1 ml-8">
                      <li>• PostgreSQL schema creation</li>
                      <li>• Data migration scripts</li>
                      <li>• Indexing and optimization</li>
                      <li>• Backup and recovery setup</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Phase 4: Deployment (Future)</h3>
                    </div>
                    <ul className="text-sm text-purple-800 space-y-1 ml-8">
                      <li>• Docker containerization</li>
                      <li>• CI/CD pipeline setup</li>
                      <li>• Production deployment</li>
                      <li>• Monitoring and logging</li>
                    </ul>
                  </div>
                </div>
              </div>
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
      {/* Sidebar Navigation */}
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
            <Link
              to="/"
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
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

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {filteredNavItems.map((section) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.includes(section.id);
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{section.title}</span>
                    </div>
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>© 2025 BIDUA ERP</p>
            <p>Development Documentation v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Development Documentation</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {navigationItems.find(item => 
                item.children?.some(child => child.id === activeSection)
              )?.title || 'Project Overview'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl">
            {getContentForSection(activeSection)}
          </div>
        </main>

        {/* Content Footer */}
        <div className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Last updated: January 15, 2025
            </div>
            <div className="flex items-center space-x-4">
              <span>Was this helpful?</span>
              <div className="flex space-x-2">
                <button className="text-green-600 hover:text-green-700">👍</button>
                <button className="text-red-600 hover:text-red-700">👎</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;