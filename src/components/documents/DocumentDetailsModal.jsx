import { X, Download, FileText, Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const DocumentDetailsModal = ({ document, onClose, onDownload }) => {
  const uploadDate = format(new Date(document.uploadedAt), "MMMM d, yyyy 'at' h:mm a");
  const updateDate = format(new Date(document.updatedAt), "MMMM d, yyyy 'at' h:mm a");
  
  // Get file extension for icon display
  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };
  
  const extension = getFileExtension(document.name);
  
  // Define colors for different file types
  const getFileColor = (ext) => {
    switch(ext) {
      case 'pdf':
        return 'text-red-500 bg-red-100 dark:bg-red-900/30';
      case 'doc':
      case 'docx':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'xls':
      case 'xlsx':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'ppt':
      case 'pptx':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };
  
  const fileColor = getFileColor(extension);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div 
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          className="relative bg-white dark:bg-surface-800 rounded-lg max-w-3xl w-full shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-surface-200 dark:border-surface-700">
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">Document Details</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-150"
            >
              <X size={20} className="text-surface-500" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className={`h-32 w-32 ${fileColor} rounded-lg flex items-center justify-center`}>
                  <span className="text-4xl uppercase font-bold">{extension}</span>
                </div>
                <button 
                  onClick={() => onDownload()}
                  className="mt-4 btn btn-primary w-full flex justify-center items-center"
                >
                  <Download size={18} className="mr-2" />
                  Download
                </button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">{document.name}</h2>
                <div className="mb-4">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200">
                    {document.category}
                  </span>
                </div>
                
                <p className="text-surface-600 dark:text-surface-300 mb-6 text-sm">
                  {document.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText size={20} className="text-surface-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100">File Details</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {document.size} MB • {extension.toUpperCase()} File
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User size={20} className="text-surface-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Uploaded By</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{document.uploadedBy}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Calendar size={20} className="text-surface-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Upload Date</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{uploadDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={20} className="text-surface-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Last Updated</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{updateDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-50 dark:bg-surface-700 px-6 py-4 flex justify-end">
            <button 
              onClick={onClose}
              className="btn btn-outline"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentDetailsModal;