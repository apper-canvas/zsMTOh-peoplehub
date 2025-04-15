import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import { Download, Calendar, Filter, ArrowUpDown, CalendarCheck, Save, Clock, CheckCircle, FileText, Building, Users, MoreHorizontal, PlusCircle } from "lucide-react";

function Reports() {
  const [activeReportType, setActiveReportType] = useState('employee');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  // Employee Chart Options
  const employeeOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    colors: ['#6366f1', '#f59e0b', '#10b981'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      borderColor: '#f1f5f9',
      row: {
        colors: ['transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#94a3b8',
      },
    },
  };

  const employeeSeries = [
    {
      name: 'New Hires',
      data: [10, 15, 8, 12, 7, 16, 9, 11, 13, 9, 12, 14]
    },
    {
      name: 'Resignations',
      data: [5, 3, 4, 6, 2, 5, 3, 4, 5, 3, 4, 3]
    },
    {
      name: 'Promotions',
      data: [2, 4, 3, 5, 4, 7, 5, 6, 4, 5, 3, 6]
    }
  ];

  // Department Chart Options
  const departmentOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    colors: ['#6366f1', '#f59e0b'],
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
        barHeight: '70%',
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Engineering', 'Sales', 'Marketing', 'Product', 'HR', 'Finance', 'Operations'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    grid: {
      borderColor: '#f1f5f9',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " employees"
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#94a3b8',
      },
    },
  };

  const departmentSeries = [
    {
      name: 'Headcount',
      data: [45, 32, 27, 21, 15, 18, 22]
    },
    {
      name: 'Open Positions',
      data: [8, 5, 3, 6, 2, 1, 4]
    }
  ];

  // Time Off Chart Options
  const timeOffOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    colors: ['#6366f1', '#f59e0b', '#10b981'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      row: {
        colors: ['transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
        },
        formatter: function (val) {
          return Math.round(val) + " days"
        }
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " days"
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#94a3b8',
      },
    },
  };

  const timeOffSeries = [
    {
      name: 'Vacation',
      data: [35, 41, 62, 42, 13, 18, 29, 53, 41, 27, 39, 38]
    },
    {
      name: 'Sick Leave',
      data: [12, 15, 21, 13, 8, 11, 9, 17, 21, 14, 16, 12]
    },
    {
      name: 'Personal Leave',
      data: [8, 7, 12, 6, 9, 5, 7, 9, 13, 10, 8, 7]
    }
  ];
  
  const savedReports = [
    {
      id: 1,
      name: "Q2 Employee Turnover",
      type: "employee",
      created: "2023-06-15",
      lastRun: "2023-09-10"
    },
    {
      id: 2,
      name: "Engineering Department Growth",
      type: "department",
      created: "2023-05-22",
      lastRun: "2023-09-08"
    },
    {
      id: 3,
      name: "Annual PTO Usage Trends",
      type: "timeoff",
      created: "2023-02-10",
      lastRun: "2023-09-05"
    },
    {
      id: 4,
      name: "New Hire Onboarding Status",
      type: "employee",
      created: "2023-08-01",
      lastRun: "2023-09-01"
    }
  ];
  
  const getTodayDate = () => {
    return format(new Date(), "MMMM d, yyyy");
  };
  
  const renderReportTypeIcon = (type) => {
    switch(type) {
      case 'employee':
        return <Users size={14} className="text-primary" />;
      case 'department':
        return <Building size={14} className="text-amber-500" />;
      case 'timeoff':
        return <Calendar size={14} className="text-emerald-500" />;
      default:
        return <FileText size={14} className="text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Reports</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Generate and manage HR analytics reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-3 py-2 text-sm bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg flex items-center gap-2 text-surface-700 dark:text-surface-300"
          >
            <Clock size={16} />
            <span>Schedule</span>
          </button>
          <button className="px-3 py-2 text-sm bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Report Type Tabs */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Report Dashboard</h2>
            <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
              <button 
                className={`px-3 py-1.5 text-sm rounded-md ${
                  activeReportType === 'employee' 
                    ? 'bg-white dark:bg-surface-800 shadow text-surface-900 dark:text-surface-100' 
                    : 'text-surface-700 dark:text-surface-300'
                }`}
                onClick={() => setActiveReportType('employee')}
              >
                Employee
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-md ${
                  activeReportType === 'department' 
                    ? 'bg-white dark:bg-surface-800 shadow text-surface-900 dark:text-surface-100' 
                    : 'text-surface-700 dark:text-surface-300'
                }`}
                onClick={() => setActiveReportType('department')}
              >
                Department
              </button>
              <button 
                className={`px-3 py-1.5 text-sm rounded-md ${
                  activeReportType === 'timeoff' 
                    ? 'bg-white dark:bg-surface-800 shadow text-surface-900 dark:text-surface-100' 
                    : 'text-surface-700 dark:text-surface-300'
                }`}
                onClick={() => setActiveReportType('timeoff')}
              >
                Time Off
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {/* Report Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <span className="text-sm text-surface-500 dark:text-surface-400">{getTodayDate()}</span>
              <h3 className="text-surface-900 dark:text-surface-100 text-md font-medium">
                {activeReportType === 'employee' && 'Employee Metrics Report'}
                {activeReportType === 'department' && 'Department Composition Report'}
                {activeReportType === 'timeoff' && 'Time Off Usage Report'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-sm border border-surface-300 dark:border-surface-600 rounded-lg bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <select 
                className="text-sm border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          
          {/* Chart Area */}
          <motion.div
            key={activeReportType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-96"
          >
            {activeReportType === 'employee' && (
              <Chart
                options={employeeOptions}
                series={employeeSeries}
                type="line"
                height="100%"
              />
            )}
            
            {activeReportType === 'department' && (
              <Chart
                options={departmentOptions}
                series={departmentSeries}
                type="bar"
                height="100%"
              />
            )}
            
            {activeReportType === 'timeoff' && (
              <Chart
                options={timeOffOptions}
                series={timeOffSeries}
                type="area"
                height="100%"
              />
            )}
          </motion.div>
          
          {/* Metrics Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeReportType === 'employee' && (
              <>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Total Employees</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">127</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 15% from last year</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">New Hires YTD</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">42</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 23% from last year</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Turnover Rate</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">8.2%</div>
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">↑ 1.5% from last year</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Avg Tenure</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">2.4 yrs</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 0.3 yrs from last year</div>
                </div>
              </>
            )}
            
            {activeReportType === 'department' && (
              <>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Total Departments</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">7</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">1 added this year</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Open Positions</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">29</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">27.6% Engineering</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Growth Leaders</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">Engineering</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 18% headcount</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Avg Team Size</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">18.1</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">Across all depts</div>
                </div>
              </>
            )}
            
            {activeReportType === 'timeoff' && (
              <>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Total PTO Used</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">685 days</div>
                  <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">42% of annual allowance</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Vacation Days</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">412 days</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 8% from last year</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Sick Leave</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">183 days</div>
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">↓ 3% from last year</div>
                </div>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="text-xs text-surface-500 dark:text-surface-400">Pending Requests</div>
                  <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">8</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Oldest: 2 days ago</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Saved Reports */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Saved Reports</h2>
          <button className="text-sm text-primary flex items-center gap-1">
            <PlusCircle size={16} />
            <span>New Report</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 dark:bg-surface-700 text-surface-500 dark:text-surface-400">
              <tr>
                <th className="py-3 px-4 text-left font-medium">Report Name</th>
                <th className="py-3 px-4 text-left font-medium">Type</th>
                <th className="py-3 px-4 text-left font-medium">Created</th>
                <th className="py-3 px-4 text-left font-medium">Last Run</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {savedReports.map((report) => (
                <tr key={report.id} className="hover:bg-surface-50 dark:hover:bg-surface-700">
                  <td className="py-3 px-4 text-surface-900 dark:text-surface-100 flex items-center gap-2">
                    {renderReportTypeIcon(report.type)}
                    <span>{report.name}</span>
                  </td>
                  <td className="py-3 px-4 text-surface-700 dark:text-surface-300 capitalize">{report.type}</td>
                  <td className="py-3 px-4 text-surface-700 dark:text-surface-300">{format(new Date(report.created), "MMM d, yyyy")}</td>
                  <td className="py-3 px-4 text-surface-700 dark:text-surface-300">{format(new Date(report.lastRun), "MMM d, yyyy")}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200" title="Run Report">
                        <CalendarCheck size={16} />
                      </button>
                      <button className="p-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200" title="Export">
                        <Download size={16} />
                      </button>
                      <button className="p-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200" title="More Options">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/50">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Schedule Report</h3>
              <button className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300" onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Report Type</label>
                <select className="w-full border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100">
                  <option value="employee">Employee Metrics Report</option>
                  <option value="department">Department Composition Report</option>
                  <option value="timeoff">Time Off Usage Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Frequency</label>
                <select className="w-full border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Recipients</label>
                <input 
                  type="text" 
                  placeholder="Email addresses (comma separated)"
                  className="w-full border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" value="pdf" className="text-primary" defaultChecked />
                    <span className="text-surface-700 dark:text-surface-300">PDF</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" value="excel" className="text-primary" />
                    <span className="text-surface-700 dark:text-surface-300">Excel</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" value="csv" className="text-primary" />
                    <span className="text-surface-700 dark:text-surface-300">CSV</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-2">
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <CalendarCheck size={18} />
                  <span>Schedule Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;