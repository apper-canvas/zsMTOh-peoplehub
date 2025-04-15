import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, parseISO } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Filter, Download, User, Clock, CalendarDays, Users } from "lucide-react";

const Attendance = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
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
    alert("Filter options dialog would open here");
  };

  // Handle export button click
  const handleExportClick = () => {
    // Create a CSV data string
    const headers = ["Employee", "Department", "Status", "Time"];
    const csvRows = [headers];
    
    const filteredData = attendanceData
      .filter(record => selectedFilter === "all" || record.status === selectedFilter);
    
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

  // Pagination handlers
  const totalFilteredItems = attendanceData.filter(
    record => selectedFilter === "all" || record.status === selectedFilter
  ).length;
  
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
    alert(`Viewing details for employee ID: ${employeeId}`);
  };

  // Calculate pagination indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData
    .filter(record => selectedFilter === "all" || record.status === selectedFilter)
    .slice(indexOfFirstItem, indexOfLastItem);

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
          {calendarData.map((day) => {
            const isCurrentMonth = isSameMonth(day.date, currentMonth);
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
              {currentItems.map((record) => (
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
                      className="text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
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
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 text-sm font-medium rounded-md ${
                currentPage === totalPages 
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
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
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
                {[...Array(Math.min(totalPages, 3))].map((_, index) => (
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
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm font-medium ${
                    currentPage === totalPages 
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
    </div>
  );
};

export default Attendance;