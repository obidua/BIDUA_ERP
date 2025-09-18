import React, { useState } from 'react';
import { Users, TrendingUp, Headphones, BarChart3 } from 'lucide-react';
import { Lead, SupportTicket, Employee } from '../../types';
import LeadsManagement from './LeadsManagement';
import SalesPipeline from './SalesPipeline';
import CustomerSupport from './CustomerSupport';
import CRMAnalytics from './CRMAnalytics';

interface CRMModuleProps {
  leads: Lead[];
  supportTickets: SupportTicket[];
  employees: Employee[];
  onUpdateLead: (lead: Lead) => void;
  onUpdateTicket: (ticket: SupportTicket) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

type CRMView = 'leads' | 'pipeline' | 'support' | 'analytics';

const CRMModule: React.FC<CRMModuleProps> = ({
  leads,
  supportTickets,
  employees,
  onUpdateLead,
  onUpdateTicket,
  addNotification
}) => {
  const [activeView, setActiveView] = useState<CRMView>('leads');

  const crmViews = [
    { id: 'leads' as CRMView, name: 'Leads Management', icon: Users },
    { id: 'pipeline' as CRMView, name: 'Sales Pipeline', icon: TrendingUp },
    { id: 'support' as CRMView, name: 'Customer Support', icon: Headphones },
    { id: 'analytics' as CRMView, name: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'leads':
        return (
          <LeadsManagement
            leads={leads}
            employees={employees}
            onUpdateLead={onUpdateLead}
            addNotification={addNotification}
          />
        );
      case 'pipeline':
        return (
          <SalesPipeline
            leads={leads}
            employees={employees}
            onUpdateLead={onUpdateLead}
            addNotification={addNotification}
          />
        );
      case 'support':
        return (
          <CustomerSupport
            tickets={supportTickets}
            employees={employees}
            onUpdateTicket={onUpdateTicket}
            addNotification={addNotification}
          />
        );
      case 'analytics':
        return (
          <CRMAnalytics
            leads={leads}
            supportTickets={supportTickets}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* CRM Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="CRM Navigation">
            {crmViews.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeView === view.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{view.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* CRM Content */}
      <div className="min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default CRMModule;