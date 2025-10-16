import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, Warehouse, Search, Plus } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import Modal from '../common/Modal';
import { InventoryItem } from '../../types';
import { mockInventoryItems } from '../../data/industryMockData';

export default function InventoryDashboard() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = inventoryItems.length;
  const lowStock = inventoryItems.filter((item) => item.quantity <= item.reorderLevel).length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.quantity * item.costPerUnit, 0);
  const rawMaterials = inventoryItems.filter((item) => item.category === 'raw-material').length;

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      'raw-material': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Raw Material' },
      'work-in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'WIP' },
      'finished-goods': { bg: 'bg-green-100', text: 'text-green-800', label: 'Finished Goods' },
      consumables: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Consumables' },
    };
    const badge = badges[category] || badges['raw-material'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getStockStatus = (item: InventoryItem) => {
    const stockLevel = (item.quantity / item.reorderLevel) * 100;
    if (stockLevel <= 100) {
      return <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
        <AlertTriangle size={16} />
        Low Stock
      </span>;
    } else if (stockLevel <= 150) {
      return <span className="text-yellow-600 text-sm font-medium">Moderate</span>;
    }
    return <span className="text-green-600 text-sm font-medium">Good</span>;
  };

  const columns = [
    { key: 'itemCode', label: 'Item Code', sortable: true },
    { key: 'itemName', label: 'Item Name', sortable: true },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => getCategoryBadge(value),
    },
    {
      key: 'quantity',
      label: 'Stock',
      sortable: true,
      render: (value: number, row: InventoryItem) => `${value} ${row.unit}`,
    },
    {
      key: 'reorderLevel',
      label: 'Reorder Level',
      sortable: true,
      render: (value: number, row: InventoryItem) => `${value} ${row.unit}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (_: any, row: InventoryItem) => getStockStatus(row),
    },
    { key: 'location', label: 'Location', sortable: true },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (_: any, row: InventoryItem) => `₹${(row.quantity * row.costPerUnit).toLocaleString()}`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage inventory levels</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Search size={20} />
            <span>Stock Adjustment</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={20} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Items"
          value={totalItems}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStock}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Inventory Value"
          value={`₹${(totalValue / 100000).toFixed(1)}L`}
          icon={TrendingUp}
          color="green"
          change={5}
          changeLabel="vs last month"
        />
        <StatCard
          title="Raw Materials"
          value={rawMaterials}
          icon={Warehouse}
          color="gray"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock by Category</h3>
          <div className="space-y-4">
            {['raw-material', 'work-in-progress', 'finished-goods', 'consumables'].map((category) => {
              const items = inventoryItems.filter((item) => item.category === category);
              const percentage = (items.length / totalItems) * 100;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    {getCategoryBadge(category)}
                    <span className="text-sm font-medium text-gray-900">{items.length} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
          <div className="space-y-3">
            {inventoryItems
              .filter((item) => item.quantity <= item.reorderLevel)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle size={16} className="text-red-600" />
                      <span className="font-medium text-gray-900">{item.itemName}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Current: {item.quantity} {item.unit} | Reorder at: {item.reorderLevel} {item.unit}
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                    Reorder
                  </button>
                </div>
              ))}
            {inventoryItems.filter((item) => item.quantity <= item.reorderLevel).length === 0 && (
              <p className="text-center text-gray-500 py-4">No low stock items</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Inventory Items</h3>
        <DataTable
          columns={columns}
          data={inventoryItems}
          onRowClick={(row) => {
            setSelectedItem(row);
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
          setSelectedItem(null);
        }}
        title={selectedItem?.itemName || 'Item Details'}
        size="xl"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Code</label>
                <p className="text-gray-900 font-mono">{selectedItem.itemCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <p className="text-gray-900">{selectedItem.itemName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                {getCategoryBadge(selectedItem.category)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                <p className="text-gray-900 text-lg font-semibold">
                  {selectedItem.quantity} {selectedItem.unit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
                <p className="text-gray-900">
                  {selectedItem.reorderLevel} {selectedItem.unit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <p className="text-gray-900">{selectedItem.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <p className="text-gray-900">{selectedItem.supplier}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost Per Unit</label>
                <p className="text-gray-900">₹{selectedItem.costPerUnit}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Value</label>
                <p className="text-gray-900 text-lg font-semibold">
                  ₹{(selectedItem.quantity * selectedItem.costPerUnit).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Restocked</label>
                <p className="text-gray-900">{selectedItem.lastRestockDate}</p>
              </div>
              {selectedItem.batchNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <p className="text-gray-900 font-mono">{selectedItem.batchNumber}</p>
                </div>
              )}
              {selectedItem.expiryDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <p className="text-gray-900">{selectedItem.expiryDate}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Stock Adjustment
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Reorder Now
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
