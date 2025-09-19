import React from 'react';
import { Monitor, Server, Database, Code, Globe, Shield } from 'lucide-react';

const TechnologyStack: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h1>
        <p className="text-lg text-gray-600 mb-6">
          Modern, scalable technologies chosen for performance, maintainability, and developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Frontend Technologies */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Monitor className="w-6 h-6 text-blue-600 mr-3" />
            Frontend Stack
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">React 18.3.1</h3>
              <p className="text-sm text-blue-800 mb-2">Modern React with hooks and functional components</p>
              <div className="text-xs text-blue-700">
                <strong>Features:</strong> Concurrent rendering, Suspense, Error boundaries
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-2">TypeScript</h3>
              <p className="text-sm text-indigo-800 mb-2">Type-safe JavaScript for better development experience</p>
              <div className="text-xs text-indigo-700">
                <strong>Benefits:</strong> Compile-time error checking, IntelliSense, Refactoring support
              </div>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <h3 className="font-semibold text-cyan-900 mb-2">Tailwind CSS</h3>
              <p className="text-sm text-cyan-800 mb-2">Utility-first CSS framework for rapid UI development</p>
              <div className="text-xs text-cyan-700">
                <strong>Features:</strong> Responsive design, Dark mode support, Custom components
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Vite</h3>
              <p className="text-sm text-purple-800 mb-2">Fast build tool and development server</p>
              <div className="text-xs text-purple-700">
                <strong>Benefits:</strong> Hot module replacement, Fast builds, ES modules
              </div>
            </div>
          </div>
        </div>

        {/* Backend Technologies */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Server className="w-6 h-6 text-green-600 mr-3" />
            Backend Stack
          </h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">FastAPI</h3>
              <p className="text-sm text-green-800 mb-2">Modern, fast web framework for building APIs</p>
              <div className="text-xs text-green-700">
                <strong>Features:</strong> Automatic API docs, Type hints, Async support, Validation
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="font-semibold text-emerald-900 mb-2">Python 3.11+</h3>
              <p className="text-sm text-emerald-800 mb-2">Modern Python with latest performance improvements</p>
              <div className="text-xs text-emerald-700">
                <strong>Libraries:</strong> Pydantic, SQLAlchemy, Alembic, python-jose
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h3 className="font-semibold text-teal-900 mb-2">SQLAlchemy</h3>
              <p className="text-sm text-teal-800 mb-2">Python SQL toolkit and Object-Relational Mapping</p>
              <div className="text-xs text-teal-700">
                <strong>Features:</strong> ORM, Query builder, Connection pooling, Migrations
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">PostgreSQL</h3>
              <p className="text-sm text-blue-800 mb-2">Advanced open-source relational database</p>
              <div className="text-xs text-blue-700">
                <strong>Features:</strong> ACID compliance, JSON support, Full-text search, Indexing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Tools */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Code className="w-6 h-6 text-purple-600 mr-3" />
          Development Tools & Libraries
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Frontend Dependencies</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <code>react@18.3.1</code> - UI library
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>react-router-dom@7.9.1</code> - Routing
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>lucide-react@0.344.0</code> - Icons
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>tailwindcss@3.4.1</code> - Styling
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Backend Dependencies</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <code>fastapi</code> - Web framework
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>sqlalchemy</code> - ORM
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>pydantic</code> - Data validation
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>alembic</code> - Database migrations
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Development Tools</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <code>vite</code> - Build tool
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>eslint</code> - Code linting
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>uvicorn</code> - ASGI server
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code>pytest</code> - Testing framework
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStack;