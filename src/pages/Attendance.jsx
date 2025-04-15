import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, parseISO, isWithinInterval, isBefore, isAfter, parse } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Filter, Download, User, Clock, CalendarDays, Users, X, Search } from "lucide-react";

const Attendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Filter states
  const [filterCriteria, setFilterCriteria] = useState({
    dateFrom: "",
    dateTo: "",
    status: [],
    department: "",
    employeeName: ""
  });
  
  const [appliedFilters, setAppliedFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: [],
    department: "",
    employeeName: ""
  });
  
  // Mock attendance data
  const attendanceData = [
    { id: 1, employee: "Michael Foster", status: "present", time: "2023-06-01T08:55:00", department: "Engineering" },
    { id: 2, employee: "Lindsay Walton", status: "late", time: "2023-06-01T09:30:00", department: "Marketing" },
    { id: 3, employee: "Courtney Henry", status: "absent", time: null, department: "Design" },
    { id: 4, employee: "Tom Cook", status: "present", time: "2023-06-01T08:45:00", department: "Product" },
    { id: 5, employee: "Whitney Francis", status: "present", time: "2023-06-01T08:50:00", department: "HR" },
    { id: 6, employee: "Leonard Krasner", status: "leave", time: null, department: "Finance" },
    { id: 7, employee: "Floyd Miles", status: "present", time: "2023-06-01T08:30:00", department: "Engineering" },
    { id: 8, employee: "Emily Selman", status: "late", time: "2023-06-01T10:15:00", department: "Sales" }
  ];

  // Get unique departments for filter dropdown
  const departments = [...new Set(attendanceData.map(item => item.department))];
  
  // Additional employee data for modal
  const employeeDetails = {
    1: { email: "michael.foster@example.com", phone: "+1 (555) 123-4567", position: "Senior Developer", joinDate: "2021-03-15" },
    2: { email: "lindsay.walton@example.com", phone: "+1 (555) 234-5678", position: "Marketing Manager", joinDate: "2020-07-22" },
    3: { email: "courtney.henry@example.com", phone: "+1 (555) 345-6789", position: "UI Designer", joinDate: "2022-01-10" },
    4: { email: "tom.cook@example.com", phone: "+1 (555) 456-7890", position: "Product Manager", joinDate: "2019-11-05" },
    5: { email: "whitney.francis@example.com", phone: "+1 (555) 567-8901", position: "HR Director", joinDate: "2021-09-18" },
    6: { email: "leonard.krasner@example.com", phone: "+1 (555) 678-9012", position: "Finance Analyst", joinDate: "2020-05-27" },
    7: { email: "floyd.miles@example.com", phone: "+1 (555) 789-0123", position: "Junior Developer", joinDate: "2022-04-03" },
    8: { email: "emily.selman@example.com", phone: "+1 (555) 890-1234", position: "Sales Representative", joinDate: "2021-08-12" }
  };

  // Mock attendance history for the employee detail modal
  const employeeAttendanceHistory = [
    { date: "2023-06-05", status: "present", checkIn: "08:45", checkOut: "17:30" },
    { date: "2023-06-04", status: "present", checkIn: "08:55", checkOut: "17:45" },
    { date: "2023-06-03", status: "late", checkIn: "09:30", checkOut: "18:00" },
    { date: "2023-06-02", status: "present", checkIn: "08:50", checkOut: "17:40" },
    { date: "2023-06-01", status: "present", checkIn: "08:45", checkOut: "17:30" }
  ];

  // Mock attendance summary data
  const attendanceSummary = {
    present: 68,
    absent: 12,
    late: 18,
    leave: 8
  };

  // Calendar navigation
  const nextMonth = () => {
    const nextMonthDate = new Date(currentMonth);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentMonth(nextMonthDate);
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setCurrentMonth(prevMonthDate);
  };

  // Generate calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Determine the day of the week (0-6) for the first day of the month
  const firstDayOfMonth = getDay(monthStart);

  // Mock calendar data with attendance status
  const calendarData = days.map(day => {
    // Generate random attendance data for demonstration
    const totalEmployees = 106;
    const presentCount = Math.floor(Math.random() * 80) + 10;
    const absentCount = Math.floor(Math.random() * 10);
    const lateCount = Math.floor(Math.random() * 15);
    const leaveCount = totalEmployees - presentCount - absentCount - lateCount;
    
    return {
      date: day,
      attendance: {
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        leave: leaveCount
      }
    };
  });

  // Filter handlers
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle filter button click
  const handleFilterButtonClick = () => {
    setIsFilterModalOpen(true);
  };

  // Handle closing the filter modal
  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
    // Reset filter criteria to applied filters
    setFilterCriteria({...appliedFilters});
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    setAppliedFilters({...filterCriteria});
    setIsFilterModalOpen(false);
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    const emptyFilters = {
      dateFrom: "",
      dateTo: "",
      status: [],
      department: "",
      employeeName: ""
    };
    setFilterCriteria(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSelectedFilter("all"); // Reset the status filter buttons as well
    setCurrentPage(1);
  };

  // Handle filter input changes
  const handleFilterInputChange = (name, value) => {
    setFilterCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle status checkbox changes
  const handleStatusChange = (status) => {
    setFilterCriteria(prev => {
      const statusArray = [...prev.status];
      if (statusArray.includes(status)) {
        return {
          ...prev,
          status: statusArray.filter(s => s !== status)
        };
      } else {
        return {
          ...prev,
          status: [...statusArray, status]
        };
      }
    });
  };

  // Handle export button click
  const handleExportClick = () => {
    // Create a CSV data string
    const headers = ["Employee", "Department", "Status", "Time"];
    const csvRows = [headers];
    
    const filteredData = filterAttendanceData();
    
    filteredData.forEach(record => {
      const time = record.time ? format(parseISO(record.time), 'h:mm a') : '-';
      csvRows.push([
        record.employee,
        record.department,
        record.status,
        time
      ]);
    });
    
    const csvData = csvRows.map(row => row.join(',')).join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `attendance_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter attendance data based on all applied filters
  const filterAttendanceData = () => {
    return attendanceData.filter(record => {
      // Filter by status button selection 
      if (selectedFilter !== "all" && record.status !== selectedFilter) {
        return false;
      }
      
      // Filter by applied filters
      
      // Filter by employee name
      if (appliedFilters.employeeName && !record.employee.toLowerCase().includes(appliedFilters.employeeName.toLowerCase())) {
        return false;
      }
      
      // Filter by department
      if (appliedFilters.department && record.department !== appliedFilters.department) {
        return false;
      }
      
      // Filter by status
      if (appliedFilters.status.length > 0 && !appliedFilters.status.includes(record.status)) {
        return false;
      }
      
      // Filter by date range
      if (appliedFilters.dateFrom || appliedFilters.dateTo) {
        if (!record.time) return false; // Skip records without time
        
        const recordDate = parseISO(record.time);
        
        if (appliedFilters.dateFrom) {
          const fromDate = parse(appliedFilters.dateFrom, 'yyyy-MM-dd', new Date());
          if (isBefore(recordDate, fromDate)) return false;
        }
        
        if (appliedFilters.dateTo) {
          const toDate = parse(appliedFilters.dateTo, 'yyyy-MM-dd', new Date());
          // Add a day to include the end date
          toDate.setDate(toDate.getDate() + 1);
          if (isAfter(recordDate, toDate)) return false;
        }
      }
      
      return true;
    });
  };

  // Pagination handlers
  const filteredData = filterAttendanceData();
  const totalFilteredItems = filteredData.length;
  
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle view employee details
  const handleViewDetails = (employeeId) => {
    const employee = attendanceData.find(emp => emp.id === employeeId);
    setViewingEmployee({
      ...employee,
      details: employeeDetails[employeeId],
      attendanceHistory: employeeAttendanceHistory
    });
  };

  // Close employee detail modal
  const handleCloseModal = () => {
    setViewingEmployee(null);
  };

  // Calculate pagination indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      appliedFilters.dateFrom !== "" ||
      appliedFilters.dateTo !== "" ||
      appliedFilters.status.length > 0 ||
      appliedFilters.department !== "" ||
      appliedFilters.employeeName !== ""
    );
  };

  return (
    <div className="h-full">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Attendance Management</h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Track and manage employee attendance records
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleFilterButtonClick}
            className="inline-flex items-center justify-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm text-sm font-medium text-surface-700 dark:text-surface-200 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700"
          >
            <Filter size={16} className="mr-2" />
            Filter
            {hasActiveFilters() && (
              <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </button>
          <button 
            onClick={handleExportClick}
            className="inline-flex items-center justify-center px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Attendance overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <User size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-surface-500 dark:text-surface-400">Present</h2>
              <p className="text-2xl font-semibold text-surface-900 dark:text-white">{attendanceSummary.present}%</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${attendanceSummary.present}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <Users size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-surface-500 dark:text-surface-400">Absent</h2>
              <p className="text-2xl font-semibold text-surface-900 dark:text-white">{attendanceSummary.absent}%</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${attendanceSummary.absent}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
              <Clock size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-surface-500 dark:text-surface-400">Late</h2>
              <p className="text-2xl font-semibold text-surface-900 dark:text-white">{attendanceSummary.late}%</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${attendanceSummary.late}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <CalendarDays size={20} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-surface-500 dark:text-surface-400">On Leave</h2>
              <p className="text-2xl font-semibold text-surface-900 dark:text-white">{attendanceSummary.leave}%</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${attendanceSummary.leave}%` }}></div>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="mb-6 bg-white dark:bg-surface-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Attendance Calendar</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Fixed Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-surface-500 dark:text-surface-400">
              {day}
            </div>
          ))}

          {/* Empty cells for days before the first day of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 p-1 bg-surface-50 dark:bg-surface-850 rounded-md"></div>
          ))}

          {/* Calendar days */}
          {calendarData.map((day, index) => {
            const isCurrentDay = isToday(day.date);
            
            return (
              <div
                key={day.date.toISOString()}
                className={`h-24 p-1 rounded-md border dark:border-surface-700 ${
                  isCurrentDay
                    ? 'bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary'
                    : 'bg-white dark:bg-surface-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${
                    isCurrentDay ? 'text-primary dark:text-primary-light' : 'text-surface-700 dark:text-surface-300'
                  }`}>
                    {format(day.date, 'd')}
                  </span>
                  {isCurrentDay && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary text-white">Today</span>
                  )}
                </div>
                <div className="text-xs mt-1">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>{day.attendance.present}</span>
                  </div>
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span>{day.attendance.absent}</span>
                  </div>
                  <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    <span>{day.attendance.late}</span>
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span>{day.attendance.leave}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex items-center space-x-4 justify-end">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-surface-600 dark:text-surface-400">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs text-surface-600 dark:text-surface-400">Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <span className="text-xs text-surface-600 dark:text-surface-400">Late</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-xs text-surface-600 dark:text-surface-400">Leave</span>
          </div>
        </div>
      </div>

      {/* Recent Attendance Records */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Attendance</h2>
            <div className="flex space-x-1">
              <button 
                onClick={() => handleFilterChange("all")} 
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedFilter === "all" 
                    ? "bg-primary text-white" 
                    : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                All
              </button>
              <button 
                onClick={() => handleFilterChange("present")} 
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedFilter === "present" 
                    ? "bg-green-500 text-white" 
                    : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                Present
              </button>
              <button 
                onClick={() => handleFilterChange("absent")} 
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedFilter === "absent" 
                    ? "bg-red-500 text-white" 
                    : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                Absent
              </button>
              <button 
                onClick={() => handleFilterChange("late")} 
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedFilter === "late" 
                    ? "bg-yellow-500 text-white" 
                    : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                Late
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
            <thead className="bg-surface-50 dark:bg-surface-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
              {currentItems.length > 0 ? (
                currentItems.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-surface-200 dark:bg-surface-700"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-surface-900 dark:text-white">
                            {record.employee}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-surface-700 dark:text-surface-300">{record.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        record.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                      {record.time ? format(parseISO(record.time), 'h:mm a') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewDetails(record.id)}
                        className="text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                        type="button"
                        aria-label={`View details for ${record.employee}`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-surface-500 dark:text-surface-400">
                    No records found matching the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white dark:bg-surface-800 px-4 py-3 flex items-center justify-between border-t border-surface-200 dark:border-surface-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 text-sm font-medium rounded-md ${
                currentPage === 1 
                  ? "text-surface-400 dark:text-surface-500 cursor-not-allowed" 
                  : "text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700"
              }`}
            >
              Previous
            </button>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 text-sm font-medium rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? "text-surface-400 dark:text-surface-500 cursor-not-allowed" 
                  : "text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-surface-700 dark:text-surface-300">
                Showing <span className="font-medium">{totalFilteredItems > 0 ? indexOfFirstItem + 1 : 0}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastItem, totalFilteredItems)}</span> of{' '}
                <span className="font-medium">{totalFilteredItems}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm font-medium ${
                    currentPage === 1 
                      ? "text-surface-400 dark:text-surface-500 cursor-not-allowed" 
                      : "text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {totalPages > 0 && [...Array(Math.min(totalPages, 3))].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    aria-current={currentPage === index + 1 ? "page" : undefined}
                    className={`${
                      currentPage === index + 1
                        ? "z-10 bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary text-primary dark:text-primary-light"
                        : "bg-white dark:bg-surface-800 border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {index + 1}
                  </button>
                ))}
                {totalPages > 3 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm font-medium text-surface-700 dark:text-surface-300">
                    ...
                  </span>
                )}
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm font-medium ${
                    currentPage === totalPages || totalPages === 0
                      ? "text-surface-400 dark:text-surface-500 cursor-not-allowed" 
                      : "text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {viewingEmployee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                Employee Details
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-surface-200 dark:bg-surface-700"></div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-white">
                    {viewingEmployee.employee}
                  </h4>
                  <p className="text-sm text-surface-500 dark:text-surface-400">
                    {viewingEmployee.department} • {viewingEmployee.details.position}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-surface-500 dark:text-surface-400">Contact Information</h5>
                      <ul className="mt-2 space-y-2">
                        <li className="text-sm text-surface-700 dark:text-surface-300">
                          <span className="font-medium">Email:</span> {viewingEmployee.details.email}
                        </li>
                        <li className="text-sm text-surface-700 dark:text-surface-300">
                          <span className="font-medium">Phone:</span> {viewingEmployee.details.phone}
                        </li>
                        <li className="text-sm text-surface-700 dark:text-surface-300">
                          <span className="font-medium">Join Date:</span> {viewingEmployee.details.joinDate}
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-surface-500 dark:text-surface-400">Today's Status</h5>
                      <div className="mt-2">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          viewingEmployee.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          viewingEmployee.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          viewingEmployee.status === 'late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {viewingEmployee.status.charAt(0).toUpperCase() + viewingEmployee.status.slice(1)}
                        </span>
                        {viewingEmployee.time && (
                          <p className="mt-1 text-sm text-surface-700 dark:text-surface-300">
                            Check-in: {format(parseISO(viewingEmployee.time), 'h:mm a')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="text-sm font-medium text-surface-900 dark:text-white mb-2">Attendance History</h5>
                <div className="overflow-x-auto border border-surface-200 dark:border-surface-700 rounded-lg">
                  <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                    <thead className="bg-surface-50 dark:bg-surface-800">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Check In
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                          Check Out
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                      {viewingEmployee.attendanceHistory.map((record, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            {record.date}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              record.status === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              record.status === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                              record.status === 'late' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            {record.checkIn || '-'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            {record.checkOut || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-surface-50 dark:bg-surface-900 text-right sm:px-6 border-t border-surface-200 dark:border-surface-700">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex justify-center py-2 px-4 border border-surface-300 dark:border-surface-600 shadow-sm text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                Filter Attendance Records
              </h3>
              <button 
                onClick={handleCloseFilterModal}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {/* Date range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dateFrom" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Date From
                    </label>
                    <input
                      type="date"
                      id="dateFrom"
                      value={filterCriteria.dateFrom}
                      onChange={(e) => handleFilterInputChange('dateFrom', e.target.value)}
                      className="block w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="dateTo" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Date To
                    </label>
                    <input
                      type="date"
                      id="dateTo"
                      value={filterCriteria.dateTo}
                      onChange={(e) => handleFilterInputChange('dateTo', e.target.value)}
                      className="block w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filterCriteria.status.includes('present')}
                        onChange={() => handleStatusChange('present')}
                        className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-surface-700 dark:text-surface-300">Present</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filterCriteria.status.includes('absent')}
                        onChange={() => handleStatusChange('absent')}
                        className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-surface-700 dark:text-surface-300">Absent</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filterCriteria.status.includes('late')}
                        onChange={() => handleStatusChange('late')}
                        className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-surface-700 dark:text-surface-300">Late</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filterCriteria.status.includes('leave')}
                        onChange={() => handleStatusChange('leave')}
                        className="rounded border-surface-300 dark:border-surface-600 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-surface-700 dark:text-surface-300">Leave</span>
                    </label>
                  </div>
                </div>
                
                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    value={filterCriteria.department}
                    onChange={(e) => handleFilterInputChange('department', e.target.value)}
                    className="block w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                {/* Employee name */}
                <div>
                  <label htmlFor="employeeName" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Employee Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="employeeName"
                      placeholder="Search by name"
                      value={filterCriteria.employeeName}
                      onChange={(e) => handleFilterInputChange('employeeName', e.target.value)}
                      className="block w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-surface-400 dark:text-surface-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-3 bg-surface-50 dark:bg-surface-900 sm:px-6 border-t border-surface-200 dark:border-surface-700 flex justify-between">
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex justify-center py-2 px-4 border border-surface-300 dark:border-surface-600 shadow-sm text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-500"
              >
                Clear All
              </button>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleCloseFilterModal}
                  className="inline-flex justify-center py-2 px-4 border border-surface-300 dark:border-surface-600 shadow-sm text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;