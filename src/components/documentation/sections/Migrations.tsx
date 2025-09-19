import React from 'react';
import { Server, Database, GitBranch, AlertTriangle, CheckCircle } from 'lucide-react';

const Migrations: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Database Migrations</h1>
        <p className="text-lg text-gray-600 mb-6">
          Database migration strategy using Alembic for version control and schema evolution.
        </p>
      </div>

      {/* Migration Overview */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <GitBranch className="w-5 h-5 mr-2" />
          Migration Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Version Control</h4>
            <p className="text-sm text-gray-600">Each migration has a unique version identifier</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Incremental Changes</h4>
            <p className="text-sm text-gray-600">Small, focused changes for easier rollbacks</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2">Environment Sync</h4>
            <p className="text-sm text-gray-600">Consistent schema across dev, staging, production</p>
          </div>
        </div>
      </div>

      {/* Alembic Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Server className="w-5 h-5 text-green-600 mr-2" />
          Alembic Configuration
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Initialize Alembic</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# From backend project root
alembic init alembic

# This creates:
# alembic/
# ├── versions/          # Migration files
# ├── env.py            # Environment configuration
# ├── script.py.mako    # Migration template
# └── alembic.ini       # Alembic configuration`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Configure alembic.ini</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# alembic.ini
[alembic]
script_location = alembic
prepend_sys_path = .
version_path_separator = os
sqlalchemy.url = postgresql://bidua_user:password@localhost:5432/bidua_erp

[post_write_hooks]
hooks = black
black.type = console_scripts
black.entrypoint = black
black.options = -l 79 REVISION_SCRIPT_FILENAME`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Configure env.py</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# alembic/env.py
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.models import Base  # Import your models
from app.config import settings

# Alembic Config object
config = context.config

# Set database URL from environment
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Target metadata
target_metadata = Base.metadata

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()`}
            </pre>
          </div>
        </div>
      </div>

      {/* Migration Commands */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 text-purple-600 mr-2" />
          Migration Commands
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Create Migration</h4>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`# Auto-generate migration
alembic revision --autogenerate -m "Add users table"

# Manual migration
alembic revision -m "Add custom index"`}
              </pre>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Apply Migrations</h4>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`# Apply all pending migrations
alembic upgrade head

# Apply specific migration
alembic upgrade +1`}
              </pre>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Rollback Migrations</h4>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`# Rollback one migration
alembic downgrade -1

# Rollback to specific revision
alembic downgrade abc123`}
              </pre>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Migration Info</h4>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm">
{`# Show current revision
alembic current

# Show migration history
alembic history`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Migration Files */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Migration Files</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Initial Migration (001_initial_schema.py)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"""Initial schema

Revision ID: 001_initial_schema
Revises: 
Create Date: 2025-01-15 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers
revision = '001_initial_schema'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create ENUMS
    op.execute("CREATE TYPE user_role AS ENUM ('admin', 'manager', 'employee', 'documentation')")
    op.execute("CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'terminated')")
    
    # Create users table
    op.create_table('users',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('username', sa.VARCHAR(50), nullable=False),
        sa.Column('email', sa.VARCHAR(255), nullable=False),
        sa.Column('password_hash', sa.VARCHAR(255), nullable=False),
        sa.Column('role', sa.Enum('admin', 'manager', 'employee', 'documentation', name='user_role'), nullable=False),
        sa.Column('department', sa.VARCHAR(100), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.TIMESTAMP(), nullable=True),
        sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )
    
    # Create employees table
    op.create_table('employees',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('employee_id', sa.VARCHAR(20), nullable=False),
        sa.Column('user_id', sa.UUID(), nullable=True),
        sa.Column('name', sa.VARCHAR(255), nullable=False),
        sa.Column('email', sa.VARCHAR(255), nullable=False),
        sa.Column('phone', sa.VARCHAR(20), nullable=False),
        sa.Column('department', sa.VARCHAR(100), nullable=False),
        sa.Column('designation', sa.VARCHAR(100), nullable=False),
        sa.Column('manager_id', sa.UUID(), nullable=True),
        sa.Column('joining_date', sa.DATE(), nullable=False),
        sa.Column('salary', sa.DECIMAL(10,2), nullable=False),
        sa.Column('status', sa.Enum('active', 'inactive', 'terminated', name='employee_status'), nullable=True),
        sa.Column('address', sa.TEXT(), nullable=False),
        sa.Column('emergency_contact', sa.VARCHAR(20), nullable=False),
        sa.Column('created_at', sa.TIMESTAMP(), nullable=True),
        sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
        sa.ForeignKeyConstraint(['manager_id'], ['employees.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('employee_id'),
        sa.UniqueConstraint('email')
    )

def downgrade():
    op.drop_table('employees')
    op.drop_table('users')
    op.execute("DROP TYPE IF EXISTS employee_status")
    op.execute("DROP TYPE IF EXISTS user_role")`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">CRM Migration (002_add_crm_tables.py)</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`"""Add CRM tables

Revision ID: 002_add_crm_tables
Revises: 001_initial_schema
Create Date: 2025-01-15 11:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

revision = '002_add_crm_tables'
down_revision = '001_initial_schema'

def upgrade():
    # Create ENUMS for CRM
    op.execute("CREATE TYPE lead_status AS ENUM ('hot', 'warm', 'cold')")
    op.execute("CREATE TYPE lead_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost')")
    
    # Create leads table
    op.create_table('leads',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('name', sa.VARCHAR(255), nullable=False),
        sa.Column('email', sa.VARCHAR(255), nullable=False),
        sa.Column('phone', sa.VARCHAR(20), nullable=True),
        sa.Column('company', sa.VARCHAR(255), nullable=False),
        sa.Column('status', sa.Enum('hot', 'warm', 'cold', name='lead_status'), nullable=True),
        sa.Column('stage', sa.Enum('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost', name='lead_stage'), nullable=True),
        sa.Column('value', sa.DECIMAL(12,2), nullable=True),
        sa.Column('source', sa.VARCHAR(100), nullable=True),
        sa.Column('assigned_to', sa.UUID(), nullable=True),
        sa.Column('last_contact', sa.DATE(), nullable=True),
        sa.Column('next_follow_up', sa.DATE(), nullable=True),
        sa.Column('notes', sa.TEXT(), nullable=True),
        sa.Column('created_at', sa.TIMESTAMP(), nullable=True),
        sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
        sa.ForeignKeyConstraint(['assigned_to'], ['employees.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('leads')
    op.execute("DROP TYPE IF EXISTS lead_stage")
    op.execute("DROP TYPE IF EXISTS lead_status")`}
            </pre>
          </div>
        </div>
      </div>

      {/* Migration Best Practices */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Migration Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-900">Do's</h4>
              </div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Always backup before migrations</li>
                <li>• Test migrations on staging first</li>
                <li>• Use descriptive migration messages</li>
                <li>• Keep migrations small and focused</li>
                <li>• Include both upgrade and downgrade</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h4 className="font-semibold text-red-900">Don'ts</h4>
              </div>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Don't modify existing migrations</li>
                <li>• Don't skip migration testing</li>
                <li>• Don't delete data without backup</li>
                <li>• Don't run migrations manually in production</li>
                <li>• Don't ignore migration conflicts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Migration Workflow */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Workflow</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Step-by-Step Migration Process</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                <div>
                  <h5 className="font-medium text-gray-900">Modify Models</h5>
                  <p className="text-sm text-gray-600">Update SQLAlchemy models in app/models/</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                <div>
                  <h5 className="font-medium text-gray-900">Generate Migration</h5>
                  <p className="text-sm text-gray-600">Run alembic revision --autogenerate</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                <div>
                  <h5 className="font-medium text-gray-900">Review Migration</h5>
                  <p className="text-sm text-gray-600">Check generated migration file for accuracy</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">4</div>
                <div>
                  <h5 className="font-medium text-gray-900">Test Migration</h5>
                  <p className="text-sm text-gray-600">Apply migration to development database</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">5</div>
                <div>
                  <h5 className="font-medium text-gray-900">Deploy</h5>
                  <p className="text-sm text-gray-600">Apply to staging, then production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Migrations;