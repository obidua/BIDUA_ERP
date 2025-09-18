import React, { useState } from 'react';
import { LeaveRequest, User, Employee } from '../../types';
import {
  Calendar,
  Plus,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User as UserIcon,
  Download,
} from 'lucide-react';
import LeaveRequestForm from './LeaveRequestForm';

interface LeaveManagementProps {
  user: User;
  leaveRequests: LeaveRequest[];
  employees: Employee[];
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id'>) => void;
  updateLeaveRequest: (id: string, leave: Partial<LeaveRequest>) => void;
  deleteLeaveRequest: (id: string) => void;
}

const LeaveManagement: React.FC<LeaveManagementProps> = ({ 
  user, 
  leaveRequests, 
  employees, 
  addLeaveRequest, 
  updateLeaveRequest, 
  deleteLeaveRequest 
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [editingLeaveRequest, setEditingLeaveRequest] = useState<LeaveRequest | null>(null);

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.leaveType === typeFilter;
    
    // Filter by user role - employees only see their own requests
    const matchesUser = user.role !== 'employee' || request.employeeName === user.username;
    
    return matchesStatus && matchesType && matchesUser;
  });

  const handleAddLeaveRequest = () => {
    setShowLeaveForm(true);
    setEditingLeaveRequest(null);
  };

  const handleEditLeaveRequest = (request: LeaveRequest) => {
    setShowLeaveForm(true);
    setEditingLeaveRequest(request);
  };

  const handleSubmitLeaveRequest = (leaveData: Omit<LeaveRequest, 'id'>) => {
    if (editingLeaveRequest) {
      updateLeaveRequest(editingLeaveRequest.id, leaveData);
    } else {
      addLeaveRequest(leaveData);
    }
    setShowLeaveForm(false);
    setEditingLeaveRequest(null);
  };

  const handleCancelLeaveRequest = () => {
    setShowLeaveForm(false);
    setEditingLeaveRequest(null);
  };

  const handleApproveReject = (requestId: string, status: 'approved' | 'rejected', comments?: string) => {
    updateLeaveRequest(requestId, {
      status,
      approvedBy: user.username,
      approvedAt: new Date().toISOString(),
      comments,
    });
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

  // Mock stats
  const leaveStats = {
    pending: leaveRequests.filter(r => r.status === 'pending').length,
    approved: leaveRequests.filter(r => r.status === 'approved').length,
    rejected: leaveRequests.filter(r => r.status === 'rejected').length,
    totalDays: leaveRequests.reduce((sum, r) => sum + r.days, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Leave Management</h2>
          <p className="text-slate-600">Manage employee leave requests and approvals</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={handleAddLeaveRequest}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Apply Leave</span>
          </button>
        </div>
      </div>

      {/* Leave Balance Card for Employees */}
      {user.role === 'employee' && (
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Your Leave Balance</h3>
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
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Requests</p>
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
        <div className="flex flex-col md:flex-row gap-4">
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="annual">Annual</option>
            <option value="maternity">Maternity</option>
            <option value="emergency">Emergency</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-semibold text-sm">
                      {request.employeeName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{request.employeeName}</h3>
                    <p className="text-sm text-slate-600">{request.employeeId}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                    {request.leaveType.toUpperCase()}
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
                    <span>{request.days} day{request.days > 1 ? 's' : ''}</span>
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
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex space-x-3">
                {user.role !== 'employee' && request.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApproveReject(request.id, 'approved')}
                      className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleApproveReject(request.id, 'rejected')}
                      className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleEditLeaveRequest(request)}
                  className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  View Details
                </button>
              </div>
              <div className="text-xs text-slate-500">
                Request #{request.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No leave requests found</h3>
          <p className="text-slate-600">No leave requests match your current filters</p>
        </div>
      )}

      {/* Leave Request Form */}
      {showLeaveForm && (
        <LeaveRequestForm
          leaveRequest={editingLeaveRequest}
          employees={employees}
          user={user}
          onSubmit={handleSubmitLeaveRequest}
          onCancel={handleCancelLeaveRequest}
        />
      )}
    </div>
  );
};

export default LeaveManagement;