import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";

function MainFeature() {
  const [activeTab, setActiveTab] = useState('attendance');
  
  // Attendance Chart Options
  const attendanceOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    colors: ['#6366f1', '#f59e0b'],
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
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      x: {
        format: 'dd/MM/yy'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#94a3b8',
      },
    },
  };

  const attendanceSeries = [
    {
      name: 'Check-ins',
      data: [112, 118, 115, 110, 107, 32, 25]
    },
    {
      name: 'Late Arrivals',
      data: [5, 7, 3, 8, 4, 1, 0]
    }
  ];

  // Department Distribution Chart Options
  const deptOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    colors: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#14b8a6'],
    labels: ['Engineering', 'Marketing', 'HR', 'Finance', 'Product', 'Sales'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#94a3b8',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 320
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const deptSeries = [45, 18, 12, 15, 21, 16];

  // Time Off Chart Options
  const timeOffOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      fontFamily: 'inherit',
    },
    colors: ['#6366f1', '#f59e0b', '#10b981'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
    fill: {
      opacity: 1
    },
    grid: {
      borderColor: '#f1f5f9',
      row: {
        colors: ['transparent'],
        opacity: 0.5,
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
      data: [12, 15, 18, 8, 22, 16]
    },
    {
      name: 'Sick',
      data: [8, 10, 13, 7, 4, 6]
    },
    {
      name: 'Personal',
      data: [5, 3, 4, 6, 2, 4]
    }
  ];

  const getTodayDate = () => {
    return format(new Date(), "MMMM d, yyyy");
  };

  return (
    <div className="card">
      <div className="border-b border-surface-200 dark:border-surface-700 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">HR Analytics</h2>
          <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
            <button 
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeTab === 'attendance' 
                  ? 'bg-white dark:bg-surface-800 shadow text-surface-900 dark:text-surface-100' 
                  : 'text-surface-700 dark:text-surface-300'
              }`}
              onClick={() => setActiveTab('attendance')}
            >
              Attendance
            </button>
            <button 
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeTab === 'departments' 
                  ? 'bg-white dark:bg-surface-800 shadow text-surface-900 dark:text-surface-100' 
                  : 'text-surface-700 dark:text-surface-300'
              }`}
              onClick={() => setActiveTab('departments')}
            >
              Departments
            </button>
            <button 
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeTab === 'timeoff' 
                  ? 'bg-white dark:bg-surface-800 shadow text-surface-900 dark:text-surface-100' 
                  : 'text-surface-700 dark:text-surface-300'
              }`}
              onClick={() => setActiveTab('timeoff')}
            >
              Time Off
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-sm text-surface-500 dark:text-surface-400">{getTodayDate()}</span>
            <h3 className="text-surface-900 dark:text-surface-100 text-md font-medium">
              {activeTab === 'attendance' && 'Weekly Attendance Overview'}
              {activeTab === 'departments' && 'Department Distribution'}
              {activeTab === 'timeoff' && 'Time Off Trends (YTD)'}
            </h3>
          </div>
          <div>
            <select className="text-sm border border-surface-300 dark:border-surface-600 rounded-lg py-1.5 px-3 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-80"
        >
          {activeTab === 'attendance' && (
            <Chart
              options={attendanceOptions}
              series={attendanceSeries}
              type="area"
              height="100%"
            />
          )}
          
          {activeTab === 'departments' && (
            <Chart
              options={deptOptions}
              series={deptSeries}
              type="donut"
              height="100%"
            />
          )}
          
          {activeTab === 'timeoff' && (
            <Chart
              options={timeOffOptions}
              series={timeOffSeries}
              type="bar"
              height="100%"
            />
          )}
        </motion.div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeTab === 'attendance' && (
            <>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Total Attendance</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">97.2%</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 1.5% from last week</div>
              </div>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Late Arrivals</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">28</div>
                <div className="text-xs text-red-600 dark:text-red-400 mt-1">↑ 12% from last week</div>
              </div>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Average Check-in</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">8:52 AM</div>
                <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">Target: 9:00 AM</div>
              </div>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Remote Work</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">43%</div>
                <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">52 employees</div>
              </div>
            </>
          )}
          
          {activeTab === 'departments' && (
            <>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Largest Dept</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">Engineering</div>
                <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">45 employees (35%)</div>
              </div>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Most Growth</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">Product</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 18% this quarter</div>
              </div>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Avg Tenure</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">2.4 yrs</div>
                <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">Across all depts</div>
              </div>
              <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div className="text-xs text-surface-500 dark:text-surface-400">Open Positions</div>
                <div className="text-xl font-semibold text-surface-900 dark:text-surface-100 mt-1">12</div>
                <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">8 in Engineering</div>
              </div>
            </>
          )}
          
          {activeTab === 'timeoff' && (
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
                <div className="text-xs text-surface-500 dark:text-surface-400">Sick Days</div>
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
  );
}

export default MainFeature;