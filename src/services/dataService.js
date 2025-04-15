// Data storage management with localStorage
const storageKeys = {
  EMPLOYEES: 'peopleHub_employees',
  LEAVE_REQUESTS: 'peopleHub_leaveRequests',
  PERFORMANCE_REVIEWS: 'peopleHub_performanceReviews',
  EVENTS: 'peopleHub_events',
  ATTENDANCE: 'peopleHub_attendance',
};

// Initial data for first run
const initialEmployees = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", department: "Engineering", position: "Senior Developer", status: "active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", department: "Marketing", position: "Marketing Manager", status: "active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 3, firstName: "Michael", lastName: "Johnson", email: "michael.j@example.com", department: "Finance", position: "Financial Analyst", status: "on leave", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 4, firstName: "Emily", lastName: "Williams", email: "emily.w@example.com", department: "HR", position: "HR Specialist", status: "active", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 5, firstName: "David", lastName: "Brown", email: "david.b@example.com", department: "Engineering", position: "Frontend Developer", status: "active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 6, firstName: "Sarah", lastName: "Miller", email: "sarah.m@example.com", department: "Product", position: "Product Manager", status: "active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 7, firstName: "James", lastName: "Wilson", email: "james.w@example.com", department: "Engineering", position: "Backend Developer", status: "active", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
  { id: 8, firstName: "Jennifer", lastName: "Taylor", email: "jennifer.t@example.com", department: "Design", position: "UI/UX Designer", status: "terminated", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" },
];

const initialLeaveRequests = [
  { id: 1, employeeId: 3, employeeName: "Michael Johnson", leaveType: "sick", startDate: "2023-10-15", endDate: "2023-10-18", status: "pending", createdAt: new Date().toISOString() },
  { id: 2, employeeId: 5, employeeName: "David Brown", leaveType: "vacation", startDate: "2023-11-01", endDate: "2023-11-10", status: "pending", createdAt: new Date().toISOString() },
  { id: 3, employeeId: 7, employeeName: "James Wilson", leaveType: "personal", startDate: "2023-10-20", endDate: "2023-10-21", status: "pending", createdAt: new Date().toISOString() },
];

const initialPerformanceReviews = [
  { id: 1, employeeId: 1, employeeName: "John Doe", reviewPeriod: "Q3 2023", status: "pending", dueDate: "2023-10-30", createdAt: new Date().toISOString() },
  { id: 2, employeeId: 2, employeeName: "Jane Smith", reviewPeriod: "Q3 2023", status: "pending", dueDate: "2023-10-30", createdAt: new Date().toISOString() },
  { id: 3, employeeId: 4, employeeName: "Emily Williams", reviewPeriod: "Q3 2023", status: "pending", dueDate: "2023-11-05", createdAt: new Date().toISOString() },
  { id: 4, employeeId: 6, employeeName: "Sarah Miller", reviewPeriod: "Q3 2023", status: "pending", dueDate: "2023-11-05", createdAt: new Date().toISOString() },
];

const initialEvents = [
  { id: 1, title: "Quarterly Team Meeting", date: "2023-10-15", startTime: "10:00 AM", endTime: "12:00 PM", location: "Conference Room A" },
  { id: 2, title: "New Hire Orientation", date: "2023-10-18", startTime: "9:00 AM", endTime: "2:00 PM", location: "Training Room" },
  { id: 3, title: "Benefits Enrollment Deadline", date: "2023-10-22", startTime: "", endTime: "", location: "All Day" },
  { id: 4, title: "Company Halloween Party", date: "2023-10-31", startTime: "3:00 PM", endTime: "5:00 PM", location: "Main Lounge" },
];

const initialAttendance = {
  currentRate: 96.3,
  previousRate: 95.1,
  monthlyData: [
    { month: "May", rate: 94.2 },
    { month: "Jun", rate: 94.8 },
    { month: "Jul", rate: 95.1 },
    { month: "Aug", rate: 95.6 },
    { month: "Sep", rate: 96.3 },
  ]
};

// Initialize localStorage with data if it doesn't exist
const initializeData = () => {
  if (!localStorage.getItem(storageKeys.EMPLOYEES)) {
    localStorage.setItem(storageKeys.EMPLOYEES, JSON.stringify(initialEmployees));
  }
  
  if (!localStorage.getItem(storageKeys.LEAVE_REQUESTS)) {
    localStorage.setItem(storageKeys.LEAVE_REQUESTS, JSON.stringify(initialLeaveRequests));
  }
  
  if (!localStorage.getItem(storageKeys.PERFORMANCE_REVIEWS)) {
    localStorage.setItem(storageKeys.PERFORMANCE_REVIEWS, JSON.stringify(initialPerformanceReviews));
  }
  
  if (!localStorage.getItem(storageKeys.EVENTS)) {
    localStorage.setItem(storageKeys.EVENTS, JSON.stringify(initialEvents));
  }
  
  if (!localStorage.getItem(storageKeys.ATTENDANCE)) {
    localStorage.setItem(storageKeys.ATTENDANCE, JSON.stringify(initialAttendance));
  }
};

