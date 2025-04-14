import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, ChevronDown, Users, Clock, FileCheck, Award } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Sample employee data
const EMPLOYEES = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "Engineering", position: "Senior Developer", status: "active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Marketing", position: "Marketing Manager", status: "active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 3, firstName: "Michael", lastName: "Johnson", email: "michael.j@example.com", department: "Finance", position: "Financial Analyst", status: "on leave", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 4, firstName: "Emily", lastName: "Williams", email: "emily.w@example.com", department: "HR", position: "HR Specialist", status: "active", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 5, firstName: "David", lastName: "Brown", email: "david.b@example.com", department: "Engineering", position: "Frontend Developer", status: "active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
];

// Sample leave requests
const LEAVE_REQUESTS = [
  { id: 1, employeeId: 3, employeeName: "Michael Johnson", leaveType: "sick", startDate: "2023-10-15", endDate: "2023-10-18", status: "pending" },
  { id: 2, employeeId: 5, employeeName: "David Brown", leaveType: "vacation", startDate: "2023-11-01", endDate: "2023-11-10", status: "pending" },
];

// Sample performance reviews
const PERFORMANCE_REVIEWS = [
  { id: 1, employeeId: 1, employeeName: "John Doe", reviewPeriod: "Q3 2023", status: "pending" },
  { id: 2, employeeId: 2, employeeName: "Jane Smith", reviewPeriod: "Q3 2023", status: "pending" },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(EMPLOYEES);
  const [selectedTab, setSelectedTab] = useState("employees");
  
  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = EMPLOYEES.filter(
        employee => 
          employee.firstName.toLowerCase().includes(lowercasedSearch) ||
          employee.lastName.toLowerCase().includes(lowercasedSearch) ||
          employee.email.toLowerCase().includes(lowercasedSearch) ||
          employee.department.toLowerCase().includes(lowercasedSearch) ||
          employee.position.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(EMPLOYEES);
    }
  }, [searchTerm]);

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

  const getRequestStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300";
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case "sick":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "vacation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "personal":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">HR Dashboard</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Manage your workforce and HR operations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn btn-primary">
            <Plus size={18} className="mr-1.5" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Total Employees</p>
              <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">127</h3>
              <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                +4% from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary-light/20 dark:bg-primary-dark/30 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Attendance Rate</p>
              <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">96.3%</h3>
              <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                +1.2% from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-secondary-light/20 dark:bg-secondary-dark/30 flex items-center justify-center text-secondary">
              <Clock size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Pending Requests</p>
              <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">12</h3>
              <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
                8 leave, 4 document
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <FileCheck size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="card p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">Performance Reviews</p>
              <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">23</h3>
              <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
                Due in 2 weeks
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Award size={20} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="border-b border-surface-200 dark:border-surface-700 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Employee Directory</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="p-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700">
                    <Filter size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Employee</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Position</th>
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
                            <div className="text-xs text-surface-500 dark:text-surface-400">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-surface-900 dark:text-surface-100">{employee.department}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-surface-900 dark:text-surface-100">{employee.position}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary hover:text-primary-dark dark:hover:text-primary-light">
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of <span className="font-medium">{EMPLOYEES.length}</span> employees
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
          
          <MainFeature />
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="border-b border-surface-200 dark:border-surface-700 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Pending Approvals</h2>
                <div className="relative">
                  <button className="text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 flex items-center text-sm font-medium">
                    <span>All Types</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-surface-900 dark:text-surface-100">Leave Requests</h3>
                <a href="#" className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium">View All</a>
              </div>
              
              {LEAVE_REQUESTS.map((request) => (
                <div key={request.id} className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">{request.employeeName}</h4>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                          {request.leaveType}
                        </span>
                        <span className="mx-2 text-surface-400">•</span>
                        <span className="text-xs text-surface-500 dark:text-surface-400">
                          {request.startDate} to {request.endDate}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getRequestStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-dark">
                      Approve
                    </button>
                    <button className="px-3 py-1 text-xs border border-surface-300 dark:border-surface-600 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-between mt-6 mb-3">
                <h3 className="text-sm font-medium text-surface-900 dark:text-surface-100">Performance Reviews</h3>
                <a href="#" className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium">View All</a>
              </div>
              
              {PERFORMANCE_REVIEWS.map((review) => (
                <div key={review.id} className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">{review.employeeName}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-surface-500 dark:text-surface-400">
                          {review.reviewPeriod} Review
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getRequestStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <button className="w-full px-3 py-1.5 text-xs bg-primary text-white rounded-md hover:bg-primary-dark">
                      Complete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card p-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 text-center">
                  <div className="font-medium text-lg text-surface-900 dark:text-surface-100">15</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">OCT</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">Quarterly Team Meeting</h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">10:00 AM - 12:00 PM • Conference Room A</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 text-center">
                  <div className="font-medium text-lg text-surface-900 dark:text-surface-100">18</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">OCT</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">New Hire Orientation</h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">9:00 AM - 2:00 PM • Training Room</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 text-center">
                  <div className="font-medium text-lg text-surface-900 dark:text-surface-100">22</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">OCT</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">Benefits Enrollment Deadline</h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">All Day</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 text-center">
                  <div className="font-medium text-lg text-surface-900 dark:text-surface-100">31</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400">OCT</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">Company Halloween Party</h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">3:00 PM - 5:00 PM • Main Lounge</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium border border-primary rounded-lg">
              View Full Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;