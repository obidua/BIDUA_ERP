import React from 'react';
import { Settings, Code, Database, Server, Terminal, CheckCircle } from 'lucide-react';

const DevelopmentSetup: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Development Setup</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete guide to set up the development environment for BIDUA ERP system.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Prerequisites
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">System Requirements</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Node.js 18+ installed</li>
              <li>• Python 3.11+ installed</li>
              <li>• PostgreSQL 14+ installed</li>
              <li>• Git for version control</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Recommended Tools</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• VS Code (IDE)</li>
              <li>• Postman (API testing)</li>
              <li>• pgAdmin (Database management)</li>
              <li>• Docker (Optional containerization)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Frontend Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="w-5 h-5 text-blue-600 mr-2" />
          Frontend Setup (React)
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Project Initialization</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Create new React project with Vite
npm create vite@latest bidua-erp-frontend -- --template react-ts

# Navigate to project directory
cd bidua-erp-frontend

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node

# Initialize Tailwind CSS
npx tailwindcss init -p`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Environment Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .env file
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0

# .env.production
VITE_API_BASE_URL=https://api.bidua.com
VITE_APP_NAME=BIDUA ERP
VITE_APP_VERSION=1.0.0`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Start Development Server</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Start the development server
npm run dev

# The application will be available at:
# http://localhost:5173`}
            </pre>
          </div>
        </div>
      </div>

      {/* Backend Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Server className="w-5 h-5 text-green-600 mr-2" />
          Backend Setup (FastAPI)
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Project Setup</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Create project directory
mkdir bidua-erp-backend
cd bidua-erp-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary
pip install alembic python-jose[cryptography] passlib[bcrypt]
pip install python-multipart pydantic-settings python-dotenv`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Environment Configuration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# .env file
DATABASE_URL=postgresql://bidua_user:password@localhost:5432/bidua_erp
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bidua_erp
DB_USER=bidua_user
DB_PASSWORD=secure_password`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Start Development Server</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# The API will be available at:
# http://localhost:8000
# API Documentation: http://localhost:8000/docs`}
            </pre>
          </div>
        </div>
      </div>

      {/* Database Setup */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Database className="w-5 h-5 text-purple-600 mr-2" />
          Database Setup (PostgreSQL)
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">1. PostgreSQL Installation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Windows
# Download and install from: https://www.postgresql.org/download/windows/`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Database Creation</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE bidua_erp;
CREATE USER bidua_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE bidua_erp TO bidua_user;

# Exit PostgreSQL
\\q`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Database Migration</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`# Initialize Alembic (from backend directory)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head`}
            </pre>
          </div>
        </div>
      </div>

      {/* Project Structure */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Terminal className="w-5 h-5 text-orange-600 mr-2" />
          Complete Project Structure
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Frontend Structure</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`bidua-erp-frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── crm/
│   │   ├── hrms/
│   │   ├── employee/
│   │   ├── documentation/
│   │   └── common/
│   ├── types/
│   ├── data/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── App.tsx
├── public/
├── package.json
└── vite.config.ts`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Backend Structure</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`bidua-erp-backend/
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── employees.py
│   │   ├── leads.py
│   │   ├── attendance.py
│   │   └── tasks.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── core/
│   ├── main.py
│   ├── config.py
│   └── database.py
├── alembic/
├── tests/
├── requirements.txt
└── .env`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentSetup;