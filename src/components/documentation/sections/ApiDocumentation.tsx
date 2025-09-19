import React from 'react';
import { Server, Shield, Users, UserCheck, Database, Globe } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete REST API documentation for all endpoints with request/response examples and authentication details.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">API Base Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Base URL</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">http://localhost:8000/api</code>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">Bearer JWT Token</code>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Content Type</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">application/json</code>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Interactive Docs</h4>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">http://localhost:8000/docs</code>
          </div>
        </div>
      </div>

      {/* Authentication Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-6 h-6 text-blue-600 mr-3" />
          Authentication Endpoints
        </h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">POST</span>
              <code className="text-lg font-mono">/auth/login</code>
            </div>
            <p className="text-gray-600 mb-4">Authenticate user and return JWT token</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "username": "admin",
  "password": "bidua123"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "uuid-here",
    "username": "admin",
    "email": "admin@bidua.com",
    "role": "admin",
    "department": "IT"
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-medium">GET</span>
              <code className="text-lg font-mono">/auth/me</code>
            </div>
            <p className="text-gray-600 mb-4">Get current authenticated user information</p>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Headers Required</h4>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`Authorization: Bearer <jwt_token>`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium">POST</span>
              <code className="text-lg font-mono">/auth/logout</code>
            </div>
            <p className="text-gray-600 mb-4">Invalidate current session and logout user</p>
          </div>
        </div>
      </div>

      {/* CRM Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-6 h-6 text-green-600 mr-3" />
          CRM Endpoints
        </h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Leads Management</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/leads</code>
                <span className="text-sm text-gray-600">- List all leads with filtering</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/leads/{lead_id}</code>
                <span className="text-sm text-gray-600">- Get specific lead details</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/leads</code>
                <span className="text-sm text-gray-600">- Create new lead</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                <code>/leads/{lead_id}</code>
                <span className="text-sm text-gray-600">- Update lead information</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">DELETE</span>
                <code>/leads/{lead_id}</code>
                <span className="text-sm text-gray-600">- Delete lead record</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Support Tickets</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/support-tickets</code>
                <span className="text-sm text-gray-600">- List all support tickets</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/support-tickets</code>
                <span className="text-sm text-gray-600">- Create new ticket</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                <code>/support-tickets/{ticket_id}</code>
                <span className="text-sm text-gray-600">- Update ticket status</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HRMS Endpoints */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <UserCheck className="w-6 h-6 text-purple-600 mr-3" />
          HRMS Endpoints
        </h3>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Employee Management</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/employees</code>
                <span className="text-sm text-gray-600">- List all employees</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/employees</code>
                <span className="text-sm text-gray-600">- Create new employee</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                <code>/employees/{employee_id}</code>
                <span className="text-sm text-gray-600">- Update employee details</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Attendance Management</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/attendance</code>
                <span className="text-sm text-gray-600">- Get attendance records</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/attendance</code>
                <span className="text-sm text-gray-600">- Mark attendance (clock in/out)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                <code>/attendance/{record_id}</code>
                <span className="text-sm text-gray-600">- Update attendance record</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Leave Management</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/leave-requests</code>
                <span className="text-sm text-gray-600">- List leave requests</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/leave-requests</code>
                <span className="text-sm text-gray-600">- Submit leave request</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                <code>/leave-requests/{request_id}</code>
                <span className="text-sm text-gray-600">- Approve/reject leave</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Task Management</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/tasks</code>
                <span className="text-sm text-gray-600">- List tasks with filters</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/tasks</code>
                <span className="text-sm text-gray-600">- Create new task</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PUT</span>
                <code>/tasks/{task_id}</code>
                <span className="text-sm text-gray-600">- Update task progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">GET</span>
                <code>/tasks/{task_id}/comments</code>
                <span className="text-sm text-gray-600">- Get task comments</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">POST</span>
                <code>/tasks/{task_id}/comments</code>
                <span className="text-sm text-gray-600">- Add task comment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request/Response Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Request/Response Examples</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Create Lead Example</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/leads
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "email": "rajesh@techcorp.com",
  "phone": "+91 98765 43210",
  "company": "TechCorp Solutions",
  "status": "warm",
  "stage": "lead",
  "value": 500000,
  "source": "Website",
  "assigned_to": "employee-uuid",
  "notes": "Interested in enterprise package"
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "lead-uuid-here",
  "name": "Rajesh Kumar",
  "email": "rajesh@techcorp.com",
  "phone": "+91 98765 43210",
  "company": "TechCorp Solutions",
  "status": "warm",
  "stage": "lead",
  "value": 500000,
  "source": "Website",
  "assigned_to": "employee-uuid",
  "notes": "Interested in enterprise package",
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Mark Attendance Example</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`POST /api/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "employee_id": "employee-uuid",
  "date": "2025-01-15",
  "clock_in": "09:00:00",
  "clock_out": "18:00:00",
  "status": "present",
  "location": "Mumbai Office",
  "coordinates": {
    "latitude": 19.0760,
    "longitude": 72.8777
  }
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "id": "attendance-uuid",
  "employee_id": "employee-uuid",
  "date": "2025-01-15",
  "clock_in": "09:00:00",
  "clock_out": "18:00:00",
  "total_hours": 9.0,
  "status": "present",
  "location": "Mumbai Office",
  "is_within_geofence": true,
  "created_at": "2025-01-15T09:00:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Handling</h3>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Standard Error Response</h4>
            <pre className="bg-gray-900 text-red-400 p-3 rounded text-sm overflow-x-auto">
{`{
  "detail": "Error message",
  "error_code": "VALIDATION_ERROR",
  "timestamp": "2025-01-15T10:30:00Z"
}`}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">HTTP Status Codes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>200 OK</span>
                  <span className="text-green-600">Success</span>
                </div>
                <div className="flex justify-between">
                  <span>201 Created</span>
                  <span className="text-green-600">Resource created</span>
                </div>
                <div className="flex justify-between">
                  <span>400 Bad Request</span>
                  <span className="text-red-600">Validation error</span>
                </div>
                <div className="flex justify-between">
                  <span>401 Unauthorized</span>
                  <span className="text-red-600">Authentication required</span>
                </div>
                <div className="flex justify-between">
                  <span>403 Forbidden</span>
                  <span className="text-red-600">Insufficient permissions</span>
                </div>
                <div className="flex justify-between">
                  <span>404 Not Found</span>
                  <span className="text-red-600">Resource not found</span>
                </div>
                <div className="flex justify-between">
                  <span>500 Internal Error</span>
                  <span className="text-red-600">Server error</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Authentication Headers</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <code>Authorization: Bearer &lt;jwt_token&gt;</code>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code>Content-Type: application/json</code>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code>Accept: application/json</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limiting & Pagination */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limiting & Pagination</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Pagination Parameters</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <code>?page=1&size=25</code>
                <p className="text-gray-600 mt-1">Default pagination (25 items per page)</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <code>?page=2&size=50</code>
                <p className="text-gray-600 mt-1">Custom page size (max 100)</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Rate Limiting</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <strong>General endpoints:</strong> 100 requests/minute
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Authentication:</strong> 10 requests/minute
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>File uploads:</strong> 5 requests/minute
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;