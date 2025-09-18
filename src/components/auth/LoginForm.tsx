import React, { useState } from 'react';
import { User } from '../../types';
import { Building2, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Static authentication logic
    const validCredentials = [
      { username: 'admin', password: 'bidua123', role: 'admin' as const },
      { username: 'manager', password: 'bidua123', role: 'manager' as const },
      { username: 'employee', password: 'bidua123', role: 'employee' as const },
    ];

    const validUser = validCredentials.find(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (validUser) {
      const user: User = {
        id: validUser.username,
        username: validUser.username,
        email: `${validUser.username}@bidua.com`,
        role: validUser.role,
        department: validUser.role === 'admin' ? 'IT' : validUser.role === 'manager' ? 'Sales' : 'Marketing',
        isActive: true,
      };
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">BIDUA ERP</h1>
          <p className="text-slate-600">Enterprise Resource Planning System</p>
          <p className="text-sm text-slate-500 mt-1">BIDUA Industries Pvt. Ltd.</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <UserIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-50 rounded p-2">
                <span className="font-medium">Admin:</span>
                <span className="text-slate-600">admin / bidua123</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 rounded p-2">
                <span className="font-medium">Manager:</span>
                <span className="text-slate-600">manager / bidua123</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 rounded p-2">
                <span className="font-medium">Employee:</span>
                <span className="text-slate-600">employee / bidua123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            © 2025 BIDUA Industries Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;