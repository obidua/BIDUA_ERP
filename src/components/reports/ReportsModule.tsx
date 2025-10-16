import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { crmLeadAPI, crmCustomerAPI, crmDealAPI, userAPI, hrmsAttendanceAPI, pmTaskAPI } from '../../services/api';

interface ReportsModuleProps {
  currentUser: any;
}

const ReportsModule: React.FC<ReportsModuleProps> = ({ currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalEmployees: 0,
    totalLeads: 0,
    totalTasks: 0,
    completedTasks: 0,
    avgAttendance: 0,
    departments: [] as any[],
    leadSources: [] as any[],
  });

  useEffect(() => {
    loadReportData();
  }, [currentUser.company_id, selectedPeriod]);

  const loadReportData = async () => {
    setLoading(true);
    try {
      const [leads, employees, tasks, attendance, deals] = await Promise.all([
        crmLeadAPI.getAll(currentUser.company_id),
        userAPI.getAll(currentUser.company_id),
        pmTaskAPI.getAll(currentUser.company_id),
        hrmsAttendanceAPI.getAll(currentUser.company_id),
        crmDealAPI.getAll(currentUser.company_id),
      ]);

      const totalRevenue = deals.reduce((sum: number, deal: any) => sum + (deal.deal_value || 0), 0);
      const completedTasks = tasks.filter((t: any) => t.task_status === 'completed').length;

      const departmentStats = employees.reduce((acc: any, emp: any) => {
        const deptName = emp.departments?.name || 'Unassigned';
        acc[deptName] = (acc[deptName] || 0) + 1;
        return acc;
      }, {});

      const departments = Object.entries(departmentStats).map(([name, count]: [string, any]) => ({
        name,
        count,
        percentage: ((count / employees.length) * 100).toFixed(1)
      }));

      const leadSourceStats = leads.reduce((acc: any, lead: any) => {
        const source = lead.lead_source || 'Unknown';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});

      const leadSources = Object.entries(leadSourceStats).map(([name, count]: [string, any]) => ({
        name,
        count,
        percentage: ((count / leads.length) * 100).toFixed(1)
      }));

      setStats({
        totalRevenue,
        totalEmployees: employees.length,
        totalLeads: leads.length,
        totalTasks: tasks.length,
        completedTasks,
        avgAttendance: attendance.length > 0 ? attendance.length / employees.length : 0,
        departments,
        leadSources,
      });
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const executiveSummary = [
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Employees',
      value: stats.totalEmployees,
      change: '+3.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Task Completion',
      value: `${stats.totalTasks > 0 ? ((stats.completedTasks / stats.totalTasks) * 100).toFixed(1) : 0}%`,
      change: '+8.1%',
      trend: 'up',
      icon: BarChart3,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg. Attendance',
      value: `${stats.avgAttendance.toFixed(1)}`,
      change: '+2.3%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive business insights and metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={loadReportData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveSummary.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 ml-1">
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {stats.departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-blue-${((index % 5) + 3) * 100}`}></div>
                  <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{dept.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({dept.percentage}%)</span>
                </div>
              </div>
            ))}
            {stats.departments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No department data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {stats.leadSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-green-${((index % 5) + 3) * 100}`}></div>
                  <span className="text-sm font-medium text-gray-900">{source.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{source.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({source.percentage}%)</span>
                </div>
              </div>
            ))}
            {stats.leadSources.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No lead source data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {stats.totalTasks > 0 ? ((stats.completedTasks / stats.totalTasks) * 100).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Overall Performance</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {stats.totalTasks > 0 ? ((stats.completedTasks / stats.totalTasks) * 100).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Task Completion Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{stats.totalLeads}</div>
            <div className="text-sm text-gray-600 mt-1">Total Leads</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;
