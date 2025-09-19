import React from 'react';
import { Layers, Monitor, Server, Database, Users, UserCheck, CheckCircle, AlertTriangle, Clock, Globe, Code } from 'lucide-react';

const ProjectOverview: React.FC = () => {
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
    </div>
  );
};

export default ProjectOverview;