import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

function DepartmentModal({ department, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    employeeCount: 0,
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Set form data if editing existing department
  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || "",
        description: department.description || "",
        manager: department.manager || "",
        employeeCount: department.employeeCount || 0,
        location: department.location || "",
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Convert employee count to number
    if (name === "employeeCount") {
      processedValue = value === "" ? 0 : parseInt(value, 10);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Department name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.manager.trim()) {
      newErrors.manager = "Department head is required";
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (formData.employeeCount < 0) {
      newErrors.employeeCount = "Employee count cannot be negative";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSaving(true);
      
      // Simulate API call
      setTimeout(() => {
        onSave(formData);
        setIsSaving(false);
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-surface-900/50 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-surface-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="bg-white dark:bg-surface-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg leading-6 font-medium text-surface-900 dark:text-white">
                {department ? "Edit Department" : "Add New Department"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Department Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-surface-300 dark:border-surface-600"
                    } rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="e.g. Engineering"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className={`block w-full px-3 py-2 border ${
                      errors.description ? "border-red-500" : "border-surface-300 dark:border-surface-600"
                    } rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="Describe the department's responsibilities"
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="manager" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Department Head*
                  </label>
                  <input
                    type="text"
                    id="manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.manager ? "border-red-500" : "border-surface-300 dark:border-surface-600"
                    } rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    placeholder="e.g. John Smith"
                  />
                  {errors.manager && <p className="mt-1 text-sm text-red-500">{errors.manager}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="employeeCount" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      id="employeeCount"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleChange}
                      min="0"
                      className={`block w-full px-3 py-2 border ${
                        errors.employeeCount ? "border-red-500" : "border-surface-300 dark:border-surface-600"
                      } rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                    />
                    {errors.employeeCount && <p className="mt-1 text-sm text-red-500">{errors.employeeCount}</p>}
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${
                        errors.location ? "border-red-500" : "border-surface-300 dark:border-surface-600"
                      } rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="e.g. Floor 3"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-md text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center min-w-[88px]"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  ) : department ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DepartmentModal;