import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { manufacturingService, WorkOrder } from '../../services/manufacturingService';

interface WorkOrderFormProps {
  companyId: string;
  userId: string;
  workOrder?: any;
  onClose: () => void;
}

export default function WorkOrderForm({ companyId, userId, workOrder, onClose }: WorkOrderFormProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [productionLines, setProductionLines] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    work_order_number: '',
    product_id: '',
    quantity_to_produce: '',
    priority: 'medium',
    status: 'pending',
    scheduled_start_date: '',
    scheduled_end_date: '',
    production_line_id: '',
    notes: '',
  });

  useEffect(() => {
    loadProducts();
    loadProductionLines();

    if (workOrder) {
      setFormData({
        work_order_number: workOrder.work_order_number,
        product_id: workOrder.product_id,
        quantity_to_produce: workOrder.quantity_to_produce.toString(),
        priority: workOrder.priority,
        status: workOrder.status,
        scheduled_start_date: workOrder.scheduled_start_date.split('T')[0],
        scheduled_end_date: workOrder.scheduled_end_date.split('T')[0],
        production_line_id: workOrder.production_line_id || '',
        notes: workOrder.notes || '',
      });
    } else {
      setFormData(prev => ({
        ...prev,
        work_order_number: `WO-${Date.now().toString().slice(-8)}`,
        scheduled_start_date: new Date().toISOString().split('T')[0],
      }));
    }
  }, [workOrder, companyId]);

  const loadProducts = async () => {
    try {
      const data = await manufacturingService.getProducts(companyId);
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const loadProductionLines = async () => {
    try {
      const data = await manufacturingService.getProductionLines(companyId);
      setProductionLines(data || []);
    } catch (error) {
      console.error('Failed to load production lines:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const workOrderData: WorkOrder = {
        company_id: companyId,
        work_order_number: formData.work_order_number,
        product_id: formData.product_id,
        quantity_to_produce: parseInt(formData.quantity_to_produce),
        priority: formData.priority,
        status: formData.status,
        scheduled_start_date: formData.scheduled_start_date,
        scheduled_end_date: formData.scheduled_end_date,
        production_line_id: formData.production_line_id || null,
        notes: formData.notes || null,
        created_by: userId,
      };

      if (workOrder) {
        await manufacturingService.updateWorkOrder(workOrder.id, workOrderData);
      } else {
        await manufacturingService.createWorkOrder(workOrderData);
      }

      onClose();
    } catch (error) {
      console.error('Failed to save work order:', error);
      alert('Failed to save work order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {workOrder ? 'Edit Work Order' : 'Create Work Order'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Order Number *
              </label>
              <input
                type="text"
                required
                value={formData.work_order_number}
                onChange={(e) => setFormData({ ...formData, work_order_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!!workOrder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product *
              </label>
              <select
                required
                value={formData.product_id}
                onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.product_name} ({product.product_code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Produce *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity_to_produce}
                onChange={(e) => setFormData({ ...formData, quantity_to_produce: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Production Line
              </label>
              <select
                value={formData.production_line_id}
                onChange={(e) => setFormData({ ...formData, production_line_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select production line</option>
                {productionLines.map((line) => (
                  <option key={line.id} value={line.id}>
                    {line.line_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority *
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.scheduled_start_date}
                onChange={(e) => setFormData({ ...formData, scheduled_start_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled End Date *
              </label>
              <input
                type="date"
                required
                value={formData.scheduled_end_date}
                onChange={(e) => setFormData({ ...formData, scheduled_end_date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes or instructions..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Work Order'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
