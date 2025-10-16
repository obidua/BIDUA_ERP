import React, { useState, useEffect } from 'react';
import { Users, Clock, Calendar, DollarSign, BarChart3, CheckSquare } from 'lucide-react';
import EmployeeManagement from './EmployeeManagement';
import AttendanceManagement from './AttendanceManagement';
import LeaveManagement from './LeaveManagement';
import PayrollManagement from './PayrollManagement';
import PerformanceManagement from './PerformanceManagement';
import TaskManagement from './TaskManagement';
import { userAPI, hrmsAttendanceAPI, hrmsLeaveAPI, hrmsPayrollAPI, pmTaskAPI } from '../../services/api';

interface HRMSModuleProps {
  currentUser: any;
}

const HRMSModule: React.FC<HRMSModuleProps> = ({ currentUser }) => {
  const [activeView, setActiveView] = useState('employees');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [currentUser.company_id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [employeesData, attendanceData, leavesData, payrollData, tasksData] = await Promise.all([
        userAPI.getAll(currentUser.company_id),
        hrmsAttendanceAPI.getAll(currentUser.company_id),
        hrmsLeaveAPI.getAll(currentUser.company_id),
        hrmsPayrollAPI.getAll(currentUser.company_id),
        pmTaskAPI.getAll(currentUser.company_id),
      ]);

      setEmployees(employeesData || []);
      setAttendance(attendanceData || []);
      setLeaves(leavesData || []);
      setPayroll(payrollData || []);
      setTasks(tasksData || []);
    } catch (error) {
      console.error('Error loading HRMS data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData: any) => {
    try {
      const newEmployee = await userAPI.create({
        ...employeeData,
        company_id: currentUser.company_id,
      });
      setEmployees([newEmployee, ...employees]);
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  };

  const handleUpdateEmployee = async (id: string, updates: any) => {
    try {
      const updated = await userAPI.update(id, updates);
      setEmployees(employees.map(e => e.id === id ? updated : e));
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };

  const handleAddAttendance = async (attendanceData: any) => {
    try {
      const newAttendance = await hrmsAttendanceAPI.create({
        ...attendanceData,
        company_id: currentUser.company_id,
      });
      setAttendance([newAttendance, ...attendance]);
    } catch (error) {
      console.error('Error adding attendance:', error);
      throw error;
    }
  };

  const handleUpdateAttendance = async (id: string, updates: any) => {
    try {
      const updated = await hrmsAttendanceAPI.update(id, updates);
      setAttendance(attendance.map(a => a.id === id ? updated : a));
    } catch (error) {
      console.error('Error updating attendance:', error);
      throw error;
    }
  };

  const handleClockIn = async () => {
    try {
      const newAttendance = await hrmsAttendanceAPI.clockIn(
        currentUser.id,
        currentUser.company_id
      );
      setAttendance([newAttendance, ...attendance]);
    } catch (error) {
      console.error('Error clocking in:', error);
      throw error;
    }
  };

  const handleClockOut = async (attendanceId: string) => {
    try {
      const updated = await hrmsAttendanceAPI.clockOut(attendanceId);
      setAttendance(attendance.map(a => a.id === attendanceId ? updated : a));
    } catch (error) {
      console.error('Error clocking out:', error);
      throw error;
    }
  };

  const handleAddLeave = async (leaveData: any) => {
    try {
      const newLeave = await hrmsLeaveAPI.create({
        ...leaveData,
        company_id: currentUser.company_id,
        applied_at: new Date().toISOString(),
      });
      setLeaves([newLeave, ...leaves]);
    } catch (error) {
      console.error('Error adding leave:', error);
      throw error;
    }
  };

  const handleUpdateLeave = async (id: string, updates: any) => {
    try {
      const updated = await hrmsLeaveAPI.update(id, updates);
      setLeaves(leaves.map(l => l.id === id ? updated : l));
    } catch (error) {
      console.error('Error updating leave:', error);
      throw error;
    }
  };

  const handleApproveLeave = async (leaveId: string) => {
    try {
      const updated = await hrmsLeaveAPI.approve(leaveId, currentUser.id);
      setLeaves(leaves.map(l => l.id === leaveId ? updated : l));
    } catch (error) {
      console.error('Error approving leave:', error);
      throw error;
    }
  };

  const handleRejectLeave = async (leaveId: string, reason: string) => {
    try {
      const updated = await hrmsLeaveAPI.reject(leaveId, currentUser.id, reason);
      setLeaves(leaves.map(l => l.id === leaveId ? updated : l));
    } catch (error) {
      console.error('Error rejecting leave:', error);
      throw error;
    }
  };

  const handleAddTask = async (taskData: any) => {
    try {
      const newTask = await pmTaskAPI.create({
        ...taskData,
        company_id: currentUser.company_id,
        reported_by: currentUser.id,
      });
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (id: string, updates: any) => {
    try {
      const updated = await pmTaskAPI.update(id, updates);
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const views = [
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'attendance', name: 'Attendance', icon: Clock },
    { id: 'leaves', name: 'Leaves', icon: Calendar },
    { id: 'payroll', name: 'Payroll', icon: DollarSign },
    { id: 'performance', name: 'Performance', icon: BarChart3 },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'employees':
        return (
          <EmployeeManagement
            currentUser={currentUser}
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
          />
        );
      case 'attendance':
        return (
          <AttendanceManagement
            currentUser={currentUser}
            attendance={attendance}
            employees={employees}
            onAddAttendance={handleAddAttendance}
            onUpdateAttendance={handleUpdateAttendance}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
          />
        );
      case 'leaves':
        return (
          <LeaveManagement
            currentUser={currentUser}
            leaves={leaves}
            employees={employees}
            onAddLeave={handleAddLeave}
            onUpdateLeave={handleUpdateLeave}
            onApproveLeave={handleApproveLeave}
            onRejectLeave={handleRejectLeave}
          />
        );
      case 'payroll':
        return (
          <PayrollManagement
            currentUser={currentUser}
            payroll={payroll}
            employees={employees}
          />
        );
      case 'performance':
        return (
          <PerformanceManagement
            currentUser={currentUser}
            employees={employees}
          />
        );
      case 'tasks':
        return (
          <TaskManagement
            currentUser={currentUser}
            tasks={tasks}
            employees={employees}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HRMS</h1>
          <p className="text-gray-600 mt-1">Manage employees, attendance, leaves, and payroll</p>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeView === view.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon size={18} />
            <span className="font-medium">{view.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">{renderActiveView()}</div>
    </div>
  );
};

export default HRMSModule;
