import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import dataService from "../services/dataService";

function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newEmployee = await dataService.addEmployee(formData);
      onEmployeeAdded(newEmployee);
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
      setErrors({ submit: "Failed to add employee. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const departments = ["Engineering", "Marketing", "Finance", "HR", "Product", "Sales", "Design", "Operations"];
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-surface-900/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md mx-auto bg-white dark:bg-surface-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Add New Employee</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-lg border ${errors.firstName ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-lg border ${errors.lastName ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.department ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary`}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-xs text-red-500">{errors.department}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1" htmlFor="position">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.position ? 'border-red-500 dark:border-red-500' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.position && (
                <p className="mt-1 text-xs text-red-500">{errors.position}</p>
              )}
            </div>
            
            {errors.submit && (
              <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-sm rounded-lg">
                {errors.submit}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 bg-surface-100 dark:bg-surface-700 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Adding..." : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddEmployeeModal;