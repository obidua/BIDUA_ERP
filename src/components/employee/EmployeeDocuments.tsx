import React, { useState } from 'react';
import { User, Employee, Document } from '../../types';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  User as UserIcon,
  Award,
  CreditCard,
  Shield,
  Briefcase,
} from 'lucide-react';

interface EmployeeDocumentsProps {
  user: User;
  employee: Employee;
  documents: Document[];
  addNotification?: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}


const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({
  user,
  employee,
  documents,
  addNotification,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const myDocuments = documents;

  const filteredDocuments = selectedCategory === 'all' 
    ? myDocuments 
    : myDocuments.filter(doc => doc.type === selectedCategory);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'offer-letter':
        return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'salary-slip':
        return <CreditCard className="w-5 h-5 text-green-600" />;
      case 'experience-letter':
        return <Award className="w-5 h-5 text-purple-600" />;
      case 'id-card':
        return <UserIcon className="w-5 h-5 text-orange-600" />;
      case 'policy':
        return <Shield className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'offer-letter':
        return 'bg-blue-100 text-blue-800';
      case 'salary-slip':
        return 'bg-green-100 text-green-800';
      case 'experience-letter':
        return 'bg-purple-100 text-purple-800';
      case 'id-card':
        return 'bg-orange-100 text-orange-800';
      case 'policy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (document: Document) => {
    // In a real app, this would download the actual file
    addNotification?.(`${document.title} downloaded successfully`, 'success');
  };

  const handleView = (document: Document) => {
    // In a real app, this would open the document in a viewer
    addNotification?.(`Opening ${document.title}`, 'info');
  };

  const documentCategories = [
    { id: 'all', label: 'All Documents', count: myDocuments.length },
    { id: 'offer-letter', label: 'Offer Letters', count: myDocuments.filter(d => d.type === 'offer-letter').length },
    { id: 'salary-slip', label: 'Salary Slips', count: myDocuments.filter(d => d.type === 'salary-slip').length },
    { id: 'experience-letter', label: 'Experience Letters', count: myDocuments.filter(d => d.type === 'experience-letter').length },
    { id: 'id-card', label: 'ID Cards', count: myDocuments.filter(d => d.type === 'id-card').length },
    { id: 'policy', label: 'Policies', count: myDocuments.filter(d => d.type === 'policy').length },
    { id: 'other', label: 'Others', count: myDocuments.filter(d => d.type === 'other').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Documents</h2>
          <p className="text-slate-600">Access your official documents and certificates</p>
        </div>
      </div>

      {/* Document Overview */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Document Library</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{myDocuments.length}</p>
            <p className="text-indigo-100 text-sm">Total Documents</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{myDocuments.filter(d => d.type === 'offer-letter').length}</p>
            <p className="text-indigo-100 text-sm">Offer Letters</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{myDocuments.filter(d => d.type === 'salary-slip').length}</p>
            <p className="text-indigo-100 text-sm">Salary Slips</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{myDocuments.filter(d => d.isPublic).length}</p>
            <p className="text-indigo-100 text-sm">Public Docs</p>
          </div>
        </div>
      </div>

      {/* Document Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap gap-2">
          {documentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{category.label}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                selectedCategory === category.id
                  ? 'bg-indigo-400 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div
            key={document.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-50 p-2 rounded-lg">
                  {getDocumentIcon(document.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{document.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{document.fileName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Type</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getDocumentTypeColor(document.type)}`}>
                  {document.type.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Size</span>
                <span className="text-slate-900">{formatFileSize(document.size)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Uploaded</span>
                <span className="text-slate-900">
                  {new Date(document.uploadedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">By</span>
                <span className="text-slate-900">{document.uploadedBy}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleView(document)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button
                onClick={() => handleDownload(document)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
          <p className="text-slate-600">
            {selectedCategory === 'all' 
              ? 'No documents have been uploaded yet' 
              : `No ${selectedCategory.replace('-', ' ')} documents found`}
          </p>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800">Document Security</h4>
            <p className="text-sm text-amber-700 mt-1">
              All documents are securely stored and encrypted. Only you and authorized HR personnel can access your personal documents.
              Please contact HR if you need any additional documents or have concerns about document access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocuments;