export interface NavigationItem {
  id: string;
  title: string;
  icon?: any;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'project-structure',
    title: 'Project Structure',
    children: [
      { id: 'project-overview', title: 'Project Overview' },
      { id: 'architecture', title: 'System Architecture' },
      { id: 'tech-stack', title: 'Technology Stack' },
      { id: 'folder-structure', title: 'Folder Structure' }
    ]
  },
  {
    id: 'development-guide',
    title: 'Development Guide',
    children: [
      { id: 'setup-environment', title: 'Environment Setup' },
      { id: 'frontend-setup', title: 'Frontend Setup (React)' },
      { id: 'backend-setup', title: 'Backend Setup (FastAPI)' },
      { id: 'database-setup', title: 'Database Setup (PostgreSQL)' },
      { id: 'deployment', title: 'Deployment Guide' }
    ]
  },
  {
    id: 'database-schema',
    title: 'Database Schema',
    children: [
      { id: 'schema-overview', title: 'Schema Overview' },
      { id: 'user-auth-schema', title: 'User & Authentication' },
      { id: 'crm-schema', title: 'CRM Schema' },
      { id: 'hrms-employee-schema', title: 'HRMS Employee Schema' },
      { id: 'hrms-attendance-schema', title: 'HRMS Attendance Schema' },
      { id: 'hrms-leave-schema', title: 'HRMS Leave Schema' },
      { id: 'hrms-task-schema', title: 'HRMS Task Schema' },
      { id: 'hrms-performance-schema', title: 'HRMS Performance Schema' },
      { id: 'hrms-payroll-schema', title: 'HRMS Payroll Schema' },
      { id: 'hrms-document-geofence-schema', title: 'HRMS Document & Geofence Schema' },
      { id: 'relationships', title: 'Table Relationships' }
    ]
  },
  {
    id: 'api-documentation',
    title: 'API Documentation',
    children: [
      { id: 'api-overview', title: 'API Overview' },
      { id: 'auth-endpoints', title: 'Authentication Endpoints' },
      { id: 'user-endpoints', title: 'User Management Endpoints' },
      { id: 'crm-endpoints', title: 'CRM Endpoints' },
      { id: 'hrms-endpoints', title: 'HRMS Endpoints' },
      { id: 'file-endpoints', title: 'File Management Endpoints' }
    ]
  },
  {
    id: 'portal-communication',
    title: 'Portal Communication',
    children: [
      { id: 'communication-overview', title: 'Communication Overview' },
      { id: 'admin-portal', title: 'Admin Portal Flow' },
      { id: 'manager-portal', title: 'Manager Portal Flow' },
      { id: 'employee-portal', title: 'Employee Portal Flow' },
      { id: 'data-flow', title: 'Data Flow Diagrams' }
    ]
  },
  {
    id: 'features',
    title: 'Feature Documentation',
    children: [
      { id: 'crm-features', title: 'CRM Features' },
      { id: 'hrms-features', title: 'HRMS Features' },
      { id: 'reporting-features', title: 'Reporting Features' },
      { id: 'security-features', title: 'Security Features' }
    ]
  }
];

export const getAllSectionIds = (): string[] => {
  const ids: string[] = [];
  
  const extractIds = (items: NavigationItem[]) => {
    items.forEach(item => {
      if (item.children) {
        extractIds(item.children);
      } else {
        ids.push(item.id);
      }
    });
  };
  
  extractIds(navigationItems);
  return ids;
};

export const getNextSection = (currentSectionId: string): string | null => {
  const allIds = getAllSectionIds();
  const currentIndex = allIds.indexOf(currentSectionId);
  
  if (currentIndex === -1 || currentIndex === allIds.length - 1) {
    return null;
  }
  
  return allIds[currentIndex + 1];
};

export const getPreviousSection = (currentSectionId: string): string | null => {
  const allIds = getAllSectionIds();
  const currentIndex = allIds.indexOf(currentSectionId);
  
  if (currentIndex <= 0) {
    return null;
  }
  
  return allIds[currentIndex - 1];
};

export const getSectionTitle = (sectionId: string): string => {
  const findTitle = (items: NavigationItem[]): string | null => {
    for (const item of items) {
      if (item.id === sectionId) {
        return item.title;
      }
      if (item.children) {
        const childTitle = findTitle(item.children);
        if (childTitle) return childTitle;
      }
    }
    return null;
  };
  
  return findTitle(navigationItems) || 'Unknown Section';
};

export const getParentSection = (sectionId: string): string | null => {
  const findParent = (items: NavigationItem[]): string | null => {
    for (const item of items) {
      if (item.children) {
        const hasChild = item.children.some(child => child.id === sectionId);
        if (hasChild) return item.title;
      }
    }
    return null;
  };
  
  return findParent(navigationItems);
};