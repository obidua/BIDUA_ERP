import React from 'react';
import { ModuleType, User } from '../../types';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  Building2,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange, user, onLogout }) => {
  const menuItems = [
    { 
      id: 'dashboard' as ModuleType, 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    { 
      id: 'crm' as ModuleType, 
      label: 'CRM', 
      icon: Users,
      description: 'Customer Management'
    },
    { 
      id: 'hrms' as ModuleType, 
      label: 'HRMS', 
      icon: UserCheck,
      description: 'Human Resources'
    },
    { 
      id: 'reports' as ModuleType, 
      label: 'Reports', 
      icon: BarChart3,
      description: 'Analytics & Reports'
    },
    { 
      id: 'settings' as ModuleType, 
      label: 'Settings', 
      icon: Settings,
      description: 'System Configuration'
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (user.role === 'employee') {
      return ['dashboard', 'hrms'].includes(item.id);
    }
    if (user.role === 'manager') {
      return ['dashboard', 'crm', 'hrms', 'reports'].includes(item.id);
    }
    return true; // Admin sees all
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'employee':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="w-72 bg-white border-r border-slate-200 min-h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">BIDUA ERP</h1>
            <p className="text-xs text-slate-500">Enterprise System</p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user.username}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
                <span className="text-xs text-slate-500">{user.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <div className="text-left">
                  <p className={`font-medium ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {item.label}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-orange-100' : 'text-slate-500'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                isActive ? 'text-white rotate-90' : 'text-slate-400 group-hover:text-slate-600'
              }`} />
            </button>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-slate-400">
            © 2025 BIDUA Industries
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;