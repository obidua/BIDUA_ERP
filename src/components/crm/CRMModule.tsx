import React, { useState } from 'react';
import { Lead, SupportTicket, Employee } from '../../types';
import LeadsManagement from './LeadsManagement';
import SalesPipeline from './SalesPipeline';
import CustomerSupport from './CustomerSupport';
import CRMAnalytics from './CRMAnalytics';

interface CRMModuleProps {
  leads: Lead[];
  supportTickets: SupportTicket[];
  employees: Employee[];
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  onUpdateLead: (id: string, lead: Partial<Lead>) => void;
  onDeleteLead: (id: string) => void;
  onAddSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => void;
  onUpdateSupportTicket: (id: string, ticket: Partial<SupportTicket>) => void;
  onDeleteSupportTicket: (id: string) => void;
  addNotification?: (message: string, type: 'success' | 'error' | 'info') => void;
}

const CRMModule: React.FC<CRMModuleProps> = ({
  leads,
  supportTickets,
  employees,
  onAddLead,
  onUpdateLead,
  onDeleteLead,
  onAddSupportTicket,
  onUpdateSupportTicket,
  onDeleteSupportTicket,
  addNotification,
}) => {
  const [activeView, setActiveView] = useState<'leads' | 'pipeline' | 'support' | 'analytics'>('leads');

  const renderActiveView = () => {
    switch (activeView) {
      case 'leads':
        return (
          <LeadsManagement
            leads={leads}
            employees={employees}
            onAddLead={onAddLead}
            onUpdateLead={onUpdateLead}
            onDeleteLead={onDeleteLead}
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
            supportTickets={supportTickets}
            onAddTicket={onAddSupportTicket}
            onUpdateTicket={onUpdateSupportTicket}
            onDeleteTicket={onDeleteSupportTicket}
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
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'leads', label: 'Leads Management' },
            { key: 'pipeline', label: 'Sales Pipeline' },
            { key: 'support', label: 'Customer Support' },
            { key: 'analytics', label: 'Analytics' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeView === tab.key
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Active View Content */}
      <div className="min-h-[600px]">
        {renderActiveView()}
      </div>
    </div>
  );
};

export default CRMModule;