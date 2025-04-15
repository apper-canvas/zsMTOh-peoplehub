import { motion } from "framer-motion";
import { X, Mail, Phone, MapPin, Briefcase, Building, User } from "lucide-react";

function EmployeeDetailModal({ isOpen, onClose, employee }) {
  if (!isOpen || !employee) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "on leave":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "terminated":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Employee Details</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center pb-6 mb-6 border-b border-surface-200 dark:border-surface-700">
            <div className="sm:mr-6 mb-4 sm:mb-0">
              <img 
                src={employee.avatar} 
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">{employee.firstName} {employee.lastName}</h2>
              <p className="text-surface-500 dark:text-surface-400">{employee.position}</p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
                <span className="mx-2 text-surface-300 dark:text-surface-600">•</span>
                <span className="text-sm text-surface-500 dark:text-surface-400">ID: {employee.id}</span>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-surface-900 dark:text-surface-100">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                <div>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Email</p>
                  <p className="text-sm text-surface-900 dark:text-surface-100">{employee.email}</p>
                </div>
              </div>
              {employee.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Phone</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{employee.phone}</p>
                  </div>
                </div>
              )}
              {employee.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Location</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{employee.location}</p>
                  </div>
                </div>
              )}
              {employee.hireDate && (
                <div className="flex items-center">
                  <Briefcase size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Hire Date</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">{employee.hireDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Employment Information */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-surface-900 dark:text-surface-100">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Building size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                <div>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Department</p>
                  <p className="text-sm text-surface-900 dark:text-surface-100">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Briefcase size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                <div>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Position</p>
                  <p className="text-sm text-surface-900 dark:text-surface-100">{employee.position}</p>
                </div>
              </div>
              {employee.manager && (
                <div className="flex items-center">
                  <User size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <div>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Manager</p>
                    <p className="text-sm text-surface-900 dark:text-surface-100">
                      {employee.manager}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Skills if available */}
          {employee.skills && employee.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3 text-surface-900 dark:text-surface-100">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-surface-100 dark:bg-surface-700 rounded-full text-sm text-surface-700 dark:text-surface-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-end gap-3 p-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-700/30">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default EmployeeDetailModal;