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
import DevelopmentSetup from './sections/DevelopmentSetup';
import DatabaseSetup from './sections/DatabaseSetup';
import DeploymentGuide from './sections/DeploymentGuide';
import TestingStrategy from './sections/TestingStrategy';
import SchemaOverview from './sections/SchemaOverview';
import UnderDevelopmentSection from './sections/UnderDevelopmentSection';
import NavigationButtons from './components/NavigationButtons';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        return <DevelopmentSetup />;
      case 'frontend-setup':
        return <FrontendSetup />;
      case 'backend-setup':
        return <BackendSetup />;
      case 'database-setup':
        return <DatabaseSetup />;
      case 'deployment-guide':
        return <DeploymentGuide />;
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
        return <TestingStrategy />;
      case 'schema':
      case 'technology-stack':
        return <TechnologyStack />;
      case 'schema-overview':
        return <SchemaOverview />;
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
            description="Comprehensive leave management database schema with flexible policy configuration and approval workflows."
            estimatedCompletion="February 2025"
            plannedFeatures={[
              'Leave request table with detailed tracking',
              'Leave balance management and calculation',
              'Leave policy configuration and rules engine',
              'Multi-level approval workflow schema',
              'Leave calendar integration and conflict detection',
              'Holiday and company calendar management',
              'Leave encashment and carry-forward rules',
              'Department-specific leave policies',
              'Leave reporting and analytics tables',
              'Integration with attendance and payroll systems',
              'Leave notification and reminder system',
              'Audit trail for all leave transactions'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Attendance Schema',
              'Table Relationships',
              'HRMS Endpoints'
            ]}
            currentProgress="Designing flexible leave management schema with configurable policies, multi-level approvals, and comprehensive tracking for various leave types and business rules."
          />
        );
      case 'hrms-task-schema':
        return (
          <UnderDevelopmentSection
            title="HRMS Task Schema"
            description="Advanced task management database schema with collaboration features, project tracking, and performance analytics."
            estimatedCompletion="February 2025"
            plannedFeatures={[
              'Task assignment and tracking with detailed metadata',
              'Task comment and collaboration system',
              'Project and milestone management tables',
              'Task priority and status workflow engine',
              'Time tracking and effort estimation',
              'Task dependency and prerequisite management',
              'Recurring task and template system',
              'Task performance metrics and analytics',
              'Integration with employee performance reviews',
              'Task notification and reminder system',
              'File attachment and document linking',
              'Task history and audit trail',
              'Workload balancing and capacity planning'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Performance Schema',
              'Table Relationships',
              'CRM Schema'
            ]}
            currentProgress="Developing comprehensive task management schema with advanced collaboration features, performance tracking, and integration with employee evaluation systems."
          />
        );
      case 'hrms-performance-schema':
        return (
          <UnderDevelopmentSection
            title="HRMS Performance Schema"
            description="Comprehensive performance evaluation database schema with KPI tracking, 360-degree feedback, and career development planning."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Performance review cycle management and scheduling',
              'KPI definition, tracking, and measurement tables',
              'Goal setting and achievement tracking system',
              '360-degree feedback collection and analysis',
              'Performance rating scales and calibration',
              'Career development planning and progression tracking',
              'Competency framework and skill assessment',
              'Performance improvement plan (PIP) management',
              'Peer review and team feedback systems',
              'Performance analytics and trend analysis',
              'Integration with compensation and promotion decisions',
              'Performance dashboard and reporting',
              'Automated performance alerts and notifications'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Task Schema',
              'HRMS Payroll Schema',
              'Table Relationships'
            ]}
            currentProgress="Creating comprehensive performance management schema with multi-source feedback capabilities, KPI tracking, and integration with career development and compensation systems."
          />
        );
      case 'hrms-payroll-schema':
        return <HRMSPayrollSchema />;
      case 'hrms-document-geofence-schema':
        return (
          <UnderDevelopmentSection
            title="HRMS Document & Geofence Schema"
            description="Advanced document management and GPS-based geofence location database schema for secure attendance tracking and file management."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Document storage and metadata management system',
              'File versioning and revision control',
              'Document access control and permissions',
              'Digital signature and approval workflows',
              'Geofence location configuration and management',
              'GPS-based attendance verification system',
              'Location accuracy and validation algorithms',
              'Multi-location support for distributed teams',
              'Document audit trail and access logging',
              'File encryption and security measures',
              'Document search and indexing capabilities',
              'Integration with employee onboarding processes',
              'Automated document expiry and renewal alerts'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Attendance Schema',
              'User & Authentication Schema',
              'File Management Endpoints'
            ]}
            currentProgress="Designing secure document management system with advanced geofence integration for accurate location-based attendance tracking and comprehensive file lifecycle management."
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
            description="Comprehensive FastAPI authentication system with JWT implementation, session management, and security features."
            estimatedCompletion="February 2025"
            plannedFeatures={[
              'JWT token generation and validation endpoints',
              'Login/logout with session management',
              'Password reset and change functionality',
              'Multi-factor authentication (MFA) support',
              'Session management and concurrent login handling',
              'Token refresh and rotation mechanisms',
              'Account lockout and security policies',
              'OAuth2 integration for third-party login',
              'API key management for service accounts',
              'Audit logging for authentication events',
              'Rate limiting for authentication attempts',
              'Device registration and management',
              'Single Sign-On (SSO) integration'
            ]}
            relatedSections={[
              'API Overview',
              'User & Authentication Schema',
              'Backend Setup (FastAPI)',
              'User Management Endpoints'
            ]}
            currentProgress="Implementing robust authentication system with JWT tokens, comprehensive security features, and detailed API documentation with code examples."
          />
        );
      case 'user-endpoints':
        return (
          <UnderDevelopmentSection
            title="User Management Endpoints"
            description="Complete FastAPI user management system with role-based access control, profile management, and administrative operations."
            estimatedCompletion="February 2025"
            plannedFeatures={[
              'User CRUD operations with validation',
              'Role assignment and permission management',
              'User profile management and updates',
              'Password management and security policies',
              'User search, filtering, and pagination',
              'Bulk user operations and CSV import/export',
              'User activity tracking and audit logs',
              'Department-based user management',
              'User status management (active/inactive)',
              'User preference and settings management',
              'User notification preferences',
              'Account recovery and verification',
              'User analytics and reporting'
            ]}
            relatedSections={[
              'Authentication Endpoints',
              'User & Authentication Schema',
              'API Overview',
              'HRMS Endpoints'
            ]}
            currentProgress="Building comprehensive user management API with advanced role-based access control, profile management capabilities, and administrative tools for user lifecycle management."
          />
        );
      case 'crm-endpoints':
        return (
          <UnderDevelopmentSection
            title="CRM Endpoints"
            description="Advanced FastAPI CRM system with lead management, sales pipeline tracking, customer support, and analytics capabilities."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Lead management CRUD operations with validation',
              'Sales pipeline tracking and stage management',
              'Support ticket creation and resolution workflow',
              'Customer communication history and timeline',
              'Lead scoring and qualification algorithms',
              'Sales forecasting and pipeline analytics',
              'Customer segmentation and targeting',
              'Email integration and campaign management',
              'Activity tracking and follow-up scheduling',
              'Deal and opportunity management',
              'Customer feedback and satisfaction tracking',
              'Sales team performance analytics',
              'Integration with marketing automation tools'
            ]}
            relatedSections={[
              'CRM Schema',
              'API Overview',
              'Authentication Endpoints',
              'HRMS Endpoints'
            ]}
            currentProgress="Developing comprehensive CRM API with advanced lead management, sales pipeline automation, and customer support capabilities integrated with analytics and reporting."
          />
        );
      case 'hrms-endpoints':
        return (
          <UnderDevelopmentSection
            title="HRMS Endpoints"
            description="Comprehensive FastAPI HRMS system covering complete employee lifecycle management, attendance tracking, payroll processing, and performance management."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Employee management CRUD with detailed profiles',
              'Attendance tracking with geofence verification',
              'Leave request management and approval workflows',
              'Payroll processing and salary slip generation',
              'Performance review and KPI tracking APIs',
              'Task assignment and progress monitoring',
              'Document management and file operations',
              'Employee onboarding and offboarding workflows',
              'Training and certification tracking',
              'Employee self-service portal APIs',
              'Manager dashboard and team analytics',
              'Compliance reporting and audit trails',
              'Integration with external HR systems'
            ]}
            relatedSections={[
              'HRMS Employee Schema',
              'HRMS Attendance Schema',
              'HRMS Payroll Schema',
              'HRMS Performance Schema',
              'API Overview'
            ]}
            currentProgress="Building comprehensive HRMS API covering all employee lifecycle management, operational workflows, and integration capabilities with external systems and compliance requirements."
          />
        );
      case 'file-endpoints':
        return (
          <UnderDevelopmentSection
            title="File Management Endpoints"
            description="Secure FastAPI file management system with advanced access control, versioning, and metadata tracking capabilities."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Secure file upload with validation and virus scanning',
              'Protected file download with access control',
              'File metadata management and search capabilities',
              'Role-based file access permissions',
              'File versioning and revision history',
              'Bulk file operations and batch processing',
              'File sharing and collaboration features',
              'Document approval and digital signature workflows',
              'File encryption and secure storage',
              'Automated file archiving and cleanup',
              'File analytics and usage tracking',
              'Integration with cloud storage providers',
              'Document template management'
            ]}
            relatedSections={[
              'HRMS Document & Geofence Schema',
              'Authentication Endpoints',
              'API Overview',
              'Backend Setup (FastAPI)'
            ]}
            currentProgress="Implementing secure file management system with comprehensive access control, encryption, and metadata tracking for enterprise document management needs."
          />
        );
      case 'endpoints':
        return (
          <UnderDevelopmentSection
            title="Complete Endpoint Reference"
            description="Comprehensive FastAPI endpoint documentation with interactive examples, code samples, and integration guides."
            estimatedCompletion="April 2025"
            plannedFeatures={[
              'Complete API reference with all endpoints',
              'Interactive request/response examples',
              'Comprehensive error handling documentation',
              'Rate limiting and throttling information',
              'Authentication requirements for each endpoint',
              'Postman collection and environment setup',
              'SDK and client library integration guides',
              'API versioning and backward compatibility',
              'Performance benchmarks and optimization tips',
              'Real-world usage scenarios and examples',
              'Testing strategies for each endpoint',
              'Webhook and callback documentation',
              'API monitoring and analytics setup'
            ]}
            relatedSections={[
              'API Overview',
              'Authentication Endpoints',
              'CRM Endpoints',
              'HRMS Endpoints',
              'File Management Endpoints'
            ]}
            currentProgress="Compiling comprehensive API reference with interactive examples, detailed error handling documentation, and practical integration guides for developers."
          />
        );
      case 'components':
        return (
          <UnderDevelopmentSection
            title="React Components"
            description="Comprehensive React component library documentation with reusable patterns, best practices, and integration examples for the BIDUA ERP system."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Complete component library documentation',
              'Reusable component patterns and templates',
              'Props and interface definitions with examples',
              'Component composition strategies and patterns',
              'Custom hooks documentation and usage',
              'Styling and theming guidelines with Tailwind CSS',
              'Component testing examples and best practices',
              'Accessibility (a11y) implementation guide',
              'Performance optimization for components',
              'Component lifecycle and state management',
              'Form components and validation patterns',
              'Data visualization components',
              'Mobile-responsive component design'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'State Management',
              'API Integration',
              'Technology Stack'
            ]}
            currentProgress="Documenting comprehensive React component architecture with reusable patterns, accessibility features, and performance optimization techniques for enterprise-grade applications."
          />
        );
      case 'routing':
        return (
          <UnderDevelopmentSection
            title="React Routing"
            description="Advanced client-side routing implementation with React Router, including protected routes, role-based access, and navigation patterns."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'Route configuration and nested routing setup',
              'Protected route implementation with authentication',
              'Role-based route access and permission guards',
              'Dynamic routing patterns and parameters',
              'Route parameter handling and validation',
              'Navigation guards and middleware',
              'Lazy loading and code splitting strategies',
              'Route-based data fetching patterns',
              'Browser history management',
              'Deep linking and URL state management',
              'Route transition animations',
              'Error boundaries for route components',
              'SEO considerations for SPA routing'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Components',
              'State Management',
              'Authentication Endpoints'
            ]}
            currentProgress="Creating comprehensive routing documentation with role-based access control, navigation best practices, and advanced routing patterns for enterprise applications."
          />
        );
      case 'state-management':
        return (
          <UnderDevelopmentSection
            title="State Management"
            description="Advanced React state management patterns, performance optimization, and scalable architecture for complex enterprise applications."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'React hooks usage patterns and best practices',
              'Context API implementation for global state',
              'Local vs global state management strategies',
              'State persistence and hydration techniques',
              'Performance optimization and memoization',
              'Error boundary implementation and error handling',
              'State debugging and development tools',
              'Async state management patterns',
              'Form state management and validation',
              'Real-time state updates with WebSockets',
              'State normalization and data structures',
              'Testing state management logic',
              'State migration and versioning'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Components',
              'API Integration',
              'Technology Stack'
            ]}
            currentProgress="Documenting advanced state management patterns with React hooks, Context API, and performance optimization techniques for scalable enterprise application architecture."
          />
        );
      case 'api-integration':
        return (
          <UnderDevelopmentSection
            title="API Integration"
            description="Comprehensive guide for integrating React frontend with FastAPI backend, including error handling, caching, and real-time updates."
            estimatedCompletion="March 2025"
            plannedFeatures={[
              'API service layer architecture and implementation',
              'Error handling and retry logic with exponential backoff',
              'Loading states and user feedback patterns',
              'Data caching strategies and cache invalidation',
              'Real-time updates with WebSockets and Server-Sent Events',
              'Offline functionality and data synchronization',
              'API response transformation and normalization',
              'Request interceptors and middleware',
              'Authentication token management and refresh',
              'API mocking and testing strategies',
              'Performance optimization and request batching',
              'Error boundary integration for API failures',
              'Progressive data loading and pagination'
            ]}
            relatedSections={[
              'API Overview',
              'Frontend Setup (React)',
              'Backend Setup (FastAPI)',
              'Authentication Endpoints'
            ]}
            currentProgress="Building comprehensive API integration guide with advanced error handling, caching strategies, real-time update mechanisms, and performance optimization techniques."
          />
        );
      case 'monitoring':
        return (
          <UnderDevelopmentSection
            title="Monitoring & Observability"
            description="Comprehensive application monitoring, performance tracking, and observability setup for production BIDUA ERP deployment."
            estimatedCompletion="April 2025"
            plannedFeatures={[
              'Application performance monitoring (APM) setup',
              'Error tracking and alerting with Sentry integration',
              'Database performance monitoring and query analysis',
              'User activity analytics and behavior tracking',
              'System health checks and uptime monitoring',
              'Log aggregation and centralized logging',
              'Custom metrics and business KPI dashboards',
              'Real-time alerting and notification systems',
              'Performance bottleneck identification',
              'Resource utilization monitoring (CPU, memory, disk)',
              'API endpoint performance tracking',
              'Security monitoring and threat detection',
              'Compliance monitoring and audit reporting'
            ]}
            relatedSections={[
              'Deployment Overview',
              'Performance Optimization',
              'Backend Setup (FastAPI)',
              'Database Setup (PostgreSQL)'
            ]}
            currentProgress="Setting up comprehensive monitoring stack with performance tracking, alerting capabilities, and business intelligence dashboards for production operations."
          />
        );
      case 'performance':
        return (
          <UnderDevelopmentSection
            title="Performance Optimization"
            description="Advanced performance optimization techniques for React frontend, FastAPI backend, and PostgreSQL database to ensure optimal system performance."
            estimatedCompletion="April 2025"
            plannedFeatures={[
              'Frontend performance optimization with React best practices',
              'Backend API optimization and async programming',
              'Database query optimization and indexing strategies',
              'Caching strategies at multiple levels (browser, CDN, application, database)',
              'Bundle size optimization and code splitting',
              'Memory usage optimization and garbage collection',
              'Load testing and performance benchmarking',
              'Image and asset optimization techniques',
              'Network performance and request optimization',
              'Database connection pooling and optimization',
              'CDN setup and static asset delivery',
              'Progressive loading and lazy loading strategies',
              'Performance monitoring and profiling tools'
            ]}
            relatedSections={[
              'Frontend Setup (React)',
              'Backend Setup (FastAPI)',
              'Database Setup (PostgreSQL)',
              'Monitoring & Observability'
            ]}
            currentProgress="Developing comprehensive performance optimization guide covering frontend, backend, and database optimization techniques with real-world benchmarks and monitoring strategies."
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
            
            {/* Navigation Buttons */}
            <NavigationButtons
              currentSection={activeSection}
              onSectionChange={onSectionChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPortal;