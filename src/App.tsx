import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import CRMModule from './components/crm/CRMModule';
import HRMSModule from './components/hrms/HRMSModule';
import ManufacturingModule from './components/manufacturing/ManufacturingModule';
import ReportsModule from './components/reports/ReportsModule';
import SettingsModule from './components/settings/SettingsModule';
import DocumentationPortal from './components/documentation/DocumentationPortal';
import { Menu, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, loading, error, signOut } = useAuth();
  const [activeModule, setActiveModule] = React.useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      if (user.role === 'documentation') {
        setActiveModule('documentation-portal');
      } else {
        setActiveModule('dashboard');
      }
    }
  }, [user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setActiveModule('dashboard');
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {error && (
          <div className="fixed top-4 right-4 z-50 p-4 bg-red-50 border border-red-200 rounded-lg shadow-lg max-w-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <LoginForm />
      </>
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard currentUser={user} />;
      case 'crm':
        return <CRMModule currentUser={user} />;
      case 'hrms':
        return <HRMSModule currentUser={user} />;
      case 'manufacturing':
        return <ManufacturingModule currentUser={user} />;
      case 'reports':
        return <ReportsModule currentUser={user} />;
      case 'settings':
        return <SettingsModule />;
      case 'documentation-portal':
        return <DocumentationPortal currentUser={user} onLogout={handleLogout} />;
      default:
        return <Dashboard currentUser={user} />;
    }
  };

  if (activeModule === 'documentation-portal') {
    return <DocumentationPortal currentUser={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg font-bold text-blue-600">BIDUA ERP</h1>
        </div>
        <div className="text-sm text-gray-600">
          {user.full_name}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 fixed md:relative z-50 md:z-auto
        w-full md:w-72 h-screen top-14 md:top-0
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar
          currentUser={user}
          activeModule={activeModule}
          onModuleChange={(module) => {
            setActiveModule(module);
            setIsSidebarOpen(false);
          }}
          onLogout={handleLogout}
        />
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-auto mt-14 md:mt-0">
        {renderModule()}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
