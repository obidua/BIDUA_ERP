import React, { useState } from 'react';
import { ShoppingCart, Package, TrendingUp, Store, DollarSign, Users } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { Product, SalesOrder } from '../../types';
import { mockProducts, mockSalesOrders } from '../../data/industryMockData';

export default function RetailDashboard() {
  const [products] = useState<Product[]>(mockProducts);
  const [orders] = useState<SalesOrder[]>(mockSalesOrders);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalRevenue / totalOrders || 0;
  const lowStockProducts = products.filter(p => p.stock <= p.reorderLevel).length;

  const productColumns = [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price', sortable: true, render: (v: number) => `₹${v}` },
    { key: 'stock', label: 'Stock', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (_: any, row: Product) => {
        const isLow = row.stock <= row.reorderLevel;
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isLow ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {isLow ? 'Low Stock' : 'In Stock'}
          </span>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Retail Dashboard</h1>
          <p className="text-gray-600 mt-1">Point of Sale and Store Management</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <ShoppingCart size={20} />
          <span>New Sale</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} icon={DollarSign} color="green" change={12} changeLabel="vs last week" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingCart} color="blue" />
        <StatCard title="Avg Order Value" value={`₹${avgOrderValue.toFixed(0)}`} icon={TrendingUp} color="yellow" />
        <StatCard title="Low Stock Items" value={lowStockProducts} icon={Package} color="red" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick POS</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map(product => (
            <button key={product.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900">{product.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">₹{product.price}</p>
              <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Catalog</h3>
        <DataTable columns={productColumns} data={products} searchable exportable />
      </div>
    </div>
  );
}
