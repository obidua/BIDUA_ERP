import React, { useState } from 'react';
import { User } from '../types';
import {
  Settings,
  Users,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Key,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Save,
  Building2,
  CreditCard,
  Zap,
} from 'lucide-react';

interface SettingsModuleProps {
  user: User;
}

const SettingsModule: React.FC<SettingsModuleProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'BIDUA Industries Pvt. Ltd.',
    companyEmail: 'admin@bidua.com',
    companyPhone: '+91 98765 43210',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    language: 'English',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
      desktop: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
  });

  const mockUsers = [
    { id: '1', username: 'admin', email: 'admin@bidua.com', role: 'admin', department: 'IT', isActive: true },
    { id: '2', username: 'manager', email: 'manager@bidua.com', role: 'manager', department: 'Sales', isActive: true },
    { id: '3', username: 'employee', email: 'employee@bidua.com', role: 'employee', department: 'Marketing', isActive: true },
  ];

  const settingsTabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'backup', name: 'Backup & Data', icon: Database },
  ];

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2" />
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Email</label>
            <input
              type="email"
              value={settings.companyEmail}
              onChange={(e) => handleSettingChange('general', 'companyEmail', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Phone</label>
            <input
              type="tel"
              value={settings.companyPhone}
              onChange={(e) => handleSettingChange('general', 'companyPhone', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Appearance & Localization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            System Users
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-slate-900">{user.username}</p>
                      <p className="text-sm text-slate-600">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-900">{user.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-slate-400 hover:text-blue-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2" />
          Role Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 mb-3">Admin</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Full system access</li>
              <li>• User management</li>
              <li>• System settings</li>
              <li>• All reports</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 mb-3">Manager</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• CRM & HRMS access</li>
              <li>• Team management</li>
              <li>• Approve requests</li>
              <li>• View reports</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 mb-3">Employee</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Personal dashboard</li>
              <li>• Task management</li>
              <li>• Leave requests</li>
              <li>• Attendance tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900">Email Notifications</p>
                <p className="text-sm text-slate-600">Receive notifications via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900">Push Notifications</p>
                <p className="text-sm text-slate-600">Browser push notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900">SMS Notifications</p>
                <p className="text-sm text-slate-600">Text message alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Configuration
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Two-Factor Authentication</p>
              <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Third-Party Integrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Google Workspace</h4>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Connected</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">Sync emails and calendar events</p>
            <button className="text-sm text-orange-600 hover:text-orange-700">Configure</button>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Slack</h4>
              <span className="px-2 py-1 text-xs bg-slate-100 text-slate-800 rounded-full">Not Connected</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">Team communication and notifications</p>
            <button className="text-sm text-orange-600 hover:text-orange-700">Connect</button>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Payment Gateway</h4>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Connected</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">Process payments and invoices</p>
            <button className="text-sm text-orange-600 hover:text-orange-700">Configure</button>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-slate-900">Analytics</h4>
              <span className="px-2 py-1 text-xs bg-slate-100 text-slate-800 rounded-full">Not Connected</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">Advanced business analytics</p>
            <button className="text-sm text-orange-600 hover:text-orange-700">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Data Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Backup & Export</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export All Data</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Database className="w-4 h-4" />
                <span>Create Backup</span>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Import & Restore</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import Data</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Database className="w-4 h-4" />
                <span>Restore Backup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <Trash2 className="w-5 h-5 mr-2" />
          Danger Zone
        </h3>
        <p className="text-sm text-red-700 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Trash2 className="w-4 h-4" />
          <span>Reset All Data</span>
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'users':
        return renderUserManagement();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrations();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">System Settings</h1>
        <p className="text-orange-100">Configure your BIDUA ERP system preferences</p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      {renderTabContent()}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsModule;