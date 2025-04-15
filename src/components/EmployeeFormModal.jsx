import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Building, Briefcase, Calendar, Users, Activity } from "lucide-react";

function EmployeeFormModal({ isOpen, onClose, mode, initialData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    location: "",
    status: "active",
    hireDate: "",
    manager: "",
    skills: ""
  });

  // Populate form with employee data when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        department: initialData.department || "",
        position: initialData.position || "",
        location: initialData.location || "",
        status: initialData.status || "active",
        hireDate: initialData.hireDate || "",
        manager: initialData.manager || "",
        skills: initialData.skills ? initialData.skills.join(", ") : ""
      });
    } else {
      // Reset form when adding new employee
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        location: "",
        status: "active",
        hireDate: "",
        manager: "",
        skills: ""
      });
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For example, send the data to an API or update state
    console.log("Form submitted:", formData);
    
    // Close the modal after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {mode === "add" ? "Add New Employee" : "Edit Employee"}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="col-span-2">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-span-2">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="col-span-2">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">Employment Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Building size={16} />
                    </div>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="Product">Product</option>
                      <option value="Sales">Sales</option>
                      <option value="Design">Design</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Briefcase size={16} />
                    </div>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Activity size={16} />
                    </div>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
                    >
                      <option value="active">Active</option>
                      <option value="on leave">On Leave</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hire Date</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Calendar size={16} />
                    </div>
                    <input
                      type="date"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manager</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
                      <Users size={16} />
                    </div>
                    <input
                      type="text"
                      name="manager"
                      value={formData.manager}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (comma separated)</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="JavaScript, React, Project Management, etc."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {mode === "add" ? "Add Employee" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EmployeeFormModal;