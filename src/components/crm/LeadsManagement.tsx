import React, { useState } from 'react';
import { Lead, User } from '../../types';
import LeadForm from './LeadForm';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Eye,
} from 'lucide-react';

interface LeadsManagementProps {
  user: User;
  leads: Lead[];
  employees: Employee[];
  addLead: (lead: Omit<Lead, 'id'>) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

const LeadsManagement: React.FC<LeadsManagementProps> = ({ 
  user, 
  leads, 
  employees,
  addLead, 
  updateLead, 
  deleteLead 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    
    return matchesSearch && matchesStatus && matchesStage;
  });

  const handleAddLead = () => {
    setShowLeadForm(true);
    setEditingLead(null);
  };

  const handleEditLead = (lead: Lead) => {
    setShowLeadForm(true);
    setEditingLead(lead);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
    }
  };

  const handleSubmitLead = (leadData: Omit<Lead, 'id'>) => {
    if (editingLead) {
      updateLead(editingLead.id, leadData);
    } else {
      addLead(leadData);
    }
    setShowLeadForm(false);
    setEditingLead(null);
  };

  const handleCancelLead = () => {
    setShowLeadForm(false);
    setEditingLead(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warm':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cold':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead':
        return 'bg-slate-100 text-slate-800';
      case 'proposal':
        return 'bg-blue-100 text-blue-800';
      case 'negotiation':
        return 'bg-orange-100 text-orange-800';
      case 'closed-won':
        return 'bg-green-100 text-green-800';
      case 'closed-lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Leads & Contacts</h2>
          <p className="text-slate-600">Manage your sales leads and customer contacts</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={handleAddLead}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stages</option>
              <option value="lead">Lead</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed-won">Closed Won</option>
              <option value="closed-lost">Closed Lost</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Leads</p>
              <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Hot Leads</p>
              <p className="text-2xl font-bold text-red-600">{leads.filter(l => l.status === 'hot').length}</p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <Building className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-green-600">₹{(leads.reduce((sum, l) => sum + l.value, 0) / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">23.5%</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Lead</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Company</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Stage</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Value</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Assigned To</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Next Follow-up</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-slate-900">{lead.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{lead.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(lead.status)}`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${getStageColor(lead.stage)}`}>
                      {lead.stage.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900">₹{lead.value.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-900">{lead.assignedTo}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">
                        {new Date(lead.nextFollowUp).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditLead(lead)}
                        className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditLead(lead)}
                        className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <LeadForm
          lead={editingLead}
          employees={employees}
          onSubmit={handleSubmitLead}
          onCancel={handleCancelLead}
        />
      )}
    </div>
  );
};

export default LeadsManagement;