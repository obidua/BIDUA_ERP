import React, { useState } from 'react';
import { Employee, User } from '../../types';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Filter,
  Download,
  Eye,
  UserCheck,
} from 'lucide-react';
import EmployeeForm from './EmployeeForm';

interface EmployeeManagementProps {
  user: User;
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ 
  user, 
  employees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const departments = [...new Set(employees.map(emp => emp.department))];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddEmployee = () => {
    setShowEmployeeForm(true);
    setEditingEmployee(null);
  };

  const handleEditEmployee = (employee: Employee) => {
    setShowEmployeeForm(true);
    setEditingEmployee(employee);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  const handleSubmitEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData);
    } else {
      addEmployee(employeeData);
    }
    setShowEmployeeForm(false);
    setEditingEmployee(null);
  };

  const handleCancelEmployee = () => {
    setShowEmployeeForm(false);
    setEditingEmployee(null);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Employee Management</h2>
          <p className="text-slate-600">Manage employee profiles and information</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          {user.role !== 'employee' && (
            <button 
              onClick={handleAddEmployee}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Employees</p>
              <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <UserCheck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {employees.filter(e => e.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Departments</p>
              <p className="text-2xl font-bold text-purple-600">{departments.length}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Salary</p>
              <p className="text-2xl font-bold text-orange-600">
                ₹{Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length / 1000)}K
              </p>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees by name, email, or designation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {getInitials(employee.name)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{employee.name}</h3>
                  <p className="text-sm text-slate-600">{employee.designation}</p>
                </div>
              </div>
              {user.role !== 'employee' && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditEmployee(employee)}
                    className="p-1 text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditEmployee(employee)}
                    className="p-1 text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Mail className="w-4 h-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Building2 className="w-4 h-4" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
              </div>
              {user.role === 'admin' && (
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span>₹{employee.salary.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(employee.status)}`}>
                {employee.status.toUpperCase()}
              </span>
              <div className="text-xs text-slate-500">
                ID: {employee.employeeId}
              </div>
            </div>

            {employee.manager && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Reports to: <span className="font-medium">{employee.manager}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No employees found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Employee Form Modal */}
      {showEmployeeForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleSubmitEmployee}
          onCancel={handleCancelEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;