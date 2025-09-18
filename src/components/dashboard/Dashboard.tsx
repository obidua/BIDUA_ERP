import React from 'react';
import { User, Lead, Employee, Task, SupportTicket, LeaveRequest, Attendance } from '../../types';
import {
  Users,
  UserCheck,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Calendar,
  Target,
  Award,
  Building2,
} from 'lucide-react';
import LeadForm from '../crm/LeadForm';
import EmployeeForm from '../hrms/EmployeeForm';
import TaskForm from '../hrms/TaskForm';
import AttendanceForm from '../hrms/AttendanceForm';

interface DashboardProps {
  user: User;
  leads: Lead[];
  employees: Employee[];
  tasks: Task[];
  supportTickets: SupportTicket[];
  leaveRequests: LeaveRequest[];
  attendanceData: Attendance[];
  showQuickLeadForm: boolean;
  setShowQuickLeadForm: (show: boolean) => void;
  showQuickEmployeeForm: boolean;
  setShowQuickEmployeeForm: (show: boolean) => void;
  showQuickTaskForm: boolean;
  setShowQuickTaskForm: (show: boolean) => void;
  showQuickAttendanceForm: boolean;
  setShowQuickAttendanceForm: (show: boolean) => void;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  leads, 
  employees, 
  tasks, 
  supportTickets, 
  leaveRequests, 
  attendanceData,
  showQuickLeadForm,
  setShowQuickLeadForm,
  showQuickEmployeeForm,
  setShowQuickEmployeeForm,
  showQuickTaskForm,
  setShowQuickTaskForm,
  showQuickAttendanceForm,
  setShowQuickAttendanceForm,
  addLead,
  addEmployee,
  addTask,
  addAttendance
}) => {
  // Calculate metrics
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.status === 'hot').length;
  const totalRevenue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const todayAttendance = attendanceData.length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;
  const openTickets = supportTickets.filter(t => t.status === 'open').length;

  const recentActivities = [
    { id: 1, type: 'lead', message: 'New lead added: Rajesh Kumar from TechCorp', time: '2 hours ago' },
    { id: 2, type: 'task', message: 'Task completed: Q1 Sales Strategy Planning', time: '4 hours ago' },
    { id: 3, type: 'leave', message: 'Leave request approved for Sneha Reddy', time: '6 hours ago' },
    { id: 4, type: 'ticket', message: 'Support ticket resolved: Product Quality Issue', time: '8 hours ago' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, {user.username}!
            </h1>
            <p className="text-orange-100 text-lg">
              Welcome to BIDUA ERP Dashboard
            </p>
            <p className="text-orange-200 text-sm mt-1">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="hidden md:block">
            <Building2 className="w-24 h-24 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CRM Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Leads</p>
              <p className="text-3xl font-bold text-slate-900">{totalLeads}</p>
              <p className="text-sm text-orange-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {hotLeads} hot leads
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pipeline Value</p>
              <p className="text-3xl font-bold text-slate-900">₹{(totalRevenue / 100000).toFixed(1)}L</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <Target className="w-4 h-4 mr-1" />
                +15.3% this month
              </p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* HRMS Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Employees</p>
              <p className="text-3xl font-bold text-slate-900">{totalEmployees}</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center">
                <UserCheck className="w-4 h-4 mr-1" />
                {activeEmployees} active
              </p>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-slate-900">{pendingTasks}</p>
              <p className="text-sm text-amber-600 mt-1 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Due this week
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <CheckSquare className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Today's Attendance</p>
              <p className="text-xl font-bold text-slate-900">{todayAttendance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending Leaves</p>
              <p className="text-xl font-bold text-slate-900">{pendingLeaves}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-50 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Open Tickets</p>
              <p className="text-xl font-bold text-slate-900">{openTickets}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <Award className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Performance</p>
              <p className="text-xl font-bold text-slate-900">4.5/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'lead' ? 'bg-blue-500' :
                  activity.type === 'task' ? 'bg-green-500' :
                  activity.type === 'leave' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
            <Target className="w-5 h-5 text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setShowQuickLeadForm(true)}
              className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <Users className="w-6 h-6 text-slate-400 group-hover:text-orange-600 mb-2" />
              <p className="text-sm font-medium text-slate-900">Add Lead</p>
            </button>
            {user.role !== 'employee' && (
              <button 
                onClick={() => setShowQuickEmployeeForm(true)}
                className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
              >
                <UserCheck className="w-6 h-6 text-slate-400 group-hover:text-orange-600 mb-2" />
                <p className="text-sm font-medium text-slate-900">Add Employee</p>
              </button>
            )}
            <button 
              onClick={() => setShowQuickTaskForm(true)}
              className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <CheckSquare className="w-6 h-6 text-slate-400 group-hover:text-orange-600 mb-2" />
              <p className="text-sm font-medium text-slate-900">Create Task</p>
            </button>
            <button 
              onClick={() => setShowQuickAttendanceForm(true)}
              className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
            >
              <Calendar className="w-6 h-6 text-slate-400 group-hover:text-orange-600 mb-2" />
              <p className="text-sm font-medium text-slate-900">Mark Attendance</p>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Forms */}
      {showQuickLeadForm && (
        <LeadForm
          employees={employees}
          onSubmit={(leadData) => {
            addLead(leadData);
            setShowQuickLeadForm(false);
          }}
          onCancel={() => setShowQuickLeadForm(false)}
        />
      )}

      {showQuickEmployeeForm && user.role !== 'employee' && (
        <EmployeeForm
          onSubmit={(employeeData) => {
            addEmployee(employeeData);
            setShowQuickEmployeeForm(false);
          }}
          onCancel={() => setShowQuickEmployeeForm(false)}
        />
      )}

      {showQuickTaskForm && (
        <TaskForm
          employees={employees}
          customers={leads}
          onSubmit={(taskData) => {
            addTask(taskData);
            setShowQuickTaskForm(false);
          }}
          onCancel={() => setShowQuickTaskForm(false)}
        />
      )}

      {showQuickAttendanceForm && (
        <AttendanceForm
          employees={employees}
          user={user}
          onSubmit={(attendanceData) => {
            addAttendance(attendanceData);
            setShowQuickAttendanceForm(false);
          }}
          onCancel={() => setShowQuickAttendanceForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;