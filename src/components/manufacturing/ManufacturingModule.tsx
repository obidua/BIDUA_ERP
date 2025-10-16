import React, { useState, useEffect } from 'react';
import { Factory, Package, Warehouse, ClipboardCheck, ShoppingCart, TrendingUp } from 'lucide-react';
import ProductionManagement from './ProductionManagement';
import InventoryManagement from './InventoryManagement';
import QualityManagement from './QualityManagement';
import SupplyChainManagement from './SupplyChainManagement';
import { manufacturingAPI } from '../../services/api';

interface ManufacturingModuleProps {
  currentUser: any;
}

const ManufacturingModule: React.FC<ManufacturingModuleProps> = ({ currentUser }) => {
  const [activeView, setActiveView] = useState('production');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeWorkOrders: 0,
    inventoryValue: 0,
    qualityScore: 0,
  });

  useEffect(() => {
    loadStats();
  }, [currentUser.company_id]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const statsData = await manufacturingAPI.getStats(currentUser.company_id);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading manufacturing stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const views = [
    { id: 'production', name: 'Production', icon: Factory },
    { id: 'inventory', name: 'Inventory', icon: Warehouse },
    { id: 'quality', name: 'Quality', icon: ClipboardCheck },
    { id: 'supply-chain', name: 'Supply Chain', icon: ShoppingCart },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'production':
        return <ProductionManagement currentUser={currentUser} />;
      case 'inventory':
        return <InventoryManagement currentUser={currentUser} />;
      case 'quality':
        return <QualityManagement currentUser={currentUser} />;
      case 'supply-chain':
        return <SupplyChainManagement currentUser={currentUser} />;
      default:
        return <ProductionManagement currentUser={currentUser} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Manufacturing</h2>
          <p className="text-gray-600 mt-1">Manage production, inventory, quality, and supply chain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Work Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeWorkOrders}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <Factory className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.inventoryValue.toLocaleString()}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <Warehouse className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Quality Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.qualityScore}%</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeView === view.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{view.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default ManufacturingModule;
