import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Headphones, BarChart3, Plus } from 'lucide-react';
import LeadsManagement from './LeadsManagement';
import SalesPipeline from './SalesPipeline';
import CustomerSupport from './CustomerSupport';
import CRMAnalytics from './CRMAnalytics';
import { crmLeadAPI, crmCustomerAPI, crmDealAPI, crmTicketAPI } from '../../services/api';

interface CRMModuleProps {
  currentUser: any;
}

const CRMModule: React.FC<CRMModuleProps> = ({ currentUser }) => {
  const [activeView, setActiveView] = useState('leads');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [currentUser.company_id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, customersData, dealsData, ticketsData] = await Promise.all([
        crmLeadAPI.getAll(currentUser.company_id),
        crmCustomerAPI.getAll(currentUser.company_id),
        crmDealAPI.getAll(currentUser.company_id),
        crmTicketAPI.getAll(currentUser.company_id),
      ]);

      setLeads(leadsData || []);
      setCustomers(customersData || []);
      setDeals(dealsData || []);
      setTickets(ticketsData || []);
    } catch (error) {
      console.error('Error loading CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (leadData: any) => {
    try {
      const newLead = await crmLeadAPI.create({
        ...leadData,
        company_id: currentUser.company_id,
        created_by: currentUser.id,
      });
      setLeads([newLead, ...leads]);
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  };

  const handleUpdateLead = async (id: string, updates: any) => {
    try {
      const updated = await crmLeadAPI.update(id, updates);
      setLeads(leads.map(l => l.id === id ? updated : l));
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await crmLeadAPI.delete(id);
      setLeads(leads.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  };

  const handleAddDeal = async (dealData: any) => {
    try {
      const newDeal = await crmDealAPI.create({
        ...dealData,
        company_id: currentUser.company_id,
        created_by: currentUser.id,
      });
      setDeals([newDeal, ...deals]);
    } catch (error) {
      console.error('Error adding deal:', error);
      throw error;
    }
  };

  const handleUpdateDeal = async (id: string, updates: any) => {
    try {
      const updated = await crmDealAPI.update(id, updates);
      setDeals(deals.map(d => d.id === id ? updated : d));
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  };

  const handleAddTicket = async (ticketData: any) => {
    try {
      const newTicket = await crmTicketAPI.create({
        ...ticketData,
        company_id: currentUser.company_id,
        created_by: currentUser.id,
      });
      setTickets([newTicket, ...tickets]);
    } catch (error) {
      console.error('Error adding ticket:', error);
      throw error;
    }
  };

  const handleUpdateTicket = async (id: string, updates: any) => {
    try {
      const updated = await crmTicketAPI.update(id, updates);
      setTickets(tickets.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  };

  const views = [
    { id: 'leads', name: 'Leads', icon: Users },
    { id: 'pipeline', name: 'Pipeline', icon: TrendingUp },
    { id: 'support', name: 'Support', icon: Headphones },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'leads':
        return (
          <LeadsManagement
            currentUser={currentUser}
            leads={leads}
            customers={customers}
            onAddLead={handleAddLead}
            onUpdateLead={handleUpdateLead}
            onDeleteLead={handleDeleteLead}
          />
        );
      case 'pipeline':
        return (
          <SalesPipeline
            currentUser={currentUser}
            deals={deals}
            customers={customers}
            onAddDeal={handleAddDeal}
            onUpdateDeal={handleUpdateDeal}
          />
        );
      case 'support':
        return (
          <CustomerSupport
            currentUser={currentUser}
            tickets={tickets}
            customers={customers}
            onAddTicket={handleAddTicket}
            onUpdateTicket={handleUpdateTicket}
          />
        );
      case 'analytics':
        return (
          <CRMAnalytics
            leads={leads}
            customers={customers}
            deals={deals}
            tickets={tickets}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM</h1>
          <p className="text-gray-600 mt-1">Manage leads, customers, and sales pipeline</p>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeView === view.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon size={18} />
            <span className="font-medium">{view.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">{renderActiveView()}</div>
    </div>
  );
};

export default CRMModule;
