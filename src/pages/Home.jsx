import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, ChevronDown, Users, Clock, FileCheck, Award, Loader } from "lucide-react";
import MainFeature from "../components/MainFeature";
import DashboardCharts from "../components/DashboardCharts";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import dataService from "../services/dataService";

function Home() {
  // Dashboard metrics state
  const [metrics, setMetrics] = useState({
    totalEmployees: 0,
    employeeGrowth: 0,
    attendanceRate: 0,
    attendanceGrowth: 0,
    pendingRequests: 0,
    pendingLeaveRequests: 0,
    pendingDocumentRequests: 0,
    pendingReviews: 0,
    reviewsDueInTwoWeeks: 0
  });
  
  // Employee directory state
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  
  // Leave requests state
  const [leaveRequests, setLeaveRequests] = useState([]);
  
  // Performance reviews state
  const [performanceReviews, setPerformanceReviews] = useState([]);
  
  // Events state
  const [events, setEvents] = useState([]);
  
  // Modal states
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isEmployeeDetailModalOpen, setIsEmployeeDetailModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Initialize data service
  useEffect(() => {
    dataService.initializeData();
    loadDashboardData();
  }, []);
  
  // Load all dashboard data
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load dashboard metrics
      const dashboardMetrics = await dataService.getDashboardMetrics();
      setMetrics(dashboardMetrics);
      
      // Load employees
      const employeesData = await dataService.getEmployees();
      setEmployees(employeesData);
      setFilteredEmployees(employeesData);
      
      // Load leave requests
      const leaveRequestsData = await dataService.getLeaveRequests();
      setLeaveRequests(leaveRequestsData.filter(req => req.status === 'pending'));
      
      // Load performance reviews
      const reviewsData = await dataService.getPerformanceReviews();
      setPerformanceReviews(reviewsData.filter(rev => rev.status === 'pending'));
      
      // Load events
      const eventsData = await dataService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter employees when search term changes
  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = employees.filter(
        employee => 
          employee.firstName.toLowerCase().includes(lowercasedSearch) ||
          employee.lastName.toLowerCase().includes(lowercasedSearch) ||
          employee.email.toLowerCase().includes(lowercasedSearch) ||
          employee.department.toLowerCase().includes(lowercasedSearch) ||
          employee.position.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredEmployees(filtered);
      setCurrentPage(1); // Reset to first page on new search
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);
  
  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Status display helpers
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
  
  // Action handlers
  const handleAddEmployee = (newEmployee) => {
    loadDashboardData(); // Reload all data to update counts and lists
  };
  
  const handleEmployeeView = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setIsEmployeeDetailModalOpen(true);
    }
  };
  
  const handleCloseEmployeeDetailModal = () => {
    setIsEmployeeDetailModalOpen(false);
    setSelectedEmployee(null);
  };
  
  const handleApproveLeaveRequest = async (requestId) => {
    try {
      await dataService.updateLeaveRequest(requestId, { status: 'approved' });
      // Update the local state
      setLeaveRequests(prev => prev.filter(req => req.id !== requestId));
      // Reload dashboard metrics
      const dashboardMetrics = await dataService.getDashboardMetrics();
      setMetrics(dashboardMetrics);
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };
  
  const handleRejectLeaveRequest = async (requestId) => {
    try {
      await dataService.updateLeaveRequest(requestId, { status: 'rejected' });
      // Update the local state
      setLeaveRequests(prev => prev.filter(req => req.id !== requestId));
      // Reload dashboard metrics
      const dashboardMetrics = await dataService.getDashboardMetrics();
      setMetrics(dashboardMetrics);
    } catch (error) {
      console.error("Error rejecting leave request:", error);
    }
  };
  
  const handleCompleteReview = async (reviewId) => {
    try {
      await dataService.updatePerformanceReview(reviewId, { status: 'completed' });
      // Update the local state
      setPerformanceReviews(prev => prev.filter(rev => rev.id !== reviewId));
      // Reload dashboard metrics
      const dashboardMetrics = await dataService.getDashboardMetrics();
      setMetrics(dashboardMetrics);
    } catch (error) {
      console.error("Error completing review:", error);
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
          <button 
            className="btn btn-primary"
            onClick={() => setIsAddEmployeeModalOpen(true)}
          >
            <Plus size={18} className="mr-1.5" />
            Add Employee
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <>
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
                  <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">{metrics.totalEmployees}</h3>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                    +{metrics.employeeGrowth}% from last month
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
                  <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">{metrics.attendanceRate}%</h3>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                    +{metrics.attendanceGrowth}% from last month
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
                  <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">{metrics.pendingRequests}</h3>
                  <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
                    {metrics.pendingLeaveRequests} leave, {metrics.pendingDocumentRequests} document
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
                  <h3 className="text-2xl font-bold mt-1 text-surface-900 dark:text-surface-50">{metrics.pendingReviews}</h3>
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
                      {currentEmployees.length > 0 ? (
                        currentEmployees.map((employee) => (
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
                              <button 
                                className="text-primary hover:text-primary-dark dark:hover:text-primary-light"
                                onClick={() => handleEmployeeView(employee.id)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-6 text-center text-surface-500 dark:text-surface-400">
                            {searchTerm ? 'No employees match your search' : 'No employees found'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="border-t border-surface-200 dark:border-surface-700 px-4 py-3 flex items-center justify-between">
                  <div className="text-sm text-surface-700 dark:text-surface-300">
                    Showing <span className="font-medium">{indexOfFirstEmployee + 1}</span> to <span className="font-medium">{Math.min(indexOfLastEmployee, filteredEmployees.length)}</span> of <span className="font-medium">{filteredEmployees.length}</span> employees
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`px-3 py-1 rounded-md border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              
              <DashboardCharts />
              
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
                    <button className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium">View All</button>
                  </div>
                  
                  {leaveRequests.length > 0 ? (
                    leaveRequests.map((request) => (
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
                          <button 
                            className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-dark"
                            onClick={() => handleApproveLeaveRequest(request.id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="px-3 py-1 text-xs border border-surface-300 dark:border-surface-600 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
                            onClick={() => handleRejectLeaveRequest(request.id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg text-center text-surface-500 dark:text-surface-400 text-sm">
                      No pending leave requests
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-6 mb-3">
                    <h3 className="text-sm font-medium text-surface-900 dark:text-surface-100">Performance Reviews</h3>
                    <button className="text-xs text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium">View All</button>
                  </div>
                  
                  {performanceReviews.length > 0 ? (
                    performanceReviews.map((review) => (
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
                          <button 
                            className="w-full px-3 py-1.5 text-xs bg-primary text-white rounded-md hover:bg-primary-dark"
                            onClick={() => handleCompleteReview(review.id)}
                          >
                            Complete Review
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg text-center text-surface-500 dark:text-surface-400 text-sm">
                      No pending performance reviews
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card p-4">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">Upcoming Events</h2>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start">
                      <div className="flex-shrink-0 w-10 text-center">
                        <div className="font-medium text-lg text-surface-900 dark:text-surface-100">{event.date.split('-')[2]}</div>
                        <div className="text-xs text-surface-500 dark:text-surface-400">
                          {new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-surface-900 dark:text-surface-100">{event.title}</h4>
                        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          {event.startTime ? `${event.startTime} - ${event.endTime} • ${event.location}` : event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium border border-primary rounded-lg">
                  View Full Calendar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      <AnimatePresence>
        {isAddEmployeeModalOpen && (
          <AddEmployeeModal
            isOpen={isAddEmployeeModalOpen}
            onClose={() => setIsAddEmployeeModalOpen(false)}
            onEmployeeAdded={handleAddEmployee}
          />
        )}
      </AnimatePresence>

      {/* Employee Detail Modal */}
      <AnimatePresence>
        {isEmployeeDetailModalOpen && selectedEmployee && (
          <EmployeeDetailModal
            isOpen={isEmployeeDetailModalOpen}
            onClose={handleCloseEmployeeDetailModal}
            employee={selectedEmployee}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;