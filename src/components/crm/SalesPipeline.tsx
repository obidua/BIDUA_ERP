import React from 'react';
import { User, Lead } from '../../types';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

interface SalesPipelineProps {
  user: User;
  leads: Lead[];
}

const SalesPipeline: React.FC<SalesPipelineProps> = ({ user, leads }) => {
  const stages = [
    { id: 'lead', name: 'Lead', color: 'bg-slate-100 border-slate-300' },
    { id: 'proposal', name: 'Proposal', color: 'bg-blue-100 border-blue-300' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 border-orange-300' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-100 border-green-300' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100 border-red-300' },
  ];

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.stage === stage);
  };

  const getStageValue = (stage: string) => {
    return getLeadsByStage(stage).reduce((sum, lead) => sum + lead.value, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sales Pipeline</h2>
          <p className="text-slate-600">Track your sales opportunities through the pipeline</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-slate-600">Total Pipeline Value</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{(leads.reduce((sum, lead) => sum + lead.value, 0) / 100000).toFixed(1)}L
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Opportunities</p>
              <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Deals</p>
              <p className="text-2xl font-bold text-orange-600">
                {leads.filter(l => ['proposal', 'negotiation'].includes(l.stage)).length}
              </p>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Won This Month</p>
              <p className="text-2xl font-bold text-green-600">
                {leads.filter(l => l.stage === 'closed-won').length}
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Win Rate</p>
              <p className="text-2xl font-bold text-purple-600">67%</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = getStageValue(stage.id);
            
            return (
              <div key={stage.id} className="min-w-[280px]">
                <div className={`rounded-lg border-2 border-dashed p-4 ${stage.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">{stage.name}</h3>
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-slate-600">Total Value</p>
                    <p className="font-bold text-slate-900">₹{(stageValue / 100000).toFixed(1)}L</p>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-900 text-sm">{lead.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            lead.status === 'hot' ? 'bg-red-100 text-red-800' :
                            lead.status === 'warm' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{lead.company}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3 text-slate-400" />
                            <span className="text-sm font-medium text-slate-900">
                              ₹{lead.value.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">{lead.assignedTo}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100">
                          <p className="text-xs text-slate-500">
                            Next: {new Date(lead.nextFollowUp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {stageLeads.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-slate-500 text-sm">No opportunities in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pipeline Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion Funnel</h3>
        <div className="space-y-4">
          {stages.slice(0, -1).map((stage, index) => {
            const stageLeads = getLeadsByStage(stage.id);
            const nextStage = stages[index + 1];
            const nextStageLeads = getLeadsByStage(nextStage.id);
            const conversionRate = stageLeads.length > 0 ? (nextStageLeads.length / stageLeads.length) * 100 : 0;
            
            return (
              <div key={stage.id} className="flex items-center space-x-4">
                <div className="w-32">
                  <p className="text-sm font-medium text-slate-900">{stage.name}</p>
                  <p className="text-xs text-slate-500">{stageLeads.length} leads</p>
                </div>
                <div className="flex-1">
                  <div className="bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(conversionRate, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <p className="text-sm font-medium text-slate-900">{conversionRate.toFixed(1)}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;