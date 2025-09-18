import React, { useState } from 'react';
import { ModuleType, User, Lead, Employee, Task, SupportTicket, LeaveRequest, Performance, Payroll, Attendance } from './types';
import { 
  mockUsers, 
  mockLeads, 
  mockEmployees, 
  mockTasks, 
  mockSupportTickets, 
  mockLeaveRequests, 
  mockPerformance, 
  mockPayroll,
  mockAttendance 
} from './data/mockData';
import { v4 as uuidv4 } from 'uuid';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CRMModule from './components/crm/CRMModule';
import HRMSModule from './components/hrms/HRMSModule';
import ReportsModule from './components/reports/ReportsModule';
import SettingsModule from './components/settings/SettingsModule';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentModule, setCurrentModule] = useState<ModuleType>('dashboard');

  // Centralized data state
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [performanceData, setPerformanceData] = useState<Performance[]>(mockPerformance);
  const [payrollData, setPayrollData] = useState<Payroll[]>(mockPayroll);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>(mockAttendance);

  // Quick action states for dashboard
  const [showQuickLeadForm, setShowQuickLeadForm] = useState(false);
  const [showQuickEmployeeForm, setShowQuickEmployeeForm] = useState(false);
  const [showQuickTaskForm, setShowQuickTaskForm] = useState(false);
  const [showQuickAttendanceForm, setShowQuickAttendanceForm] = useState(false);

  // Lead management functions
  const addLead = (leadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...leadData,
      id: uuidv4(),
    };
    setLeads(prev => [...prev, newLead]);
  };

  const updateLead = (id: string, leadData: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...leadData } : lead
    ));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  // Employee management functions
  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: uuidv4(),
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, employeeData: Partial<Employee>) => {
    setEmployees(prev => prev.map(employee => 
      employee.id === id ? { ...employee, ...employeeData } : employee
    ));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(employee => employee.id !== id));
  };

  // Task management functions
  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, taskData: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...taskData } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Support ticket management functions
  const addSupportTicket = (ticketData: Omit<SupportTicket, 'id'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: uuidv4(),
    };
    setSupportTickets(prev => [...prev, newTicket]);
  };

  const updateSupportTicket = (id: string, ticketData: Partial<SupportTicket>) => {
    setSupportTickets(prev => prev.map(ticket => 
      ticket.id === id ? { ...ticket, ...ticketData } : ticket
    ));
  };

  const deleteSupportTicket = (id: string) => {
    setSupportTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  // Leave request management functions
  const addLeaveRequest = (leaveData: Omit<LeaveRequest, 'id'>) => {
    const newLeaveRequest: LeaveRequest = {
      ...leaveData,
      id: uuidv4(),
    };
    setLeaveRequests(prev => [...prev, newLeaveRequest]);
  };

  const updateLeaveRequest = (id: string, leaveData: Partial<LeaveRequest>) => {
    setLeaveRequests(prev => prev.map(leave => 
      leave.id === id ? { ...leave, ...leaveData } : leave
    ));
  };

  const deleteLeaveRequest = (id: string) => {
    setLeaveRequests(prev => prev.filter(leave => leave.id !== id));
  };

  // Performance management functions
  const addPerformance = (performanceData: Omit<Performance, 'id'>) => {
    const newPerformance: Performance = {
      ...performanceData,
      id: uuidv4(),
    };
    setPerformanceData(prev => [...prev, newPerformance]);
  };

  const updatePerformance = (id: string, performanceData: Partial<Performance>) => {
    setPerformanceData(prev => prev.map(performance => 
      performance.id === id ? { ...performance, ...performanceData } : performance
    ));
  };

  const deletePerformance = (id: string) => {
    setPerformanceData(prev => prev.filter(performance => performance.id !== id));
  };

  // Payroll management functions
  const addPayroll = (payrollData: Omit<Payroll, 'id'>) => {
    const newPayroll: Payroll = {
      ...payrollData,
      id: uuidv4(),
    };
    setPayrollData(prev => [...prev, newPayroll]);
  };

  const updatePayroll = (id: string, payrollData: Partial<Payroll>) => {
    setPayrollData(prev => prev.map(payroll => 
      payroll.id === id ? { ...payroll, ...payrollData } : payroll
    ));
  };

  const deletePayroll = (id: string) => {
    setPayrollData(prev => prev.filter(payroll => payroll.id !== id));
  };

  // Attendance management functions
  const addAttendance = (attendanceData: Omit<Attendance, 'id'>) => {
    const newAttendance: Attendance = {
      ...attendanceData,
      id: uuidv4(),
    };
    setAttendanceData(prev => [...prev, newAttendance]);
  };

  const updateAttendance = (id: string, attendanceData: Partial<Attendance>) => {
    setAttendanceData(prev => prev.map(attendance => 
      attendance.id === id ? { ...attendance, ...attendanceData } : attendance
    ));
  };

  const deleteAttendance = (id: string) => {
    setAttendanceData(prev => prev.filter(attendance => attendance.id !== id));
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentModule('dashboard');
  };

  const renderCurrentModule = () => {
    if (!user) return null;

    switch (currentModule) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            leads={leads}
            employees={employees}
            tasks={tasks}
            supportTickets={supportTickets}
            leaveRequests={leaveRequests}
            attendanceData={attendanceData}
            showQuickLeadForm={showQuickLeadForm}
            setShowQuickLeadForm={setShowQuickLeadForm}
            showQuickEmployeeForm={showQuickEmployeeForm}
            setShowQuickEmployeeForm={setShowQuickEmployeeForm}
            showQuickTaskForm={showQuickTaskForm}
            setShowQuickTaskForm={setShowQuickTaskForm}
            showQuickAttendanceForm={showQuickAttendanceForm}
            setShowQuickAttendanceForm={setShowQuickAttendanceForm}
            addLead={addLead}
            addEmployee={addEmployee}
            addTask={addTask}
            addAttendance={addAttendance}
          />
        );
      case 'crm':
        return (
          <CRMModule 
            user={user}
            leads={leads}
            employees={employees}
            addLead={addLead}
            updateLead={updateLead}
            deleteLead={deleteLead}
            supportTickets={supportTickets}
            addSupportTicket={addSupportTicket}
            updateSupportTicket={updateSupportTicket}
            deleteSupportTicket={deleteSupportTicket}
          />
        );
      case 'hrms':
        return (
          <HRMSModule 
            user={user}
            employees={employees}
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
            tasks={tasks}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            leaveRequests={leaveRequests}
            addLeaveRequest={addLeaveRequest}
            updateLeaveRequest={updateLeaveRequest}
            deleteLeaveRequest={deleteLeaveRequest}
            performanceData={performanceData}
            addPerformance={addPerformance}
            updatePerformance={updatePerformance}
            deletePerformance={deletePerformance}
            payrollData={payrollData}
            addPayroll={addPayroll}
            updatePayroll={updatePayroll}
            deletePayroll={deletePayroll}
            attendanceData={attendanceData}
            addAttendance={addAttendance}
            updateAttendance={updateAttendance}
            deleteAttendance={deleteAttendance}
           leads={leads}
          />
        );
      case 'reports':
        return (
          <ReportsModule 
            user={user}
            leads={leads}
            employees={employees}
            tasks={tasks}
            supportTickets={supportTickets}
            leaveRequests={leaveRequests}
            payrollData={payrollData}
            attendanceData={attendanceData}
          />
        );
      case 'settings':
        return (
          <SettingsModule 
            user={user}
          />
        );
      default:
        return (
          <Dashboard 
            user={user}
            leads={leads}
            employees={employees}
            tasks={tasks}
            supportTickets={supportTickets}
            leaveRequests={leaveRequests}
            attendanceData={attendanceData}
          />
        );
    }
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderCurrentModule()}
      </main>
    </div>
  );
}

export default App;