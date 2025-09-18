import React, { useState, useEffect } from 'react';
import { User, Employee, Attendance } from '../../types';
import {
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Timer,
  Play,
  Square,
} from 'lucide-react';

interface EmployeeAttendanceProps {
  user: User;
  employee: Employee;
  attendanceData: Attendance[];
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

// Mock geofence locations
const geofenceLocations = [
  { id: '1', name: 'Mumbai Office', latitude: 19.0760, longitude: 72.8777, radius: 100 },
  { id: '2', name: 'Pune Office', latitude: 18.5204, longitude: 73.8567, radius: 100 },
  { id: '3', name: 'Bangalore Office', latitude: 12.9716, longitude: 77.5946, radius: 100 },
];

const EmployeeAttendance: React.FC<EmployeeAttendanceProps> = ({
  user,
  employee,
  attendanceData,
  addAttendance,
  addNotification,
}) => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [nearestOffice, setNearestOffice] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);

  const myAttendance = attendanceData.filter(a => a.employeeId === employee.employeeId);
  const todayAttendance = myAttendance.find(a => a.date === new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (todayAttendance && todayAttendance.clockIn && !todayAttendance.clockOut) {
      setIsClockedIn(true);
    }
  }, [todayAttendance]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          checkGeofence(latitude, longitude);
        },
        (error) => {
          setLocationError('Unable to get your location. Please enable location services.');
          addNotification?.('Location access denied. You can still mark attendance manually.', 'warning');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
      addNotification?.('Geolocation not supported. Manual attendance marking available.', 'info');
    }
  };

  const checkGeofence = (lat: number, lng: number) => {
    let withinFence = false;
    let closestOffice = '';
    let minDistance = Infinity;

    geofenceLocations.forEach(location => {
      const distance = calculateDistance(lat, lng, location.latitude, location.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closestOffice = location.name;
      }
      if (distance <= location.radius) {
        withinFence = true;
      }
    });

    setIsWithinGeofence(withinFence);
    setNearestOffice(closestOffice);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const handleClockIn = () => {
    if (!currentLocation && !locationError) {
      addNotification?.('Getting your location...', 'info');
      return;
    }

    const attendanceData: Omit<Attendance, 'id'> = {
      employeeId: employee.employeeId,
      employeeName: employee.name,
      date: new Date().toISOString().split('T')[0],
      clockIn: currentTime.toTimeString().slice(0, 5),
      totalHours: 0,
      status: 'present',
      location: isWithinGeofence ? nearestOffice : 'Remote/Outside Office',
      coordinates: currentLocation || undefined,
      isWithinGeofence,
    };

    addAttendance(attendanceData);
    setIsClockedIn(true);
    addNotification?.(`Clocked in successfully at ${nearestOffice}`, 'success');
  };

  const handleClockOut = () => {
    if (todayAttendance) {
      const clockInTime = new Date(`${todayAttendance.date}T${todayAttendance.clockIn}`);
      const clockOutTime = new Date();
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

      // In a real app, you would update the existing attendance record
      // For now, we'll just show a notification
      setIsClockedIn(false);
      addNotification?.(`Clocked out successfully. Total hours: ${totalHours.toFixed(2)}`, 'success');
    }
  };

  const getAttendanceStats = () => {
    const thisMonth = myAttendance.filter(a => {
      const attendanceDate = new Date(a.date);
      const currentDate = new Date();
      return attendanceDate.getMonth() === currentDate.getMonth() && 
             attendanceDate.getFullYear() === currentDate.getFullYear();
    });

    return {
      present: thisMonth.filter(a => a.status === 'present').length,
      late: thisMonth.filter(a => a.status === 'late').length,
      totalHours: thisMonth.reduce((sum, a) => sum + a.totalHours, 0),
      avgHours: thisMonth.length > 0 ? thisMonth.reduce((sum, a) => sum + a.totalHours, 0) / thisMonth.length : 0,
    };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Attendance Management</h2>
          <p className="text-slate-600">Track your working hours with geofencing</p>
        </div>
      </div>

      {/* Current Time & Location */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Status</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5" />
                <span className="text-xl font-mono">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
            </div>
            {currentLocation && (
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {isWithinGeofence ? `At ${nearestOffice}` : `Near ${nearestOffice}`}
                </span>
                {isWithinGeofence && <CheckCircle className="w-4 h-4 text-green-300" />}
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            {!isClockedIn ? (
              <button
                onClick={handleClockIn}
                disabled={!currentLocation && !locationError}
                className="flex items-center space-x-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors disabled:opacity-50"
              >
                <Play className="w-5 h-5" />
                <span>Clock In</span>
              </button>
            ) : (
              <button
                onClick={handleClockOut}
                className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium border border-white hover:bg-teal-700 transition-colors"
              >
                <Square className="w-5 h-5" />
                <span>Clock Out</span>
              </button>
            )}
            <button
              onClick={getCurrentLocation}
              className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-3 rounded-lg font-medium border border-white hover:bg-teal-700 transition-colors"
            >
              <Navigation className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Location Status */}
      {locationError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800">{locationError}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Days Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Late Arrivals</p>
              <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Hours</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalHours.toFixed(1)}h</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Hours/Day</p>
              <p className="text-2xl font-bold text-purple-600">{stats.avgHours.toFixed(1)}h</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Timer className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Attendance */}
      {todayAttendance && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Attendance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clock In</p>
                <p className="font-semibold text-slate-900">{todayAttendance.clockIn}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-red-50 p-2 rounded-lg">
                <Square className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Clock Out</p>
                <p className="font-semibold text-slate-900">
                  {todayAttendance.clockOut || 'Not clocked out'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="font-semibold text-slate-900">{todayAttendance.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Attendance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Clock In</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Clock Out</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Hours</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-slate-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {myAttendance.slice(0, 10).map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">{record.clockIn}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {record.clockOut || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {record.totalHours.toFixed(2)}h
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">{record.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'late' ? 'bg-orange-100 text-orange-800' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;