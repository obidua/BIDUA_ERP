import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  FolderKanban,
  Target,
  Activity,
} from 'lucide-react';
import { crmLeadAPI, crmCustomerAPI, crmDealAPI, hrmsAttendanceAPI, pmTaskAPI, pmProjectAPI } from '../../services/api';

interface DashboardProps {
  currentUser: any;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCustomers: 0,
    totalDeals: 0,
    dealsValue: 0,
    todayAttendance: 0,
    pendingTasks: 0,
    activeProjects: 0,
    completionRate: 0,
  });

  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser.company_id]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [leads, customers, deals, attendance, tasks, projects] = await Promise.all([
        crmLeadAPI.getAll(currentUser.company_id).catch(() => []),
        crmCustomerAPI.getAll(currentUser.company_id).catch(() => []),
        crmDealAPI.getAll(currentUser.company_id).catch(() => []),
        hrmsAttendanceAPI.getAll(currentUser.company_id, {
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        }).catch(() => []),
        pmTaskAPI.getAll(currentUser.company_id, {
          assignedTo: currentUser.id,
          status: 'in_progress',
        }).catch(() => []),
        pmProjectAPI.getAll(currentUser.company_id).catch(() => []),
      ]);

      const dealsValue = deals.reduce((sum: number, deal: any) => sum + (deal.deal_value || 0), 0);
      const activeProjects = projects.filter((p: any) => p.is_active && p.project_status === 'in_progress');
      const completedTasks = await pmTaskAPI.getAll(currentUser.company_id, {
        status: 'completed',
      }).catch(() => []);
      const allTasks = await pmTaskAPI.getAll(currentUser.company_id).catch(() => []);
      const completionRate = allTasks.length > 0 ? (completedTasks.length / allTasks.length) * 100 : 0;

      setStats({
        totalLeads: leads.length,
        totalCustomers: customers.length,
        totalDeals: deals.length,
        dealsValue,
        todayAttendance: attendance.filter((a: any) => a.attendance_status === 'present').length,
        pendingTasks: tasks.length,
        activeProjects: activeProjects.length,
        completionRate: Math.round(completionRate),
      });

      setUpcomingTasks(tasks.slice(0, 5));

      const activities = [
        ...leads.slice(0, 2).map((lead: any) => ({
          type: 'lead',
          title: `New lead: ${lead.first_name} ${lead.last_name || ''}`,
          time: new Date(lead.created_at).toLocaleString(),
          icon: Users,
          color: 'blue',
        })),
        ...deals.slice(0, 2).map((deal: any) => ({
          type: 'deal',
          title: `Deal updated: ${deal.deal_name}`,
          time: new Date(deal.updated_at).toLocaleString(),
          icon: DollarSign,
          color: 'green',
        })),
        ...tasks.slice(0, 2).map((task: any) => ({
          type: 'task',
          title: `Task: ${task.task_title}`,
          time: new Date(task.created_at).toLocaleString(),
          icon: CheckCircle,
          color: 'purple',
        })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

      setRecentActivities(activities);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: UserCheck,
      color: 'bg-green-500',
      trend: '+8%',
    },
    {
      title: 'Active Deals',
      value: stats.totalDeals,
      icon: TrendingUp,
      color: 'bg-purple-500',
      trend: '+15%',
    },
    {
      title: 'Deals Value',
      value: `$${(stats.dealsValue / 1000).toFixed(1)}K`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      trend: '+20%',
    },
    {
      title: "Today's Attendance",
      value: stats.todayAttendance,
      icon: Calendar,
      color: 'bg-cyan-500',
      trend: '92%',
    },
    {
      title: 'Pending Tasks',
      value: stats.pendingTasks,
      icon: CheckCircle,
      color: 'bg-orange-500',
      trend: '-5%',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: FolderKanban,
      color: 'bg-pink-500',
      trend: '+3',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: Target,
      color: 'bg-indigo-500',
      trend: '+10%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {currentUser.full_name}</p>
        </div>
        <button
          onClick={loadDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Activity size={18} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">{card.trend}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                    <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    task.priority === 'high' ? 'bg-red-100' :
                    task.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}>
                    <CheckCircle className={`w-4 h-4 ${
                      task.priority === 'high' ? 'text-red-600' :
                      task.priority === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.task_title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority}
                      </span>
                      {task.due_date && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No pending tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-sm p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
            <p className="text-blue-100">Get started with common tasks</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg p-4 text-center transition-all">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Add Lead</span>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg p-4 text-center transition-all">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Mark Attendance</span>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg p-4 text-center transition-all">
            <FolderKanban className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">New Project</span>
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg p-4 text-center transition-all">
            <Package className="w-8 h-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Create Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
