import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, PlayCircle, PauseCircle, CheckCircle, Calendar } from 'lucide-react';
import { manufacturingAPI } from '../../services/api';

interface ProductionManagementProps {
  currentUser: any;
}

const ProductionManagement: React.FC<ProductionManagementProps> = ({ currentUser }) => {
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [productionLines, setProductionLines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, [currentUser.company_id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, productsData, linesData] = await Promise.all([
        manufacturingAPI.getWorkOrders(currentUser.company_id),
        manufacturingAPI.getProducts(currentUser.company_id),
        manufacturingAPI.getProductionLines(currentUser.company_id),
      ]);
      setWorkOrders(ordersData || []);
      setProducts(productsData || []);
      setProductionLines(linesData || []);
    } catch (error) {
      console.error('Error loading production data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: any = {
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
      released: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Released' },
      in_progress: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'In Progress' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
      on_hold: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'On Hold' },
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: any = {
      low: { bg: 'bg-gray-100', text: 'text-gray-600' },
      medium: { bg: 'bg-blue-100', text: 'text-blue-600' },
      high: { bg: 'bg-orange-100', text: 'text-orange-600' },
      urgent: { bg: 'bg-red-100', text: 'text-red-600' },
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config.bg} ${config.text} capitalize`}>
        {priority}
      </span>
    );
  };

  const filteredWorkOrders = workOrders.filter(wo => {
    const matchesSearch = wo.work_order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          wo.product_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wo.work_order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Work Orders</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Work Order
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search work orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="released">Released</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading work orders...</p>
        </div>
      ) : filteredWorkOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Factory className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No work orders found</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first work order
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkOrders.map((wo) => (
                <tr key={wo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{wo.work_order_number}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{wo.product_name || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{wo.product_code || ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {wo.quantity_produced || 0} / {wo.quantity_planned || 0}
                    </div>
                    <div className="text-xs text-gray-500">{wo.unit_of_measure || 'PCS'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${((wo.quantity_produced || 0) / (wo.quantity_planned || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {Math.round(((wo.quantity_produced || 0) / (wo.quantity_planned || 1)) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(wo.work_order_status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(wo.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {wo.planned_start_date ? new Date(wo.planned_start_date).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">
                      to {wo.planned_end_date ? new Date(wo.planned_end_date).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductionManagement;
