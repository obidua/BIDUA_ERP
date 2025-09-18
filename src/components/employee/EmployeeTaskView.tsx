import React, { useState } from 'react';
import { User, Task } from '../../types';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Play,
  CheckCircle2,
  Timer,
  Calendar,
  User as UserIcon,
  Target,
} from 'lucide-react';

interface EmployeeTaskViewProps {
  user: User;
  tasks: Task[];
  updateTask: (id: string, task: Partial<Task>) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const EmployeeTaskView: React.FC<EmployeeTaskViewProps> = ({
  user,
  tasks,
  updateTask,
  addNotification,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const myTasks = tasks.filter(t => t.assignedTo === user.username);

  const filteredTasks = myTasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const getTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: 'text-red-600', isOverdue: true };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-orange-600', isOverdue: false };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-yellow-600', isOverdue: false };
    } else {
      return { text: `${diffDays} days left`, color: 'text-green-600', isOverdue: false };
    }
  };

  const handleAcceptTask = (taskId: string, taskTitle: string) => {
    updateTask(taskId, { 
      status: 'in-progress',
      startDate: new Date().toISOString().split('T')[0]
    });
    addNotification?.(`Task "${taskTitle}" accepted and started`, 'success');
  };

  const handleCompleteTask = (taskId: string, taskTitle: string) => {
    updateTask(taskId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      progress: 100
    });
    addNotification?.(`Task "${taskTitle}" completed successfully`, 'success');
  };

  const handleProgressUpdate = (taskId: string, progress: number, taskTitle: string) => {
    updateTask(taskId, { progress });
    addNotification?.(`Progress updated to ${progress}% for "${taskTitle}"`, 'info');
  };

  const handleAddComment = (taskId: string, taskTitle: string) => {
    // In a real app, this would open a comment modal
    addNotification?.(`Comment added to task "${taskTitle}"`, 'info');
  };

  const handleViewReport = (taskId: string, taskTitle: string) => {
    // In a real app, this would show detailed task report
    addNotification?.(`Viewing detailed report for "${taskTitle}"`, 'info');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const taskStats = {
    pending: myTasks.filter(t => t.status === 'pending').length,
    inProgress: myTasks.filter(t => t.status === 'in-progress').length,
    completed: myTasks.filter(t => t.status === 'completed').length,
    overdue: myTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
          <p className="text-slate-600">Manage your assigned tasks and track progress</p>
        </div>
      </div>

      {/* Task Overview */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{taskStats.pending}</p>
            <p className="text-teal-100 text-sm">Pending Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{taskStats.inProgress}</p>
            <p className="text-teal-100 text-sm">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{taskStats.completed}</p>
            <p className="text-teal-100 text-sm">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{taskStats.overdue}</p>
            <p className="text-teal-100 text-sm">Overdue</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                    <div className="flex items-center space-x-1">
                      {getPriorityIcon(task.priority)}
                      <span>{task.priority.toUpperCase()}</span>
                    </div>
                  </span>
                </div>
                <p className="text-slate-600 mb-3 line-clamp-2">{task.description}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="w-4 h-4" />
                    <span>By {task.assignedBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Timer className="w-4 h-4" />
                    <span className={getTimeRemaining(task.dueDate).color}>
                      {getTimeRemaining(task.dueDate).text}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">Progress</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-slate-900">{task.progress || 0}%</span>
                      {task.status === 'in-progress' && (
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={task.progress || 0}
                          onChange={(e) => handleProgressUpdate(task.id, Number(e.target.value), task.title)}
                          className="w-16 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress || 0}%` }}
                    />
                  </div>
                </div>
                
                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleAddComment(task.id, task.title)}
                  className="flex items-center space-x-1 px-3 py-1 text-xs bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span>💬</span>
                  <span>Comment</span>
                </button>
                <button
                  onClick={() => handleViewReport(task.id, task.title)}
                  className="flex items-center space-x-1 px-3 py-1 text-xs bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span>📊</span>
                  <span>Report</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </span>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {task.status === 'pending' && (
                    <button
                      onClick={() => handleAcceptTask(task.id, task.title)}
                      className="flex items-center space-x-1 px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      <span>Accept</span>
                    </button>
                  )}
                  {task.status === 'in-progress' && (
                    <button
                      onClick={() => handleCompleteTask(task.id, task.title)}
                      className="flex items-center space-x-1 px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-slate-500">
                Task #{task.id}
              </div>
            </div>
            
            {task.completedAt && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Completed: {new Date(task.completedAt).toLocaleDateString()}
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Task #{task.id}
              </div>
              {task.project && (
                <div className="text-xs text-slate-500">
                  Project: {task.project}
                </div>
              )}
            )}
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No tasks found</h3>
          <p className="text-slate-600">No tasks match your current filters</p>
          
          {/* Task Timeline for completed tasks */}
          {task.status === 'completed' && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Started: {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'}</span>
                <span>Duration: {task.startDate && task.completedAt ? 
                  Math.ceil((new Date(task.completedAt).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24)) + ' days' : 'N/A'}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeTaskView;