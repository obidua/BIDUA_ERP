import React, { useState } from 'react';
import { Task, User, Employee, TaskComment } from '../../types';
import {
  X,
  Calendar,
  User as UserIcon,
  AlertTriangle,
  Clock,
  Target,
  Building2,
  Tag,
  BarChart3,
  CheckCircle2,
  Play,
  Pause,
  Edit,
} from 'lucide-react';
import TaskCommentsSection from './TaskCommentsSection';

interface TaskDetailModalProps {
  task: Task;
  currentUser: User;
  employees: Employee[];
  onClose: () => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onAddComment: (taskId: string, comment: Omit<TaskComment, 'id' | 'taskId'>) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  currentUser,
  employees,
  onClose,
  onUpdateTask,
  onAddComment,
  addNotification,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
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

  const handleAcceptTask = () => {
    onUpdateTask(task.id, { 
      status: 'in-progress',
      startDate: new Date().toISOString().split('T')[0]
    });
    
    // Add system comment
    onAddComment(task.id, {
      authorId: currentUser.id,
      authorName: currentUser.username,
      content: 'Task accepted and started working',
      createdAt: new Date().toISOString(),
      type: 'status-change',
      metadata: {
        oldValue: 'pending',
        newValue: 'in-progress',
      },
    });
    
    addNotification?.(`Task "${task.title}" accepted and started`, 'success');
  };

  const handleCompleteTask = () => {
    onUpdateTask(task.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      progress: 100
    });
    
    // Add system comment
    onAddComment(task.id, {
      authorId: currentUser.id,
      authorName: currentUser.username,
      content: 'Task completed successfully',
      createdAt: new Date().toISOString(),
      type: 'status-change',
      metadata: {
        oldValue: task.status,
        newValue: 'completed',
        progressPercentage: 100,
      },
    });
    
    addNotification?.(`Task "${task.title}" completed successfully`, 'success');
  };

  const handleProgressUpdate = (newProgress: number) => {
    const oldProgress = task.progress;
    onUpdateTask(task.id, { progress: newProgress });
    
    // Add progress update comment
    onAddComment(task.id, {
      authorId: currentUser.id,
      authorName: currentUser.username,
      content: `Progress updated from ${oldProgress}% to ${newProgress}%`,
      createdAt: new Date().toISOString(),
      type: 'progress-update',
      metadata: {
        progressPercentage: newProgress,
        oldValue: `${oldProgress}%`,
        newValue: `${newProgress}%`,
      },
    });
    
    addNotification?.(`Progress updated to ${newProgress}%`, 'info');
  };

  const handleSaveEdit = () => {
    onUpdateTask(task.id, editData);
    setIsEditing(false);
    addNotification?.('Task details updated successfully', 'success');
  };

  const timeRemaining = getTimeRemaining(task.dueDate);
  const isAssignedToCurrentUser = task.assignedTo === currentUser.username;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-semibold text-slate-900">Task Details</h3>
            <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(task.status)}`}>
              {task.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Task Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-2xl font-bold text-slate-900 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              ) : (
                <h2 className="text-2xl font-bold text-slate-900">{task.title}</h2>
              )}
              
              {isEditing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full mt-2 border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              ) : (
                <p className="text-slate-600 mt-2">{task.description}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{task.priority.toUpperCase()}</span>
                </div>
              </span>
              
              {(currentUser.role !== 'employee' || isAssignedToCurrentUser) && (
                <button
                  onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
                  className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Task Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Assigned To</p>
                <p className="font-medium text-slate-900">{task.assignedTo}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Assigned By</p>
                <p className="font-medium text-slate-900">{task.assignedBy}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Due Date</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="text-sm border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                ) : (
                  <p className={`font-medium ${timeRemaining.color}`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Time Remaining</p>
                <p className={`font-medium ${timeRemaining.color}`}>
                  {timeRemaining.text}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-900">Progress</h4>
              <span className="text-2xl font-bold text-teal-600">{task.progress}%</span>
            </div>
            
            <div className="mb-3">
              <div className="bg-slate-200 rounded-full h-3">
                <div
                  className="bg-teal-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
            
            {isAssignedToCurrentUser && task.status === 'in-progress' && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-600">Update progress:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={task.progress}
                  onChange={(e) => handleProgressUpdate(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Project and Tags */}
          {(task.project || task.tags.length > 0) && (
            <div className="flex items-center space-x-6">
              {task.project && (
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Project:</span>
                  <span className="font-medium text-slate-900">{task.project}</span>
                </div>
              )}
              
              {task.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons for Employee */}
          {isAssignedToCurrentUser && (
            <div className="flex items-center space-x-3 p-4 bg-teal-50 rounded-lg">
              <Target className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">Quick Actions:</span>
              
              <div className="flex space-x-2">
                {task.status === 'pending' && (
                  <button
                    onClick={handleAcceptTask}
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Accept Task</span>
                  </button>
                )}
                
                {task.status === 'in-progress' && (
                  <>
                    <button
                      onClick={handleCompleteTask}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Task</span>
                    </button>
                    <button
                      onClick={() => onUpdateTask(task.id, { status: 'pending' })}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Task Timeline */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Task Timeline
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Created:</span>
                <span className="text-slate-900">{new Date(task.createdAt).toLocaleString()}</span>
              </div>
              {task.startDate && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Started:</span>
                  <span className="text-slate-900">{new Date(task.startDate).toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Due:</span>
                <span className={timeRemaining.color}>{new Date(task.dueDate).toLocaleString()}</span>
              </div>
              {task.completedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Completed:</span>
                  <span className="text-green-600">{new Date(task.completedAt).toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Last Updated:</span>
                <span className="text-slate-900">{new Date(task.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <TaskCommentsSection
            taskId={task.id}
            comments={task.comments}
            currentUser={currentUser}
            onAddComment={onAddComment}
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              Task ID: {task.id}
            </div>
            <div className="flex space-x-3">
              {isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;