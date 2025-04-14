import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon } from "lucide-react";

function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2
          }}
          className="mb-8"
        >
          <div className="mx-auto w-32 h-32 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-primary">404</span>
          </div>
        </motion.div>
        
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-50 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            <HomeIcon size={18} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NotFound;