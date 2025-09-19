import React, { useState } from 'react';
import { Book, Search, ChevronRight, ChevronDown, LogOut, ArrowLeft } from 'lucide-react';
import ProjectOverview from './sections/ProjectOverview';
import SystemArchitecture from './sections/SystemArchitecture';
import TechnologyStack from './sections/TechnologyStack';
import ProjectBlueprint from './sections/ProjectBlueprint';
import DatabaseRelationships from './sections/DatabaseRelationships';
import UserAuthSchema from './sections/UserAuthSchema';
import HRMSEmployeeSchema from './sections/HRMSEmployeeSchema';
import HRMSPayrollSchema from './sections/HRMSPayrollSchema';
import HRMSAttendanceSchema from './sections/HRMSAttendanceSchema';
import CRMSchema from './sections/CRMSchema';
import APIDocumentationOverview from './sections/APIDocumentationOverview';
import FrontendSetup from './sections/FrontendSetup';
import BackendSetup from './sections/BackendSetup';
import UnderDevelopmentSection from './sections/UnderDevelopmentSection';

interface DocumentationPortalProps {
  currentUser: any;
  activeSection: string;
  onLogout: () => void;
  onSectionChange: (sectionId: string) => void;
}

const DocumentationPortal: React.FC<DocumentationPortalProps> = ({
  currentUser,
  activeSection,
  onLogout,
  onSectionChange
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
        { id: 'system-architecture', title: 'System Architecture' },
        { id: 'technology-stack', title: 'Technology Stack' },
        { id: 'project-blueprint', title: 'Project Blueprint' },
        { id: 'setup', title: 'Development Setup' },
      ]
    },
    {
      id: 'development-guide',
      title: 'Development Guide',
      children: [
        { id: 'frontend-setup', title: 'Frontend Setup (React)' },
        { id: 'backend-setup', title: 'Backend Setup (FastAPI)' },
        { id: 'database-setup', title: 'Database Setup (PostgreSQL)' },
        { id: 'deployment', title: 'Deployment Guide' },
        { id: 'testing', title: 'Testing Strategy' }
      ]
    },
    {
      id: 'database-schema',
      title: 'Database Schema',
      children: [
        { id: 'schema-overview', title: 'Schema Overview' },
        { id: 'user-auth-schema', title: 'User & Authentication' },
        { id: 'crm-schema', title: 'CRM Schema' },
        { id: 'hrms-employee-schema', title: 'HRMS Employee Schema' },
        { id: 'hrms-attendance-schema', title: 'HRMS Attendance Schema' },
        { id: 'hrms-leave-schema', title: 'HRMS Leave Schema' },
        { id: 'hrms-task-schema', title: 'HRMS Task Schema' },
        { id: 'hrms-performance-schema', title: 'HRMS Performance Schema' },
        { id: 'hrms-payroll-schema', title: 'HRMS Payroll Schema' },
        { id: 'hrms-document-geofence-schema', title: 'HRMS Document & Geofence Schema' },
        { id: 'relationships', title: 'Table Relationships' },
      ]
    },
    {
      id: 'api-documentation',
      title: 'API Documentation',
      children: [
        { id: 'api-overview', title: 'API Overview' },
        { id: 'auth-endpoints', title: 'Authentication Endpoints' },
        { id: 'user-endpoints', title: 'User Management Endpoints' },
        { id: 'crm-endpoints', title: 'CRM Endpoints' },
        { id: 'hrms-endpoints', title: 'HRMS Endpoints' },
        { id: 'file-endpoints', title: 'File Management Endpoints' },
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
        { id: 'api-integration', title: 'API Integration' }
      ]
    },
    {
      id: 'deployment',
      title: 'Deployment',
      children: [
        { id: 'deployment', title: 'Deployment Guide' },
        { id: 'monitoring', title: 'Monitoring' },
        { id: 'performance', title: 'Performance Optimization' }
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
      case 'project-overview':
        return <ProjectOverview />;
      case 'architecture':
      case 'system-architecture':
        return <SystemArchitecture />;
      case 'tech-stack':
      case 'system-architecture':
        return <SystemArchitecture />;
      case 'technology-stack':
        return <TechnologyStack />;
      case 'project-blueprint':
        return <ProjectBlueprint />;
      case 'setup':
        return (
          <UnderDevelopmentSection 
            title="Development Setup"
            description="Quick start guide for setting up the development environment."
            estimatedCompletion="Coming soon"
          />
        );
      case 'frontend-setup':
        return <FrontendSetup />;
      case 'backend-setup':
        return <BackendSetup />;
      case 'database-setup':
        return (
          <UnderDevelopmentSection 
            title="Database Setup (PostgreSQL)"
            description="PostgreSQL database setup and configuration."
            estimatedCompletion="Coming soon"
          />
        );
      case 'deployment':
        return (
          <UnderDevelopmentSection 
            title="Deployment Guide"
            description="Production deployment guide for React + FastAPI + PostgreSQL stack."
            estimatedCompletion="Coming soon"
          />
        );
      case 'testing':
        return (
          <UnderDevelopmentSection 
            title="Testing Strategy"
            description="Testing approaches for React frontend and FastAPI backend."
            estimatedCompletion="Coming soon"
          />
        );
      case 'schema':
      case 'technology-stack':
        return <TechnologyStack />;
      case 'schema-overview':
        return (
          <UnderDevelopmentSection 
            title="Database Schema Overview"
            description="High-level overview of the complete PostgreSQL database schema."
            estimatedCompletion="Coming soon"
          />
        );
      case 'user-auth-schema':
        return <UserAuthSchema />;
      case 'crm-schema':
        return <CRMSchema />;
      case 'hrms-employee-schema':
        return <HRMSEmployeeSchema />;
      case 'hrms-attendance-schema':
        return <HRMSAttendanceSchema />;
      case 'hrms-leave-schema':
        return (
          <UnderDevelopmentSection 
            title="HRMS Leave Schema"
            description="Leave management database schema and workflow."
            estimatedCompletion="Coming soon"
          />
        );
      case 'hrms-task-schema':
        return (
          <UnderDevelopmentSection 
            title="HRMS Task Schema"
            description="Task management database schema and relationships."
            estimatedCompletion="Coming soon"
          />
        );
      case 'hrms-performance-schema':
        return (
          <UnderDevelopmentSection 
            title="HRMS Performance Schema"
            description="Performance evaluation database schema and KPI tracking."
            estimatedCompletion="Coming soon"
          />
        );
      case 'hrms-payroll-schema':
        return <HRMSPayrollSchema />;
      case 'hrms-document-geofence-schema':
        return (
          <UnderDevelopmentSection 
            title="HRMS Document & Geofence Schema"
            description="Document management and geofence location database schema."
            estimatedCompletion="Coming soon"
          />
        );
      case 'relationships':
        return <DatabaseRelationships />;
      case 'api-overview':
        return <APIDocumentationOverview />;
      case 'auth-endpoints':
        return (
          <UnderDevelopmentSection 
            title="Authentication Endpoints"
            description="FastAPI authentication endpoints with JWT implementation."
            estimatedCompletion="Coming soon"
          />
        );
      case 'user-endpoints':
        return (
          <UnderDevelopmentSection 
            title="User Management Endpoints"
            description="FastAPI endpoints for user management operations."
            estimatedCompletion="Coming soon"
          />
        );
      case 'crm-endpoints':
        return (
          <UnderDevelopmentSection 
            title="CRM Endpoints"
            description="FastAPI endpoints for CRM operations including leads and support tickets."
            estimatedCompletion="Coming soon"
          />
        );
      case 'hrms-endpoints':
        return (
          <UnderDevelopmentSection 
            title="HRMS Endpoints"
            description="FastAPI endpoints for HRMS operations including employees, attendance, and payroll."
            estimatedCompletion="Coming soon"
          />
        );
      case 'file-endpoints':
        return (
          <UnderDevelopmentSection 
            title="File Management Endpoints"
            description="FastAPI endpoints for document upload, download, and management."
            estimatedCompletion="Coming soon"
          />
        );
      case 'endpoints':
        return (
          <UnderDevelopmentSection 
            title="Complete Endpoint Reference"
            description="Comprehensive FastAPI endpoint documentation with examples."
            estimatedCompletion="Coming soon"
          />
        );
      case 'components':
        return (
          <UnderDevelopmentSection 
            title="React Components"
            description="Component architecture and reusable UI components."
            estimatedCompletion="Coming soon"
          />
        );
      case 'routing':
        return (
          <UnderDevelopmentSection 
            title="React Routing"
            description="Client-side routing implementation with React Router."
            estimatedCompletion="Coming soon"
          />
        );
      case 'state-management':
        return (
          <UnderDevelopmentSection 
            title="State Management"
            description="React state management patterns and best practices."
            estimatedCompletion="Coming soon"
          />
        );
      case 'api-integration':
        return (
          <UnderDevelopmentSection 
            title="API Integration"
            description="Integrating React frontend with FastAPI backend."
            estimatedCompletion="Coming soon"
          />
        );
      case 'monitoring':
        return (
          <UnderDevelopmentSection 
            title="Monitoring"
            description="Application monitoring and performance tracking."
            estimatedCompletion="Coming soon"
          />
        );
      case 'performance':
        return (
          <UnderDevelopmentSection 
            title="Performance Optimization"
            description="Performance optimization techniques for React and FastAPI."
            estimatedCompletion="Coming soon"
          />
        );
      default:
        return (
          <UnderDevelopmentSection 
            title="Documentation Section"
            description="This section is currently under development."
            estimatedCompletion="Coming soon"
          />
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
                          onClick={() => {
                            onSectionChange(child.id);
                            if (window.innerWidth < 768) setIsSidebarOpen(false);
                          }}
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