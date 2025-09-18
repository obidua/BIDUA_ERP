import React, { useState } from 'react';
import { User, Employee, SalarySlip } from '../../types';
import {
  DollarSign,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  PieChart,
  FileText,
  CreditCard,
} from 'lucide-react';

interface EmployeeSalaryProps {
  user: User;
  employee: Employee;
  salarySlips: SalarySlip[];
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}


const EmployeeSalary: React.FC<EmployeeSalaryProps> = ({
  user,
  employee,
  salarySlips,
  addNotification,
}) => {
  const [selectedSlip, setSelectedSlip] = useState<SalarySlip | null>(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  const mySalarySlips = salarySlips;
  const latestSlip = mySalarySlips[0];

  const handleDownloadSlip = (slip: SalarySlip) => {
    // In a real app, this would generate and download a PDF
    addNotification?.(`Salary slip for ${slip.month} ${slip.year} downloaded successfully`, 'success');
  };

  const handleViewSlip = (slip: SalarySlip) => {
    setSelectedSlip(slip);
    setShowSlipModal(true);
  };

  const calculateYearlyStats = () => {
    const currentYear = new Date().getFullYear();
    const yearlySlips = mySalarySlips.filter(slip => slip.year === currentYear);
    
    return {
      totalEarnings: yearlySlips.reduce((sum, slip) => sum + slip.grossSalary, 0),
      totalDeductions: yearlySlips.reduce((sum, slip) => sum + Object.values(slip.deductions).reduce((a, b) => a + b, 0), 0),
      totalNetPay: yearlySlips.reduce((sum, slip) => sum + slip.netSalary, 0),
      avgMonthlyPay: yearlySlips.length > 0 ? yearlySlips.reduce((sum, slip) => sum + slip.netSalary, 0) / yearlySlips.length : 0,
    };
  };

  const yearlyStats = calculateYearlyStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Salary & Payroll</h2>
          <p className="text-slate-600">View salary details and download pay slips</p>
        </div>
      </div>

      {/* Current Salary Overview */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Current Salary Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">₹{employee.salary.toLocaleString()}</p>
            <p className="text-emerald-100 text-sm">Monthly CTC</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">₹{latestSlip?.basicSalary.toLocaleString() || '0'}</p>
            <p className="text-emerald-100 text-sm">Basic Salary</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">₹{latestSlip ? Object.values(latestSlip.allowances).reduce((a, b) => a + b, 0).toLocaleString() : '0'}</p>
            <p className="text-emerald-100 text-sm">Allowances</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">₹{latestSlip?.netSalary.toLocaleString() || '0'}</p>
            <p className="text-emerald-100 text-sm">Net Pay</p>
          </div>
        </div>
      </div>

      {/* Yearly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">YTD Earnings</p>
              <p className="text-2xl font-bold text-green-600">₹{yearlyStats.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">YTD Deductions</p>
              <p className="text-2xl font-bold text-red-600">₹{yearlyStats.totalDeductions.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 p-2 rounded-lg">
              <PieChart className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">YTD Net Pay</p>
              <p className="text-2xl font-bold text-blue-600">₹{yearlyStats.totalNetPay.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Monthly</p>
              <p className="text-2xl font-bold text-purple-600">₹{yearlyStats.avgMonthlyPay.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      {employee.bankAccount && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Bank Account Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Account Holder</p>
              <p className="font-medium text-slate-900">{employee.bankAccount.accountHolderName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Bank Name</p>
              <p className="font-medium text-slate-900">{employee.bankAccount.bankName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Account Number</p>
              <p className="font-medium text-slate-900">****{employee.bankAccount.accountNumber.slice(-4)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">IFSC Code</p>
              <p className="font-medium text-slate-900">{employee.bankAccount.ifscCode}</p>
            </div>
          </div>
        </div>
      )}

      {/* Salary Slips */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Salary Slips</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Period</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Basic Salary</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Allowances</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Deductions</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Net Pay</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mySalarySlips.map((slip) => (
                <tr key={slip.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900">{slip.month} {slip.year}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-900">₹{slip.basicSalary.toLocaleString()}</td>
                  <td className="py-4 px-4 text-green-600">+₹{Object.values(slip.allowances).reduce((a, b) => a + b, 0).toLocaleString()}</td>
                  <td className="py-4 px-4 text-red-600">-₹{Object.values(slip.deductions).reduce((a, b) => a + b, 0).toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold text-slate-900">₹{slip.netSalary.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewSlip(slip)}
                        className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                        title="View Slip"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadSlip(slip)}
                        className="p-1 text-slate-400 hover:text-green-600 transition-colors"
                        title="Download Slip"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Slip Modal */}
      {showSlipModal && selectedSlip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                Salary Slip - {selectedSlip.month} {selectedSlip.year}
              </h3>
              <button
                onClick={() => setShowSlipModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              {/* Company Header */}
              <div className="text-center mb-6 pb-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">BIDUA Industries Pvt. Ltd.</h2>
                <p className="text-slate-600">Salary Slip</p>
              </div>

              {/* Employee Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600">Employee Name</p>
                  <p className="font-medium text-slate-900">{selectedSlip.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Employee ID</p>
                  <p className="font-medium text-slate-900">{selectedSlip.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Department</p>
                  <p className="font-medium text-slate-900">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Designation</p>
                  <p className="font-medium text-slate-900">{employee.designation}</p>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div className="grid grid-cols-2 gap-6">
                {/* Earnings */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Earnings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Basic Salary</span>
                      <span className="font-medium">₹{selectedSlip.basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">HRA</span>
                      <span className="font-medium">₹{selectedSlip.allowances.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Transport</span>
                      <span className="font-medium">₹{selectedSlip.allowances.transport.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Medical</span>
                      <span className="font-medium">₹{selectedSlip.allowances.medical.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Overtime</span>
                      <span className="font-medium">₹{selectedSlip.overtime.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Gross Salary</span>
                      <span>₹{selectedSlip.grossSalary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Deductions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">PF</span>
                      <span className="font-medium">₹{selectedSlip.deductions.pf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ESI</span>
                      <span className="font-medium">₹{selectedSlip.deductions.esi.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tax</span>
                      <span className="font-medium">₹{selectedSlip.deductions.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total Deductions</span>
                      <span>₹{Object.values(selectedSlip.deductions).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Pay */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                  <span className="text-lg font-semibold text-slate-900">Net Pay</span>
                  <span className="text-2xl font-bold text-green-600">₹{selectedSlip.netSalary.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => handleDownloadSlip(selectedSlip)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalary;