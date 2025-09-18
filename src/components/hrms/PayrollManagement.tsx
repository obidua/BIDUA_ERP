import React, { useState } from 'react';
import { Payroll, User } from '../../types';
import { mockPayroll } from '../../data/mockData';
import {
  DollarSign,
  Calendar,
  Download,
  Filter,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
} from 'lucide-react';

interface PayrollManagementProps {
  user: User;
}

const PayrollManagement: React.FC<PayrollManagementProps> = ({ user }) => {
  const [payrollData, setPayrollData] = useState<Payroll[]>(mockPayroll);
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPayroll = payrollData.filter((payroll) => {
    const matchesMonth = monthFilter === 'all' || payroll.month === monthFilter;
    const matchesStatus = statusFilter === 'all' || payroll.status === statusFilter;
    return matchesMonth && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-4 h-4 text-yellow-500" />;
      case 'processed':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  // Calculate totals
  const totalBasicSalary = filteredPayroll.reduce((sum, p) => sum + p.basicSalary, 0);
  const totalAllowances = filteredPayroll.reduce((sum, p) => sum + p.allowances, 0);
  const totalDeductions = filteredPayroll.reduce((sum, p) => sum + p.deductions, 0);
  const totalNetSalary = filteredPayroll.reduce((sum, p) => sum + p.netSalary, 0);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Payroll Management</h2>
          <p className="text-slate-600">Manage employee salaries and payroll processing</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Payroll</span>
          </button>
          {user.role === 'admin' && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <DollarSign className="w-4 h-4" />
              <span>Process Payroll</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Basic Salary</p>
              <p className="text-2xl font-bold text-slate-900">₹{totalBasicSalary.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Allowances</p>
              <p className="text-2xl font-bold text-green-600">₹{totalAllowances.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Deductions</p>
              <p className="text-2xl font-bold text-red-600">₹{totalDeductions.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-red-600 transform rotate-180" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Net Payroll</p>
              <p className="text-2xl font-bold text-purple-600">₹{totalNetSalary.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="processed">Processed</option>
            <option value="paid">Paid</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Period</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Basic Salary</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Allowances</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Deductions</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Overtime</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Net Salary</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayroll.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-semibold text-sm">
                          {payroll.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{payroll.employeeName}</p>
                        <p className="text-sm text-slate-600">{payroll.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{payroll.month} {payroll.year}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-slate-900">₹{payroll.basicSalary.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-green-600 font-medium">+₹{payroll.allowances.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-red-600 font-medium">-₹{payroll.deductions.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-blue-600 font-medium">+₹{payroll.overtime.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-900">₹{payroll.netSalary.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payroll.status)}
                      <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(payroll.status)}`}>
                        {payroll.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        View Slip
                      </button>
                      {user.role === 'admin' && payroll.status !== 'paid' && (
                        <button className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors">
                          Process
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Payroll Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Breakdown by Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Draft</span>
                <span className="font-medium text-yellow-600">
                  {payrollData.filter(p => p.status === 'draft').length} employees
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Processed</span>
                <span className="font-medium text-blue-600">
                  {payrollData.filter(p => p.status === 'processed').length} employees
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Paid</span>
                <span className="font-medium text-green-600">
                  {payrollData.filter(p => p.status === 'paid').length} employees
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Financial Summary</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Gross Salary</span>
                <span className="font-medium text-slate-900">
                  ₹{(totalBasicSalary + totalAllowances).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Deductions</span>
                <span className="font-medium text-red-600">
                  ₹{totalDeductions.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="font-medium text-slate-900">Net Payroll</span>
                <span className="font-bold text-slate-900">
                  ₹{totalNetSalary.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredPayroll.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No payroll records found</h3>
          <p className="text-slate-600">No payroll data matches your current filters</p>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;