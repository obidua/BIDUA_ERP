import React, { useState } from 'react';
import { User, Employee, Task, LeaveRequest, Attendance, SalarySlip, Document, EmployeePortalView } from '../../types';
import {
  Home,
  CheckSquare,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  User as UserIcon,
  MapPin,
  Download,
  Eye,
  Bell,
} from 'lucide-react';
import EmployeeDashboard from './EmployeeDashboard';
import EmployeeTaskView from './EmployeeTaskView';
import EmployeeAttendance from './EmployeeAttendance';
import EmployeeLeaves from './EmployeeLeaves';
import EmployeeSalary from './EmployeeSalary';
import EmployeeDocuments from './EmployeeDocuments';
import EmployeeProfile from './EmployeeProfile';

interface EmployeePortalProps {
  user: User;
  employee: Employee;
  tasks: Task[];
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  attendanceData: Attendance[];
  salarySlips: SalarySlip[];
  documents: Document[];
  updateTask: (id: string, task: Partial<Task>) => void;
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id'>) => void;
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const EmployeePortal: React.FC<EmployeePortalProps> = ({
  user,
  employee,
  tasks,
  employees,
  leaveRequests,
  attendanceData,
  salarySlips,
  documents,
  updateTask,
  addLeaveRequest,
  addAttendance,
  updateEmployee,
  addNotification,
}) => {
  const [currentView, setCurrentView] = useState<EmployeePortalView>('dashboard');

  const menuItems = [
    { id: 'dashboard' as EmployeePortalView, label: 'Dashboard', icon: Home, description: 'Overview & Quick Actions' },
    { id: 'tasks' as EmployeePortalView, label: 'My Tasks', icon: CheckSquare, description: 'Task Management' },
    { id: 'attendance' as EmployeePortalView, label: 'Attendance', icon: Clock, description: 'Time Tracking' },
    { id: 'leaves' as EmployeePortalView, label: 'Leave Requests', icon: Calendar, description: 'Leave Management' },
    { id: 'salary' as EmployeePortalView, label: 'Salary & Payroll', icon: DollarSign, description: 'Salary Information' },
    { id: 'documents' as EmployeePortalView, label: 'Documents', icon: FileText, description: 'Official Documents' },
    { id: 'profile' as EmployeePortalView, label: 'My Profile', icon: UserIcon, description: 'Personal Information' },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <EmployeeDashboard
            user={user}
            employee={employee}
            tasks={tasks}
            leaveRequests={leaveRequests}
            attendanceData={attendanceData}
            addNotification={addNotification}
          />
        );
      case 'tasks':
        return (
          <EmployeeTaskView
            user={user}
            tasks={tasks}
            updateTask={updateTask}
            employees={employees}
            addNotification={addNotification}
          />
        );
      case 'attendance':
        return (
          <EmployeeAttendance
            user={user}
            employee={employee}
            attendanceData={attendanceData}
            addAttendance={addAttendance}
            addNotification={addNotification}
          />
        );
      case 'leaves':
        return (
          <EmployeeLeaves
            user={user}
            employee={employee}
            leaveRequests={leaveRequests}
            addLeaveRequest={addLeaveRequest}
            addNotification={addNotification}
          />
        );
      case 'salary':
        return (
          <EmployeeSalary
            user={user}
            employee={employee}
            salarySlips={salarySlips.filter(slip => slip.employeeId === employee.employeeId)}
            addNotification={addNotification}
          />
        );
      case 'documents':
        return (
          <EmployeeDocuments
            user={user}
            employee={employee}
            documents={documents.filter(doc => doc.employeeId === employee.employeeId || doc.isPublic)}
            addNotification={addNotification}
          />
        );
      case 'profile':
        return (
          <EmployeeProfile
            user={user}
            employee={employee}
            updateEmployee={updateEmployee}
            addNotification={addNotification}
          />
        );
      default:
        return (
          <EmployeeDashboard
            user={user}
            employee={employee}
            tasks={tasks}
            leaveRequests={leaveRequests}
            attendanceData={attendanceData}
            addNotification={addNotification}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 min-h-screen flex flex-col shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Employee Portal</h1>
              <p className="text-xs text-slate-500">BIDUA Industries</p>
            </div>
          </div>
          
          {/* User Info */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {employee.name}
                </p>
                <p className="text-xs text-slate-600">{employee.designation}</p>
                <p className="text-xs text-slate-500">{employee.employeeId}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <div className="text-left">
                    <p className={`font-medium text-sm ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="text-center">
            <p className="text-xs text-slate-400">
              © 2025 BIDUA Industries
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default EmployeePortal;