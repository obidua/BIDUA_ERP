import React, { useState } from 'react';
import { User, Employee, Task, Attendance, LeaveRequest, Performance, Payroll } from '../../types';
import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  DollarSign,
  Briefcase,
} from 'lucide-react';

interface HRMSModuleProps {
  user: User;
  employees: Employee[];
  tasks: Task[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  performance: Performance[];
  payroll: Payroll[];
  onUpdateEmployee: (employeeId: string, updates: Partial<Employee>) => void;
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateAttendance: (attendanceId: string, updates: Partial<Attendance>) => void;
  onAddAttendance: (record: Omit<Attendance, 'id'>) => void;
  onUpdateLeaveRequest: (requestId: string, updates: Partial<LeaveRequest>) => void;
  onAddLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'appliedAt'>) => void;
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

type HRMSView = 'employees' | 'tasks' | 'attendance' | 'leaves' | 'performance' | 'payroll';

const HRMSModule: React.FC<HRMSModuleProps> = ({
  user,
  employees,
  tasks,
  attendance,
  leaveRequests,
  performance,
  payroll,
  onUpdateEmployee,
  onAddEmployee,
  onUpdateTask,
  onAddTask,
  onUpdateAttendance,
  onAddAttendance,
  onUpdateLeaveRequest,
  onAddLeaveRequest,
  addNotification,
}) => {
  const [activeView, setActiveView] = useState<HRMSView>('employees');

  const hrmsViews = [
    { id: 'employees' as HRMSView, name: 'Employee Management', icon: Users },
    { id: 'tasks' as HRMSView, name: 'Task Management', icon: Briefcase },
    { id: 'attendance' as HRMSView, name: 'Attendance', icon: Clock },
    { id: 'leaves' as HRMSView, name: 'Leave Management', icon: Calendar },
    { id: 'performance' as HRMSView, name: 'Performance', icon: TrendingUp },
    { id: 'payroll' as HRMSView, name: 'Payroll', icon: DollarSign },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'employees':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Management</h3>
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
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.email}</p>
                        </div>
                      </td>
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
        );
      case 'tasks':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Management</h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Assigned to: {task.assignedTo}</span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clock In</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clock Out</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendance.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{record.employeeName}</td>
                      <td className="py-4 px-4 text-gray-900">{record.date}</td>
                      <td className="py-4 px-4 text-gray-900">{record.clockIn}</td>
                      <td className="py-4 px-4 text-gray-900">{record.clockOut}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' :
                          record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {record.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'leaves':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Management</h3>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{request.employeeName}</h4>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{request.reason}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Type: {request.leaveType}</span>
                    <span>{request.startDate} to {request.endDate} ({request.days} days)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Management</h3>
            <div className="space-y-4">
              {performance.map((perf) => (
                <div key={perf.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{perf.employeeName}</h4>
                    <span className="text-lg font-bold text-orange-600">{perf.overallRating}/5</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Period: {perf.period}</p>
                  <p className="text-sm text-gray-600">{perf.managerFeedback}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'payroll':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Basic Salary</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Net Salary</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payroll.map((pay) => (
                    <tr key={pay.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{pay.employeeName}</td>
                      <td className="py-4 px-4 text-gray-900">{pay.month} {pay.year}</td>
                      <td className="py-4 px-4 text-gray-900">₹{pay.basicSalary.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-900">₹{pay.netSalary.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          pay.status === 'paid' ? 'bg-green-100 text-green-800' :
                          pay.status === 'processed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {pay.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* HRMS Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="HRMS Navigation">
            {hrmsViews.map((view) => {
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

      {/* HRMS Content */}
      <div className="min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default HRMSModule;