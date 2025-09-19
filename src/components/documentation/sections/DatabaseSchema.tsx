import React, { useState } from 'react';
import { 
  BookOpen, Download, Code, Database, Server, Globe, Shield, Zap, Smartphone, Target,
  AlertTriangle, Home, Layers, Settings, GitBranch, Clock, CheckCircle, Users, ArrowRight, FileText
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Database Schema</h1>
              <p className="text-lg text-gray-600 mb-6">
                Complete PostgreSQL database schema for the BIDUA ERP system based on your actual Python/SQLAlchemy models and Pydantic schemas.
              </p>
            </div>

            {/* Schema Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
              <div className="text-center">
                <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">SQLAlchemy Models Overview</h2>
                <p className="text-gray-600 mb-6">
                  Database schema based on your actual Python models with proper relationships and constraints
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-lg mb-3">
                      <Code className="w-8 h-8 text-blue-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Authentication</h3>
                    <p className="text-sm text-gray-600">5 tables</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-lg mb-3">
                      <FileText className="w-8 h-8 text-green-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Product Management</h3>
                    <p className="text-sm text-gray-600">6 tables</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-4 rounded-lg mb-3">
                      <Database className="w-8 h-8 text-purple-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Sales & Orders</h3>
                    <p className="text-sm text-gray-600">4 tables</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 p-4 rounded-lg mb-3">
                      <FileText className="w-8 h-8 text-orange-600 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-gray-900">HR & Employees</h3>
                    <p className="text-sm text-gray-600">3 tables</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentication & User Management */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication & User Management</h3>
              
              {/* Users Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">users</h4>
                <p className="text-gray-600 mb-4">User authentication and profile information (SQLAlchemy Model)</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, INDEX</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">email</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE, INDEX</td>
                        <td className="border border-gray-300 px-4 py-2">User's email address</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">hashed_password</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Hashed password</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">full_name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">User's full name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">is_active</td>
                        <td className="border border-gray-300 px-4 py-2">BOOLEAN</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, DEFAULT TRUE</td>
                        <td className="border border-gray-300 px-4 py-2">Account status</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">created_at</td>
                        <td className="border border-gray-300 px-4 py-2">DATETIME</td>
                        <td className="border border-gray-300 px-4 py-2">DEFAULT datetime.utcnow</td>
                        <td className="border border-gray-300 px-4 py-2">Account creation time</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Roles Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">roles</h4>
                <p className="text-gray-600 mb-4">User roles with many-to-many relationship to users and permissions</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE</td>
                        <td className="border border-gray-300 px-4 py-2">Role name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">description</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Role description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Permissions Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">permissions</h4>
                <p className="text-gray-600 mb-4">System permissions linked to roles</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">code</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(128)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE</td>
                        <td className="border border-gray-300 px-4 py-2">Permission code</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">description</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Permission description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Address & Company Management */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Address & Company Management</h3>
              
              {/* Addresses Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">addresses</h4>
                <p className="text-gray-600 mb-4">Address information storage</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">line1</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Address line 1</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">line2</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Address line 2</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">city</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">City name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">state</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">State/Province</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">postal_code</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(32)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Postal/ZIP code</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">country</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                        <td className="border border-gray-300 px-4 py-2">DEFAULT 'India'</td>
                        <td className="border border-gray-300 px-4 py-2">Country name</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Company Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">companies</h4>
                <p className="text-gray-600 mb-4">Company information with address relationship</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Company name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">gstin</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(32)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">GST identification number</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">contact_email</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Primary contact email</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">contact_phone</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(50)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Primary contact phone</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">address_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">FK REFERENCES addresses(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Company address</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Product & Inventory Management */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product & Inventory Management</h3>
              
              {/* Categories Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">categories</h4>
                <p className="text-gray-600 mb-4">Hierarchical product categories (self-referencing)</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(150)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Category name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">parent_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">FK REFERENCES categories(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Parent category (self-referencing)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">products</h4>
                <p className="text-gray-600 mb-4">Product catalog with SKU, pricing, and category relationship</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">sku</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(64)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE</td>
                        <td className="border border-gray-300 px-4 py-2">Stock Keeping Unit</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Product name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">description</td>
                        <td className="border border-gray-300 px-4 py-2">TEXT</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Product description</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">unit_price</td>
                        <td className="border border-gray-300 px-4 py-2">NUMERIC(12,2)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Selling price per unit</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">cost_price</td>
                        <td className="border border-gray-300 px-4 py-2">NUMERIC(12,2)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Cost price per unit</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">is_active</td>
                        <td className="border border-gray-300 px-4 py-2">BOOLEAN</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, DEFAULT TRUE</td>
                        <td className="border border-gray-300 px-4 py-2">Product status</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">category_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">FK REFERENCES categories(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Product category</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Warehouses Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">warehouses</h4>
                <p className="text-gray-600 mb-4">Warehouse locations for inventory management</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(150)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Warehouse name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">location</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Warehouse location</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stock Movements Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">stock_movements</h4>
                <p className="text-gray-600 mb-4">Inventory movement tracking with product and warehouse relationships</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">product_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES products(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Product being moved</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">warehouse_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES warehouses(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Warehouse location</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">change</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity change (+/-)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">reason</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Reason for movement</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">occurred_at</td>
                        <td className="border border-gray-300 px-4 py-2">DATETIME</td>
                        <td className="border border-gray-300 px-4 py-2">DEFAULT datetime.utcnow</td>
                        <td className="border border-gray-300 px-4 py-2">When movement occurred</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sales & Order Management */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sales & Order Management</h3>
              
              {/* Sales Orders Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">sales_orders</h4>
                <p className="text-gray-600 mb-4">Sales order header information</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">company_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES companies(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Customer company</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">order_date</td>
                        <td className="border border-gray-300 px-4 py-2">DATE</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Order date</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">due_date</td>
                        <td className="border border-gray-300 px-4 py-2">DATE</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Payment due date</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">notes</td>
                        <td className="border border-gray-300 px-4 py-2">TEXT</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Order notes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sales Order Items Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">sales_order_items</h4>
                <p className="text-gray-600 mb-4">Individual line items for sales orders</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">sales_order_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES sales_orders(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Parent sales order</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">product_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES products(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Product being sold</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">quantity</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Quantity ordered</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">unit_price</td>
                        <td className="border border-gray-300 px-4 py-2">NUMERIC(12,2)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Price per unit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Accounting Tables */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Accounting & Finance</h3>
              
              {/* Accounts Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">accounts</h4>
                <p className="text-gray-600 mb-4">Chart of accounts for financial tracking</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Account name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">code</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(64)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Account code</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">account_type</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(50)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Asset, Liability, Equity, Revenue, Expense</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">balance</td>
                        <td className="border border-gray-300 px-4 py-2">NUMERIC(14,2)</td>
                        <td className="border border-gray-300 px-4 py-2">DEFAULT 0</td>
                        <td className="border border-gray-300 px-4 py-2">Current account balance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Journal Entries Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">journal_entries</h4>
                <p className="text-gray-600 mb-4">Journal entry headers for double-entry bookkeeping</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">date</td>
                        <td className="border border-gray-300 px-4 py-2">DATE</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Journal entry date</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">narration</td>
                        <td className="border border-gray-300 px-4 py-2">TEXT</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Entry description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Journal Entry Lines Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">journal_entry_lines</h4>
                <p className="text-gray-600 mb-4">Individual debit/credit lines for journal entries</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">journal_entry_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES journal_entries(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Parent journal entry</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">account_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES accounts(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Account being affected</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">debit</td>
                        <td className="border border-gray-300 px-4 py-2">NUMERIC(14,2)</td>
                        <td className="border border-gray-300 px-4 py-2">DEFAULT 0</td>
                        <td className="border border-gray-300 px-4 py-2">Debit amount</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">credit</td>
                        <td className="border border-gray-300 px-4 py-2">NUMERIC(14,2)</td>
                        <td className="border border-gray-300 px-4 py-2">DEFAULT 0</td>
                        <td className="border border-gray-300 px-4 py-2">Credit amount</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">narration</td>
                        <td className="border border-gray-300 px-4 py-2">TEXT</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Line item description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* HR & Employee Management */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">HR & Employee Management</h3>
              
              {/* Employees Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">employees</h4>
                <p className="text-gray-600 mb-4">Employee basic information (simplified model)</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">first_name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(150)</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Employee first name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">last_name</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(150)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Employee last name</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">email</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Work email address</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">phone</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(50)</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Contact phone number</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">emp_code</td>
                        <td className="border border-gray-300 px-4 py-2">VARCHAR(64)</td>
                        <td className="border border-gray-300 px-4 py-2">UNIQUE, NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Employee code/ID</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">joined_at</td>
                        <td className="border border-gray-300 px-4 py-2">DATE</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Date of joining</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">attendances</h4>
                <p className="text-gray-600 mb-4">Employee attendance records with check-in/out times</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">PRIMARY KEY</td>
                        <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">employee_id</td>
                        <td className="border border-gray-300 px-4 py-2">INTEGER</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL, FK REFERENCES employees(id)</td>
                        <td className="border border-gray-300 px-4 py-2">Employee reference</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">date</td>
                        <td className="border border-gray-300 px-4 py-2">DATE</td>
                        <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                        <td className="border border-gray-300 px-4 py-2">Attendance date</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">check_in</td>
                        <td className="border border-gray-300 px-4 py-2">DATETIME</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Check-in timestamp</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">check_out</td>
                        <td className="border border-gray-300 px-4 py-2">DATETIME</td>
                        <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                        <td className="border border-gray-300 px-4 py-2">Check-out timestamp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pydantic Schemas Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pydantic Schemas</h3>
              <p className="text-gray-600 mb-6">
                Request/Response validation schemas with proper type constraints and validation rules.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">User Schemas</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Base Models
class IDModel(BaseModel):
    id: int
    class Config:
        orm_mode = True

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str]
    is_active: bool = True

UserCreate_Password = constr(min_length=8)

class UserCreate(UserBase):
    password: str = UserCreate_Password

class UserUpdate(BaseModel):
    full_name: Optional[str]
    is_active: Optional[bool]

class UserRead(UserBase, IDModel):
    created_at: datetime

# Role & Permission Schemas
class PermissionBase(BaseModel):
    code: str
    description: Optional[str]

class PermissionRead(PermissionBase, IDModel):
    pass

class RoleBase(BaseModel):
    name: str
    description: Optional[str]

class RoleRead(RoleBase, IDModel):
    permissions: List[PermissionRead] = []`}
                </pre>
              </div>
            </div>

            {/* Product Schemas */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Product & Inventory Schemas</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Product Schemas with Validation
ProductBase_SKU = constr(max_length=64)
ProductBase_UNIT_PRICE = condecimal(max_digits=12, decimal_places=2)
ProductBase_COST_PRICE = Optional[condecimal(max_digits=12, decimal_places=2)]

class ProductBase(BaseModel):
    sku: str = ProductBase_SKU
    name: str
    description: Optional[str]
    unit_price: float = ProductBase_UNIT_PRICE
    cost_price: ProductBase_COST_PRICE
    is_active: bool = True
    category_id: Optional[int]

class ProductCreate(ProductBase):
    initial_stock: Optional[int] = 0

ProductUpdate_Unit_price = Optional[condecimal(max_digits=12, decimal_places=2)]

class ProductUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    unit_price: float = ProductUpdate_Unit_price
    is_active: Optional[bool]

class ProductRead(ProductBase, IDModel):
    category: Optional[CategoryRead]
    available_stock: int = 0

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    parent_id: Optional[int]

class CategoryRead(CategoryBase, IDModel):
    pass

# Warehouse & Stock Movement Schemas
class WarehouseBase(BaseModel):
    name: str
    location: Optional[str]

class WarehouseRead(WarehouseBase, IDModel):
    pass

class StockMovementBase(BaseModel):
    product_id: int
    warehouse_id: int
    change: int
    reason: Optional[str]
    occurred_at: Optional[datetime]

class StockMovementRead(StockMovementBase, IDModel):
    occurred_at: datetime`}
                </pre>
              </div>
            </div>

            {/* Sales & Order Schemas */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Sales & Order Schemas</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Order Item Schemas
OrderItemBase_Unit_price = condecimal(max_digits=12, decimal_places=2)

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float = OrderItemBase_Unit_price

# Order Schemas
class OrderBase(BaseModel):
    company_id: int
    order_date: date
    due_date: Optional[date]
    notes: Optional[str]

class SalesOrderCreate(OrderBase):
    items: List[OrderItemBase]

SalesOrderRead_Total_Amount = condecimal(max_digits=14, decimal_places=2)

class SalesOrderRead(OrderBase, IDModel):
    total_amount: float = SalesOrderRead_Total_Amount
    items: List[OrderItemBase]

# Company Schemas
class CompanyBase(BaseModel):
    name: str
    gstin: Optional[str]
    contact: Optional[ContactBase]

class CompanyCreate(CompanyBase):
    pass

class CompanyRead(CompanyBase, IDModel):
    created_at: datetime`}
                </pre>
              </div>
            </div>

            {/* Accounting Schemas */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Accounting Schemas</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Account Schemas
AccountRead_Balance = condecimal(max_digits=14, decimal_places=2) = 0

class AccountBase(BaseModel):
    name: str
    code: Optional[str]
    account_type: str  # Asset, Liability, Equity, Revenue, Expense

class AccountRead(AccountBase, IDModel):
    balance: float = AccountRead_Balance

# Journal Entry Schemas
JournalEntryLine_Debit = Optional[condecimal(max_digits=14, decimal_places=2)] = 0
JournalEntryLine_Credit = Optional[condecimal(max_digits=14, decimal_places=2)] = 0

class JournalEntryLine(BaseModel):
    account_id: int
    debit: float = JournalEntryLine_Debit
    credit: float = JournalEntryLine_Credit
    narration: Optional[str]

class JournalEntryCreate(BaseModel):
    date: date
    narration: Optional[str]
    lines: List[JournalEntryLine]

class JournalEntryRead(IDModel):
    date: date
    narration: Optional[str]
    lines: List[JournalEntryLine]`}
                </pre>
              </div>
            </div>

            {/* Employee & Attendance Schemas */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">HR & Employee Schemas</h4>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Employee Schemas
class EmployeeBase(BaseModel):
    first_name: str
    last_name: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    emp_code: Optional[str]

class EmployeeRead(EmployeeBase, IDModel):
    joined_at: Optional[date]

# Attendance Schemas
class AttendanceRecord(BaseModel):
    employee_id: int
    date: date
    check_in: Optional[datetime]
    check_out: Optional[datetime]

# Pagination & Filters
class Pagination(BaseModel):
    page: int = 1
    size: int = 25

class FilterResponse(BaseModel):
    total: int
    page: int
    size: int`}
                </pre>
              </div>
            </div>

            {/* Complete SQL Schema Creation */}
            <div className="bg-gray-900 text-green-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Complete SQLAlchemy Schema Creation Script</h3>
              <pre className="text-sm overflow-x-auto">
{`# Python SQLAlchemy Models - Complete Schema
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, Date, ForeignKey, Numeric, Text, Table
)
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

# Association tables for many-to-many relationships
role_permission = Table(
    "role_permission", Base.metadata,
    Column("role_id", Integer, ForeignKey("roles.id"), primary_key=True),
    Column("permission_id", Integer, ForeignKey("permissions.id"), primary_key=True),
)

user_role = Table(
    "user_role", Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("role_id", Integer, ForeignKey("roles.id"), primary_key=True),
)

# Core Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    roles = relationship("Role", secondary=user_role, back_populates="users")

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(String(255))
    
    permissions = relationship("Permission", secondary=role_permission, back_populates="roles")
    users = relationship("User", secondary=user_role, back_populates="roles")

class Permission(Base):
    __tablename__ = "permissions"
    id = Column(Integer, primary_key=True)
    code = Column(String(128), unique=True, nullable=False)
    description = Column(String(255))
    
    roles = relationship("Role", secondary=role_permission, back_populates="permissions")

class Address(Base):
    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True)
    line1 = Column(String(255), nullable=False)
    line2 = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    postal_code = Column(String(32))
    country = Column(String(100), default="India")

class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    gstin = Column(String(32))
    contact_email = Column(String(255))
    contact_phone = Column(String(50))
    address_id = Column(Integer, ForeignKey("addresses.id"))
    address = relationship("Address")

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    parent = relationship("Category", remote_side=[id])

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    sku = Column(String(64), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    unit_price = Column(Numeric(12,2), nullable=False)
    cost_price = Column(Numeric(12,2))
    is_active = Column(Boolean, default=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category")

class Warehouse(Base):
    __tablename__ = "warehouses"
    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    location = Column(String(255))

class StockMovement(Base):
    __tablename__ = "stock_movements"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    change = Column(Integer, nullable=False)
    reason = Column(String(255))
    occurred_at = Column(DateTime, default=datetime.utcnow)
    
    product = relationship("Product")
    warehouse = relationship("Warehouse")

class SalesOrder(Base):
    __tablename__ = "sales_orders"
    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    order_date = Column(Date, nullable=False)
    due_date = Column(Date)
    notes = Column(Text)
    
    company = relationship("Company")
    items = relationship("SalesOrderItem", cascade="all, delete-orphan")

class SalesOrderItem(Base):
    __tablename__ = "sales_order_items"
    id = Column(Integer, primary_key=True)
    sales_order_id = Column(Integer, ForeignKey("sales_orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(12,2), nullable=False)
    
    product = relationship("Product")

class Account(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    code = Column(String(64))
    account_type = Column(String(50))
    balance = Column(Numeric(14,2), default=0)

class JournalEntry(Base):
    __tablename__ = "journal_entries"
    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    narration = Column(Text)
    lines = relationship("JournalEntryLine", cascade="all, delete-orphan")

class JournalEntryLine(Base):
    __tablename__ = "journal_entry_lines"
    id = Column(Integer, primary_key=True)
    journal_entry_id = Column(Integer, ForeignKey("journal_entries.id"), nullable=False)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    debit = Column(Numeric(14,2), default=0)
    credit = Column(Numeric(14,2), default=0)
    narration = Column(Text)
    
    account = relationship("Account")

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(150), nullable=False)
    last_name = Column(String(150))
    email = Column(String(255))
    phone = Column(String(50))
    emp_code = Column(String(64), unique=True)
    joined_at = Column(Date)

class Attendance(Base):
    __tablename__ = "attendances"
    id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    date = Column(Date, nullable=False)
    check_in = Column(DateTime)
    check_out = Column(DateTime)
    
    employee = relationship("Employee")`}
              </pre>
            </div>

            {/* Migration Commands */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Database Migration Commands</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Initialize Alembic for migrations
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial schema"

# Apply migrations
alembic upgrade head

# Create new migration after model changes
alembic revision --autogenerate -m "Add new tables"

# Check current migration status
alembic current

# View migration history
alembic history`}
              </pre>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">FastAPI Backend Setup</h2>
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

# Start FastAPI development server
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
{`src/components/
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
{`Routes:
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