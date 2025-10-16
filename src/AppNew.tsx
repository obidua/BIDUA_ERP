import React, { useState } from 'react';
import { Menu, X, Factory, Code, Wrench, ShoppingCart, DollarSign, LayoutDashboard } from 'lucide-react';
import IndustrySelection from './components/onboarding/IndustrySelection';
import ProductionDashboard from './components/manufacturing/ProductionDashboard';
import InventoryDashboard from './components/manufacturing/InventoryDashboard';
import ProjectsDashboard from './components/projects/ProjectsDashboard';
import ServicesDashboard from './components/services/ServicesDashboard';
import RetailDashboard from './components/retail/RetailDashboard';
import FinanceDashboard from './components/finance/FinanceDashboard';
import { IndustryType } from './types';

function AppNew() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!selectedIndustry) {
    return <IndustrySelection onSelect={setSelectedIndustry} />;
  }

  const getModulesByIndustry = () => {
    const moduleMap: Record<IndustryType, Array<{ id: string; name: string; icon: any }>> = {
      manufacturing: [
        { id: 'production', name: 'Production', icon: Factory },
        { id: 'inventory', name: 'Inventory', icon: ShoppingCart },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      'it-software': [
        { id: 'projects', name: 'Projects', icon: Code },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      services: [
        { id: 'services', name: 'Services', icon: Wrench },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      retail: [
        { id: 'retail', name: 'Retail', icon: ShoppingCart },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      healthcare: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      education: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      construction: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
      hospitality: [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'finance', name: 'Finance', icon: DollarSign },
      ],
    };
    return moduleMap[selectedIndustry] || [];
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'production':
        return <ProductionDashboard />;
      case 'inventory':
        return <InventoryDashboard />;
      case 'projects':
        return <ProjectsDashboard />;
      case 'services':
        return <ServicesDashboard />;
      case 'retail':
        return <RetailDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to BIDUA ERP</h2>
            <p className="text-gray-600">Select a module from the sidebar to get started</p>
          </div>
        );
    }
  };

  const modules = getModulesByIndustry();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-40 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">BIDUA ERP</h1>
          <p className="text-sm text-gray-600 mt-1 capitalize">{selectedIndustry.replace('-', ' & ')}</p>
        </div>
        <nav className="p-4 space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeModule === module.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span>{module.name}</span>
              </button>
            );
          })}
          <button
            onClick={() => setSelectedIndustry(null)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mt-4 border-t pt-4"
          >
            <LayoutDashboard size={20} />
            <span>Change Industry</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{renderModule()}</div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </div>
  );
}

export default AppNew;
