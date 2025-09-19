import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CRMModule from './components/crm/CRMModule';
import HRMSModule from './components/hrms/HRMSModule';
import ReportsModule from './components/reports/ReportsModule';
import SettingsModule from './components/settings/SettingsModule';
import EmployeePortal from './components/employee/EmployeePortal';
import DocumentationPortal from './components/documentation/DocumentationPortal';
import NotificationDisplay from './components/common/NotificationDisplay';
import { User, ModuleType, Notification } from './types';
import { mockUsers, staticPassword, mockLeads, mockSupportTickets, mockEmployees, mockAttendance, mockLeaveRequests, mockTasks, mockPerformance, mockPayroll, mockSalarySlips, mockDocuments } from './data/mockData';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [activeDocumentationSection, setActiveDocumentationSection] = useState('overview');
  const [loginError, setLoginError] = useState<string>('');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Data states
  const [leads, setLeads] = useState(mockLeads);
  const [supportTickets, setSupportTickets] = useState(mockSupportTickets);
  const [employees, setEmployees] = useState(mockEmployees);
  const [attendance, setAttendance] = useState(mockAttendance);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [tasks, setTasks] = useState(mockTasks);
  const [performance, setPerformance] = useState(mockPerformance);
  const [payroll, setPayroll] = useState(mockPayroll);
  const [documents, setDocuments] = useState(mockDocuments);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = mockUsers.find(u => u.username === username);
    
    if (!user) {
      setLoginError('User not found');
      return;
    }

    if (password !== staticPassword) {
      setLoginError('Invalid password');
      return;
    }

    setCurrentUser(user);
    setLoginError('');
    localStorage.setItem('currentUser', JSON.stringify(user));
    addNotification(`Welcome back, ${user.username}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveModule('dashboard');
    localStorage.removeItem('currentUser');
    addNotification('Logged out successfully', 'info');
  };

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    const notification: Notification = {
      id: uuidv4(),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Data handlers
  const handleAddLead = (leadData: any) => {
    const newLead = { ...leadData, id: uuidv4() };
    setLeads(prev => [...prev, newLead]);
    addNotification('Lead added successfully', 'success');
  };

  const handleUpdateLead = (id: string, leadData: any) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, ...leadData } : lead));
    addNotification('Lead updated successfully', 'success');
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    addNotification('Lead deleted successfully', 'info');
  };

  const handleAddTicket = (ticketData: any) => {
    const newTicket = { ...ticketData, id: uuidv4() };
    setSupportTickets(prev => [...prev, newTicket]);
    addNotification('Support ticket created successfully', 'success');
  };

  const handleUpdateTicket = (id: string, ticketData: any) => {
    setSupportTickets(prev => prev.map(ticket => ticket.id === id ? { ...ticket, ...ticketData } : ticket));
    addNotification('Support ticket updated successfully', 'success');
  };

  const handleDeleteTicket = (id: string) => {
    setSupportTickets(prev => prev.filter(ticket => ticket.id !== id));
    addNotification('Support ticket deleted successfully', 'info');
  };

  const handleAddEmployee = (employeeData: any) => {
    const newEmployee = { ...employeeData, id: uuidv4() };
    setEmployees(prev => [...prev, newEmployee]);
    addNotification('Employee added successfully', 'success');
  };

  const handleUpdateEmployee = (id: string, employeeData: any) => {
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, ...employeeData } : emp));
    addNotification('Employee updated successfully', 'success');
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    addNotification('Employee deleted successfully', 'info');
  };

  const handleAddAttendance = (attendanceData: any) => {
    const newAttendance = { ...attendanceData, id: uuidv4() };
    setAttendance(prev => [...prev, newAttendance]);
    addNotification('Attendance marked successfully', 'success');
  };

  const handleUpdateAttendance = (id: string, attendanceData: any) => {
    setAttendance(prev => prev.map(att => att.id === id ? { ...att, ...attendanceData } : att));
    addNotification('Attendance updated successfully', 'success');
  };

  const handleAddLeaveRequest = (leaveData: any) => {
    const newLeave = { ...leaveData, id: uuidv4() };
    setLeaveRequests(prev => [...prev, newLeave]);
    addNotification('Leave request submitted successfully', 'success');
  };

  const handleUpdateLeaveRequest = (id: string, leaveData: any) => {
    setLeaveRequests(prev => prev.map(leave => leave.id === id ? { ...leave, ...leaveData } : leave));
    addNotification('Leave request updated successfully', 'success');
  };

  const handleAddTask = (taskData: any) => {
    const newTask = { 
      ...taskData, 
      id: uuidv4(),
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    addNotification('Task created successfully', 'success');
  };

  const handleUpdateTask = (id: string, taskData: any) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...taskData, updatedAt: new Date().toISOString() } : task
    ));
    addNotification('Task updated successfully', 'success');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    addNotification('Task deleted successfully', 'info');
  };

  // If no user is logged in, show login form
  if (!currentUser) {
    return (
      <>
        <LoginForm onLogin={handleLogin} error={loginError} />
        <NotificationDisplay notifications={notifications} onDismiss={dismissNotification} />
      </>
    );
  }

  // Employee portal for employee role
  if (currentUser.role === 'employee') {
    return (
      <>
        <EmployeePortal
          currentUser={currentUser}
          employees={employees}
          attendance={attendance}
          leaveRequests={leaveRequests}
          payroll={payroll}
          tasks={tasks}
          documents={documents}
          onAddLeaveRequest={handleAddLeaveRequest}
          onUpdateTask={handleUpdateTask}
          onLogout={handleLogout}
        />
        <NotificationDisplay notifications={notifications} onDismiss={dismissNotification} />
      </>
    );
  }

  // Documentation portal for documentation role
  if (currentUser.role === 'documentation') {
    return (
      <>
        <DocumentationPortal
          currentUser={currentUser}
          activeSection={activeDocumentationSection}
          onSectionChange={setActiveDocumentationSection}
          onLogout={handleLogout}
        />
        <NotificationDisplay notifications={notifications} onDismiss={dismissNotification} />
      </>
    );
  }

  // Main admin/manager portal
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <Dashboard
            currentUser={currentUser}
            leads={leads}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            leaveRequests={leaveRequests}
          />
        );
      case 'crm':
        return (
          <CRMModule
            currentUser={currentUser}
            onAddLead={handleAddLead}
            onUpdateLead={handleUpdateLead}
            onDeleteLead={handleDeleteLead}
            onAddTicket={handleAddTicket}
            onUpdateTicket={handleUpdateTicket}
            onDeleteTicket={handleDeleteTicket}
            leads={leads}
            supportTickets={supportTickets}
          />
        );
      case 'hrms':
        return (
          <HRMSModule
            currentUser={currentUser}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            payroll={payroll}
            performance={performance}
            tasks={tasks}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onAddAttendance={handleAddAttendance}
            onUpdateAttendance={handleUpdateAttendance}
            onAddLeaveRequest={handleAddLeaveRequest}
            onUpdateLeaveRequest={handleUpdateLeaveRequest}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'reports':
        return (
          <ReportsModule
            currentUser={currentUser}
            leads={leads}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            payroll={payroll}
          />
        );
      case 'settings':
        return <SettingsModule currentUser={currentUser} />;
      default:
        return (
          <Dashboard
            currentUser={currentUser}
            leads={leads}
            employees={employees}
            tasks={tasks}
            attendance={attendance}
            leaveRequests={leaveRequests}
          />
        );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar
          currentUser={currentUser}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-8">
          {renderActiveModule()}
        </main>
      </div>
      <NotificationDisplay notifications={notifications} onDismiss={dismissNotification} />
    </>
  );
}

export default App;