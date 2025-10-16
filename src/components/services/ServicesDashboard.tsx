import React, { useState } from 'react';
import { Wrench, Calendar, Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { ServiceCatalog, ServiceBooking } from '../../types';
import { mockServiceCatalog, mockServiceBookings } from '../../data/industryMockData';

export default function ServicesDashboard() {
  const [services] = useState<ServiceCatalog[]>(mockServiceCatalog);
  const [bookings] = useState<ServiceBooking[]>(mockServiceBookings);

  const todayBookings = bookings.filter(b => b.appointmentDate === new Date().toISOString().split('T')[0]).length;
  const completedToday = bookings.filter(b => b.status === 'completed').length;
  const inProgress = bookings.filter(b => b.status === 'in-progress').length;

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-800' },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      completed: { bg: 'bg-green-100', text: 'text-green-800' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
    };
    const badge = badges[status] || badges.scheduled;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>{status}</span>;
  };

  const bookingColumns = [
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'serviceName', label: 'Service', sortable: true },
    { key: 'appointmentDate', label: 'Date', sortable: true },
    { key: 'appointmentTime', label: 'Time', sortable: true },
    { key: 'technicianName', label: 'Technician', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (v: string) => getStatusBadge(v) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage bookings and service catalog</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Calendar size={20} />
          <span>New Booking</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Bookings" value={todayBookings} icon={Calendar} color="blue" />
        <StatCard title="In Progress" value={inProgress} icon={Clock} color="yellow" />
        <StatCard title="Completed Today" value={completedToday} icon={CheckCircle} color="green" />
        <StatCard title="Active Services" value={services.filter(s => s.isActive).length} icon={Wrench} color="purple" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Catalog</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map(service => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">{service.serviceName}</h4>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-blue-600">₹{service.price}</span>
                <span className="text-sm text-gray-500">{service.duration} mins</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Bookings</h3>
        <DataTable columns={bookingColumns} data={bookings} searchable exportable filterable />
      </div>
    </div>
  );
}
