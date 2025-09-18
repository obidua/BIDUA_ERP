import React from 'react';
import { User, Lead } from '../../types';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Calendar,
  PieChart,
  Activity,
} from 'lucide-react';

interface CRMAnalyticsProps {
  user: User;
  leads: Lead[];
}

const CRMAnalytics: React.FC<CRMAnalyticsProps> = ({ user, leads }) => {
  // Calculate analytics data
  const totalLeads = leads.length;
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const hotLeads = leads.filter(l => l.status === 'hot').length;
  const wonDeals = leads.filter(l => l.stage === 'closed-won').length;
  const conversionRate = totalLeads > 0 ? (wonDeals / totalLeads) * 100 : 0;

  // Lead source distribution
  const leadSources = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Stage distribution
  const stageDistribution = leads.reduce((acc, lead) => {
    acc[lead.stage] = (acc[lead.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Monthly performance (mock data)
  const monthlyData = [
    { month: 'Jan', leads: 45, revenue: 2500000, conversion: 22 },
    { month: 'Feb', leads: 52, revenue: 2800000, conversion: 25 },
    { month: 'Mar', leads: 38, revenue: 2200000, conversion: 20 },
    { month: 'Apr', leads: 61, revenue: 3200000, conversion: 28 },
    { month: 'May', leads: 49, revenue: 2900000, conversion: 24 },
    { month: 'Jun', leads: 55, revenue: 3100000, conversion: 26 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">CRM Analytics</h2>
          <p className="text-slate-600">Sales performance insights and reports</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-3xl font-bold text-slate-900">₹{(totalValue / 100000).toFixed(1)}L</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-slate-900">{conversionRate.toFixed(1)}%</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Above target (20%)
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Leads</p>
              <p className="text-3xl font-bold text-slate-900">{totalLeads}</p>
              <p className="text-sm text-orange-600 mt-1 flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                {hotLeads} hot leads
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Deal Size</p>
              <p className="text-3xl font-bold text-slate-900">₹{(totalValue / totalLeads / 100000).toFixed(1)}L</p>
              <p className="text-sm text-purple-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.3% increase
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Monthly Performance</h3>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-slate-600">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">Leads: {data.leads}</span>
                    <span className="text-sm text-slate-600">₹{(data.revenue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.leads / 70) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-medium text-slate-900">{data.conversion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Lead Sources</h3>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(leadSources).map(([source, count], index) => {
              const percentage = (count / totalLeads) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500'];
              
              return (
                <div key={source} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900">{source}</span>
                      <span className="text-sm text-slate-600">{count} leads</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${colors[index % colors.length]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-sm font-medium text-slate-900">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pipeline Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Pipeline Analysis</h3>
          <Activity className="w-5 h-5 text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(stageDistribution).map(([stage, count]) => {
            const percentage = (count / totalLeads) * 100;
            const stageColors = {
              'lead': 'bg-slate-500',
              'proposal': 'bg-blue-500',
              'negotiation': 'bg-orange-500',
              'closed-won': 'bg-green-500',
              'closed-lost': 'bg-red-500',
            };
            
            return (
              <div key={stage} className="text-center">
                <div className={`w-16 h-16 rounded-full ${stageColors[stage as keyof typeof stageColors]} mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{count}</span>
                </div>
                <p className="text-sm font-medium text-slate-900 capitalize">
                  {stage.replace('-', ' ')}
                </p>
                <p className="text-xs text-slate-500">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">₹{(totalValue / 100000).toFixed(1)}L</div>
            <div className="text-sm text-green-700">Total Pipeline Value</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{totalLeads}</div>
            <div className="text-sm text-blue-700">Active Opportunities</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">{conversionRate.toFixed(1)}%</div>
            <div className="text-sm text-purple-700">Win Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMAnalytics;