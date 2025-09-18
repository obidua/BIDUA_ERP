import React from 'react';
import { User, Employee, Task, LeaveRequest, Attendance } from '../../types';
import {
  CheckSquare,
  Clock,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Award,
  MapPin,
  Timer,
} from 'lucide-react';

interface EmployeeDashboardProps {
  user: User;
  employee: Employee;
  tasks: Task[];
  leaveRequests: LeaveRequest[];
  attendanceData: Attendance[];
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  user,
  employee,
  tasks,
  leaveRequests,
  attendanceData,
  addNotification,
}) => {
  const myTasks = tasks.filter(t => t.assignedTo === employee.name);
  const myLeaves = leaveRequests.filter(l => l.employeeId === employee.employeeId);
  const myAttendance = attendanceData.filter(a => a.employeeId === employee.employeeId);

  const taskStats = {
    pending: myTasks.filter(t => t.status === 'pending').length,
    inProgress: myTasks.filter(t => t.status === 'in-progress').length,
    completed: myTasks.filter(t => t.status === 'completed').length,
    overdue: myTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  };

  const leaveStats = {
    pending: myLeaves.filter(l => l.status === 'pending').length,
    approved: myLeaves.filter(l => l.status === 'approved').length,
    totalDays: myLeaves.reduce((sum, l) => sum + l.days, 0),
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const upcomingTasks = myTasks
    .filter(t => t.status !== 'completed' && t.status !== 'cancelled')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const recentActivities = [
    { id: 1, message: 'Task "Q1 Sales Strategy" marked as completed', time: '2 hours ago', type: 'success' },
    { id: 2, message: 'New task assigned: "Product Launch Campaign"', time: '4 hours ago', type: 'info' },
    { id: 3, message: 'Leave request approved for next week', time: '1 day ago', type: 'success' },
    { id: 4, message: 'Attendance marked for today', time: '8 hours ago', type: 'info' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, {employee.name.split(' ')[0]}!
            </h1>
            <p className="text-teal-100 text-lg">
              Welcome to your personal workspace
            </p>
            <p className="text-teal-200 text-sm mt-1">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-amber-600">{taskStats.pending}</p>
              <p className="text-sm text-amber-600 mt-1 flex items-center">
                <Timer className="w-4 h-4 mr-1" />
                Awaiting action
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <CheckSquare className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{taskStats.inProgress}</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Active work
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <Award className="w-4 h-4 mr-1" />
                This month
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{taskStats.overdue}</p>
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Needs attention
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Leave Balance</p>
              <p className="text-xl font-bold text-slate-900">18 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">This Month Hours</p>
              <p className="text-xl font-bold text-slate-900">168h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-50 p-2 rounded-lg">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Performance</p>
              <p className="text-xl font-bold text-slate-900">4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Upcoming Tasks</h3>
            <CheckSquare className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => {
              const dueDate = new Date(task.dueDate);
              const today = new Date();
              const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const isOverdue = daysLeft < 0;
              
              return (
                <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === 'urgent' ? 'bg-red-500' :
                    task.priority === 'high' ? 'bg-orange-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Due: {dueDate.toLocaleDateString()} 
                      <span className={`ml-2 ${isOverdue ? 'text-red-600' : 'text-slate-500'}`}>
                        {isOverdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                      </span>
                    </p>
                    <div className="mt-2">
                      <div className="bg-slate-200 rounded-full h-1">
                        <div
                          className="bg-teal-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;