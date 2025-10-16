import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Headphones,
  BarChart3,
  Building2,
  Target,
  Activity,
  Heart,
  Megaphone,
  Package,
  Settings2,
  FileText
} from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import ContactsManagement from './ContactsManagement';
import SalesPipeline from './SalesPipeline';
import CustomerSupport from './CustomerSupport';
import CRMAnalytics from './CRMAnalytics';

interface CRMModuleProps {
  currentUser: any;
  onAddLead: (lead: any) => void;
  onUpdateLead: (id: string, lead: any) => void;
  onDeleteLead: (id: string) => void;
  onAddTicket: (ticket: any) => void;
  onUpdateTicket: (id: string, ticket: any) => void;
  onDeleteTicket: (id: string) => void;
  leads: any[];
  supportTickets: any[];
}

const CRMModule: React.FC<CRMModuleProps> = ({
  currentUser,
  onAddLead,
  onUpdateLead,
  onDeleteLead,
  onAddTicket,
  onUpdateTicket,
  onDeleteTicket,
  leads,
  supportTickets,
}) => {
  const [activeView, setActiveView] = useState('leads');

  const views = [
    { id: 'leads', name: 'Leads', icon: Users, component: LeadsManagement },
    { id: 'contacts', name: 'Contacts', icon: Users, component: ContactsManagement },
    { id: 'companies', name: 'Companies', icon: Building2, component: null },
    { id: 'deals', name: 'Deals', icon: Target, component: null },
    { id: 'activities', name: 'Activities', icon: Activity, component: null },
    { id: 'pipeline', name: 'Pipeline', icon: TrendingUp, component: SalesPipeline },
    { id: 'support', name: 'Support', icon: Headphones, component: CustomerSupport },
    { id: 'success', name: 'Success', icon: Heart, component: null },
    { id: 'marketing', name: 'Marketing', icon: Megaphone, component: null },
    { id: 'products', name: 'Products', icon: Package, component: null },
    { id: 'reports', name: 'Reports', icon: FileText, component: null },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, component: CRMAnalytics },
  ];

  const renderActiveView = () => {
    const activeViewConfig = views.find(view => view.id === activeView);
    if (!activeViewConfig) return null;

    const Component = activeViewConfig.component;

    // If component is null, show coming soon placeholder
    if (!Component) {
      return (
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {React.createElement(activeViewConfig.icon, { className: "w-10 h-10 text-slate-400" })}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeViewConfig.name} Module
            </h3>
            <p className="text-gray-600 mb-4">
              This module is currently under development. Check back soon for updates!
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-600">
              <Activity className="w-4 h-4 mr-2" />
              Coming Soon
            </div>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'leads':
        return (
          <Component
            currentUser={currentUser}
            onAddLead={onAddLead}
            onUpdateLead={onUpdateLead}
            onDeleteLead={onDeleteLead}
            leads={leads}
          />
        );
      case 'contacts':
        return <Component />;
      case 'pipeline':
        return <Component leads={leads} />;
      case 'support':
        return (
          <Component
            currentUser={currentUser}
            onAddTicket={onAddTicket}
            onUpdateTicket={onUpdateTicket}
            onDeleteTicket={onDeleteTicket}
            supportTickets={supportTickets}
          />
        );
      case 'analytics':
        return <Component leads={leads} supportTickets={supportTickets} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Module Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your sales, customers, and relationships</p>
        </div>
      </div>

      {/* Navigation Tabs - Horizontal Scroll */}
      <div className="border-b border-gray-200 bg-white rounded-t-lg">
        <nav className="-mb-px flex space-x-2 md:space-x-4 overflow-x-auto px-2 scrollbar-hide">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-1 md:space-x-2 py-3 px-3 md:px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${
                  activeView === view.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span>{view.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active View Content */}
      <div className="min-h-0 flex-1">
        {renderActiveView()}
      </div>
    </div>
  );
};

export default CRMModule;