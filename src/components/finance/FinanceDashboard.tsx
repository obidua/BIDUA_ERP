import React, { useState } from 'react';
import { DollarSign, TrendingUp, FileText, CreditCard, Wallet, Receipt } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { Account, Invoice, JournalEntry } from '../../types';
import { mockAccounts, mockInvoices, mockJournalEntries } from '../../data/industryMockData';

export default function FinanceDashboard() {
  const [accounts] = useState<Account[]>(mockAccounts);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [journalEntries] = useState<JournalEntry[]>(mockJournalEntries);

  const totalAssets = accounts.filter(a => a.accountType === 'asset').reduce((sum, a) => sum + a.balance, 0);
  const totalRevenue = accounts.filter(a => a.accountType === 'revenue').reduce((sum, a) => sum + a.balance, 0);
  const totalExpenses = accounts.filter(a => a.accountType === 'expense').reduce((sum, a) => sum + a.balance, 0);
  const pendingInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').length;

  const getAccountTypeBadge = (type: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      asset: { bg: 'bg-green-100', text: 'text-green-800' },
      liability: { bg: 'bg-red-100', text: 'text-red-800' },
      equity: { bg: 'bg-purple-100', text: 'text-purple-800' },
      revenue: { bg: 'bg-blue-100', text: 'text-blue-800' },
      expense: { bg: 'bg-orange-100', text: 'text-orange-800' },
    };
    const badge = badges[type] || badges.asset;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>{type}</span>;
  };

  const accountColumns = [
    { key: 'accountCode', label: 'Code', sortable: true },
    { key: 'accountName', label: 'Account Name', sortable: true },
    { key: 'accountType', label: 'Type', sortable: true, render: (v: string) => getAccountTypeBadge(v) },
    { key: 'balance', label: 'Balance', sortable: true, render: (v: number) => `₹${v.toLocaleString()}` },
    {
      key: 'status',
      label: 'Status',
      render: (_: any, row: Account) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const invoiceColumns = [
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'invoiceDate', label: 'Date', sortable: true },
    { key: 'total', label: 'Amount', sortable: true, render: (v: number) => `₹${v.toLocaleString()}` },
    { key: 'balance', label: 'Balance', sortable: true, render: (v: number) => `₹${v.toLocaleString()}` },
    {
      key: 'status',
      label: 'Status',
      render: (v: string) => {
        const colors: Record<string, string> = {
          draft: 'bg-gray-100 text-gray-800',
          sent: 'bg-blue-100 text-blue-800',
          partial: 'bg-yellow-100 text-yellow-800',
          paid: 'bg-green-100 text-green-800',
          overdue: 'bg-red-100 text-red-800',
        };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[v]}`}>{v}</span>;
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-600 mt-1">Accounting and financial management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FileText size={20} />
            <span>New Entry</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Receipt size={20} />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Assets" value={`₹${(totalAssets / 100000).toFixed(1)}L`} icon={Wallet} color="green" change={8} changeLabel="vs last month" />
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={TrendingUp} color="blue" change={15} changeLabel="vs last month" />
        <StatCard title="Total Expenses" value={`₹${(totalExpenses / 100000).toFixed(1)}L`} icon={CreditCard} color="red" />
        <StatCard title="Pending Invoices" value={pendingInvoices} icon={FileText} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Total Revenue</span>
              <span className="text-lg font-bold text-green-600">₹{(totalRevenue / 100000).toFixed(2)}L</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700">Total Expenses</span>
              <span className="text-lg font-bold text-red-600">₹{(totalExpenses / 100000).toFixed(2)}L</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
              <span className="text-gray-700 font-semibold">Net Profit</span>
              <span className="text-xl font-bold text-blue-600">₹{((totalRevenue - totalExpenses) / 100000).toFixed(2)}L</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Types Breakdown</h3>
          <div className="space-y-3">
            {['asset', 'liability', 'revenue', 'expense', 'equity'].map(type => {
              const count = accounts.filter(a => a.accountType === type).length;
              const total = accounts.filter(a => a.accountType === type).reduce((sum, a) => sum + a.balance, 0);
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getAccountTypeBadge(type)}
                    <span className="text-sm text-gray-600">{count} accounts</span>
                  </div>
                  <span className="font-medium">₹{(total / 1000).toFixed(0)}K</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart of Accounts</h3>
        <DataTable columns={accountColumns} data={accounts} searchable exportable />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
        <DataTable columns={invoiceColumns} data={invoices} searchable exportable filterable />
      </div>
    </div>
  );
}
