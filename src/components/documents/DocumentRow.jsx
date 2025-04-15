import { useState } from "react";
import { format } from "date-fns";
import { Eye, Download, Trash2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const DocumentRow = ({ 
  document, 
  onView, 
  onDownload, 
  onDelete, 
  isDeleteConfirmVisible,
  onCancelDelete,
  onConfirmDelete
}) => {
  // Convert the date string to a formatted date
  const formattedDate = format(new Date(document.updatedAt), "MMM d, yyyy");
  
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

  // Animation for delete confirmation
  const confirmVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <>
      <tr className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-150">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${fileColor} flex items-center justify-center uppercase font-bold`}>
              {extension}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-surface-900 dark:text-surface-100">{document.name}</div>
              <div className="text-xs text-surface-500 truncate max-w-xs">{document.description}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200">
            {document.category}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
          {document.uploadedBy}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
          {formattedDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
          {document.size} MB
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
          <button 
            onClick={onView}
            className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-150 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={onDownload}
            className="text-secondary hover:text-secondary-dark dark:hover:text-secondary-light transition-colors duration-150 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-150 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
      
      {isDeleteConfirmVisible && (
        <tr>
          <td colSpan="6" className="px-0 py-0 border-b border-surface-200 dark:border-surface-700">
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={confirmVariants}
              className="bg-red-50 dark:bg-red-900/20 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center text-red-800 dark:text-red-200">
                  <AlertCircle size={20} className="mr-3" />
                  <span>Are you sure you want to delete <strong>{document.name}</strong>? This action cannot be undone.</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={onCancelDelete}
                    className="px-3 py-1 text-sm rounded-md bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={onConfirmDelete}
                    className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </td>
        </tr>
      )}
    </>
  );
};

export default DocumentRow;