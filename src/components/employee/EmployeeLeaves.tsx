import React, { useState } from 'react';
import { User, Employee, LeaveRequest } from '../../types';
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import LeaveRequestForm from '../hrms/LeaveRequestForm';

interface EmployeeLeavesProps {
  user: User;
  employee: Employee;
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id'>) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const EmployeeLeaves: React.FC<EmployeeLeavesProps> = ({
  user,
  employee,
  leaveRequests,
  addLeaveRequest,
  addNotification,
}) => {
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const myLeaves = leaveRequests.filter(l => l.employeeId === employee.employeeId);

  const filteredLeaves = statusFilter === 'all' 
    ? myLeaves 
    : myLeaves.filter(l => l.status === statusFilter);

  const handleSubmitLeave = (leaveData: Omit<LeaveRequest, 'id'>) => {
    addLeaveRequest(leaveData);
    setShowLeaveForm(false);
    addNotification?.(`Leave request submitted for ${leaveData.days} day(s)`, 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'casual':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'annual':
        return 'bg-green-100 text-green-800';
      case 'maternity':
        return 'bg-purple-100 text-purple-800';
      case 'emergency':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const leaveStats = {
    pending: myLeaves.filter(l => l.status === 'pending').length,
    approved: myLeaves.filter(l => l.status === 'approved').length,
    rejected: myLeaves.filter(l => l.status === 'rejected').length,
    totalDays: myLeaves.reduce((sum, l) => sum + l.days, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Leave Requests</h2>
          <p className="text-slate-600">Apply for leave and track your requests</p>
        </div>
        <button 
          onClick={() => setShowLeaveForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Apply Leave</span>
        </button>
      </div>

      {/* Leave Balance */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Leave Balance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-teal-100 text-sm">Annual Leave</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-teal-100 text-sm">Sick Leave</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-teal-100 text-sm">Casual Leave</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">2</p>
            <p className="text-teal-100 text-sm">Emergency</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{leaveStats.pending}</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{leaveStats.approved}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{leaveStats.rejected}</p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Days</p>
              <p className="text-2xl font-bold text-blue-600">{leaveStats.totalDays}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Leave Requests */}
      <div className="space-y-4">
        {filteredLeaves.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                    {request.leaveType.toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-600">
                    {request.days} day{request.days > 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-slate-600 mb-3">{request.reason}</p>
                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Applied: {new Date(request.appliedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            {request.status === 'approved' && request.approvedBy && (
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">
                  <strong>Approved by:</strong> {request.approvedBy} on {new Date(request.approvedAt!).toLocaleDateString()}
                </p>
                {request.comments && (
                  <p className="text-sm text-green-700 mt-1">
                    <strong>Comments:</strong> {request.comments}
                  </p>
                )}
              </div>
            )}

            {request.status === 'rejected' && request.approvedBy && (
              <div className="bg-red-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-800">
                  <strong>Rejected by:</strong> {request.approvedBy} on {new Date(request.approvedAt!).toLocaleDateString()}
                </p>
                {request.comments && (
                  <p className="text-sm text-red-700 mt-1">
                    <strong>Reason:</strong> {request.comments}
                  </p>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Request #{request.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLeaves.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No leave requests found</h3>
          <p className="text-slate-600">No leave requests match your current filters</p>
        </div>
      )}

      {/* Leave Request Form */}
      {showLeaveForm && (
        <LeaveRequestForm
          employees={[employee]}
          user={user}
          onSubmit={handleSubmitLeave}
          onCancel={() => setShowLeaveForm(false)}
        />
      )}
    </div>
  );
};

export default EmployeeLeaves;