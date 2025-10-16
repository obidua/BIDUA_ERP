import React, { useState } from 'react';
import {
  Factory,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';
import { WorkOrder } from '../../types';
import { mockWorkOrders } from '../../data/industryMockData';

export default function ProductionDashboard() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeOrders = workOrders.filter((wo) => wo.status === 'in-progress').length;
  const completedToday = workOrders.filter(
    (wo) => wo.status === 'completed' && wo.actualEndDate === new Date().toISOString().split('T')[0]
  ).length;
  const pendingQC = workOrders.filter((wo) => wo.status === 'quality-check').length;
  const plannedOrders = workOrders.filter((wo) => wo.status === 'planned').length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      planned: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Planned' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
      'quality-check': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Quality Check' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    };
    const badge = badges[status] || badges.planned;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
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
    { key: 'orderNumber', label: 'Order #', sortable: true },
    { key: 'productName', label: 'Product', sortable: true },
    {
      key: 'quantity',
      label: 'Quantity',
      sortable: true,
      render: (value: number, row: WorkOrder) => `${value} ${row.unit}`,
    },
    { key: 'assignedLine', label: 'Production Line', sortable: true },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value: string) => getPriorityBadge(value),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value),
    },
    { key: 'plannedEndDate', label: 'Target Date', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Production Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage production activities</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Factory size={20} />
          <span>New Work Order</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Orders"
          value={activeOrders}
          icon={Activity}
          color="blue"
          change={12}
          changeLabel="vs last week"
        />
        <StatCard
          title="Completed Today"
          value={completedToday}
          icon={CheckCircle}
          color="green"
          change={8}
          changeLabel="vs yesterday"
        />
        <StatCard
          title="Pending QC"
          value={pendingQC}
          icon={AlertTriangle}
          color="yellow"
        />
        <StatCard
          title="Planned Orders"
          value={plannedOrders}
          icon={Clock}
          color="gray"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Lines Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Production Line A', 'Production Line B', 'Production Line C'].map((line) => {
            const lineOrders = workOrders.filter((wo) => wo.assignedLine === line && wo.status === 'in-progress');
            const currentOrder = lineOrders[0];
            return (
              <div key={line} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{line}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentOrder ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {currentOrder ? 'Running' : 'Idle'}
                  </span>
                </div>
                {currentOrder ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Order:</p>
                    <p className="font-medium text-gray-900 mb-2">{currentOrder.productName}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{currentOrder.orderNumber}</span>
                      <span>
                        {currentOrder.quantity} {currentOrder.unit}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No active production</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Work Orders</h3>
        <DataTable
          columns={columns}
          data={workOrders}
          onRowClick={(row) => {
            setSelectedOrder(row);
            setIsModalOpen(true);
          }}
          searchable
          exportable
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        title={`Work Order: ${selectedOrder?.orderNumber}`}
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <p className="text-gray-900">{selectedOrder.productName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                <p className="text-gray-900">{selectedOrder.orderNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <p className="text-gray-900">
                  {selectedOrder.quantity} {selectedOrder.unit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                {getStatusBadge(selectedOrder.status)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                {getPriorityBadge(selectedOrder.priority)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Production Line</label>
                <p className="text-gray-900">{selectedOrder.assignedLine}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planned Start</label>
                <p className="text-gray-900">{selectedOrder.plannedStartDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planned End</label>
                <p className="text-gray-900">{selectedOrder.plannedEndDate}</p>
              </div>
              {selectedOrder.actualStartDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actual Start</label>
                  <p className="text-gray-900">{selectedOrder.actualStartDate}</p>
                </div>
              )}
              {selectedOrder.actualEndDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actual End</label>
                  <p className="text-gray-900">{selectedOrder.actualEndDate}</p>
                </div>
              )}
            </div>
            {selectedOrder.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Created By</label>
              <p className="text-gray-900">{selectedOrder.createdBy}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
