import React, { useState } from 'react';
import { Plus, Search, Phone, Video, Mail, CheckSquare, Calendar, Clock, Filter, Eye, Edit, Trash2, User } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  relatedTo: string;
  relatedId: string;
  relatedName: string;
  assignedTo: string;
  status: string;
  priority: string;
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  outcome?: string;
  location?: string;
  emailTracking?: {
    opened: boolean;
    clicked: boolean;
    openCount: number;
  };
  createdAt: string;
}

interface ActivitiesManagementProps {
  activities: Activity[];
  onAddActivity?: (activity: any) => void;
  onUpdateActivity?: (id: string, activity: any) => void;
  onDeleteActivity?: (id: string) => void;
}

const ActivitiesManagement: React.FC<ActivitiesManagementProps> = ({
  activities,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.relatedName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || activity.priority === priorityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'meeting': return Video;
      case 'email': return Mail;
      case 'task': return CheckSquare;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'task': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const totalActivities = filteredActivities.length;
  const completedActivities = filteredActivities.filter(a => a.status === 'completed').length;
  const scheduledActivities = filteredActivities.filter(a => a.status === 'scheduled').length;
  const overdueActivities = filteredActivities.filter(a =>
    a.status === 'scheduled' && new Date(a.date) < new Date()
  ).length;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Sales Activities</h2>
          <p className="text-sm md:text-base text-gray-600">Track all your sales interactions and tasks</p>
        </div>
        <button
          onClick={() => onAddActivity?.({})}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Activities</p>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalActivities}</p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Completed</p>
            <CheckSquare className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedActivities}</p>
          <p className="text-xs text-gray-500 mt-1">Done</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Scheduled</p>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{scheduledActivities}</p>
          <p className="text-xs text-gray-500 mt-1">Upcoming</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Overdue</p>
            <Calendar className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{overdueActivities}</p>
          <p className="text-xs text-gray-500 mt-1">Need attention</p>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="call">Call</option>
              <option value="meeting">Meeting</option>
              <option value="email">Email</option>
              <option value="task">Task</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(activity.type)}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{activity.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                      <span className={`inline-flex items-center text-xs font-semibold ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Related To</p>
                      <p className="text-sm font-medium text-gray-900">{activity.relatedName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{activity.assignedTo}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                    {activity.duration && (
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-sm font-medium text-gray-900">{activity.duration} min</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {activity.outcome && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700">
                      <span className="font-medium">Outcome:</span> {activity.outcome}
                    </div>
                  )}

                  {activity.emailTracking && (
                    <div className="mt-3 flex items-center space-x-4 text-xs">
                      <span className={`${activity.emailTracking.opened ? 'text-green-600' : 'text-gray-400'}`}>
                        Opened: {activity.emailTracking.openCount}x
                      </span>
                      <span className={`${activity.emailTracking.clicked ? 'text-blue-600' : 'text-gray-400'}`}>
                        Clicked: {activity.emailTracking.clicked ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => {}}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onUpdateActivity?.(activity.id, activity)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteActivity?.(activity.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-600">Try adjusting your filters or log a new activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesManagement;
