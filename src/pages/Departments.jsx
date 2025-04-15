import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Filter, X, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DepartmentModal from "../components/departments/DepartmentModal";
import DeleteConfirmationModal from "../components/departments/DeleteConfirmationModal";

// Mock data for departments
const initialDepartments = [
  { id: 1, name: "Human Resources", description: "Responsible for recruiting, employee relations, and benefits administration.", manager: "Michael Chen", employeeCount: 12, location: "Floor 3" },
  { id: 2, name: "Engineering", description: "Software development, QA, and DevOps operations.", manager: "Sarah Johnson", employeeCount: 45, location: "Floor 2" },
  { id: 3, name: "Marketing", description: "Brand management, digital marketing, and advertising.", manager: "Jessica Williams", employeeCount: 18, location: "Floor 4" },
  { id: 4, name: "Finance", description: "Accounting, financial planning, and analysis.", manager: "Robert Davis", employeeCount: 15, location: "Floor 1" },
  { id: 5, name: "Operations", description: "Facility management and logistics coordination.", manager: "David Wilson", employeeCount: 22, location: "Floor 2" },
  { id: 6, name: "Customer Support", description: "Technical support and customer service.", manager: "Emily Thomas", employeeCount: 28, location: "Floor 1" },
  { id: 7, name: "Sales", description: "Business development and account management.", manager: "James Anderson", employeeCount: 20, location: "Floor 4" },
  { id: 8, name: "Research & Development", description: "Product innovation and technological research.", manager: "Sophia Martinez", employeeCount: 16, location: "Floor 3" },
  { id: 9, name: "Legal", description: "Legal compliance and contract management.", manager: "William Taylor", employeeCount: 8, location: "Floor 5" },
  { id: 10, name: "IT Support", description: "Internal technical support and infrastructure management.", manager: "Olivia Brown", employeeCount: 14, location: "Floor 2" },
];

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "all",
    size: "all",
  });
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setDepartments(initialDepartments);
      setFilteredDepartments(initialDepartments);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Apply filtering and sorting when dependencies change
  useEffect(() => {
    let result = [...departments];

    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        dept => 
          dept.name.toLowerCase().includes(lowerSearchTerm) || 
          dept.description.toLowerCase().includes(lowerSearchTerm) ||
          dept.manager.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply location filter
    if (filters.location !== "all") {
      result = result.filter(dept => dept.location === filters.location);
    }

    // Apply size filter
    if (filters.size !== "all") {
      const sizeRanges = {
        "small": [0, 15],
        "medium": [16, 30],
        "large": [31, 100]
      };
      const [min, max] = sizeRanges[filters.size];
      result = result.filter(dept => dept.employeeCount >= min && dept.employeeCount <= max);
    }

    // Apply sorting
    result.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortDirection === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else {
        return sortDirection === 'asc'
          ? fieldA - fieldB
          : fieldB - fieldA;
      }
    });

    setFilteredDepartments(result);
  }, [departments, searchTerm, filters, sortField, sortDirection]);

  // Get unique locations for filter dropdown
  const uniqueLocations = [...new Set(departments.map(dept => dept.location))];

  const handleSort = (field) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddDepartment = () => {
    setCurrentDepartment(null);
    setShowModal(true);
  };

  const handleEditDepartment = (department) => {
    setCurrentDepartment(department);
    setShowModal(true);
  };

  const handleDeleteClick = (department) => {
    setCurrentDepartment(department);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setDepartments(departments.filter(dept => dept.id !== currentDepartment.id));
    setShowDeleteModal(false);
  };

  const handleSaveDepartment = (departmentData) => {
    if (currentDepartment) {
      // Update existing department
      setDepartments(departments.map(dept =>
        dept.id === currentDepartment.id ? { ...departmentData, id: currentDepartment.id } : dept
      ));
    } else {
      // Add new department
      const newId = Math.max(...departments.map(dept => dept.id), 0) + 1;
      setDepartments([...departments, { ...departmentData, id: newId }]);
    }
    setShowModal(false);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      location: "all",
      size: "all",
    });
    setShowFilters(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Departments</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">Manage company departments and their information</p>
        </div>
        <button
          onClick={handleAddDepartment}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary focus:bg-primary transition-colors duration-200 self-start"
        >
          <Plus size={18} className="mr-2" />
          Add Department
        </button>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-lg shadow">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-surface-500" />
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search departments..."
                className="block w-full pl-10 pr-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2 rounded-lg border ${
                  showFilters || Object.values(filters).some(val => val !== "all")
                    ? "border-primary/50 text-primary dark:text-primary-light bg-primary/10 dark:bg-primary/20"
                    : "border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                } inline-flex items-center`}
              >
                <Filter size={18} className="mr-2" />
                Filters
                {Object.values(filters).some(val => val !== "all") && (
                  <span className="ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {Object.values(filters).filter(val => val !== "all").length}
                  </span>
                )}
              </button>
              {(searchTerm || Object.values(filters).some(val => val !== "all")) && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 inline-flex items-center"
                >
                  <X size={18} className="mr-2" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Location
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="all">All Locations</option>
                      {uniqueLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Department Size
                    </label>
                    <select
                      value={filters.size}
                      onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                      className="block w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="all">All Sizes</option>
                      <option value="small">Small (1-15 employees)</option>
                      <option value="medium">Medium (16-30 employees)</option>
                      <option value="large">Large (31+ employees)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-full mb-4">
                <svg className="w-10 h-10 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-1">No departments found</h3>
              <p className="text-surface-600 dark:text-surface-400 max-w-md mb-4">
                {searchTerm || Object.values(filters).some(val => val !== "all") 
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "There are no departments added yet. Create your first department to get started."}
              </p>
              {searchTerm || Object.values(filters).some(val => val !== "all") ? (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2 bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-200"
                >
                  <X size={18} className="mr-2" />
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={handleAddDepartment}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary focus:bg-primary transition-colors duration-200"
                >
                  <Plus size={18} className="mr-2" />
                  Add Department
                </button>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
              <thead className="bg-surface-50 dark:bg-surface-800">
                <tr>
                  <th scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Department Name
                      {sortField === 'name' && (
                        <ArrowUpDown size={16} className={`ml-1 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('manager')}>
                    <div className="flex items-center">
                      Department Head
                      {sortField === 'manager' && (
                        <ArrowUpDown size={16} className={`ml-1 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('employeeCount')}>
                    <div className="flex items-center">
                      Employees
                      {sortField === 'employeeCount' && (
                        <ArrowUpDown size={16} className={`ml-1 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('location')}>
                    <div className="flex items-center">
                      Location
                      {sortField === 'location' && (
                        <ArrowUpDown size={16} className={`ml-1 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                {filteredDepartments.map((department) => (
                  <tr key={department.id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white">
                      {department.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600 dark:text-surface-400 max-w-xs truncate">
                      {department.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {department.manager}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {department.employeeCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400">
                      {department.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditDepartment(department)}
                          className="text-primary hover:text-primary/80 transition-colors duration-200 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(department)}
                          className="text-red-500 hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!isLoading && filteredDepartments.length > 0 && (
          <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-b-lg">
            <div className="flex justify-between items-center">
              <div className="text-sm text-surface-600 dark:text-surface-400">
                Showing <span className="font-medium">{filteredDepartments.length}</span> of{" "}
                <span className="font-medium">{departments.length}</span> departments
              </div>
              <div className="flex space-x-2">
                {/* Pagination can be added here if needed */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Department Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <DepartmentModal
            department={currentDepartment}
            onClose={() => setShowModal(false)}
            onSave={handleSaveDepartment}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteConfirmationModal
            department={currentDepartment}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Departments;