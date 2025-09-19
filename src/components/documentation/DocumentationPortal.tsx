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
        { id: 'deployment-guide', title: 'Deployment Guide' },
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
        { id: 'deployment-overview', title: 'Deployment Overview' },
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
            plannedFeatures={[
              'Step-by-step installation guide',
              'Environment configuration templates',
              'Docker setup instructions',
              'IDE configuration recommendations',
              'Troubleshooting common setup issues',
              'Development workflow best practices'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Backend Setup (FastAPI)',
              'Database Setup (PostgreSQL)',
              'Technology Stack'
            ]}
            currentProgress="Gathering requirements and creating comprehensive setup guides for all development environments."
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
            plannedFeatures={[
              'PostgreSQL installation guide',
              'Database configuration best practices',
              'Connection pooling setup',
              'Backup and recovery procedures',
              'Performance tuning guidelines',
              'Security configuration',
              'Migration management with Alembic'
            ]}
            relatedSections={[
              'Database Schema sections',
              'Backend Setup (FastAPI)',
              'Table Relationships',
              'User & Authentication Schema'
            ]}
            currentProgress="Creating comprehensive PostgreSQL setup guide with security best practices and performance optimization."
          />
        );
      case 'deployment-guide':
        return (
          <UnderDevelopmentSection
            title="Deployment Guide"
            description="Production deployment guide for React + FastAPI + PostgreSQL stack."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Docker containerization guide',
              'Cloud deployment strategies (AWS, GCP, Azure)',
              'CI/CD pipeline setup',
              'Environment configuration management',
              'SSL certificate setup',
              'Load balancing configuration',
              'Monitoring and logging setup'
            ]}
            relatedSections={[
              'System Architecture',
              'Technology Stack',
              'Monitoring',
              'Performance Optimization'
            ]}
            currentProgress="Developing comprehensive deployment strategies for various cloud platforms and containerization approaches."
          />
        );
      case 'deployment-overview':
        return (
          <UnderDevelopmentSection
            title="Deployment Overview"
            description="Overview of deployment strategies and infrastructure options."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Infrastructure architecture overview',
              'Deployment strategy comparison',
              'Scalability considerations',
              'Cost optimization strategies',
              'Security deployment practices',
              'High availability setup'
            ]}
            relatedSections={[
              'System Architecture',
              'Project Blueprint',
              'Monitoring',
              'Performance Optimization'
            ]}
            currentProgress="Analyzing deployment options and creating comprehensive infrastructure guides."
          />
        );
      case 'testing':
        return (
          <UnderDevelopmentSection
            title="Testing Strategy"
            description="Testing approaches for React frontend and FastAPI backend."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Unit testing with Jest and React Testing Library',
              'API testing with pytest and httpx',
              'Integration testing strategies',
              'End-to-end testing with Playwright',
              'Test data management',
              'Continuous testing in CI/CD',
              'Performance testing guidelines'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Backend Setup (FastAPI)',
              'API Overview',
              'Components'
            ]}
            currentProgress="Developing comprehensive testing framework covering frontend, backend, and integration testing strategies."
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
            plannedFeatures={[
              'Complete database schema diagram',
              'Table relationship visualization',
              'Data flow documentation',
              'Schema design principles',
              'Normalization strategies',
              'Index optimization guide',
              'Schema migration best practices'
            ]}
            relatedSections={[
              'Table Relationships',
              'User & Authentication Schema',
              'CRM Schema',
              'HRMS Employee Schema',
              'Database Setup (PostgreSQL)'
            ]}
            currentProgress="Creating comprehensive schema overview with visual diagrams and detailed explanations of design decisions."
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
            plannedFeatures={[
              'Leave request table structure',
              'Leave balance tracking',
              'Leave policy configuration',
              'Approval workflow schema',
              'Leave calendar integration',
              'Holiday management',
              'Leave reporting queries'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'Table Relationships',
              'HRMS Endpoints',
              'User & Authentication Schema'
            ]}
            currentProgress="Designing comprehensive leave management schema with flexible policy configuration and approval workflows."
          />
        );
      case 'hrms-task-schema':
        return (
          <UnderDevelopmentSection
            title="HRMS Task Schema"
            description="Task management database schema and relationships."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Task assignment and tracking tables',
              'Task comment and collaboration system',
              'Project and milestone management',
              'Task priority and status workflows',
              'Time tracking integration',
              'Task dependency management',
              'Performance metrics tracking'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'Table Relationships',
              'HRMS Endpoints',
              'CRM Schema'
            ]}
            currentProgress="Developing task management schema with collaboration features and performance tracking capabilities."
          />
        );
      case 'hrms-performance-schema':
        return (
          <UnderDevelopmentSection
            title="HRMS Performance Schema"
            description="Performance evaluation database schema and KPI tracking."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Performance review cycle management',
              'KPI definition and tracking',
              'Goal setting and achievement tracking',
              '360-degree feedback system',
              'Performance rating scales',
              'Career development planning',
              'Performance analytics and reporting'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Task Schema',
              'Table Relationships',
              'HRMS Endpoints'
            ]}
            currentProgress="Creating performance management schema with comprehensive KPI tracking and multi-source feedback capabilities."
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
            plannedFeatures={[
              'Document storage and metadata management',
              'File versioning and access control',
              'Geofence location configuration',
              'GPS-based attendance verification',
              'Document approval workflows',
              'Digital signature integration',
              'Audit trail for document access'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Attendance Schema',
              'User & Authentication Schema',
              'File Management Endpoints'
            ]}
            currentProgress="Designing document management system with geofence integration for secure attendance tracking."
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
            plannedFeatures={[
              'JWT token generation and validation',
              'Login/logout endpoint documentation',
              'Password reset functionality',
              'Session management endpoints',
              'Role-based access control',
              'Token refresh mechanisms',
              'Security best practices'
            ]}
            relatedSections={[
              'API Overview',
              'User & Authentication Schema',
              'Backend Setup (FastAPI)',
              'User Management Endpoints'
            ]}
            currentProgress="Documenting authentication flow with JWT implementation and security considerations."
          />
        );
      case 'user-endpoints':
        return (
          <UnderDevelopmentSection
            title="User Management Endpoints"
            description="FastAPI endpoints for user management operations."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'User CRUD operations',
              'Role assignment endpoints',
              'User profile management',
              'Password management',
              'User search and filtering',
              'Bulk user operations',
              'User activity tracking'
            ]}
            relatedSections={[
              'Authentication Endpoints',
              'User & Authentication Schema',
              'API Overview',
              'HRMS Endpoints'
            ]}
            currentProgress="Creating comprehensive user management API with role-based access control and profile management."
          />
        );
      case 'crm-endpoints':
        return (
          <UnderDevelopmentSection
            title="CRM Endpoints"
            description="FastAPI endpoints for CRM operations including leads and support tickets."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Lead management CRUD operations',
              'Sales pipeline tracking endpoints',
              'Support ticket management',
              'Customer communication history',
              'Lead scoring and analytics',
              'Sales forecasting APIs',
              'Customer segmentation endpoints'
            ]}
            relatedSections={[
              'CRM Schema',
              'API Overview',
              'Authentication Endpoints',
              'HRMS Endpoints'
            ]}
            currentProgress="Developing CRM API endpoints with comprehensive lead management and customer support capabilities."
          />
        );
      case 'hrms-endpoints':
        return (
          <UnderDevelopmentSection
            title="HRMS Endpoints"
            description="FastAPI endpoints for HRMS operations including employees, attendance, and payroll."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Employee management CRUD operations',
              'Attendance tracking and reporting',
              'Leave request management',
              'Payroll processing endpoints',
              'Performance review APIs',
              'Task assignment and tracking',
              'Document management endpoints'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Attendance Schema',
              'HRMS Payroll Schema',
              'API Overview',
              'Authentication Endpoints'
            ]}
            currentProgress="Building comprehensive HRMS API covering all employee lifecycle management and operational workflows."
          />
        );
      case 'file-endpoints':
        return (
          <UnderDevelopmentSection
            title="File Management Endpoints"
            description="FastAPI endpoints for document upload, download, and management."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'File upload with validation',
              'Secure file download endpoints',
              'File metadata management',
              'Access control and permissions',
              'File versioning system',
              'Bulk file operations',
              'File search and filtering'
            ]}
            relatedSections={[
              'HRMS Document & Geofence Schema',
              'Authentication Endpoints',
              'API Overview',
              'Backend Setup (FastAPI)'
            ]}
            currentProgress="Implementing secure file management system with access control and metadata tracking."
          />
        );
      case 'endpoints':
        return (
          <UnderDevelopmentSection
            title="Complete Endpoint Reference"
            description="Comprehensive FastAPI endpoint documentation with examples."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Complete API reference guide',
              'Request/response examples',
              'Error handling documentation',
              'Rate limiting information',
              'Authentication requirements',
              'Postman collection export',
              'SDK and client library guides'
            ]}
            relatedSections={[
              'API Overview',
              'Authentication Endpoints',
              'CRM Endpoints',
              'HRMS Endpoints',
              'File Management Endpoints'
            ]}
            currentProgress="Compiling complete API reference with interactive examples and comprehensive error handling documentation."
          />
        );
      case 'components':
        return (
          <UnderDevelopmentSection
            title="React Components"
            description="Component architecture and reusable UI components."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Component library documentation',
              'Reusable component patterns',
              'Props and interface definitions',
              'Component composition strategies',
              'Custom hooks documentation',
              'Styling and theming guidelines',
              'Component testing examples'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'State Management',
              'API Integration',
              'Technology Stack'
            ]}
            currentProgress="Documenting React component architecture with reusable patterns and best practices for the ERP system."
          />
        );
      case 'routing':
        return (
          <UnderDevelopmentSection
            title="React Routing"
            description="Client-side routing implementation with React Router."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Route configuration and setup',
              'Protected route implementation',
              'Role-based route access',
              'Dynamic routing patterns',
              'Route parameter handling',
              'Navigation guards',
              'Lazy loading and code splitting'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Components',
              'State Management',
              'Authentication Endpoints'
            ]}
            currentProgress="Creating routing documentation with role-based access control and navigation best practices."
          />
        );
      case 'state-management':
        return (
          <UnderDevelopmentSection
            title="State Management"
            description="React state management patterns and best practices."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'React hooks usage patterns',
              'Context API implementation',
              'Local vs global state strategies',
              'State persistence techniques',
              'Performance optimization',
              'Error boundary implementation',
              'State debugging techniques'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Components',
              'API Integration',
              'Technology Stack'
            ]}
            currentProgress="Documenting state management patterns with React hooks and Context API for scalable application architecture."
          />
        );
      case 'api-integration':
        return (
          <UnderDevelopmentSection
            title="API Integration"
            description="Integrating React frontend with FastAPI backend."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'API service layer implementation',
              'Error handling and retry logic',
              'Loading states and user feedback',
              'Data caching strategies',
              'Real-time updates with WebSockets',
              'Offline functionality',
              'API response transformation'
            ]}
            relatedSections={[
              'API Overview',
              'Frontend Setup (React)',
              'Backend Setup (FastAPI)',
              'Authentication Endpoints'
            ]}
            currentProgress="Building comprehensive API integration guide with error handling, caching, and real-time update strategies."
          />
        );
      case 'monitoring':
        return (
          <UnderDevelopmentSection
            title="Monitoring"
            description="Application monitoring and performance tracking."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Application performance monitoring',
              'Error tracking and alerting',
              'Database performance monitoring',
              'User activity analytics',
              'System health checks',
              'Log aggregation and analysis',
              'Custom metrics and dashboards'
            ]}
            relatedSections={[
              'Deployment Overview',
              'Performance Optimization',
              'Backend Setup (FastAPI)',
              'Database Setup (PostgreSQL)'
            ]}
            currentProgress="Setting up comprehensive monitoring stack with performance tracking and alerting capabilities."
          />
        );
      case 'performance':
        return (
          <UnderDevelopmentSection
            title="Performance Optimization"
            description="Performance optimization techniques for React and FastAPI."
            estimatedCompletion="Coming soon"
            plannedFeatures={[
              'Frontend performance optimization',
              'Backend API optimization',
              'Database query optimization',
              'Caching strategies',
              'Bundle size optimization',
              'Memory usage optimization',
              'Load testing and benchmarking'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Backend Setup (FastAPI)',
              'Database Setup (PostgreSQL)',
              'Monitoring'
            ]}
            currentProgress="Developing performance optimization guide covering frontend, backend, and database optimization techniques."
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