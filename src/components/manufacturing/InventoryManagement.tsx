import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingDown, Search, Download } from 'lucide-react';
import { manufacturingService } from '../../services/manufacturingService';

interface InventoryManagementProps {
  companyId: string;
}

export default function InventoryManagement({ companyId }: InventoryManagementProps) {
  const [inventory, setInventory] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    loadData();
  }, [companyId, warehouseFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [inventoryData, warehouseData] = await Promise.all([
        manufacturingService.getInventory(
          companyId,
          warehouseFilter !== 'all' ? warehouseFilter : undefined
        ),
        manufacturingService.getWarehouses(companyId),
      ]);
      setInventory(inventoryData || []);
      setWarehouses(warehouseData || []);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = searchTerm === '' ||
      item.item_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLowStock = !showLowStock ||
      (item.quantity_on_hand <= (item.reorder_level || 0));
    return matchesSearch && matchesLowStock;
  });

  const lowStockCount = inventory.filter(
    item => item.quantity_on_hand <= (item.reorder_level || 0)
  ).length;

  const totalValue = inventory.reduce(
    (sum, item) => sum + (item.quantity_on_hand * 0), // Would need cost_per_unit in real implementation
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-600 mt-1">Monitor stock levels and manage warehouse inventory</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Items</div>
              <div className="text-3xl font-bold text-gray-900">{inventory.length}</div>
            </div>
            <Package className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-red-700 mb-1">Low Stock Items</div>
              <div className="text-3xl font-bold text-red-900">{lowStockCount}</div>
            </div>
            <AlertTriangle className="text-red-600" size={40} />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-700 mb-1">Warehouses</div>
              <div className="text-3xl font-bold text-green-900">{warehouses.length}</div>
            </div>
            <Package className="text-green-600" size={40} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Warehouses</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.warehouse_name}
              </option>
            ))}
          </select>
          <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
              className="rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Low Stock Only</span>
          </label>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading inventory...</div>
        ) : filteredInventory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No inventory items found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">On Hand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reserved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reorder Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const available = item.quantity_on_hand - (item.reserved_quantity || 0);
                  const isLowStock = item.quantity_on_hand <= (item.reorder_level || 0);

                  return (
                    <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${isLowStock ? 'bg-red-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.item_type}</div>
                        <div className="text-sm text-gray-500">ID: {item.item_id}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {item.mfg_warehouses?.warehouse_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{item.quantity_on_hand}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.reserved_quantity || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-green-600">{available}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {item.reorder_level || 0}
                      </td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <span className="flex items-center space-x-1 text-red-600 font-medium">
                            <AlertTriangle size={16} />
                            <span>Low Stock</span>
                          </span>
                        ) : (
                          <span className="text-green-600 font-medium">In Stock</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