// Helper functions for data operations
const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Employee-related operations
const getEmployees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getData(storageKeys.EMPLOYEES));
    }, 300); // simulate network delay
  });
};

const getEmployeeById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = getData(storageKeys.EMPLOYEES);
      const employee = employees.find(emp => emp.id === id);
      resolve(employee || null);
    }, 200);
  });
};

const addEmployee = (employee) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = getData(storageKeys.EMPLOYEES);
      const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      const newEmployee = { 
        ...employee, 
        id: newId,
        status: "active" 
      };
      
      employees.push(newEmployee);
      saveData(storageKeys.EMPLOYEES, employees);
      resolve(newEmployee);
    }, 500);
  });
};

const updateEmployee = (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = getData(storageKeys.EMPLOYEES);
      const index = employees.findIndex(emp => emp.id === id);
      
      if (index !== -1) {
        employees[index] = { ...employees[index], ...updates };
        saveData(storageKeys.EMPLOYEES, employees);
        resolve(employees[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

const deleteEmployee = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = getData(storageKeys.EMPLOYEES);
      const filteredEmployees = employees.filter(emp => emp.id !== id);
      saveData(storageKeys.EMPLOYEES, filteredEmployees);
      resolve({ success: true });
    }, 500);
  });
};

// Leave request operations
const getLeaveRequests = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getData(storageKeys.LEAVE_REQUESTS));
    }, 300);
  });
};

const updateLeaveRequest = (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const requests = getData(storageKeys.LEAVE_REQUESTS);
      const index = requests.findIndex(req => req.id === id);
      
      if (index !== -1) {
        requests[index] = { ...requests[index], ...updates };
        saveData(storageKeys.LEAVE_REQUESTS, requests);
        
        // If approving/rejecting, update employee status if needed
        if (updates.status === 'approved' && requests[index].leaveType !== 'personal') {
          const employees = getData(storageKeys.EMPLOYEES);
          const empIndex = employees.findIndex(emp => emp.id === requests[index].employeeId);
          
          if (empIndex !== -1) {
            employees[empIndex].status = 'on leave';
            saveData(storageKeys.EMPLOYEES, employees);
          }
        }
        
        resolve(requests[index]);
      } else {
        resolve(null);
      }
    }, 400);
  });
};

// Performance review operations
const getPerformanceReviews = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getData(storageKeys.PERFORMANCE_REVIEWS));
    }, 300);
  });
};

const updatePerformanceReview = (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reviews = getData(storageKeys.PERFORMANCE_REVIEWS);
      const index = reviews.findIndex(rev => rev.id === id);
      
      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...updates };
        saveData(storageKeys.PERFORMANCE_REVIEWS, reviews);
        resolve(reviews[index]);
      } else {
        resolve(null);
      }
    }, 400);
  });
};

// Event operations
const getEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getData(storageKeys.EVENTS));
    }, 200);
  });
};

// Get dashboard metrics
const getDashboardMetrics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = getData(storageKeys.EMPLOYEES);
      const leaveRequests = getData(storageKeys.LEAVE_REQUESTS);
      const performanceReviews = getData(storageKeys.PERFORMANCE_REVIEWS);
      const attendance = getData(storageKeys.ATTENDANCE);
      
      const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'pending').length;
      const pendingDocumentRequests = 4; // Mock data
      const pendingReviews = performanceReviews.filter(rev => rev.status === 'pending').length;
      
      resolve({
        totalEmployees: employees.length,
        employeeGrowth: 4, // percentage growth
        attendanceRate: attendance.currentRate,
        attendanceGrowth: (attendance.currentRate - attendance.previousRate).toFixed(1),
        pendingRequests: pendingLeaveRequests + pendingDocumentRequests,
        pendingLeaveRequests,
        pendingDocumentRequests,
        pendingReviews,
        reviewsDueInTwoWeeks: pendingReviews
      });
    }, 400);
  });
};

// Export the service
const dataService = {
  initializeData,
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getLeaveRequests,
  updateLeaveRequest,
  getPerformanceReviews,
  updatePerformanceReview,
  getEvents,
  getDashboardMetrics
};

export default dataService;