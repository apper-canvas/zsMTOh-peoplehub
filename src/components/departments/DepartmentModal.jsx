import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

function DepartmentModal({ department, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    employeeCount: 0,
    location: ""
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || "",
        description: department.description || "",
        manager: department.manager || "",
        employeeCount: department.employeeCount || 0,
        location: department.location || ""
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "employeeCount" ? parseInt(value, 10) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

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
        className="relative w-full max-w-lg bg-white dark:bg-surface-800 rounded-lg shadow-xl mx-4 overflow-hidden z-10"
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-surface-200 dark:border-surface-700">
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
            {department ? "Edit Department" : "Add Department"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-surface-400 hover:text-surface-500 dark:text-surface-500 dark:hover:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Department Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter department name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter department description"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="manager" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Department Head
                </label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter manager name"
                />
              </div>

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
                  className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter employee count"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter department location"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 focus:bg-primary-600 transition-colors duration-200"
            >
              {department ? "Update Department" : "Add Department"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default DepartmentModal;