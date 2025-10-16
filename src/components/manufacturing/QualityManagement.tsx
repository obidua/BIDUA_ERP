import React, { useState, useEffect } from 'react';
import { Plus, Search, CheckCircle, XCircle, AlertCircle, ClipboardCheck } from 'lucide-react';
import { manufacturingAPI } from '../../services/api';

interface QualityManagementProps {
  currentUser: any;
}

const QualityManagement: React.FC<QualityManagementProps> = ({ currentUser }) => {
  const [inspections, setInspections] = useState<any[]>([]);
  const [defects, setDefects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('inspections');

  useEffect(() => {
    loadData();
  }, [currentUser.company_id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [inspectionsData, defectsData] = await Promise.all([
        manufacturingAPI.getQualityInspections(currentUser.company_id),
        manufacturingAPI.getQualityDefects(currentUser.company_id),
      ]);
      setInspections(inspectionsData || []);
      setDefects(defectsData || []);
    } catch (error) {
      console.error('Error loading quality data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInspectionBadge = (result: string) => {
    const config: any = {
      passed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Passed', icon: CheckCircle },
      failed: { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed', icon: XCircle },
      conditional_pass: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Conditional', icon: AlertCircle },
      pending: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Pending', icon: ClipboardCheck },
    };
    const item = config[result] || config.pending;
    const Icon = item.icon;
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${item.bg} ${item.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {item.label}
      </span>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const config: any = {
      critical: { bg: 'bg-red-100', text: 'text-red-800' },
      major: { bg: 'bg-orange-100', text: 'text-orange-800' },
      minor: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    };
    const item = config[severity] || config.minor;
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${item.bg} ${item.text} capitalize`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Quality Management</h3>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          New Inspection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {inspections.length > 0
                  ? Math.round((inspections.filter(i => i.inspection_result === 'passed').length / inspections.length) * 100)
                  : 0}%
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Defects</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {defects.filter(d => d.defect_status !== 'closed' && d.defect_status !== 'verified').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Defects</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {defects.filter(d => d.severity === 'critical' && d.defect_status !== 'closed').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('inspections')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'inspections'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Quality Inspections ({inspections.length})
            </button>
            <button
              onClick={() => setActiveTab('defects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'defects'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Defects / NCR ({defects.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'inspections' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Inspection #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Inspected
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Accepted
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Rejected
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Result
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inspections.map((inspection) => (
                    <tr key={inspection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inspection.inspection_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                        {inspection.inspection_type?.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {inspection.product_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {inspection.quantity_inspected}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-medium">
                        {inspection.quantity_accepted || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-right font-medium">
                        {inspection.quantity_rejected || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getInspectionBadge(inspection.inspection_result)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(inspection.inspection_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Defect #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Responsible
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {defects.map((defect) => (
                    <tr key={defect.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {defect.defect_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                        {defect.defect_type?.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {defect.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSeverityBadge(defect.severity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">
                          {defect.defect_status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {defect.responsible_person_name || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(defect.defect_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualityManagement;
