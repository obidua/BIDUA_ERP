import React, { useState } from 'react';
import { User, Task, Employee, Attendance, LeaveRequest, Payroll } from '../../types';
import {
  User as UserIcon,
  Briefcase,
  Clock,
  Calendar,
  DollarSign,
  FileText,
} from 'lucide-react';

interface EmployeePortalProps {
  user: User;
  tasks: Task[];
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  payroll: Payroll[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onAddLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'appliedAt'>) => void;
  onAddAttendance: (record: Omit<Attendance, 'id'>) => void;
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

type EmployeeView = 'dashboard' | 'tasks' | 'attendance' | 'leaves' | 'salary' | 'profile' | 'documents';

const EmployeePortal: React.FC<EmployeePortalProps> = ({
  user,
  tasks,
  employees,
  attendance,
  leaveRequests,
  payroll,
  onUpdateTask,
  onAddLeaveRequest,
  onAddAttendance,
  addNotification,
}) => {
  const [activeView, setActiveView] = useState<EmployeeView>('dashboard');

  const employeeViews = [
    { id: 'dashboard' as EmployeeView, name: 'Dashboard', icon: UserIcon },
    { id: 'tasks' as EmployeeView, name: 'My Tasks', icon: Briefcase },
    { id: 'attendance' as EmployeeView, name: 'Attendance', icon: Clock },
    { id: 'leaves' as EmployeeView, name: 'Leave Requests', icon: Calendar },
    { id: 'salary' as EmployeeView, name: 'Salary', icon: DollarSign },
    { id: 'profile' as EmployeeView, name: 'Profile', icon: UserIcon },
    { id: 'documents' as EmployeeView, name: 'Documents', icon: FileText },
  ];

  const currentEmployee = employees.find(emp => emp.email === user.email);
  const myTasks = tasks.filter(task => task.assignedTo === user.username);
  const myAttendance = attendance.filter(att => att.employeeName === user.username);
  const myLeaveRequests = leaveRequests.filter(leave => leave.employeeName === user.username);
  const myPayroll = payroll.filter(pay => pay.employeeName === user.username);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Welcome, {user.username}!</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Tasks</p>
                      <p className="text-2xl font-bold text-blue-900">{myTasks.length}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Completed</p>
                      <p className="text-2xl font-bold text-green-900">
                        {myTasks.filter(t => t.status === 'completed').length}
                      </p>
                    </div>
                    <Briefcase className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">In Progress</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {myTasks.filter(t => t.status === 'in-progress').length}
                      </p>
                    </div>
                    <Briefcase className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600">Pending</p>
                      <p className="text-2xl font-bold text-red-900">
                        {myTasks.filter(t => t.status === 'pending').length}
                      </p>
                    </div>
                    <Briefcase className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
            <div className="space-y-4">
              {myTasks.map((task) => (
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
                    <span>Priority: {task.priority}</span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{task.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'attendance':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Attendance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clock In</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clock Out</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Total Hours</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {myAttendance.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900">{record.date}</td>
                      <td className="py-4 px-4 text-gray-900">{record.clockIn}</td>
                      <td className="py-4 px-4 text-gray-900">{record.clockOut}</td>
                      <td className="py-4 px-4 text-gray-900">{record.totalHours}h</td>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Leave Requests</h3>
            <div className="space-y-4">
              {myLeaveRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{request.leaveType} Leave</h4>
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
                    <span>{request.startDate} to {request.endDate}</span>
                    <span>{request.days} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'salary':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Information</h3>
            <div className="space-y-4">
              {myPayroll.map((pay) => (
                <div key={pay.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{pay.month} {pay.year}</h4>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      pay.status === 'paid' ? 'bg-green-100 text-green-800' :
                      pay.status === 'processed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pay.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Basic Salary</p>
                      <p className="font-medium">₹{pay.basicSalary.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Allowances</p>
                      <p className="font-medium">₹{pay.allowances.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Deductions</p>
                      <p className="font-medium">₹{pay.deductions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Net Salary</p>
                      <p className="font-medium text-green-600">₹{pay.netSalary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Profile</h3>
            {currentEmployee && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.employeeId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.designation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manager</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.manager}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                    <p className="mt-1 text-sm text-gray-900">{currentEmployee.joiningDate}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'documents':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Documents</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Available Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900">Offer Letter</span>
                    <button className="text-sm text-orange-600 hover:text-orange-700">Download</button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900">Employee ID Card</span>
                    <button className="text-sm text-orange-600 hover:text-orange-700">Download</button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900">Latest Salary Slip</span>
                    <button className="text-sm text-orange-600 hover:text-orange-700">Download</button>
                  </div>
                </div>
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
      {/* Employee Portal Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Employee Portal Navigation">
            {employeeViews.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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

      {/* Employee Portal Content */}
      <div className="min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeePortal;