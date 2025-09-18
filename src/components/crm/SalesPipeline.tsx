import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, TrendingUp, DollarSign, Calendar, User, Phone, Mail, Building } from 'lucide-react';
import LeadForm from './LeadForm';
import { Lead, User as UserType, Task } from '../../types';

interface SalesPipelineProps {
  leads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  user: UserType;
  tasks: Task[];
  updateTask: (task: Task) => void;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const SalesPipeline: React.FC<SalesPipelineProps> = ({
  leads,
  onUpdateLead,
  user,
  tasks,
  updateTask,
  addNotification,
}) => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const stages = [
    { id: 'lead', name: 'New Leads', color: 'bg-blue-500' },
    { id: 'qualified', name: 'Qualified', color: 'bg-yellow-500' },
    { id: 'proposal', name: 'Proposal', color: 'bg-orange-500' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-purple-500' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-500' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-500' },
  ];

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.stage === stage);
  };

  const getTotalValue = (stage: string) => {
    return getLeadsByStage(stage).reduce((sum, lead) => sum + lead.value, 0);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const leadId = result.draggableId;
    const newStage = result.destination.droppableId;
    
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.stage !== newStage) {
      const updatedLead = { ...lead, stage: newStage };
      onUpdateLead(updatedLead);
      addNotification(`Lead moved to ${stages.find(s => s.id === newStage)?.name}`, 'success');
    }
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadForm(true);
  };

  const handleAddLead = () => {
    setSelectedLead(null);
    setShowLeadForm(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
          <p className="text-gray-600">Track leads through your sales process</p>
        </div>
        <button
          onClick={handleAddLead}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(leads.reduce((sum, lead) => sum + lead.value, 0))}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Deal Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(leads.length > 0 ? leads.reduce((sum, lead) => sum + lead.value, 0) / leads.length : 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 overflow-x-auto">
            {stages.map((stage) => (
              <div key={stage.id} className="min-w-[280px] lg:min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {getLeadsByStage(stage.id).length}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {formatCurrency(getTotalValue(stage.id))}
                </div>
                
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${
                        snapshot.isDraggingOver ? 'bg-gray-50' : ''
                      }`}
                    >
                      {getLeadsByStage(stage.id).map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                              onClick={() => handleEditLead(lead)}
                            >
                              <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-gray-900 text-sm">{lead.name}</h4>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                  </span>
                                </div>
                                
                                <div className="space-y-2 text-xs text-gray-600">
                                  <div className="flex items-center space-x-2">
                                    <Building className="w-3 h-3" />
                                    <span className="truncate">{lead.company}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="w-3 h-3" />
                                    <span className="truncate">{lead.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="w-3 h-3" />
                                    <span>{lead.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <User className="w-3 h-3" />
                                    <span>{lead.assignedTo}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                  <span className="text-sm font-semibold text-green-600">
                                    {formatCurrency(lead.value)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(lead.nextFollowUp).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <LeadForm
          lead={selectedLead}
          onSave={(lead) => {
            onUpdateLead(lead);
            setShowLeadForm(false);
            addNotification(
              selectedLead ? 'Lead updated successfully' : 'Lead created successfully',
              'success'
            );
          }}
          onCancel={() => setShowLeadForm(false)}
          employees={[]} // This will be passed from parent component
        />
      )}
    </div>
  );
};

export default SalesPipeline;