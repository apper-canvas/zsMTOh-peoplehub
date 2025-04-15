import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, ChevronDown, Upload, Download, UserPlus, Mail, Phone, MapPin, Briefcase, Building, X, Check, Eye, User } from "lucide-react";
import EmployeeFormModal from "../components/EmployeeFormModal";

// Sample expanded employee data
const EMPLOYEES = [
  { 
    id: 1, 
    firstName: "John", 
    lastName: "Doe", 
    email: "john.doe@example.com", 
    phone: "+1 (555) 123-4567",
    department: "Engineering", 
    position: "Senior Developer", 
    status: "active", 
    location: "San Francisco, CA",
    hireDate: "2019-05-12",
    manager: "Sarah Johnson",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 2, 
    firstName: "Jane", 
    lastName: "Smith", 
    email: "jane.smith@example.com", 
    phone: "+1 (555) 234-5678",
    department: "Marketing", 
    position: "Marketing Manager", 
    status: "active", 
    location: "New York, NY",
    hireDate: "2020-02-18",
    manager: "Robert Wilson",
    skills: ["Content Strategy", "Social Media", "Analytics", "SEO"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 3, 
    firstName: "Michael", 
    lastName: "Johnson", 
    email: "michael.j@example.com", 
    phone: "+1 (555) 345-6789",
    department: "Finance", 
    position: "Financial Analyst", 
    status: "on leave", 
    location: "Chicago, IL",
    hireDate: "2021-03-24",
    manager: "Emily Williams",
    skills: ["Financial Reporting", "Data Analysis", "Forecasting", "Excel"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 4, 
    firstName: "Emily", 
    lastName: "Williams", 
    email: "emily.w@example.com", 
    phone: "+1 (555) 456-7890",
    department: "HR", 
    position: "HR Specialist", 
    status: "active", 
    location: "Austin, TX",
    hireDate: "2018-11-05",
    manager: "James Taylor",
    skills: ["Recruiting", "Employee Relations", "Training", "Compliance"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 5, 
    firstName: "David", 
    lastName: "Brown", 
    email: "david.b@example.com", 
    phone: "+1 (555) 567-8901",
    department: "Engineering", 
    position: "Frontend Developer", 
    status: "active", 
    location: "San Francisco, CA",
    hireDate: "2022-01-10",
    manager: "John Doe",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 6, 
    firstName: "Sarah", 
    lastName: "Miller", 
    email: "sarah.m@example.com", 
    phone: "+1 (555) 678-9012",
    department: "Product", 
    position: "Product Manager", 
    status: "active", 
    location: "Seattle, WA",
    hireDate: "2019-09-15",
    manager: "James Taylor",
    skills: ["Product Strategy", "User Research", "Agile", "Roadmapping"],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 7, 
    firstName: "James", 
    lastName: "Taylor", 
    email: "james.t@example.com", 
    phone: "+1 (555) 789-0123",
    department: "Executive", 
    position: "CTO", 
    status: "active", 
    location: "Boston, MA",
    hireDate: "2017-06-20",
    manager: "",
    skills: ["Leadership", "Strategic Planning", "Technology Architecture", "Team Building"],
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 8, 
    firstName: "Jennifer", 
    lastName: "Davis", 
    email: "jennifer.d@example.com", 
    phone: "+1 (555) 890-1234",
    department: "Marketing", 
    position: "Content Specialist", 
    status: "on leave", 
    location: "New York, NY",
    hireDate: "2021-07-12",
    manager: "Jane Smith",
    skills: ["Content Creation", "Copywriting", "Social Media", "SEO"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 9, 
    firstName: "Robert", 
    lastName: "Wilson", 
    email: "robert.w@example.com", 
    phone: "+1 (555) 901-2345",
    department: "Sales", 
    position: "Sales Director", 
    status: "active", 
    location: "Miami, FL",
    hireDate: "2018-03-15",
    manager: "James Taylor",
    skills: ["Sales Strategy", "Customer Relations", "Team Leadership", "Negotiation"],
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 10, 
    firstName: "Lisa", 
    lastName: "Anderson", 
    email: "lisa.a@example.com", 
    phone: "+1 (555) 012-3456",
    department: "Engineering", 
    position: "Backend Developer", 
    status: "active", 
    location: "San Francisco, CA",
    hireDate: "2020-11-02",
    manager: "John Doe",
    skills: ["Java", "Spring", "PostgreSQL", "API Development"],
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 11, 
    firstName: "Thomas", 
    lastName: "Moore", 
    email: "thomas.m@example.com", 
    phone: "+1 (555) 234-5678",
    department: "Design", 
    position: "UX Designer", 
    status: "active", 
    location: "Portland, OR",
    hireDate: "2022-02-15",
    manager: "Sarah Miller",
    skills: ["User Research", "Wireframing", "Prototyping", "Figma"],
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
  { 
    id: 12, 
    firstName: "Amanda", 
    lastName: "Jackson", 
    email: "amanda.j@example.com", 
    phone: "+1 (555) 345-6789",
    department: "Finance", 
    position: "Accountant", 
    status: "terminated", 
    location: "Chicago, IL",
    hireDate: "2019-01-22",
    terminationDate: "2023-08-01",
    manager: "Michael Johnson",
    skills: ["Accounting", "Financial Reporting", "Auditing", "Tax Preparation"],
    avatar: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
  },
];

// All departments in the system
const DEPARTMENTS = [
  "All Departments",
  "Engineering", 
  "Marketing", 
  "Finance", 
  "HR", 
  "Product", 
  "Sales", 
  "Design", 
  "Executive"
];

function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [viewMode, setViewMode] = useState("table"); // table, grid
  const [filteredEmployees, setFilteredEmployees] = useState(EMPLOYEES);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState("add"); // add, edit
  
  // Filter employees based on search term and department selection
  useEffect(() => {
    let results = [...EMPLOYEES];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter(
        employee => 
          employee.firstName.toLowerCase().includes(lowercasedSearch) ||
          employee.lastName.toLowerCase().includes(lowercasedSearch) ||
          employee.email.toLowerCase().includes(lowercasedSearch) ||
          employee.department.toLowerCase().includes(lowercasedSearch) ||
          employee.position.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply department filter
    if (selectedDepartment !== "All Departments") {
      results = results.filter(employee => employee.department === selectedDepartment);
    }
    
    setFilteredEmployees(results);
  }, [searchTerm, selectedDepartment]);

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

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = () => {
    setFormMode("add");
    setSelectedEmployee(null);
    setShowFormModal(true);
  };

  const handleEditEmployee = (employee) => {
    setFormMode("edit");
    setSelectedEmployee(employee);
    setShowDetailModal(false);
    setShowFormModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Employee Directory</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Manage and view all employees in your organization
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="btn btn-primary"
            onClick={handleAddEmployee}
          >
            <UserPlus size={18} className="mr-1.5" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Filters and controls */}
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 p-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 md:w-80 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto justify-between"
                onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
              >
                <span>{selectedDepartment}</span>
                <ChevronDown size={16} className="ml-2" />
              </button>
              
              {showDepartmentDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept}
                      className={`w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 ${
                        selectedDepartment === dept ? 'bg-surface-100 dark:bg-surface-700' : ''
                      }`}
                      onClick={() => {
                        setSelectedDepartment(dept);
                        setShowDepartmentDropdown(false);
                      }}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-surface-300 dark:border-surface-600 rounded-lg">
              <button 
                className={`px-3 py-1.5 flex items-center justify-center ${
                  viewMode === 'table' 
                    ? 'bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-surface-100' 
                    : 'bg-white dark:bg-surface-800 text-surface-500 dark:text-surface-400'
                } rounded-l-lg`}
                onClick={() => setViewMode('table')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                  <line x1="15" y1="3" x2="15" y2="21"/>
                </svg>
              </button>
              <button 
                className={`px-3 py-1.5 flex items-center justify-center ${
                  viewMode === 'grid' 
                    ? 'bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-surface-100' 
                    : 'bg-white dark:bg-surface-800 text-surface-500 dark:text-surface-400'
                } rounded-r-lg`}
                onClick={() => setViewMode('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300">
                <Download size={18} />
              </button>
              <button className="p-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300">
                <Upload size={18} />
              </button>
              <button className="p-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'table' ? (
        // Table view
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-800/60">
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Position</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/60">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={employee.avatar} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-surface-900 dark:text-surface-100">{employee.firstName} {employee.lastName}</div>
                          <div className="text-xs text-surface-500 dark:text-surface-400">ID: {employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-surface-900 dark:text-surface-100">{employee.email}</div>
                      <div className="text-xs text-surface-500 dark:text-surface-400">{employee.phone}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-surface-900 dark:text-surface-100">{employee.department}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-surface-900 dark:text-surface-100">{employee.position}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-surface-900 dark:text-surface-100">{employee.location}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-primary hover:text-primary-dark dark:hover:text-primary-light"
                        onClick={() => handleViewEmployee(employee)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-surface-700 dark:text-surface-300">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of <span className="font-medium">{filteredEmployees.length}</span> employees
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Grid view
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEmployees.map((employee) => (
            <motion.div 
              key={employee.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden"
            >
              <div className="relative pt-6 pb-2 px-6 flex flex-col items-center">
                <span className={`absolute top-2 right-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
                <div className="h-24 w-24 mb-3">
                  <img className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-surface-700" src={employee.avatar} alt="" />
                </div>
                <h3 className="text-md font-semibold text-surface-900 dark:text-surface-100">{employee.firstName} {employee.lastName}</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400">{employee.position}</p>
                <div className="mt-1 px-2 py-0.5 bg-surface-100 dark:bg-surface-700 rounded-full text-xs text-surface-700 dark:text-surface-300">
                  {employee.department}
                </div>
              </div>
              
              <div className="px-4 py-3 space-y-2 border-t border-surface-200 dark:border-surface-700">
                <div className="flex items-center text-sm">
                  <Mail size={14} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <span className="text-surface-700 dark:text-surface-300 truncate">{employee.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone size={14} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <span className="text-surface-700 dark:text-surface-300">{employee.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin size={14} className="text-surface-500 dark:text-surface-400 mr-2" />
                  <span className="text-surface-700 dark:text-surface-300 truncate">{employee.location}</span>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-surface-50 dark:bg-surface-700/30 flex items-center justify-between">
                <button 
                  className="w-full text-primary hover:text-primary-dark dark:hover:text-primary-light text-sm font-medium"
                  onClick={() => handleViewEmployee(employee)}
                >
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Employee Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Employee Details</h3>
              <button 
                onClick={handleCloseModal}
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
                    src={selectedEmployee.avatar} 
                    alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                  <p className="text-surface-500 dark:text-surface-400">{selectedEmployee.position}</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedEmployee.status)}`}>
                      {selectedEmployee.status}
                    </span>
                    <span className="mx-2 text-surface-300 dark:text-surface-600">•</span>
                    <span className="text-sm text-surface-500 dark:text-surface-400">ID: {selectedEmployee.id}</span>
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
                      <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                    <div>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Phone</p>
                      <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                    <div>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Location</p>
                      <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                    <div>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Hire Date</p>
                      <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.hireDate}</p>
                    </div>
                  </div>
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
                      <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                    <div>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Position</p>
                      <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="text-surface-500 dark:text-surface-400 mr-2" />
                    <div>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Manager</p>
                      <p className="text-sm text-surface-900 dark:text-surface-100">
                        {selectedEmployee.manager || "None (Top Level)"}
                      </p>
                    </div>
                  </div>
                  {selectedEmployee.status === "terminated" && selectedEmployee.terminationDate && (
                    <div className="flex items-center">
                      <X size={16} className="text-red-500 mr-2" />
                      <div>
                        <p className="text-xs text-surface-500 dark:text-surface-400">Termination Date</p>
                        <p className="text-sm text-surface-900 dark:text-surface-100">{selectedEmployee.terminationDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-3 text-surface-900 dark:text-surface-100">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-surface-100 dark:bg-surface-700 rounded-full text-sm text-surface-700 dark:text-surface-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-4 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-700/30">
              <button 
                onClick={handleCloseModal}
                className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                onClick={() => handleEditEmployee(selectedEmployee)}
              >
                Edit Employee
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Employee Form Modal */}
      <EmployeeFormModal 
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        mode={formMode}
        initialData={selectedEmployee}
      />
    </div>
  );
}

export default Employees;