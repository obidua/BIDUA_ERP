import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  FileText, 
  Settings, 
  LogOut,
  Building2,
  Menu,
  X,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  currentUser: any;
  activeModule: string;
  onModuleChange: (module: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentUser, 
  activeModule, 
  onModuleChange, 
  onLogout,
  isOpen,
  onToggle
}) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'crm', name: 'CRM', icon: Users },
    { id: 'hrms', name: 'HRMS', icon: UserCheck },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'documentation-portal', name: 'Documentation', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (currentUser.role === 'employee') {
      return ['dashboard'].includes(item.id);
    }
    if (currentUser.role === 'documentation') {
      return ['dashboard', 'documentation-portal'].includes(item.id);
    }
    return true;
  });

  return (
    <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
      <div className="flex flex-col h-full">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center space-x-3 p-6 border-b border-gray-200">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BIDUA</h1>
            <p className="text-sm text-gray-500">ERP System</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-sm">
                {currentUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.username}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {currentUser.role} • {currentUser.department}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 md:p-6 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onModuleChange(item.id);
                  if (window.innerWidth < 768) onToggle();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeModule === item.id
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 md:p-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;