import React, { useState } from 'react';
import { Users, TrendingUp, Headphones, BarChart3 } from 'lucide-react';
import LeadsManagement from './LeadsManagement';
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
    { id: 'pipeline', name: 'Pipeline', icon: TrendingUp, component: SalesPipeline },
    { id: 'support', name: 'Support', icon: Headphones, component: CustomerSupport },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, component: CRMAnalytics },
  ];

  const renderActiveView = () => {
    const activeViewConfig = views.find(view => view.id === activeView);
    if (!activeViewConfig) return null;

    const Component = activeViewConfig.component;

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
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-1 md:space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeView === view.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{view.name}</span>
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