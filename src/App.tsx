import React, { useState, useEffect } from 'react';
import { User } from './types';
import { mockUsers, staticPassword } from './data/mockData';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CRMModule from './components/crm/CRMModule';
import HRMSModule from './components/hrms/HRMSModule';
import ReportsModule from './components/reports/ReportsModule';
import SettingsModule from './components/settings/SettingsModule';
import EmployeePortal from './components/employee/EmployeePortal';
import { Menu, X } from 'lucide-react';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    const user = mockUsers.find(u => u.username === username);
    if (user && password === staticPassword) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Set default module based on role
      if (user.role === 'employee') {
        setActiveModule('employee-portal');
      } else {
        setActiveModule('dashboard');
      }
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveModule('dashboard');
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'crm':
        return <CRMModule />;
      case 'hrms':
        return <HRMModule currentUser={currentUser} />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <SettingsModule />;
      case 'employee-portal':
        return <EmployeePortal currentUser={currentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg font-bold text-indigo-600">BIDUA ERP</h1>
        </div>
        <div className="text-sm text-gray-600">
          {currentUser.username}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 fixed md:relative z-50 md:z-auto
        w-full md:w-72 h-full md:h-auto
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar
          currentUser={currentUser}
          activeModule={activeModule}
          onModuleChange={(module) => {
            setActiveModule(module);
            setIsSidebarOpen(false);
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {renderModule()}
      </main>
    </div>
  );
}

export default App;