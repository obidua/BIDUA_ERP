import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import DocumentationSidebar from './components/DocumentationSidebar';
import NavigationButtons from './components/NavigationButtons';
import { getParentSection, getSectionTitle } from './utils/navigationUtils';

// Import all section components
import ProjectOverview from './sections/ProjectOverview';
import SystemArchitecture from './sections/SystemArchitecture';
import TechnologyStack from './sections/TechnologyStack';
import ProjectBlueprint from './sections/ProjectBlueprint';
import FrontendSetup from './sections/FrontendSetup';
import BackendSetup from './sections/BackendSetup';
import DatabaseRelationships from './sections/DatabaseRelationships';
import UserAuthSchema from './sections/UserAuthSchema';
import HRMSEmployeeSchema from './sections/HRMSEmployeeSchema';
import HRMSPayrollSchema from './sections/HRMSPayrollSchema';
import HRMSAttendanceSchema from './sections/HRMSAttendanceSchema';
import CRMSchema from './sections/CRMSchema';
import APIDocumentationOverview from './sections/APIDocumentationOverview';

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('project-overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'project-structure', 
    'development-guide', 
    'database-schema',
    'api-documentation'
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getContentForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'project-overview':
        return <ProjectOverview />;
      case 'architecture':
        return <SystemArchitecture />;
      case 'tech-stack':
        return <TechnologyStack />;
      case 'project-blueprint':
        return <ProjectBlueprint />;
      case 'frontend-setup':
        return <FrontendSetup />;
      case 'backend-setup':
        return <BackendSetup />;
      case 'relationships':
        return <DatabaseRelationships />;
      case 'user-auth-schema':
        return <UserAuthSchema />;
      case 'hrms-employee-schema':
        return <HRMSEmployeeSchema />;
      case 'hrms-payroll-schema':
        return <HRMSPayrollSchema />;
      case 'hrms-attendance-schema':
        return <HRMSAttendanceSchema />;
      case 'crm-schema':
        return <CRMSchema />;
      case 'api-overview':
        return <APIDocumentationOverview />;
      
      // Placeholder sections - these can be implemented later
      case 'setup':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Development Setup</h1>
            <p className="text-lg text-gray-600">
              Quick start guide for setting up the development environment.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed setup instructions.</p>
            </div>
          </div>
        );
      
      case 'database-setup':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Database Setup (PostgreSQL)</h1>
            <p className="text-lg text-gray-600">
              PostgreSQL database setup and configuration.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed database setup instructions.</p>
            </div>
          </div>
        );
      
      case 'schema-overview':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Database Schema Overview</h1>
            <p className="text-lg text-gray-600">
              High-level overview of the complete database schema.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed schema overview.</p>
            </div>
          </div>
        );
      
      case 'authentication':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Authentication</h1>
            <p className="text-lg text-gray-600">
              Authentication and authorization implementation details.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for detailed authentication documentation.</p>
            </div>
          </div>
        );
      
      case 'endpoints':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Complete Endpoint Reference</h1>
            <p className="text-lg text-gray-600">
              Comprehensive API endpoint documentation with examples.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for complete endpoint documentation.</p>
            </div>
          </div>
        );
      
      case 'components':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">React Components</h1>
            <p className="text-lg text-gray-600">
              Component architecture and reusable UI components.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">This section is under development. Please check back later for component documentation.</p>
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <DocumentationSidebar
        activeSection={activeSection}
        searchTerm={searchTerm}
        expandedSections={expandedSections}
        onSectionChange={setActiveSection}
        onSearchChange={setSearchTerm}
        onToggleSection={toggleSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Development Documentation</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {getParentSection(activeSection) || 'Project Overview'}
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-indigo-600 font-medium">
              {getSectionTitle(activeSection)}
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
              onSectionChange={setActiveSection}
            />
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
                <button className="text-green-600 hover:text-green-700 transition-colors">👍</button>
                <button className="text-red-600 hover:text-red-700 transition-colors">👎</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;