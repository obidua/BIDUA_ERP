import React, { useState } from 'react';
import { Attendance, User, Employee } from '../../types';
import {
  Clock,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Download,
  Plus,
} from 'lucide-react';
import AttendanceForm from './AttendanceForm';

interface AttendanceManagementProps {
  user: User;
  attendanceData: Attendance[];
  employees: Employee[];
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: string, attendance: Partial<Attendance>) => void;
  deleteAttendance: (id: string) => void;
}

const AttendanceManagement: React.FC<AttendanceManagementProps> = ({ 
  user, 
  attendanceData, 
  employees, 
  addAttendance, 
  updateAttendance, 
  deleteAttendance 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesDate = record.date === selectedDate;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    // Filter by user role - employees only see their own attendance
    const matchesUser = user.role !== 'employee' || record.employeeName === user.username;
    
    return matchesDate && matchesStatus && matchesUser;
  });

  const handleAddAttendance = () => {
    setShowAttendanceForm(true);
  };

  const handleSubmitAttendance = (attendanceData: Omit<Attendance, 'id'>) => {
    addAttendance(attendanceData);
    setShowAttendanceForm(false);
  };

  const handleCancelAttendance = () => {
    setShowAttendanceForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'late':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'half-day':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'late':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'half-day':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const calculateTotalHours = (clockIn: string, clockOut?: string) => {
    if (!clockOut) return 0;
    const [inHour, inMin] = clockIn.split(':').map(Number);
    const [outHour, outMin] = clockOut.split(':').map(Number);
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    return ((outMinutes - inMinutes) / 60).toFixed(2);
  };

  // Mock stats
  const todayStats = {
    present: filteredAttendance.filter(a => a.status === 'present').length,
    absent: filteredAttendance.filter(a => a.status === 'absent').length,
    late: filteredAttendance.filter(a => a.status === 'late').length,
    halfDay: filteredAttendance.filter(a => a.status === 'half-day').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Attendance Management</h2>
          <p className="text-slate-600">Track employee attendance and working hours</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          {user.role === 'employee' && (
            <button 
              onClick={handleAddAttendance}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Clock In/Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Clock In/Out for Employees */}
      {user.role === 'employee' && (
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Today's Attendance</h3>
              <p className="text-teal-100">Current time: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors">
                Clock In
              </button>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium border border-white hover:bg-teal-700 transition-colors">
                Clock Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Present</p>
              <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Absent</p>
              <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Late</p>
              <p className="text-2xl font-bold text-orange-600">{todayStats.late}</p>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Half Day</p>
              <p className="text-2xl font-bold text-yellow-600">{todayStats.halfDay}</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="half-day">Half Day</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Employee</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Clock In</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Clock Out</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Total Hours</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-semibold text-sm">
                          {record.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{record.employeeName}</p>
                        <p className="text-sm text-slate-600">{record.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{record.clockIn}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {record.clockOut ? (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-900">{record.clockOut}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">Not clocked out</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-slate-900">
                      {record.totalHours.toFixed(2)}h
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(record.status)}`}>
                        {record.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{record.location}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAttendance.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No attendance records found</h3>
          <p className="text-slate-600">No attendance data available for the selected date and filters</p>
        </div>
      )}

      {/* Attendance Form */}
      {showAttendanceForm && (
        <AttendanceForm
          employees={employees}
          user={user}
          onSubmit={handleSubmitAttendance}
          onCancel={handleCancelAttendance}
        />
      )}
    </div>
  );
};

export default AttendanceManagement;