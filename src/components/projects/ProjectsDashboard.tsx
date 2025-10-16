import React, { useState } from 'react';
import {
  FolderKanban,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Play,
} from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';
import { Project } from '../../types';
import { mockProjects } from '../../data/industryMockData';

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const avgProgress = projects.reduce((sum, p) => sum + p.progress, 0) / projects.length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon?: any }> = {
      planning: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Planning', icon: Clock },
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active', icon: Play },
      'on-hold': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'On Hold', icon: AlertCircle },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed', icon: CheckCircle2 },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    };
    const badge = badges[status] || badges.planning;
    const Icon = badge.icon;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} flex items-center gap-1 w-fit`}>
        {Icon && <Icon size={12} />}
        {badge.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      low: { bg: 'bg-gray-100', text: 'text-gray-600' },
      medium: { bg: 'bg-blue-100', text: 'text-blue-600' },
      high: { bg: 'bg-orange-100', text: 'text-orange-600' },
      urgent: { bg: 'bg-red-100', text: 'text-red-600' },
    };
    const badge = badges[priority] || badges.low;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${badge.bg} ${badge.text}`}>
        {priority}
      </span>
    );
  };

  const columns = [
    { key: 'name', label: 'Project Name', sortable: true },
    { key: 'clientName', label: 'Client', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value: string) => getPriorityBadge(value),
    },
    {
      key: 'progress',
      label: 'Progress',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium">{value}%</span>
        </div>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      sortable: true,
      render: (value: number, row: Project) => (
        <div>
          <p className="text-sm font-medium">₹{(value / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500">
            Spent: ₹{(row.spent / 100000).toFixed(1)}L
          </p>
        </div>
      ),
    },
    { key: 'endDate', label: 'Due Date', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track all projects</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FolderKanban size={20} />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value={activeProjects}
          icon={Play}
          color="green"
          change={15}
          changeLabel="vs last month"
        />
        <StatCard
          title="Total Budget"
          value={`₹${(totalBudget / 100000).toFixed(1)}L`}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Total Spent"
          value={`₹${(totalSpent / 100000).toFixed(1)}L`}
          icon={TrendingUp}
          color="yellow"
        />
        <StatCard
          title="Avg. Progress"
          value={`${Math.round(avgProgress)}%`}
          icon={CheckCircle2}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              setSelectedProject(project);
              setIsModalOpen(true);
            }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
              {getPriorityBadge(project.priority)}
            </div>
            <p className="text-sm text-gray-600 mb-3">Client: {project.clientName}</p>
            <div className="mb-4">{getStatusBadge(project.status)}</div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">
                    ₹{(project.spent / 100000).toFixed(1)}L / ₹{(project.budget / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (project.spent / project.budget) * 100 > 80 ? 'bg-red-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${(project.spent / project.budget) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{project.teamMembers.length} members</span>
                </div>
                <div className="text-xs text-gray-500">
                  Due: {project.endDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Projects</h3>
        <DataTable
          columns={columns}
          data={projects}
          onRowClick={(row) => {
            setSelectedProject(row);
            setIsModalOpen(true);
          }}
          searchable
          exportable
          filterable
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        title={selectedProject?.name || 'Project Details'}
        size="2xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <p className="text-gray-900">{selectedProject.clientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Manager</label>
                <p className="text-gray-900">{selectedProject.projectManager}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                {getStatusBadge(selectedProject.status)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                {getPriorityBadge(selectedProject.priority)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <p className="text-gray-900">{selectedProject.startDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <p className="text-gray-900">{selectedProject.endDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <p className="text-gray-900 text-lg font-semibold">
                  ₹{selectedProject.budget.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spent</label>
                <p className="text-gray-900 text-lg font-semibold">
                  ₹{selectedProject.spent.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProject.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
              <div className="flex flex-wrap gap-2">
                {selectedProject.teamMembers.map((member, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Milestones</label>
              <div className="space-y-3">
                {selectedProject.milestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                      {getStatusBadge(milestone.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Due: {milestone.dueDate}</span>
                      <span className="font-medium">{milestone.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
