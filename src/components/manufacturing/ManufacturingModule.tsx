import React, { useState } from 'react';
import { Factory, Package, FileText, CheckSquare } from 'lucide-react';
import ProductionManagement from './ProductionManagement';
import InventoryManagement from './InventoryManagement';

interface ManufacturingModuleProps {
  companyId: string;
  userId: string;
}

export default function ManufacturingModule({ companyId, userId }: ManufacturingModuleProps) {
  const [activeTab, setActiveTab] = useState('production');

  const tabs = [
    { id: 'production', name: 'Production Orders', icon: Factory },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'bom', name: 'Bill of Materials', icon: FileText },
    { id: 'quality', name: 'Quality Control', icon: CheckSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Factory size={32} />
          <h1 className="text-3xl font-bold">Manufacturing Module</h1>
        </div>
        <p className="text-blue-100">
          Manage production orders, inventory, BOM, and quality control
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'production' && (
            <ProductionManagement companyId={companyId} userId={userId} />
          )}
          {activeTab === 'inventory' && (
            <InventoryManagement companyId={companyId} />
          )}
          {activeTab === 'bom' && (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bill of Materials</h3>
              <p>BOM management interface coming soon</p>
            </div>
          )}
          {activeTab === 'quality' && (
            <div className="text-center py-12 text-gray-500">
              <CheckSquare size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Control</h3>
              <p>Quality inspection interface coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
