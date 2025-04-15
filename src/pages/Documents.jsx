import { useState, useEffect } from "react";
import { Search, Filter, Upload, Download, Trash2, Eye, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import DocumentRow from "../components/documents/DocumentRow";
import DocumentDetailsModal from "../components/documents/DocumentDetailsModal";
import UploadDocumentModal from "../components/documents/UploadDocumentModal";
import { documents as initialDocuments } from "../data/documents";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'updatedAt', direction: 'desc' });

  // Categories derived from documents data
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initialize documents data
    setDocuments(initialDocuments);
    
    // Extract unique categories
    const uniqueCategories = ["All", ...new Set(initialDocuments.map(doc => doc.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    // Filter and sort documents
    let result = [...documents];
    
    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(doc => doc.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchLower) || 
        doc.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredDocuments(result);
  }, [documents, searchTerm, selectedCategory, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleViewDetails = (document) => {
    setSelectedDocument(document);
    setShowDetailsModal(true);
  };

  const handleDownload = (document) => {
    // In a real app, this would trigger a download of the actual file
    alert(`Downloading ${document.name}`);
  };

  const confirmDelete = (id) => {
    setShowDeleteConfirm(id);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleUpload = (newDocument) => {
    const newDoc = {
      id: documents.length + 1,
      ...newDocument,
      uploadedBy: "Sarah Johnson",
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      size: Math.floor(Math.random() * 10) + 1, // Random size between 1-10 MB
    };
    
    setDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
  };

  // Calculate document statistics
  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const recentUploads = documents.filter(doc => {
    const uploadDate = new Date(doc.uploadedAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return uploadDate >= thirtyDaysAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Document Management</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">Upload, manage, and share company documents</p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={18} className="mr-2" />
          Upload New Document
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm">Total Documents</p>
              <h3 className="text-3xl font-bold text-surface-900 dark:text-surface-50">{totalDocuments}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText size={24} className="text-primary" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm">Total Size</p>
              <h3 className="text-3xl font-bold text-surface-900 dark:text-surface-50">{totalSize} MB</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Database size={24} className="text-secondary" />
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm">Recent Uploads (30 days)</p>
              <h3 className="text-3xl font-bold text-surface-900 dark:text-surface-50">{recentUploads}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Calendar size={24} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="p-5 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Documents</h2>
        </div>
        <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-surface-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="input appearance-none pr-10"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter size={18} className="text-surface-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50 dark:bg-surface-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('name')}
                  >
                    <span>Document Name</span>
                    {sortConfig.key === 'name' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('category')}
                  >
                    <span>Category</span>
                    {sortConfig.key === 'category' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('uploadedBy')}
                  >
                    <span>Uploaded By</span>
                    {sortConfig.key === 'uploadedBy' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('updatedAt')}
                  >
                    <span>Last Updated</span>
                    {sortConfig.key === 'updatedAt' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1 focus:outline-none"
                    onClick={() => handleSort('size')}
                  >
                    <span>Size</span>
                    {sortConfig.key === 'size' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map(document => (
                  <DocumentRow 
                    key={document.id} 
                    document={document} 
                    onView={() => handleViewDetails(document)}
                    onDownload={() => handleDownload(document)}
                    onDelete={() => confirmDelete(document.id)}
                    isDeleteConfirmVisible={showDeleteConfirm === document.id}
                    onCancelDelete={() => setShowDeleteConfirm(null)}
                    onConfirmDelete={() => handleDelete(document.id)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-surface-500 dark:text-surface-400">
                    {searchTerm || selectedCategory !== "All" ? (
                      <div className="flex flex-col items-center">
                        <Search size={40} className="text-surface-400 mb-2" />
                        <p className="text-lg font-medium">No documents found</p>
                        <p className="text-sm">Try adjusting your search or filter</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FileText size={40} className="text-surface-400 mb-2" />
                        <p className="text-lg font-medium">No documents yet</p>
                        <p className="text-sm">Upload your first document to get started</p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Details Modal */}
      {showDetailsModal && selectedDocument && (
        <DocumentDetailsModal 
          document={selectedDocument}
          onClose={() => setShowDetailsModal(false)}
          onDownload={() => handleDownload(selectedDocument)}
        />
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <UploadDocumentModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          categories={categories.filter(cat => cat !== "All")}
        />
      )}
    </div>
  );
};

// Missing component import
const FileText = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
};

const Database = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
};

const Calendar = ({ size, className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
};

export default Documents;