import React, { useState } from 'react';
import { User, SupportTicket } from '../../types';
import {
  Search,
  Plus,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User as UserIcon,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import SupportTicketForm from './SupportTicketForm';

interface CustomerSupportProps {
  user: User;
  supportTickets: SupportTicket[];
  employees: Employee[];
  addSupportTicket: (ticket: Omit<SupportTicket, 'id'>) => void;
  updateSupportTicket: (id: string, ticket: Partial<SupportTicket>) => void;
  deleteSupportTicket: (id: string) => void;
}

const CustomerSupport: React.FC<CustomerSupportProps> = ({ 
  user, 
  supportTickets, 
  employees,
  addSupportTicket, 
  updateSupportTicket, 
  deleteSupportTicket 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<SupportTicket | null>(null);

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddTicket = () => {
    setShowTicketForm(true);
    setEditingTicket(null);
  };

  const handleEditTicket = (ticket: SupportTicket) => {
    setShowTicketForm(true);
    setEditingTicket(ticket);
  };

  const handleDeleteTicket = (id: string) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteSupportTicket(id);
    }
  };

  const handleSubmitTicket = (ticketData: Omit<SupportTicket, 'id'>) => {
    if (editingTicket) {
      updateSupportTicket(editingTicket.id, ticketData);
    } else {
      addSupportTicket(ticketData);
    }
    setShowTicketForm(false);
    setEditingTicket(null);
  };

  const handleCancelTicket = () => {
    setShowTicketForm(false);
    setEditingTicket(null);
  };

  const handleStatusChange = (ticketId: string, newStatus: SupportTicket['status']) => {
    updateSupportTicket(ticketId, { 
      status: newStatus,
      resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : undefined
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-slate-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const ticketStats = {
    total: supportTickets.length,
    open: supportTickets.filter(t => t.status === 'open').length,
    inProgress: supportTickets.filter(t => t.status === 'in-progress').length,
    resolved: supportTickets.filter(t => t.status === 'resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Customer Support</h2>
          <p className="text-slate-600">Manage customer support tickets and inquiries</p>
        </div>
        <button 
          onClick={handleAddTicket}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Ticket</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Tickets</p>
              <p className="text-2xl font-bold text-slate-900">{ticketStats.total}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Open Tickets</p>
              <p className="text-2xl font-bold text-red-600">
                {ticketStats.open}
              </p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {ticketStats.inProgress}
              </p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">
                {ticketStats.resolved}
              </p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
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
              placeholder="Search tickets by title, customer, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{ticket.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                    <div className="flex items-center space-x-1">
                      {getPriorityIcon(ticket.priority)}
                      <span>{ticket.priority.toUpperCase()}</span>
                    </div>
                  </span>
                </div>
                <p className="text-slate-600 mb-3">{ticket.description}</p>
                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="w-4 h-4" />
                    <span>{ticket.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Assigned to: {ticket.assignedTo}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Category: {ticket.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(ticket.status)}
                  <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex space-x-3">
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  View Details
                </button>
                <button className="px-3 py-1 text-sm bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                  Add Comment
                </button>
                {ticket.status !== 'resolved' && (
                  <button 
                    onClick={() => handleStatusChange(ticket.id, 'resolved')}
                    className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
              <div className="text-xs text-slate-500">
                Ticket #{ticket.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No tickets found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Support Ticket Form Modal */}
      {showTicketForm && (
        <SupportTicketForm
          ticket={editingTicket}
          employees={employees}
          onSubmit={handleSubmitTicket}
          onCancel={handleCancelTicket}
        />
      )}
    </div>
  );
};

export default CustomerSupport;