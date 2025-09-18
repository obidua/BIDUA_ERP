import React, { useState } from 'react';
import { CRMView, User, Lead, SupportTicket } from '../../types';
import { Users, Kanban, Headphones, BarChart3 } from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import SalesPipeline from './SalesPipeline';
import CustomerSupport from './CustomerSupport';
import CRMAnalytics from './CRMAnalytics';

interface CRMModuleProps {
  user: User;
  leads: Lead[];
  employees: Employee[];
  addLead: (lead: Omit<Lead, 'id'>) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  supportTickets: SupportTicket[];
  addSupportTicket: (ticket: Omit<SupportTicket, 'id'>) => void;
  updateSupportTicket: (id: string, ticket: Partial<SupportTicket>) => void;
  deleteSupportTicket: (id: string) => void;
}

const CRMModule: React.FC<CRMModuleProps> = ({ 
  user, 
  leads, 
  employees,
  addLead, 
  updateLead, 
  deleteLead,
  supportTickets,
  addSupportTicket,
  updateSupportTicket,
  deleteSupportTicket
}) => {
  const [currentView, setCurrentView] = useState<CRMView>('leads');

  const views = [
    { id: 'leads' as CRMView, label: 'Leads & Contacts', icon: Users, description: 'Manage leads and customer contacts' },
    { id: 'pipeline' as CRMView, label: 'Sales Pipeline', icon: Kanban, description: 'Track sales opportunities' },
    { id: 'support' as CRMView, label: 'Customer Support', icon: Headphones, description: 'Handle support tickets' },
    { id: 'analytics' as CRMView, label: 'Analytics', icon: BarChart3, description: 'Sales reports and insights' },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'leads':
        return (
          <LeadsManagement 
            user={user} 
            leads={leads}
            employees={employees}
            addLead={addLead}
            updateLead={updateLead}
            deleteLead={deleteLead}
          />
        );
      case 'pipeline':
        return <SalesPipeline user={user} leads={leads} employees={employees} />;
      case 'support':
        return (
          <CustomerSupport 
            user={user} 
            supportTickets={supportTickets}
            employees={employees}
            addSupportTicket={addSupportTicket}
            updateSupportTicket={updateSupportTicket}
            deleteSupportTicket={deleteSupportTicket}
          />
        );
      case 'analytics':
        return <CRMAnalytics user={user} leads={leads} employees={employees} />;
      default:
        return (
          <LeadsManagement 
            user={user} 
            leads={leads}
            employees={employees}
            addLead={addLead}
            updateLead={updateLead}
            deleteLead={deleteLead}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Customer Relationship Management</h1>
        <p className="text-blue-100">Manage leads, track sales, and support customers</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {views.map((view) => {
            const Icon = view.icon;
            const isActive = currentView === view.id;
            
            return (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium text-sm">{view.label}</p>
                  <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {view.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[600px]">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default CRMModule;