import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, ChevronDown, Star, CheckCircle, Clock, AlertCircle } from "lucide-react";
import dataService from "../services/dataService";

function PerformanceReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showReviewDetailModal, setShowReviewDetailModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [newReview, setNewReview] = useState({
    employeeId: "",
    reviewPeriod: "",
    dueDate: ""
  });

  // Form for completing review
  const [reviewForm, setReviewForm] = useState({
    performanceScore: 3,
    strengths: "",
    areasToImprove: "",
    goals: "",
    managerComments: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsData = await dataService.getPerformanceReviews();
        const employeesData = await dataService.getEmployees();
        setReviews(reviewsData);
        setFilteredReviews(reviewsData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...reviews];
    
    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter(review => review.status === filterStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(review => 
        review.employeeName.toLowerCase().includes(query) || 
        review.reviewPeriod.toLowerCase().includes(query)
      );
    }
    
    setFilteredReviews(result);
  }, [reviews, filterStatus, searchQuery]);

  const handleAddReview = async () => {
    if (!newReview.employeeId || !newReview.reviewPeriod || !newReview.dueDate) {
      return; // Form validation
    }
    
    try {
      // Find employee name from selected ID
      const selectedEmployee = employees.find(emp => emp.id === parseInt(newReview.employeeId));
      const employeeName = selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : "Unknown";
      
      // Create new review object
      const reviewData = {
        employeeId: parseInt(newReview.employeeId),
        employeeName,
        reviewPeriod: newReview.reviewPeriod,
        dueDate: newReview.dueDate,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      
      // Get current reviews to generate ID (simulating backend)
      const currentReviews = await dataService.getPerformanceReviews();
      const newId = currentReviews.length > 0 ? Math.max(...currentReviews.map(r => r.id)) + 1 : 1;
      reviewData.id = newId;
      
      // Add to localStorage through our dataService
      currentReviews.push(reviewData);
      localStorage.setItem("peopleHub_performanceReviews", JSON.stringify(currentReviews));
      
      // Update state
      setReviews([...reviews, reviewData]);
      setShowAddReviewModal(false);
      setNewReview({
        employeeId: "",
        reviewPeriod: "",
        dueDate: ""
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleViewReview = (review) => {
    setSelectedReview(review);
    
    // Reset form if opening a new review
    setReviewForm({
      performanceScore: 3,
      strengths: "",
      areasToImprove: "",
      goals: "",
      managerComments: ""
    });
    
    setShowReviewDetailModal(true);
  };

  const handleUpdateReviewStatus = async (id, newStatus) => {
    try {
      await dataService.updatePerformanceReview(id, { status: newStatus });
      
      // Update local state
      const updatedReviews = reviews.map(review => 
        review.id === id ? { ...review, status: newStatus } : review
      );
      
      setReviews(updatedReviews);
      
      // Close modal if open
      if (showReviewDetailModal && selectedReview && selectedReview.id === id) {
        setSelectedReview({ ...selectedReview, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating review status:", error);
    }
  };

  const handleCompleteReview = async () => {
    if (!selectedReview) return;
    
    try {
      // Create completed review data
      const completedReview = {
        status: "completed",
        completedAt: new Date().toISOString(),
        performanceScore: reviewForm.performanceScore,
        strengths: reviewForm.strengths,
        areasToImprove: reviewForm.areasToImprove,
        goals: reviewForm.goals,
        managerComments: reviewForm.managerComments
      };
      
      // Update via service
      await dataService.updatePerformanceReview(selectedReview.id, completedReview);
      
      // Update local state
      const updatedReviews = reviews.map(review => 
        review.id === selectedReview.id ? { ...review, ...completedReview } : review
      );
      
      setReviews(updatedReviews);
      setShowReviewDetailModal(false);
    } catch (error) {
      console.error("Error completing review:", error);
    }
  };

  // Helper for rendering status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
            <AlertCircle size={12} className="mr-1" />
            Overdue
          </span>
        );
      default:
        return null;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Performance Reviews</h1>
            <p className="text-surface-500 dark:text-surface-400 mt-1">
              Manage employee performance evaluations and feedback
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={() => setShowAddReviewModal(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={18} className="mr-1" />
              New Review
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-surface-200 dark:border-surface-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-surface-800 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 text-surface-400 dark:text-surface-500" size={18} />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-surface-200 dark:border-surface-700 rounded-lg bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700"
            >
              <Filter size={18} className="mr-2 text-surface-500 dark:text-surface-400" />
              Filter
              <ChevronDown size={16} className="ml-2 text-surface-500 dark:text-surface-400" />
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-lg shadow-lg border border-surface-200 dark:border-surface-700 z-10">
                <div className="p-2">
                  <div className="text-sm font-medium text-surface-900 dark:text-white mb-2">Status</div>
                  <div className="space-y-1">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        value="all" 
                        checked={filterStatus === "all"}
                        onChange={() => setFilterStatus("all")}
                        className="text-primary focus:ring-primary dark:bg-surface-700"
                      />
                      <span className="text-sm text-surface-700 dark:text-surface-300">All</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        value="pending"
                        checked={filterStatus === "pending"}
                        onChange={() => setFilterStatus("pending")}
                        className="text-primary focus:ring-primary dark:bg-surface-700"
                      />
                      <span className="text-sm text-surface-700 dark:text-surface-300">Pending</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        value="in_progress"
                        checked={filterStatus === "in_progress"}
                        onChange={() => setFilterStatus("in_progress")}
                        className="text-primary focus:ring-primary dark:bg-surface-700"
                      />
                      <span className="text-sm text-surface-700 dark:text-surface-300">In Progress</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        value="completed"
                        checked={filterStatus === "completed"}
                        onChange={() => setFilterStatus("completed")}
                        className="text-primary focus:ring-primary dark:bg-surface-700"
                      />
                      <span className="text-sm text-surface-700 dark:text-surface-300">Completed</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        value="overdue"
                        checked={filterStatus === "overdue"}
                        onChange={() => setFilterStatus("overdue")}
                        className="text-primary focus:ring-primary dark:bg-surface-700"
                      />
                      <span className="text-sm text-surface-700 dark:text-surface-300">Overdue</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="py-32 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 mb-4">
                  <Search size={24} className="text-surface-400 dark:text-surface-500" />
                </div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">No reviews found</h3>
                <p className="text-surface-500 dark:text-surface-400 mt-1">
                  {searchQuery || filterStatus !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Get started by adding a new performance review"}
                </p>
                {(searchQuery || filterStatus !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    className="mt-4 px-4 py-2 text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="overflow-x-auto"
              >
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead className="bg-surface-50 dark:bg-surface-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Review Period
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                    {filteredReviews.map((review) => (
                      <motion.tr 
                        key={review.id}
                        variants={itemVariants}
                        className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-surface-900 dark:text-white">
                            {review.employeeName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                          {review.reviewPeriod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                          {review.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderStatusBadge(review.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => handleViewReview(review)}
                            className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium"
                          >
                            View
                          </button>
                          <span className="mx-2 text-surface-300 dark:text-surface-600">|</span>
                          {review.status === "pending" ? (
                            <button
                              onClick={() => handleUpdateReviewStatus(review.id, "in_progress")}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                              Start Review
                            </button>
                          ) : review.status === "in_progress" ? (
                            <button
                              onClick={() => handleViewReview(review)}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium"
                            >
                              Complete
                            </button>
                          ) : (
                            <button
                              onClick={() => handleViewReview(review)}
                              className="text-surface-600 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-300 font-medium"
                            >
                              Details
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Create New Performance Review</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Employee
                  </label>
                  <select
                    value={newReview.employeeId}
                    onChange={(e) => setNewReview({...newReview, employeeId: e.target.value})}
                    className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Review Period
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Q4 2023"
                    value={newReview.reviewPeriod}
                    onChange={(e) => setNewReview({...newReview, reviewPeriod: e.target.value})}
                    className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newReview.dueDate}
                    onChange={(e) => setNewReview({...newReview, dueDate: e.target.value})}
                    className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReview}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Create Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Detail Modal */}
      {showReviewDetailModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl max-w-2xl w-full my-8">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Performance Review: {selectedReview.employeeName}
                </h3>
                <button
                  onClick={() => setShowReviewDetailModal(false)}
                  className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Review Period</p>
                  <p className="font-medium text-surface-900 dark:text-white">{selectedReview.reviewPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Due Date</p>
                  <p className="font-medium text-surface-900 dark:text-white">{selectedReview.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Status</p>
                  <div className="mt-1">{renderStatusBadge(selectedReview.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-surface-500 dark:text-surface-400">Created At</p>
                  <p className="font-medium text-surface-900 dark:text-white">
                    {new Date(selectedReview.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {selectedReview.status === "completed" ? (
                <div className="space-y-4">
                  <div className="border-t border-b border-surface-200 dark:border-surface-700 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-surface-900 dark:text-white">Performance Score</h4>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <Star
                            key={score}
                            size={20}
                            fill={selectedReview.performanceScore >= score ? "currentColor" : "none"}
                            className={selectedReview.performanceScore >= score ? "text-yellow-400" : "text-surface-300 dark:text-surface-600"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-surface-900 dark:text-white mb-2">Strengths</h4>
                    <p className="text-surface-700 dark:text-surface-300 text-sm whitespace-pre-line">
                      {selectedReview.strengths || "Not provided"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-surface-900 dark:text-white mb-2">Areas to Improve</h4>
                    <p className="text-surface-700 dark:text-surface-300 text-sm whitespace-pre-line">
                      {selectedReview.areasToImprove || "Not provided"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-surface-900 dark:text-white mb-2">Future Goals</h4>
                    <p className="text-surface-700 dark:text-surface-300 text-sm whitespace-pre-line">
                      {selectedReview.goals || "Not provided"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-surface-900 dark:text-white mb-2">Manager Comments</h4>
                    <p className="text-surface-700 dark:text-surface-300 text-sm whitespace-pre-line">
                      {selectedReview.managerComments || "Not provided"}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-surface-200 dark:border-surface-700">
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      Completed on {selectedReview.completedAt ? new Date(selectedReview.completedAt).toLocaleDateString() : "Unknown"}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {selectedReview.status === "pending" ? (
                    <div className="py-8 text-center">
                      <p className="text-surface-600 dark:text-surface-400 mb-4">
                        This review is pending. Start the review process to provide feedback.
                      </p>
                      <button
                        onClick={() => handleUpdateReviewStatus(selectedReview.id, "in_progress")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Start Review Process
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-4">
                      <div>
                        <label className="block font-medium text-surface-900 dark:text-white mb-2">
                          Overall Performance Score
                        </label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              key={score}
                              type="button"
                              onClick={() => setReviewForm({...reviewForm, performanceScore: score})}
                              className="p-1 focus:outline-none"
                            >
                              <Star
                                size={24}
                                fill={reviewForm.performanceScore >= score ? "currentColor" : "none"}
                                className={reviewForm.performanceScore >= score ? "text-yellow-400" : "text-surface-300 dark:text-surface-600"}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block font-medium text-surface-900 dark:text-white mb-2">
                          Key Strengths
                        </label>
                        <textarea
                          value={reviewForm.strengths}
                          onChange={(e) => setReviewForm({...reviewForm, strengths: e.target.value})}
                          rows={3}
                          className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                          placeholder="Describe the employee's key strengths..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block font-medium text-surface-900 dark:text-white mb-2">
                          Areas to Improve
                        </label>
                        <textarea
                          value={reviewForm.areasToImprove}
                          onChange={(e) => setReviewForm({...reviewForm, areasToImprove: e.target.value})}
                          rows={3}
                          className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                          placeholder="Areas where the employee can improve..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block font-medium text-surface-900 dark:text-white mb-2">
                          Goals for Next Period
                        </label>
                        <textarea
                          value={reviewForm.goals}
                          onChange={(e) => setReviewForm({...reviewForm, goals: e.target.value})}
                          rows={3}
                          className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                          placeholder="Goals and objectives for the next period..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block font-medium text-surface-900 dark:text-white mb-2">
                          Manager Comments
                        </label>
                        <textarea
                          value={reviewForm.managerComments}
                          onChange={(e) => setReviewForm({...reviewForm, managerComments: e.target.value})}
                          rows={3}
                          className="w-full border border-surface-300 dark:border-surface-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-white"
                          placeholder="Additional comments and feedback..."
                        ></textarea>
                      </div>
                    </form>
                  )}
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowReviewDetailModal(false)}
                  className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                >
                  Close
                </button>
                
                {selectedReview.status === "in_progress" && (
                  <button
                    onClick={handleCompleteReview}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Complete Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceReviews;