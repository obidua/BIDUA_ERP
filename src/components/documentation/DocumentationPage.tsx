import React from 'react';
import { ArrowLeft, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Login</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Book className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">BIDUA ERP Documentation</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Book className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              BIDUA ERP System Documentation
            </h2>
            <p className="text-gray-600 mb-8">
              Welcome to the BIDUA ERP documentation. This page will contain comprehensive 
              information about the system features, user guides, and technical documentation.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Documentation Coming Soon
              </h3>
              <p className="text-blue-700">
                We're preparing detailed documentation for all system features. 
                Please check back soon for complete user guides and technical documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;