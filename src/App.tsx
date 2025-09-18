import React, { useState, useEffect } from 'react';
import { User, Task, Lead, SupportTicket, Employee, Attendance, LeaveRequest, Performance, Payroll } from './types';
import { mockUsers, staticPassword, mockTasks, mockLeads, mockSupportTickets, mockEmployees, mockAttendance, mockLeaveRequests, mockPerformance, mockPayroll } from './data/mockData';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CRMModule from './components/crm/CRMModule';
import HRMSModule from './components/hrms/HRMSModule';
import EmployeePortal from './components/employee/EmployeePortal';
import ReportsModule from './components/reports/ReportsModule';
import SettingsModule from './components/settings/SettingsModule';
import NotificationDisplay from './components/common/NotificationDisplay';
import { Menu, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [performance, setPerformance] = useState<Performance[]>(mockPerformance);
  const [payroll, setPayroll] = useState<Payroll[]>(mockPayroll);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addNotification = (type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    };
    setNotifications(prev => [notification, ...prev]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleLogin = (username: string, password: string) => {
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === staticPassword) {
      setUser(foundUser);
      addNotification('success', `Welcome back, ${foundUser.username}!`);
      return true;
    }
    addNotification('error', 'Invalid credentials');
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentModule('dashboard');
    setIsMobileMenuOpen(false);
    addNotification('info', 'Logged out successfully');
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
    ));
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    setTasks(prev => [newTask, ...prev]);
    addNotification('success', 'Task created successfully');
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, ...updates } : lead
    ));
  };

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [newLead, ...prev]);
    addNotification('success', 'Lead added successfully');
  };

  const updateSupportTicket = (ticketId: string, updates: Partial<SupportTicket>) => {
    setSupportTickets(prev => prev.map(ticket => 
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ));
  };

  const addSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    addNotification('success', 'Support ticket created successfully');
  };

  const updateEmployee = (employeeId: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(employee => 
      employee.id === employeeId ? { ...employee, ...updates } : employee
    ));
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees(prev => [newEmployee, ...prev]);
    addNotification('success', 'Employee added successfully');
  };

  const updateAttendance = (attendanceId: string, updates: Partial<Attendance>) => {
    setAttendance(prev => prev.map(record => 
      record.id === attendanceId ? { ...record, ...updates } : record
    ));
  };

  const addAttendance = (record: Omit<Attendance, 'id'>) => {
    const newRecord: Attendance = {
      ...record,
      id: Date.now().toString(),
    };
    setAttendance(prev => [newRecord, ...prev]);
    addNotification('success', 'Attendance recorded successfully');
  };

  const updateLeaveRequest = (requestId: string, updates: Partial<LeaveRequest>) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, ...updates } : request
    ));
  };

  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedAt'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
    addNotification('success', 'Leave request submitted successfully');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <LoginForm onLogin={handleLogin} />
        <NotificationDisplay 
          notifications={notifications} 
          onRemove={removeNotification} 
        />
      </div>
    );
  }

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            tasks={tasks}
            leads={leads}
            supportTickets={supportTickets}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
          />
        );
      case 'crm':
        return (
          <CRMModule
            user={user}
            leads={leads}
            supportTickets={supportTickets}
            tasks={tasks}
            employees={employees}
            onUpdateLead={updateLead}
            onAddLead={addLead}
            onUpdateSupportTicket={updateSupportTicket}
            onAddSupportTicket={addSupportTicket}
            updateTask={updateTask}
            addNotification={addNotification}
          />
        );
      case 'hrms':
        return (
          <HRMSModule
            user={user}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            leaveRequests={leaveRequests}
            performance={performance}
            payroll={payroll}
            onUpdateEmployee={updateEmployee}
            onAddEmployee={addEmployee}
            onUpdateTask={updateTask}
            onAddTask={addTask}
            onUpdateAttendance={updateAttendance}
            onAddAttendance={addAttendance}
            onUpdateLeaveRequest={updateLeaveRequest}
            onAddLeaveRequest={addLeaveRequest}
            addNotification={addNotification}
          />
        );
      case 'employee':
        return (
          <EmployeePortal
            user={user}
            tasks={tasks}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            payroll={payroll}
            onUpdateTask={updateTask}
            onAddLeaveRequest={addLeaveRequest}
            onAddAttendance={addAttendance}
            addNotification={addNotification}
          />
        );
      case 'reports':
        return (
          <ReportsModule
            user={user}
            tasks={tasks}
            leads={leads}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            performance={performance}
            payroll={payroll}
          />
        );
      case 'settings':
        return <SettingsModule user={user} />;
      default:
        return <Dashboard 
          user={user}
          tasks={tasks}
          leads={leads}
          supportTickets={supportTickets}
          employees={employees}
          attendance={attendance}
          leaveRequests={leaveRequests}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          user={user}
          currentModule={currentModule}
          onModuleChange={(module) => {
            setCurrentModule(module);
            closeMobileMenu();
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <main className="p-4 lg:p-6">
          {renderCurrentModule()}
        </main>
      </div>

      {/* Notifications */}
      <NotificationDisplay 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </div>
  );
}