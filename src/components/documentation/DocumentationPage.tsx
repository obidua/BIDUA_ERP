import React, { useState } from 'react';
import { ArrowLeft, Book, Search, ChevronRight, ChevronDown, Home, Users, UserCheck, BarChart3, Settings, Clock, Calendar, DollarSign, FileText, Shield, Globe, Zap, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'modules']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Home,
      children: [
        { id: 'overview', title: 'System Overview' },
        { id: 'login', title: 'Login & Authentication' },
        { id: 'navigation', title: 'Navigation Guide' },
        { id: 'user-roles', title: 'User Roles & Permissions' }
      ]
    },
    {
      id: 'modules',
      title: 'Core Modules',
      icon: Book,
      children: [
        { id: 'dashboard', title: 'Dashboard' },
        { id: 'crm', title: 'Customer Relationship Management' },
        { id: 'hrms', title: 'Human Resource Management' },
        { id: 'reports', title: 'Reports & Analytics' },
        { id: 'settings', title: 'System Settings' }
      ]
    },
    {
      id: 'crm-features',
      title: 'CRM Features',
      icon: Users,
      children: [
        { id: 'leads-management', title: 'Leads Management' },
        { id: 'sales-pipeline', title: 'Sales Pipeline' },
        { id: 'customer-support', title: 'Customer Support' },
        { id: 'crm-analytics', title: 'CRM Analytics' }
      ]
    },
    {
      id: 'hrms-features',
      title: 'HRMS Features',
      icon: UserCheck,
      children: [
        { id: 'employee-management', title: 'Employee Management' },
        { id: 'attendance-tracking', title: 'Attendance Tracking' },
        { id: 'leave-management', title: 'Leave Management' },
        { id: 'payroll-system', title: 'Payroll System' },
        { id: 'performance-reviews', title: 'Performance Reviews' },
        { id: 'task-management', title: 'Task Management' }
      ]
    },
    {
      id: 'employee-portal',
      title: 'Employee Portal',
      icon: Clock,
      children: [
        { id: 'employee-dashboard', title: 'Employee Dashboard' },
        { id: 'my-attendance', title: 'My Attendance' },
        { id: 'my-leaves', title: 'My Leaves' },
        { id: 'my-salary', title: 'My Salary' },
        { id: 'my-documents', title: 'My Documents' },
        { id: 'my-tasks', title: 'My Tasks' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      icon: Zap,
      children: [
        { id: 'integrations', title: 'Third-party Integrations' },
        { id: 'api-documentation', title: 'API Documentation' },
        { id: 'security', title: 'Security & Compliance' },
        { id: 'backup-restore', title: 'Backup & Restore' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Help & Support',
      icon: AlertTriangle,
      children: [
        { id: 'faq', title: 'Frequently Asked Questions' },
        { id: 'troubleshooting-guide', title: 'Troubleshooting Guide' },
        { id: 'contact-support', title: 'Contact Support' },
        { id: 'release-notes', title: 'Release Notes' }
      ]
    }
  ];

  const getContentForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">BIDUA ERP System Overview</h1>
              <p className="text-lg text-gray-600 mb-6">
                BIDUA ERP is a comprehensive Enterprise Resource Planning system designed specifically for beauty and cosmetics businesses. 
                It integrates Customer Relationship Management (CRM) and Human Resource Management System (HRMS) into a unified platform.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Benefits</h3>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Streamlined business operations</li>
                    <li>• Centralized data management</li>
                    <li>• Real-time analytics and reporting</li>
                    <li>• Role-based access control</li>
                    <li>• Mobile-responsive design</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">CRM Module</h3>
                <p className="text-gray-600 mb-4">
                  Manage customer relationships, track leads, monitor sales pipeline, and provide excellent customer support.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lead management and tracking</li>
                  <li>• Sales pipeline visualization</li>
                  <li>• Customer support ticketing</li>
                  <li>• Sales analytics and reporting</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <UserCheck className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">HRMS Module</h3>
                <p className="text-gray-600 mb-4">
                  Complete human resource management including employee records, attendance, payroll, and performance tracking.
                </p>
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
        );

      case 'login':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Login & Authentication</h1>
              <p className="text-lg text-gray-600 mb-6">
                Learn how to access the BIDUA ERP system and understand the authentication process.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Demo Credentials</h3>
                  <p className="text-green-800 mb-3">Use these credentials to explore the system:</p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-semibold text-gray-700">Role</div>
                      <div className="font-semibold text-gray-700">Username</div>
                      <div className="font-semibold text-gray-700">Password</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-gray-600">Administrator</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">admin</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">bidua123</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-gray-600">Manager</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">manager</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">bidua123</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-gray-600">Employee</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">employee</div>
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded">bidua123</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Roles</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Administrator</h3>
                  <p className="text-gray-600 mb-3">Full system access with all administrative privileges.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Access to all modules and features</li>
                    <li>• User management and role assignment</li>
                    <li>• System configuration and settings</li>
                    <li>• Complete data access and modification rights</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manager</h3>
                  <p className="text-gray-600 mb-3">Department-level access with management capabilities.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CRM and HRMS module access</li>
                    <li>• Team management and task assignment</li>
                    <li>• Performance review and approval workflows</li>
                    <li>• Departmental reporting and analytics</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Employee</h3>
                  <p className="text-gray-600 mb-3">Personal portal access with self-service capabilities.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Personal dashboard and profile management</li>
                    <li>• Attendance tracking and leave applications</li>
                    <li>• Task management and progress updates</li>
                    <li>• Salary slips and document access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Relationship Management</h1>
              <p className="text-lg text-gray-600 mb-6">
                The CRM module helps you manage customer relationships, track sales opportunities, and provide excellent customer support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Leads Management</h3>
                <p className="text-gray-600 mb-4">Track and nurture potential customers through your sales process.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Add and edit lead information</li>
                  <li>• Track lead status (Hot, Warm, Cold)</li>
                  <li>• Monitor sales stages</li>
                  <li>• Assign leads to team members</li>
                  <li>• Schedule follow-ups</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sales Pipeline</h3>
                <p className="text-gray-600 mb-4">Visualize your sales process and track deal progression.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pipeline stage visualization</li>
                  <li>• Deal value tracking</li>
                  <li>• Conversion rate analysis</li>
                  <li>• Revenue forecasting</li>
                  <li>• Performance metrics</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Best Practices</h3>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Update lead status regularly to maintain accurate pipeline data</li>
                    <li>• Use detailed notes to track customer interactions</li>
                    <li>• Set realistic follow-up dates to maintain momentum</li>
                    <li>• Assign leads based on team member expertise and workload</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hrms':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Human Resource Management System</h1>
              <p className="text-lg text-gray-600 mb-6">
                Comprehensive HRMS solution for managing employees, attendance, payroll, and performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <UserCheck className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Employee Management</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Employee profiles and records</li>
                  <li>• Department organization</li>
                  <li>• Role and designation management</li>
                  <li>• Document storage</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Clock className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Tracking</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Clock in/out functionality</li>
                  <li>• Location-based tracking</li>
                  <li>• Working hours calculation</li>
                  <li>• Attendance reports</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payroll System</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Salary calculations</li>
                  <li>• Allowances and deductions</li>
                  <li>• Tax computations</li>
                  <li>• Salary slip generation</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'employee-dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Employee Dashboard</h1>
              <p className="text-lg text-gray-600 mb-6">
                The employee dashboard provides a personalized view of your work-related information and quick access to common tasks.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Today's working hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Pending leave requests</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Active task count</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Monthly salary information</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Task completions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Attendance records</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Leave applications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Document downloads</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600 mb-6">
                Find answers to common questions about using the BIDUA ERP system.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I reset my password?</h3>
                <p className="text-gray-600">
                  Contact your system administrator or HR department to reset your password. For security reasons, 
                  password resets must be handled by authorized personnel.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I access the system from mobile devices?</h3>
                <p className="text-gray-600">
                  Yes, the BIDUA ERP system is fully responsive and optimized for mobile devices. 
                  You can access all features from your smartphone or tablet.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I mark my attendance?</h3>
                <p className="text-gray-600">
                  Navigate to the Attendance section in your employee portal and use the "Clock In" and "Clock Out" 
                  buttons. The system will automatically track your location and working hours.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Where can I download my salary slips?</h3>
                <p className="text-gray-600">
                  Go to the "My Salary" section in your employee portal. You can view and download salary slips 
                  for all previous months. Click the download button next to each month's record.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to BIDUA ERP Documentation</h1>
              <p className="text-lg text-gray-600 mb-6">
                Comprehensive documentation for the BIDUA Enterprise Resource Planning system.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
              <div className="text-center">
                <Book className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
                <p className="text-gray-600 mb-6">
                  Select a topic from the navigation menu to learn more about the BIDUA ERP system features and functionality.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={() => setActiveSection('overview')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    System Overview
                  </button>
                  <button 
                    onClick={() => setActiveSection('login')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Login Guide
                  </button>
                  <button 
                    onClick={() => setActiveSection('faq')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    FAQ
                  </button>
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
                <p className="text-sm text-gray-500">Documentation</p>
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
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>Documentation</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {navigationItems.find(item => 
                item.children?.some(child => child.id === activeSection)
              )?.title || 'Getting Started'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl">
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