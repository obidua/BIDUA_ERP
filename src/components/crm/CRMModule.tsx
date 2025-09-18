import React, { useState } from 'react';
import { Users, TrendingUp, MessageSquare, BarChart3 } from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import CustomerSupport from './CustomerSupport';
import SalesPipeline from './SalesPipeline';
import CRMAnalytics from './CRMAnalytics';
import { User, Lead, SupportTicket, Task, Employee } from '../../types';

interface CRMModuleProps {
  user: User;
  leads: Lead[];
  supportTickets: SupportTicket[];
  tasks: Task[];
  employees: Employee[];
  onUpdateLead: (lead: Lead) => void;
  onAddLead: (lead: Lead) => void;
  onUpdateSupportTicket: (ticket: SupportTicket) => void;
  onAddSupportTicket: (ticket: SupportTicket) => void;
  updateTask: (task: Task) => void;
  addNotification: (notification: any) => void;
}

const CRMModule: React.FC<CRMModuleProps> = ({
  user,
  leads,
  supportTickets,
  tasks,
  employees,
  onUpdateLead,
  onAddLead,
  onUpdateSupportTicket,
  onAddSupportTicket,
  updateTask,
  addNotification,
}) => {
  const [activeTab, setActiveTab] = useState('leads');

  const tabs = [
    { id: 'leads', name: 'Leads Management', icon: Users },
    { id: 'pipeline', name: 'Sales Pipeline', icon: TrendingUp },
    { id: 'support', name: 'Customer Support', icon: MessageSquare },
    { id: 'analytics', name: 'CRM Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'leads':
        return (
          <LeadsManagement
            leads={leads}
            onUpdateLead={onUpdateLead}
            onAddLead={onAddLead}
            user={user}
            addNotification={addNotification}
          />
        );
      case 'pipeline':
        return (
          <SalesPipeline
            leads={leads}
            onUpdateLead={onUpdateLead}
            user={user}
            tasks={tasks}
            updateTask={updateTask}
            addNotification={addNotification}
          />
        );
      case 'support':
        return (
          <CustomerSupport
            tickets={supportTickets}
            onUpdateTicket={onUpdateSupportTicket}
            onAddTicket={onAddSupportTicket}
            user={user}
            addNotification={addNotification}
          />
        );
      case 'analytics':
        return (
          <CRMAnalytics
            leads={leads}
            supportTickets={supportTickets}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CRMModule;