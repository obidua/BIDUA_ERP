import React, { useState } from 'react';
import { HRMSView, User, Employee, Task, LeaveRequest, Performance, Payroll, Attendance } from '../../types';
import { Lead } from '../../types';
import { Users, Clock, Calendar, CheckSquare, Award, DollarSign } from 'lucide-react';
import EmployeeManagement from './EmployeeManagement';
import AttendanceManagement from './AttendanceManagement';
import LeaveManagement from './LeaveManagement';
import TaskManagement from './TaskManagement';
import PerformanceManagement from './PerformanceManagement';
import PayrollManagement from './PayrollManagement';

interface HRMSModuleProps {
  user: User;
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id'>) => void;
  updateLeaveRequest: (id: string, leave: Partial<LeaveRequest>) => void;
  deleteLeaveRequest: (id: string) => void;
  performanceData: Performance[];
  addPerformance: (performance: Omit<Performance, 'id'>) => void;
  updatePerformance: (id: string, performance: Partial<Performance>) => void;
  deletePerformance: (id: string) => void;
  payrollData: Payroll[];
  addPayroll: (payroll: Omit<Payroll, 'id'>) => void;
  updatePayroll: (id: string, payroll: Partial<Payroll>) => void;
  deletePayroll: (id: string) => void;
  attendanceData: Attendance[];
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: string, attendance: Partial<Attendance>) => void;
  deleteAttendance: (id: string) => void;
  leads: Lead[];
}

const HRMSModule: React.FC<HRMSModuleProps> = ({ 
  user,
  employees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  tasks,
  addTask,
  updateTask,
  deleteTask,
  leaveRequests,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  performanceData,
  addPerformance,
  updatePerformance,
  deletePerformance,
  payrollData,
  addPayroll,
  updatePayroll,
  deletePayroll,
  attendanceData,
  addAttendance,
  updateAttendance,
 deleteAttendance,
 leads
}) => {
  const [currentView, setCurrentView] = useState<HRMSView>('employees');

  const views = [
    { id: 'employees' as HRMSView, label: 'Employees', icon: Users, description: 'Employee database & profiles' },
    { id: 'attendance' as HRMSView, label: 'Attendance', icon: Clock, description: 'Time tracking & attendance' },
    { id: 'leaves' as HRMSView, label: 'Leave Management', icon: Calendar, description: 'Leave requests & approvals' },
    { id: 'tasks' as HRMSView, label: 'Task Management', icon: CheckSquare, description: 'Project & task assignments' },
    { id: 'performance' as HRMSView, label: 'Performance', icon: Award, description: 'KPIs & performance reviews' },
    { id: 'payroll' as HRMSView, label: 'Payroll', icon: DollarSign, description: 'Salary & payroll management' },
  ];

  // Filter views based on user role
  const filteredViews = views.filter(view => {
    if (user.role === 'employee') {
      return ['attendance', 'leaves', 'tasks', 'performance'].includes(view.id);
    }
    if (user.role === 'manager') {
      return ['employees', 'attendance', 'leaves', 'tasks', 'performance'].includes(view.id);
    }
    return true; // Admin sees all
  });

  const renderCurrentView = () => {
    switch (currentView) {
      case 'employees':
        return (
          <EmployeeManagement 
            user={user}
            employees={employees}
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
          />
        );
      case 'attendance':
        return (
          <AttendanceManagement 
            user={user}
            attendanceData={attendanceData}
            addAttendance={addAttendance}
            updateAttendance={updateAttendance}
            deleteAttendance={deleteAttendance}
          />
        );
      case 'leaves':
        return (
          <LeaveManagement 
            user={user}
            leaveRequests={leaveRequests}
            addLeaveRequest={addLeaveRequest}
            updateLeaveRequest={updateLeaveRequest}
            deleteLeaveRequest={deleteLeaveRequest}
            employees={employees}
          />
        );
      case 'tasks':
        return (
          <TaskManagement 
            user={user}
            tasks={tasks}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            employees={employees}
           leads={leads}
          />
        );
      case 'performance':
        return (
          <PerformanceManagement 
            user={user}
            performanceData={performanceData}
            addPerformance={addPerformance}
            updatePerformance={updatePerformance}
            deletePerformance={deletePerformance}
            employees={employees}
          />
        );
      case 'payroll':
        return (
          <PayrollManagement 
            user={user}
            payrollData={payrollData}
            addPayroll={addPayroll}
            updatePayroll={updatePayroll}
            deletePayroll={deletePayroll}
            employees={employees}
          />
        );
      default:
        return (
          <EmployeeManagement 
            user={user}
            employees={employees}
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Human Resource Management System</h1>
        <p className="text-teal-100">Manage employees, attendance, performance, and payroll</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {filteredViews.map((view) => {
            const Icon = view.icon;
            const isActive = currentView === view.id;
            
            return (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <p className="font-medium text-sm">{view.label}</p>
                  <p className={`text-xs ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                    {view.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[600px]">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default HRMSModule;