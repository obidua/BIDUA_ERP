import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Building } from 'lucide-react';

interface LeadsManagementProps {
  currentUser: any;
  onAddLead: (lead: any) => void;
  onUpdateLead: (id: string, lead: any) => void;
  onDeleteLead: (id: string) => void;
  leads: any[];
}

const LeadsManagement: React.FC<LeadsManagementProps> = ({
  currentUser,
  onAddLead,
  onUpdateLead,
  onDeleteLead,
  leads
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    
    return matchesSearch && matchesStatus && matchesStage;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Leads Management</h2>
          <p className="text-sm md:text-base text-gray-600">Track and manage your sales leads</p>
        </div>
        <button
          onClick={() => onAddLead({})}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Stages</option>
              <option value="lead">Lead</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed-won">Closed Won</option>
              <option value="closed-lost">Closed Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Lead</span>
                  <span className="sm:hidden">Name</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Company</span>
                  <span className="sm:hidden">Co.</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden sm:inline">Assigned To</span>
                  <span className="sm:hidden">Owner</span>
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-32 md:max-w-none">
                          {lead.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center space-x-2">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-24 md:max-w-none">{lead.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 truncate max-w-24 md:max-w-none">
                        {lead.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      <span className="hidden sm:inline">{lead.status}</span>
                      <span className="sm:hidden">{lead.status.charAt(0).toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStageColor(lead.stage)}`}>
                      <span className="hidden sm:inline">{lead.stage}</span>
                      <span className="sm:hidden">{lead.stage.charAt(0).toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="hidden md:inline">₹{lead.value?.toLocaleString()}</span>
                    <span className="md:hidden">₹{(lead.value / 100000).toFixed(1)}L</span>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-24 md:max-w-none">
                    {lead.assignedTo}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsManagement;