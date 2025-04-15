import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

function DeleteConfirmationModal({ department, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect - semi-transparent instead of dark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-white dark:bg-surface-800 rounded-lg shadow-xl mx-4 overflow-hidden z-10"
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-surface-200 dark:border-surface-700">
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white flex items-center">
            <AlertTriangle size={20} className="text-red-500 mr-2" />
            Delete Department
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-surface-400 hover:text-surface-500 dark:text-surface-500 dark:hover:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 md:p-5">
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Are you sure you want to delete the department <span className="font-semibold text-surface-900 dark:text-white">{department?.name}</span>? This action cannot be undone.
          </p>
          
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              Delete Department
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DeleteConfirmationModal;