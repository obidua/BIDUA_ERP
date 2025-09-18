import React, { useState } from 'react';
import { Task, User, Lead, Employee } from '../../types';
import TaskForm from './TaskForm';
import TaskDetailModal from '../common/TaskDetailModal';
import {
  CheckSquare,
  Plus,
  Filter,
  Clock,
  AlertTriangle,
  User as UserIcon,
  Calendar,
  Target,
  BarChart3,
  Play,
  CheckCircle2,
  Timer,
  MessageSquare,
} from 'lucide-react';

interface TaskManagementProps {
  user: User;
 tasks: Task[];
 employees: Employee[];
 leads: Lead[];
 addTask: (task: Omit<Task, 'id'>) => void;
 updateTask: (id: string, task: Partial<Task>) => void;
 deleteTask: (id: string) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ 
  user, 
  tasks, 
  employees, 
  leads, 
  addTask, 
  updateTask, 
  deleteTask,
  addNotification
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    // Filter by user role
    if (user.role === 'employee') {
      return matchesStatus && matchesPriority && task.assignedTo === user.username;
    }
    
    return matchesStatus && matchesPriority;
  });

  // Calculate time remaining for a task
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

  // Accept a task (change status from pending to in-progress)
  const handleAcceptTask = (taskId: string, taskTitle: string) => {
    updateTask(taskId, { 
      status: 'in-progress',
      startDate: new Date().toISOString().split('T')[0]
    });
    addNotification?.(`Task "${taskTitle}" accepted and started`, 'success');
  };

  // Mark task as complete
  const handleCompleteTask = (taskId: string, taskTitle: string) => {
    updateTask(taskId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      progress: 100
    });
    addNotification?.(`Task "${taskTitle}" completed successfully`, 'success');
  };

  // Update task progress
  const handleProgressUpdate = (taskId: string, progress: number, taskTitle: string) => {
    updateTask(taskId, { progress });
    addNotification?.(`Progress updated to ${progress}% for "${taskTitle}"`, 'info');
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

  // Mock stats
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, {
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
    });
  };

  const handleAddTask = () => {
    setShowForm(true);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setShowForm(true);
    setEditingTask(task);
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      addNotification?.(`Task "${taskData.title}" updated successfully`, 'success');
    } else {
      addTask(taskData);
      addNotification?.(`New task "${taskData.title}" created and assigned to ${taskData.assignedTo}`, 'info');
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleCancelTask = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleViewTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleAddTaskComment = (taskId: string, comment: Omit<TaskComment, 'id' | 'taskId'>) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newComment = {
        id: `c${Date.now()}`,
        taskId,
        ...comment,
      };
      
      updateTask(taskId, {
        comments: [...task.comments, newComment],
        updatedAt: new Date().toISOString(),
      });
      
      addNotification?.(`${comment.type === 'work-report' ? 'Work report' : 'Comment'} added to task`, 'success');
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Task Management</h2>
          <p className="text-slate-600">Manage and track project tasks and assignments</p>
        </div>
        <div className="flex space-x-3">
          {user.role !== 'employee' && (
            <button onClick={handleAddTask} className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          )}
        </div>
      </div>

      {/* Employee Task Overview */}
      {user.role === 'employee' && (
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Your Task Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{tasks.filter(t => t.assignedTo === user.username && t.status === 'pending').length}</p>
              <p className="text-teal-100 text-sm">Pending Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{tasks.filter(t => t.assignedTo === user.username && t.status === 'in-progress').length}</p>
              <p className="text-teal-100 text-sm">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{tasks.filter(t => t.assignedTo === user.username && t.status === 'completed').length}</p>
              <p className="text-teal-100 text-sm">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {tasks.filter(t => t.assignedTo === user.username && new Date(t.dueDate) < new Date() && t.status !== 'completed').length}
              </p>
              <p className="text-teal-100 text-sm">Overdue</p>
            </div>
          </div>
        </div>
      )}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Tasks</p>
              <p className="text-2xl font-bold text-slate-900">{taskStats.total}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <CheckSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{taskStats.pending}</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
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
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
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
                    <span>{task.assignedTo}</span>
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
                      {user.role === 'employee' && task.assignedTo === user.username && task.status === 'in-progress' && (
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
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </span>
                
                {/* Employee Action Buttons */}
                {user.role === 'employee' && task.assignedTo === user.username && (
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
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                  <button 
                    onClick={() => handleViewTaskDetails(task)}
                    className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    View Details
                  </button>
                </button>
                {user.role !== 'employee' && (
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => handleViewTaskDetails(task)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Updates ({task.comments.length})</span>
                </button>
              </div>
            </div>
            
            {task.completedAt && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Completed: {new Date(task.completedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No tasks found</h3>
          <p className="text-slate-600">No tasks match your current filters</p>
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          employees={employees}
          customers={leads}
          onSubmit={handleSubmitTask}
          onCancel={handleCancelTask}
        />
      )}

      {/* Task Detail Modal */}
      {showTaskModal && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          currentUser={user}
          employees={employees}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onUpdateTask={updateTask}
          onAddComment={handleAddTaskComment}
          addNotification={addNotification}
        />
      )}
    </div>
  );
};

export default TaskManagement;