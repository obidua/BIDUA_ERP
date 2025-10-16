// Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee' | 'documentation';
  department: string;
  avatar?: string;
  isActive: boolean;
}

// CRM Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'hot' | 'warm' | 'cold';
  stage: 'lead' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  source: string;
  assignedTo: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  customerId: string;
  customerName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
  resolvedAt?: string;
  category: string;
}

// HRMS Types
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  manager?: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  address: string;
  emergencyContact: string;
  documents: string[];
  bankAccount?: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  personalDetails?: {
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    nationality: string;
    bloodGroup: string;
  };
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isWithinGeofence?: boolean;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'casual' | 'sick' | 'annual' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  progress: number;
  startDate: string;
  dueDate: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  project?: string;
  tags: string[];
  comments: TaskComment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  type: 'comment' | 'status-change' | 'progress-update' | 'work-report';
  metadata?: {
    oldValue?: string;
    newValue?: string;
    progressPercentage?: number;
    hoursWorked?: number;
    attachments?: string[];
  };
}

export interface Performance {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  overallRating: number;
  kpis: {
    name: string;
    target: number;
    achieved: number;
    rating: number;
  }[];
  managerFeedback: string;
  goals: string[];
  achievements: string[];
  areasOfImprovement: string[];
  reviewDate: string;
  reviewedBy: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  overtime: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  payDate?: string;
}

export interface SalarySlip {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    pf: number;
    esi: number;
    tax: number;
    other: number;
  };
  overtime: number;
  grossSalary: number;
  netSalary: number;
  generatedAt: string;
}

export interface Document {
  id: string;
  employeeId: string;
  type: 'offer-letter' | 'salary-slip' | 'experience-letter' | 'id-card' | 'policy' | 'other';
  title: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  size: number;
  isPublic: boolean;
}

export interface GeofenceLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  isActive: boolean;
}

// Company and Industry Types
export type IndustryType = 'manufacturing' | 'it-software' | 'services' | 'retail' | 'healthcare' | 'education' | 'construction' | 'hospitality';

export interface Company {
  id: string;
  name: string;
  industryType: IndustryType;
  logo?: string;
  activeModules: ModuleType[];
  subscriptionTier: 'basic' | 'professional' | 'enterprise';
  settings: {
    theme?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Manufacturing Types
export interface WorkOrder {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  unit: string;
  status: 'planned' | 'in-progress' | 'quality-check' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  assignedLine: string;
  bomId?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BOMItem {
  id: string;
  productName: string;
  componentName: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  leadTimeDays: number;
  level?: number;
  parentId?: string;
}

export interface InventoryItem {
  id: string;
  itemName: string;
  itemCode: string;
  category: 'raw-material' | 'work-in-progress' | 'finished-goods' | 'consumables';
  quantity: number;
  unit: string;
  reorderLevel: number;
  location: string;
  supplier: string;
  costPerUnit: number;
  lastRestockDate: string;
  batchNumber?: string;
  expiryDate?: string;
}

export interface QualityInspection {
  id: string;
  workOrderId: string;
  inspectorName: string;
  inspectionDate: string;
  status: 'pass' | 'fail' | 'pending';
  defectsFound: number;
  notes?: string;
  parameters: {
    name: string;
    expected: string;
    actual: string;
    result: 'pass' | 'fail';
  }[];
}

// IT/Software Types
export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  projectManager: string;
  teamMembers: string[];
  description: string;
  milestones: ProjectMilestone[];
}

export interface ProjectMilestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'active' | 'completed';
  goals: string[];
  velocity: number;
}

export interface Bug {
  id: string;
  projectId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  reportedBy: string;
  createdAt: string;
  resolvedAt?: string;
}

// Service Business Types
export interface ServiceCatalog {
  id: string;
  serviceName: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  isActive: boolean;
}

export interface ServiceBooking {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  technicianId?: string;
  technicianName?: string;
  location: string;
  notes?: string;
}

// Retail Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  reorderLevel: number;
  barcode: string;
  image?: string;
  isActive: boolean;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  shippingAddress: string;
}

// Financial Types
export interface Account {
  id: string;
  accountCode: string;
  accountName: string;
  accountType: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parentAccountId?: string;
  balance: number;
  isActive: boolean;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  entryDate: string;
  description: string;
  status: 'draft' | 'posted';
  lines: {
    accountId: string;
    accountName: string;
    debit: number;
    credit: number;
    description: string;
  }[];
  createdBy: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  invoiceDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue';
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balance: number;
}

// Asset Management Types
export interface Asset {
  id: string;
  assetName: string;
  assetTag: string;
  category: 'hardware' | 'software' | 'furniture' | 'vehicle' | 'other';
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  location: string;
  assignedTo?: string;
  status: 'active' | 'maintenance' | 'retired' | 'disposed';
  warrantyExpiry?: string;
  maintenanceSchedule?: string;
}

export type ModuleType = 'dashboard' | 'crm' | 'hrms' | 'manufacturing' | 'projects' | 'services' | 'retail' | 'finance' | 'assets' | 'documents' | 'reports' | 'settings';
export type CRMView = 'leads' | 'pipeline' | 'support' | 'analytics';
export type HRMSView = 'employees' | 'attendance' | 'leaves' | 'tasks' | 'performance' | 'payroll' | 'recruitment';
export type EmployeePortalView = 'dashboard' | 'tasks' | 'attendance' | 'leaves' | 'salary' | 'documents' | 'profile';
export type ManufacturingView = 'production' | 'inventory' | 'quality' | 'bom' | 'supply-chain';
export type ProjectView = 'overview' | 'sprints' | 'kanban' | 'gantt' | 'bugs' | 'resources';
export type FinanceView = 'accounts' | 'journal' | 'invoices' | 'payables' | 'receivables' | 'reports';

// Notification Types
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  userId?: string;
  read: boolean;
}