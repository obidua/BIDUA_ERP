import React, { useState } from 'react';
import { User, Lead, Employee, Task, SupportTicket, LeaveRequest, Payroll, Attendance } from '../types';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  FileText,
  PieChart,
  Activity,
  Clock,
  Target,
  Award,
  Building2,
  CheckSquare,
  AlertTriangle,
} from 'lucide-react';

interface ReportsModuleProps {
  user: User;
  leads: Lead[];
  employees: Employee[];
  tasks: Task[];
  supportTickets: SupportTicket[];
  leaveRequests: LeaveRequest[];
  payrollData: Payroll[];
  attendanceData: Attendance[];
}

const ReportsModule: React.FC<ReportsModuleProps> = ({
  user,
  leads,
  employees,
  tasks,
  supportTickets,
  leaveRequests,
  payrollData,
  attendanceData,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Calculate metrics
  const totalRevenue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const openTickets = supportTickets.filter(t => t.status === 'open').length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;
  const totalPayroll = payrollData.reduce((sum, p) => sum + p.netSalary, 0);
  const conversionRate = leads.length > 0 ? (leads.filter(l => l.stage === 'closed-won').length / leads.length) * 100 : 0;

  // Department-wise employee distribution
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Task completion rate by priority
  const taskStats = {
    urgent: tasks.filter(t => t.priority === 'urgent'),
    high: tasks.filter(t => t.priority === 'high'),
    medium: tasks.filter(t => t.priority === 'medium'),
    low: tasks.filter(t => t.priority === 'low'),
  };

  const reportTypes = [
    { id: 'overview', name: 'Executive Overview', icon: BarChart3 },
    { id: 'sales', name: 'Sales Performance', icon: TrendingUp },
    { id: 'hr', name: 'HR Analytics', icon: Users },
    { id: 'financial', name: 'Financial Reports', icon: DollarSign },
    { id: 'operational', name: 'Operational Metrics', icon: Activity },
  ];

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-3xl font-bold text-emerald-600">₹{(totalRevenue / 100000).toFixed(1)}L</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15.3% vs last month
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
              <p className="text-sm font-medium text-slate-600">Active Employees</p>
              <p className="text-3xl font-bold text-blue-600">{activeEmployees}</p>
              <p className="text-sm text-blue-600 mt-1">
                {((activeEmployees / employees.length) * 100).toFixed(1)}% active rate
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Task Completion</p>
              <p className="text-3xl font-bold text-purple-600">{((completedTasks / tasks.length) * 100).toFixed(1)}%</p>
              <p className="text-sm text-purple-600 mt-1">
                {completedTasks} of {tasks.length} tasks
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <CheckSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-orange-600">{conversionRate.toFixed(1)}%</p>
              <p className="text-sm text-orange-600 mt-1">
                Sales pipeline efficiency
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Department Distribution</h3>
            <Building2 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(departmentStats).map(([dept, count], index) => {
              const percentage = (count / employees.length) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];
              
              return (
                <div key={dept} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900">{dept}</span>
                      <span className="text-sm text-slate-600">{count} employees</span>
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

        {/* Task Priority Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Task Priority Analysis</h3>
            <AlertTriangle className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {Object.entries(taskStats).map(([priority, taskList]) => {
              const completed = taskList.filter(t => t.status === 'completed').length;
              const completionRate = taskList.length > 0 ? (completed / taskList.length) * 100 : 0;
              const priorityColors = {
                urgent: 'bg-red-500',
                high: 'bg-orange-500',
                medium: 'bg-yellow-500',
                low: 'bg-green-500',
              };
              
              return (
                <div key={priority} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${priorityColors[priority as keyof typeof priorityColors]}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900 capitalize">{priority}</span>
                      <span className="text-sm text-slate-600">{completed}/{taskList.length} completed</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${priorityColors[priority as keyof typeof priorityColors]}`}
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right">
                    <span className="text-sm font-medium text-slate-900">{completionRate.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-50 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Open Support Tickets</p>
              <p className="text-xl font-bold text-slate-900">{openTickets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending Leave Requests</p>
              <p className="text-xl font-bold text-slate-900">{pendingLeaves}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Monthly Payroll</p>
              <p className="text-xl font-bold text-slate-900">₹{(totalPayroll / 100000).toFixed(1)}L</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailedReports = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Detailed {selectedReport} Reports</h3>
      <p className="text-slate-600 mb-6">Advanced reporting features for {selectedReport} analysis</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
          <Download className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-900">Export to PDF</p>
        </button>
        <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
          <Calendar className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-900">Schedule Report</p>
        </button>
        <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
          <BarChart3 className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-900">Custom Charts</p>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-purple-100">Comprehensive business intelligence and reporting</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              const isActive = selectedReport === report.id;
              
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{report.name}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      {selectedReport === 'overview' ? renderOverviewReport() : renderDetailedReports()}
    </div>
  );
};

export default ReportsModule;