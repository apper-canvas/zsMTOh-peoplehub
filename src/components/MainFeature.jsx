import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, AlertCircle, Check, X, ChevronDown, ChevronUp } from "lucide-react";

function MainFeature() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const leaveTypes = [
    { id: "sick", label: "Sick Leave" },
    { id: "vacation", label: "Vacation" },
    { id: "personal", label: "Personal Leave" },
    { id: "bereavement", label: "Bereavement" },
    { id: "unpaid", label: "Unpaid Leave" },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!leaveType) {
      newErrors.leaveType = "Please select a leave type";
    }
    
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!endDate) {
      newErrors.endDate = "End date is required";
    } else if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }
    
    if (!reason.trim()) {
      newErrors.reason = "Please provide a reason for your leave";
    } else if (reason.trim().length < 10) {
      newErrors.reason = "Reason must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setLeaveType("");
          setStartDate("");
          setEndDate("");
          setReason("");
          setIsSuccess(false);
          setShowAdvanced(false);
        }, 3000);
      }, 1500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card overflow-visible"
    >
      <div className="border-b border-surface-200 dark:border-surface-700 p-4">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Request Leave</h2>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          Submit a new leave request for approval
        </p>
      </div>
      
      <div className="p-5">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg p-4 flex items-center"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <Check size={20} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Leave Request Submitted</h3>
                <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                  Your leave request has been submitted successfully and is pending approval.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="leaveType" className="label">Leave Type</label>
                  <div className="relative">
                    <select
                      id="leaveType"
                      className={`input appearance-none pr-10 ${errors.leaveType ? 'border-red-500 dark:border-red-700' : ''}`}
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                    >
                      <option value="">Select leave type</option>
                      {leaveTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown size={18} className="text-surface-500" />
                    </div>
                  </div>
                  {errors.leaveType && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.leaveType}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="startDate" className="label">Start Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="startDate"
                        className={`input pl-10 ${errors.startDate ? 'border-red-500 dark:border-red-700' : ''}`}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar size={16} className="text-surface-500" />
                      </div>
                    </div>
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.startDate}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="label">End Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="endDate"
                        className={`input pl-10 ${errors.endDate ? 'border-red-500 dark:border-red-700' : ''}`}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar size={16} className="text-surface-500" />
                      </div>
                    </div>
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="reason" className="label">Reason for Leave</label>
                <textarea
                  id="reason"
                  rows="3"
                  className={`input resize-none ${errors.reason ? 'border-red-500 dark:border-red-700' : ''}`}
                  placeholder="Please provide details about your leave request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                {errors.reason ? (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.reason}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                    Provide sufficient details to help your manager understand your request.
                  </p>
                )}
              </div>
              
              <div>
                <button
                  type="button"
                  className="flex items-center text-sm text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  {showAdvanced ? (
                    <>
                      <ChevronUp size={16} className="mr-1" />
                      Hide advanced options
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} className="mr-1" />
                      Show advanced options
                    </>
                  )}
                </button>
                
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="halfDay" className="label">Half Day Options</label>
                            <select id="halfDay" className="input">
                              <option value="">No half day</option>
                              <option value="first-half-start">First half on start date</option>
                              <option value="second-half-start">Second half on start date</option>
                              <option value="first-half-end">First half on end date</option>
                              <option value="second-half-end">Second half on end date</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="attachment" className="label">Attachments (Optional)</label>
                            <div className="relative">
                              <input
                                type="file"
                                id="attachment"
                                className="hidden"
                              />
                              <label
                                htmlFor="attachment"
                                className="flex items-center justify-center w-full px-4 py-2 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800"
                              >
                                <span className="text-sm text-surface-600 dark:text-surface-400">
                                  Click to upload documents
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="delegate" className="label">Delegate Tasks To (Optional)</label>
                          <select id="delegate" className="input">
                            <option value="">Select a team member</option>
                            <option value="1">John Doe - Senior Developer</option>
                            <option value="2">Jane Smith - Marketing Manager</option>
                            <option value="3">Michael Johnson - Financial Analyst</option>
                            <option value="4">Emily Williams - HR Specialist</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setLeaveType("");
                    setStartDate("");
                    setEndDate("");
                    setReason("");
                    setErrors({});
                    setShowAdvanced(false);
                  }}
                >
                  Cancel
                </button>
                
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default MainFeature;