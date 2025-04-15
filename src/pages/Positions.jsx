import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  X, 
  Check, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

const Positions = () => {
  // State for positions data
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [positionsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  
  // State for modal dialogs
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    level: "",
    minSalary: "",
    maxSalary: "",
    responsibilities: "",
    requirements: "",
    status: "Active"
  });

  // Fetch positions data (mock data for now)
  useEffect(() => {
    const fetchPositions = () => {
      // Simulating API fetch with mock data
      const mockPositions = [
        {
          id: 1,
          title: "Software Engineer",
          department: "Engineering",
          level: "Mid-Level",
          employeeCount: 12,
          openings: 3,
          minSalary: 85000,
          maxSalary: 120000,
          status: "Active",
          lastUpdated: new Date(2023, 8, 15),
          responsibilities: "Develop and maintain web applications, collaborate with cross-functional teams, write clean and efficient code.",
          requirements: "Bachelor's degree in Computer Science, 3+ years of experience, proficiency in JavaScript and React."
        },
        {
          id: 2,
          title: "HR Manager",
          department: "Human Resources",
          level: "Senior",
          employeeCount: 2,
          openings: 0,
          minSalary: 90000,
          maxSalary: 130000,
          status: "Active",
          lastUpdated: new Date(2023, 7, 20),
          responsibilities: "Oversee HR functions, manage recruitment processes, develop HR policies and procedures.",
          requirements: "Bachelor's degree in HR or related field, 5+ years of HR experience, strong leadership skills."
        },
        {
          id: 3,
          title: "Marketing Specialist",
          department: "Marketing",
          level: "Entry-Level",
          employeeCount: 5,
          openings: 2,
          minSalary: 60000,
          maxSalary: 85000,
          status: "Active",
          lastUpdated: new Date(2023, 9, 5),
          responsibilities: "Create marketing campaigns, manage social media accounts, analyze marketing metrics.",
          requirements: "Bachelor's degree in Marketing, 1+ years of experience, knowledge of digital marketing tools."
        },
        {
          id: 4,
          title: "Product Manager",
          department: "Product",
          level: "Senior",
          employeeCount: 3,
          openings: 1,
          minSalary: 110000,
          maxSalary: 150000,
          status: "Active",
          lastUpdated: new Date(2023, 6, 10),
          responsibilities: "Define product vision and strategy, create product roadmaps, collaborate with development teams.",
          requirements: "Bachelor's degree in Business or Computer Science, 5+ years of product management experience, strong analytical skills."
        },
        {
          id: 5,
          title: "Financial Analyst",
          department: "Finance",
          level: "Mid-Level",
          employeeCount: 4,
          openings: 0,
          minSalary: 75000,
          maxSalary: 95000,
          status: "Active",
          lastUpdated: new Date(2023, 8, 1),
          responsibilities: "Prepare financial reports, analyze financial data, provide insights to management.",
          requirements: "Bachelor's degree in Finance or Accounting, 3+ years of experience, proficiency in financial analysis."
        },
        {
          id: 6,
          title: "Sales Representative",
          department: "Sales",
          level: "Entry-Level",
          employeeCount: 8,
          openings: 4,
          minSalary: 50000,
          maxSalary: 80000,
          status: "Active",
          lastUpdated: new Date(2023, 9, 12),
          responsibilities: "Generate new sales leads, meet with potential clients, negotiate contracts.",
          requirements: "Bachelor's degree preferred, 1+ years of sales experience, excellent communication skills."
        },
        {
          id: 7,
          title: "UX Designer",
          department: "Design",
          level: "Mid-Level",
          employeeCount: 3,
          openings: 1,
          minSalary: 80000,
          maxSalary: 110000,
          status: "Active",
          lastUpdated: new Date(2023, 7, 25),
          responsibilities: "Create user flows, wireframes, and prototypes, conduct user research and usability testing.",
          requirements: "Bachelor's degree in Design or related field, 3+ years of UX design experience, proficiency in design tools."
        },
        {
          id: 8,
          title: "Quality Assurance Engineer",
          department: "Engineering",
          level: "Mid-Level",
          employeeCount: 5,
          openings: 2,
          minSalary: 75000,
          maxSalary: 100000,
          status: "Active",
          lastUpdated: new Date(2023, 8, 8),
          responsibilities: "Develop and execute test plans, identify and report bugs, automate testing processes.",
          requirements: "Bachelor's degree in Computer Science, 3+ years of QA experience, knowledge of testing methodologies."
        },
        {
          id: 9,
          title: "Project Manager",
          department: "Operations",
          level: "Senior",
          employeeCount: 4,
          openings: 0,
          minSalary: 95000,
          maxSalary: 130000,
          status: "Inactive",
          lastUpdated: new Date(2023, 5, 15),
          responsibilities: "Plan and execute projects, manage project teams, report project status to stakeholders.",
          requirements: "Bachelor's degree in Business or related field, 5+ years of project management experience, PMP certification preferred."
        },
        {
          id: 10,
          title: "IT Support Specialist",
          department: "IT",
          level: "Entry-Level",
          employeeCount: 6,
          openings: 2,
          minSalary: 55000,
          maxSalary: 75000,
          status: "Active",
          lastUpdated: new Date(2023, 8, 20),
          responsibilities: "Provide technical support to employees, troubleshoot hardware and software issues, maintain IT infrastructure.",
          requirements: "Associate's degree in IT or related field, 1+ years of IT support experience, knowledge of computer systems."
        },
        {
          id: 11,
          title: "Data Scientist",
          department: "Data",
          level: "Senior",
          employeeCount: 2,
          openings: 1,
          minSalary: 120000,
          maxSalary: 160000,
          status: "Active",
          lastUpdated: new Date(2023, 7, 5),
          responsibilities: "Analyze large datasets, build predictive models, communicate insights to stakeholders.",
          requirements: "Master's degree in Data Science or related field, 5+ years of experience, proficiency in Python and R."
        },
        {
          id: 12,
          title: "Content Writer",
          department: "Marketing",
          level: "Entry-Level",
          employeeCount: 3,
          openings: 1,
          minSalary: 50000,
          maxSalary: 70000,
          status: "Active",
          lastUpdated: new Date(2023, 9, 1),
          responsibilities: "Create engaging content for blogs, social media, and marketing materials, edit and proofread content.",
          requirements: "Bachelor's degree in English, Journalism, or related field, 1+ years of writing experience, excellent writing skills."
        }
      ];
      
      setPositions(mockPositions);
      setLoading(false);
    };

    // Simulate network delay
    const timer = setTimeout(() => {
      fetchPositions();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Modal handlers
  const openAddModal = () => {
    setFormData({
      title: "",
      department: "",
      level: "",
      minSalary: "",
      maxSalary: "",
      responsibilities: "",
      requirements: "",
      status: "Active"
    });
    setShowAddModal(true);
  };

  const openEditModal = (position) => {
    setCurrentPosition(position);
    setFormData({
      title: position.title,
      department: position.department,
      level: position.level,
      minSalary: position.minSalary,
      maxSalary: position.maxSalary,
      responsibilities: position.responsibilities,
      requirements: position.requirements,
      status: position.status
    });
    setShowEditModal(true);
  };

  const openViewModal = (position) => {
    setCurrentPosition(position);
    setShowViewModal(true);
  };

  const openDeleteModal = (position) => {
    setCurrentPosition(position);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPosition = (e) => {
    e.preventDefault();
    
    const newPosition = {
      id: positions.length + 1,
      title: formData.title,
      department: formData.department,
      level: formData.level,
      employeeCount: 0,
      openings: 0,
      minSalary: parseInt(formData.minSalary),
      maxSalary: parseInt(formData.maxSalary),
      status: formData.status,
      lastUpdated: new Date(),
      responsibilities: formData.responsibilities,
      requirements: formData.requirements
    };
    
    setPositions([...positions, newPosition]);
    setShowAddModal(false);
  };

  const handleEditPosition = (e) => {
    e.preventDefault();
    
    const updatedPositions = positions.map(position => {
      if (position.id === currentPosition.id) {
        return {
          ...position,
          title: formData.title,
          department: formData.department,
          level: formData.level,
          minSalary: parseInt(formData.minSalary),
          maxSalary: parseInt(formData.maxSalary),
          status: formData.status,
          lastUpdated: new Date(),
          responsibilities: formData.responsibilities,
          requirements: formData.requirements
        };
      }
      return position;
    });
    
    setPositions(updatedPositions);
    setShowEditModal(false);
  };

  const handleDeletePosition = () => {
    const updatedPositions = positions.filter(position => position.id !== currentPosition.id);
    setPositions(updatedPositions);
    setShowDeleteModal(false);
  };

  // Sorting handler
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Pagination 
  const indexOfLastPosition = currentPage * positionsPerPage;
  const indexOfFirstPosition = indexOfLastPosition - positionsPerPage;
  
  // Filtering
  const filteredPositions = positions.filter(position => {
    // Search term filter
    const searchMatch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      position.level.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Department filter
    const departmentMatch = filterDepartment === "" || position.department === filterDepartment;
    
    return searchMatch && departmentMatch;
  });

  // Sorting
  const sortedPositions = [...filteredPositions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const currentPositions = sortedPositions.slice(indexOfFirstPosition, indexOfLastPosition);
  const totalPages = Math.ceil(filteredPositions.length / positionsPerPage);

  // Get unique departments for filter
  const departments = [...new Set(positions.map(position => position.department))];
  
  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Positions Management</h1>
            <p className="text-surface-600 dark:text-surface-400 mt-1">
              Manage position titles, responsibilities, and requirements
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-3 md:mt-0 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <Plus size={16} className="mr-2" />
            Add Position
          </button>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
          {/* Filters and search */}
          <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 py-2 pl-9 pr-4 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 placeholder-surface-500 dark:placeholder-surface-400 focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary outline-none transition-colors duration-200"
                />
                <Search 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 dark:text-surface-400" 
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <select
                  className="appearance-none w-full md:w-48 py-2 pl-9 pr-4 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary outline-none transition-colors duration-200"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                  ))}
                </select>
                <Filter 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 dark:text-surface-400" 
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-surface-200 dark:border-surface-700 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-surface-600 dark:text-surface-400">Loading positions...</p>
              </div>
            ) : currentPositions.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                  <Briefcase size={24} className="text-surface-500 dark:text-surface-400" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-surface-900 dark:text-surface-100">No positions found</h3>
                <p className="mt-1 text-surface-600 dark:text-surface-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead className="bg-surface-50 dark:bg-surface-800">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('title')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Position Title</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('department')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Department</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('level')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Level</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('employeeCount')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Employees</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('openings')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Openings</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('status')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('lastUpdated')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Last Updated</span>
                        <ArrowUpDown size={14} className="text-surface-400" />
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                  {currentPositions.map((position) => (
                    <tr 
                      key={position.id} 
                      className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-150"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-surface-900 dark:text-surface-100">{position.title}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-surface-700 dark:text-surface-300">{position.department}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-surface-700 dark:text-surface-300">{position.level}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-surface-700 dark:text-surface-300">{position.employeeCount}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-surface-700 dark:text-surface-300">{position.openings}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          position.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {position.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-surface-700 dark:text-surface-300">
                          {format(position.lastUpdated, 'MMM d, yyyy')}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openViewModal(position)}
                            className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openEditModal(position)}
                            className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(position)}
                            className="text-surface-600 hover:text-red-600 dark:text-surface-400 dark:hover:text-red-400 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          {!loading && filteredPositions.length > 0 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-surface-200 dark:border-surface-700 sm:px-6">
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-sm text-surface-700 dark:text-surface-300">
                    Showing <span className="font-medium">{indexOfFirstPosition + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastPosition, filteredPositions.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredPositions.length}</span> positions
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md flex items-center justify-center ${
                      currentPage === 1
                        ? "text-surface-400 dark:text-surface-600 cursor-not-allowed"
                        : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md flex items-center justify-center ${
                      currentPage === totalPages
                        ? "text-surface-400 dark:text-surface-600 cursor-not-allowed"
                        : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Position Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-surface-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div 
              className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">Add New Position</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-surface-400 hover:text-surface-500 dark:hover:text-surface-300"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddPosition}>
                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Position Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Department *
                        </label>
                        <select
                          name="department"
                          id="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="level" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Level *
                        </label>
                        <select
                          name="level"
                          id="level"
                          value={formData.level}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        >
                          <option value="">Select Level</option>
                          <option value="Entry-Level">Entry-Level</option>
                          <option value="Mid-Level">Mid-Level</option>
                          <option value="Senior">Senior</option>
                          <option value="Lead">Lead</option>
                          <option value="Executive">Executive</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="minSalary" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Min Salary ($) *
                        </label>
                        <input
                          type="number"
                          name="minSalary"
                          id="minSalary"
                          value={formData.minSalary}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="maxSalary" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Max Salary ($) *
                        </label>
                        <input
                          type="number"
                          name="maxSalary"
                          id="maxSalary"
                          value={formData.maxSalary}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="responsibilities" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Responsibilities *
                      </label>
                      <textarea
                        name="responsibilities"
                        id="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Requirements *
                      </label>
                      <textarea
                        name="requirements"
                        id="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
                  >
                    Add Position
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Position Modal */}
      {showEditModal && currentPosition && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-surface-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div 
              className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">Edit Position</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-surface-400 hover:text-surface-500 dark:hover:text-surface-300"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditPosition}>
                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Position Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="edit-title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-department" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Department *
                        </label>
                        <select
                          name="department"
                          id="edit-department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="edit-level" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Level *
                        </label>
                        <select
                          name="level"
                          id="edit-level"
                          value={formData.level}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        >
                          <option value="">Select Level</option>
                          <option value="Entry-Level">Entry-Level</option>
                          <option value="Mid-Level">Mid-Level</option>
                          <option value="Senior">Senior</option>
                          <option value="Lead">Lead</option>
                          <option value="Executive">Executive</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-minSalary" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Min Salary ($) *
                        </label>
                        <input
                          type="number"
                          name="minSalary"
                          id="edit-minSalary"
                          value={formData.minSalary}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-maxSalary" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Max Salary ($) *
                        </label>
                        <input
                          type="number"
                          name="maxSalary"
                          id="edit-maxSalary"
                          value={formData.maxSalary}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="edit-responsibilities" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Responsibilities *
                      </label>
                      <textarea
                        name="responsibilities"
                        id="edit-responsibilities"
                        value={formData.responsibilities}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="edit-requirements" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Requirements *
                      </label>
                      <textarea
                        name="requirements"
                        id="edit-requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="edit-status" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        id="edit-status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Position Modal */}
      {showViewModal && currentPosition && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-surface-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div 
              className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">{currentPosition.title}</h3>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-surface-400 hover:text-surface-500 dark:hover:text-surface-300"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Department</h4>
                      <p className="text-surface-900 dark:text-surface-100">{currentPosition.department}</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Level</h4>
                      <p className="text-surface-900 dark:text-surface-100">{currentPosition.level}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Salary Range</h4>
                      <p className="text-surface-900 dark:text-surface-100">
                        ${currentPosition.minSalary.toLocaleString()} - ${currentPosition.maxSalary.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Status</h4>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        currentPosition.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {currentPosition.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Current Employees</h4>
                      <p className="text-surface-900 dark:text-surface-100">{currentPosition.employeeCount}</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Open Positions</h4>
                      <p className="text-surface-900 dark:text-surface-100">{currentPosition.openings}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Responsibilities</h4>
                    <p className="text-surface-900 dark:text-surface-100 whitespace-pre-line">{currentPosition.responsibilities}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Requirements</h4>
                    <p className="text-surface-900 dark:text-surface-100 whitespace-pre-line">{currentPosition.requirements}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 mb-1">Last Updated</h4>
                    <p className="text-surface-900 dark:text-surface-100">
                      {format(currentPosition.lastUpdated, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentPosition && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-surface-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div 
              className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white dark:bg-surface-800 px-6 pt-5 pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 size={20} className="text-red-600 dark:text-red-300" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">Delete Position</h3>
                    <div className="mt-2">
                      <p className="text-sm text-surface-700 dark:text-surface-300">
                        Are you sure you want to delete the position "{currentPosition.title}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 flex flex-row-reverse justify-start space-x-3 space-x-reverse">
                <button
                  type="button"
                  onClick={handleDeletePosition}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;