import React, { useState } from 'react';
import { User, Task, Lead, Employee, Attendance, LeaveRequest, Performance, Payroll } from '../../types';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  Download,
} from 'lucide-react';

interface ReportsModuleProps {
  user: User;
  tasks: Task[];
  leads: Lead[];
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  performance: Performance[];
  payroll: Payroll[];
}

type ReportView = 'overview' | 'tasks' | 'crm' | 'hr' | 'financial';

const ReportsModule: React.FC<ReportsModuleProps> = ({
  user,
  tasks,
  leads,
  employees,
  attendance,
  leaveRequests,
  performance,
  payroll,
}) => {
  const [activeView, setActiveView] = useState<ReportView>('overview');

  const reportViews = [
    { id: 'overview' as ReportView, name: 'Overview', icon: BarChart3 },
    { id: 'tasks' as ReportView, name: 'Task Reports', icon: FileText },
    { id: 'crm' as ReportView, name: 'CRM Reports', icon: Users },
    { id: 'hr' as ReportView, name: 'HR Reports', icon: Clock },
    { id: 'financial' as ReportView, name: 'Financial Reports', icon: DollarSign },
  ];

  const calculateStats = () => {
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      totalLeads: leads.length,
      hotLeads: leads.filter(l => l.status === 'hot').length,
      totalEmployees: employees.length,
      presentToday: attendance.filter(a => a.status === 'present').length,
      pendingLeaves: leaveRequests.filter(l => l.status === 'pending').length,
      totalPayroll: payroll.reduce((sum, p) => sum + p.netSalary, 0),
    };
  };

  const stats = calculateStats();

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
                    <p className="text-2xl font-bold text-gray-900">₹{stats.totalPayroll.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Task Completion Rate</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-600 h-3 rounded-full" 
                      style={{ width: `${(stats.completedTasks / stats.totalTasks) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {Math.round((stats.completedTasks / stats.totalTasks) * 100)}% completed
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Lead Conversion</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full" 
                      style={{ width: `${(stats.hotLeads / stats.totalLeads) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {Math.round((stats.hotLeads / stats.totalLeads) * 100)}% hot leads
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Task Reports</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalTasks}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{stats.completedTasks}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600">In Progress</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Task</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Assigned To</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tasks.slice(0, 10).map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{task.title}</td>
                        <td className="py-4 px-4 text-gray-900">{task.assignedTo}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{task.progress}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'crm':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">CRM Reports</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600">Total Leads</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalLeads}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600">Hot Leads</p>
                  <p className="text-2xl font-bold text-red-900">{stats.hotLeads}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-900">
                    {Math.round((stats.hotLeads / stats.totalLeads) * 100)}%
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Lead</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{lead.name}</td>
                        <td className="py-4 px-4 text-gray-900">{lead.company}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            lead.status === 'hot' ? 'bg-red-100 text-red-800' :
                            lead.status === 'warm' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {lead.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-900">₹{lead.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'hr':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">HR Reports</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600">Total Employees</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalEmployees}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600">Present Today</p>
                  <p className="text-2xl font-bold text-green-900">{stats.presentToday}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600">Pending Leaves</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.pendingLeaves}</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Employee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Designation</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{employee.name}</td>
                        <td className="py-4 px-4 text-gray-900">{employee.department}</td>
                        <td className="py-4 px-4 text-gray-900">{employee.designation}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {employee.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'financial':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600">Total Payroll</p>
                  <p className="text-2xl font-bold text-green-900">₹{stats.totalPayroll.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600">Average Salary</p>
                  <p className="text-2xl font-bold text-blue-900">
                    ₹{Math.round(stats.totalPayroll / payroll.length).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Employee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Basic Salary</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Net Salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payroll.map((pay) => (
                      <tr key={pay.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-900">{pay.employeeName}</td>
                        <td className="py-4 px-4 text-gray-900">{pay.month} {pay.year}</td>
                        <td className="py-4 px-4 text-gray-900">₹{pay.basicSalary.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-900">₹{pay.netSalary.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Reports Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Reports Navigation">
            {reportViews.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeView === view.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{view.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Reports Content */}
      <div className="min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReportsModule;