import React, { useState } from 'react';
import {
  Factory,
  Code,
  Wrench,
  ShoppingCart,
  Heart,
  GraduationCap,
  HardHat,
  UtensilsCrossed,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { IndustryType } from '../../types';

interface Industry {
  type: IndustryType;
  name: string;
  icon: typeof Factory;
  description: string;
  modules: string[];
  color: string;
}

const industries: Industry[] = [
  {
    type: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Production, inventory, quality control, and supply chain management',
    modules: ['Production Management', 'Inventory Control', 'Quality Management', 'BOM Management'],
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    type: 'it-software',
    name: 'IT & Software',
    icon: Code,
    description: 'Project management, development tracking, and client management',
    modules: ['Project Management', 'Sprint Planning', 'Bug Tracking', 'Resource Management'],
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    type: 'services',
    name: 'Services',
    icon: Wrench,
    description: 'Service catalog, booking, scheduling, and field service management',
    modules: ['Service Catalog', 'Booking Management', 'Technician Dispatch', 'SLA Tracking'],
    color: 'text-green-600 bg-green-50 border-green-200',
  },
  {
    type: 'retail',
    name: 'Retail & E-commerce',
    icon: ShoppingCart,
    description: 'POS, inventory, e-commerce, and multi-store management',
    modules: ['Point of Sale', 'Store Management', 'E-commerce Integration', 'Inventory Tracking'],
    color: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  {
    type: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    description: 'Patient management, appointments, and medical records',
    modules: ['Patient Management', 'Appointments', 'Medical Records', 'Billing'],
    color: 'text-red-600 bg-red-50 border-red-200',
  },
  {
    type: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Student management, courses, attendance, and fee management',
    modules: ['Student Management', 'Course Management', 'Attendance', 'Fee Management'],
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
  {
    type: 'construction',
    name: 'Construction',
    icon: HardHat,
    description: 'Project tracking, equipment, materials, and workforce management',
    modules: ['Project Tracking', 'Equipment Management', 'Materials Tracking', 'Workforce'],
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  },
  {
    type: 'hospitality',
    name: 'Hospitality',
    icon: UtensilsCrossed,
    description: 'Reservations, housekeeping, restaurant, and guest management',
    modules: ['Reservations', 'Housekeeping', 'Restaurant Management', 'Guest Services'],
    color: 'text-pink-600 bg-pink-50 border-pink-200',
  },
];

interface IndustrySelectionProps {
  onSelect: (industryType: IndustryType) => void;
  onSkip?: () => void;
}

export default function IndustrySelection({ onSelect, onSkip }: IndustrySelectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);

  const handleContinue = () => {
    if (selectedIndustry) {
      onSelect(selectedIndustry);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Industry</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your industry to customize BIDUA ERP with modules and features tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry === industry.type;
            return (
              <div
                key={industry.type}
                onClick={() => setSelectedIndustry(industry.type)}
                className={`relative bg-white rounded-xl shadow-md border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? `${industry.color} border-opacity-100` : 'border-gray-200'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="text-green-600" size={24} fill="currentColor" />
                  </div>
                )}
                <div className={`p-3 rounded-lg inline-block mb-4 ${industry.color}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{industry.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Key Modules:</p>
                  {industry.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4">
          {onSkip && (
            <button
              onClick={onSkip}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Skip for Now
            </button>
          )}
          <button
            onClick={handleContinue}
            disabled={!selectedIndustry}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span>Continue</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
