import React from 'react';
import { Database } from 'lucide-react';

const DatabaseSchema: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Database Schema</h1>
        <p className="text-lg text-gray-600 mb-6">
          Comprehensive PostgreSQL database schema for the BIDUA ERP system with all tables, relationships, and constraints based on your Python/SQLAlchemy models.
        </p>
      </div>

      {/* Authentication & User Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication & User Management</h3>
        
        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">users (Authentication)</h4>
          <p className="text-gray-600 mb-4">Core user authentication and profile information</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">email</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE, INDEX</td>
                  <td className="border border-gray-300 px-4 py-2">User's email address</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">hashed_password</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">Bcrypt hashed password</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">full_name</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">User's full name</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">is_active</td>
                  <td className="border border-gray-300 px-4 py-2">BOOLEAN</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, DEFAULT TRUE</td>
                  <td className="border border-gray-300 px-4 py-2">Account status</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">created_at</td>
                  <td className="border border-gray-300 px-4 py-2">TIMESTAMP WITH TIME ZONE</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, DEFAULT NOW()</td>
                  <td className="border border-gray-300 px-4 py-2">Account creation timestamp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">roles</h4>
          <p className="text-gray-600 mb-4">User roles and permissions management</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE</td>
                  <td className="border border-gray-300 px-4 py-2">Role name (admin, manager, employee)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">description</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Role description</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">permissions</h4>
          <p className="text-gray-600 mb-4">System permissions and access controls</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">code</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(128)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE</td>
                  <td className="border border-gray-300 px-4 py-2">Permission code (e.g., 'read_leads')</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">description</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Human-readable description</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Address & Contact Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Address & Contact Management</h3>
        
        {/* Addresses Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">addresses</h4>
          <p className="text-gray-600 mb-4">Standardized address storage for companies and employees</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">line1</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">Address line 1</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">line2</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Address line 2</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">city</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">City name</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">state</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">State/Province</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">postal_code</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(32)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Postal/ZIP code</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">country</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(100)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, DEFAULT 'India'</td>
                  <td className="border border-gray-300 px-4 py-2">Country name</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">companies</h4>
          <p className="text-gray-600 mb-4">Customer and supplier company information</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">Company name</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">gstin</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(32)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">GST identification number</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">contact_email</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Primary contact email</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">contact_phone</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(50)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Primary contact phone</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">address_id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">FK REFERENCES addresses(id)</td>
                  <td className="border border-gray-300 px-4 py-2">Company address</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product & Inventory Management */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Product & Inventory Management</h3>
        
        {/* Categories Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">categories</h4>
          <p className="text-gray-600 mb-4">Hierarchical product categories with parent-child relationships</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(150)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">Category name</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">parent_id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">FK REFERENCES categories(id)</td>
                  <td className="border border-gray-300 px-4 py-2">Parent category (self-referencing)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">products</h4>
          <p className="text-gray-600 mb-4">Product catalog with SKU, pricing, and inventory tracking</p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Column</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constraints</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">PRIMARY KEY, DEFAULT gen_random_uuid()</td>
                  <td className="border border-gray-300 px-4 py-2">Unique identifier</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">sku</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(64)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, UNIQUE</td>
                  <td className="border border-gray-300 px-4 py-2">Stock Keeping Unit</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">name</td>
                  <td className="border border-gray-300 px-4 py-2">VARCHAR(255)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">Product name</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">description</td>
                  <td className="border border-gray-300 px-4 py-2">TEXT</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Product description</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">unit_price</td>
                  <td className="border border-gray-300 px-4 py-2">NUMERIC(12,2)</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL</td>
                  <td className="border border-gray-300 px-4 py-2">Selling price per unit</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">cost_price</td>
                  <td className="border border-gray-300 px-4 py-2">NUMERIC(12,2)</td>
                  <td className="border border-gray-300 px-4 py-2">NULLABLE</td>
                  <td className="border border-gray-300 px-4 py-2">Cost price per unit</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">is_active</td>
                  <td className="border border-gray-300 px-4 py-2">BOOLEAN</td>
                  <td className="border border-gray-300 px-4 py-2">NOT NULL, DEFAULT TRUE</td>
                  <td className="border border-gray-300 px-4 py-2">Product status</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono">category_id</td>
                  <td className="border border-gray-300 px-4 py-2">UUID</td>
                  <td className="border border-gray-300 px-4 py-2">FK REFERENCES categories(id)</td>
                  <td className="border border-gray-300 px-4 py-2">Product category</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Complete SQL Schema */}
      <div className="bg-gray-900 text-green-400 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Complete Schema Creation Script</h3>
        <pre className="text-sm overflow-x-auto">
{`-- Create ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee', 'documentation');
CREATE TYPE lead_status AS ENUM ('hot', 'warm', 'cold');
CREATE TYPE lead_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'half-day');
CREATE TYPE leave_type AS ENUM ('casual', 'sick', 'annual', 'maternity', 'emergency');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed', 'cancelled');
CREATE TYPE payroll_status AS ENUM ('draft', 'processed', 'paid');
CREATE TYPE document_type AS ENUM ('offer-letter', 'salary-slip', 'experience-letter', 'id-card', 'policy', 'other');

-- Association tables for many-to-many relationships
CREATE TABLE role_permission (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_role (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Core tables with proper relationships and constraints
-- (See individual table sections for complete definitions)`}
        </pre>
      </div>
    </div>
  );
};

export default DatabaseSchema;