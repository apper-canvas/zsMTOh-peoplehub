import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import dataService from '../services/dataService';

function DashboardCharts() {
  const [attendanceData, setAttendanceData] = useState({
    months: [],
    rates: []
  });
  
  const [departmentDistribution, setDepartmentDistribution] = useState({
    labels: [],
    data: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadChartData = async () => {
      try {
        // Get attendance data
        const attendance = JSON.parse(localStorage.getItem('peopleHub_attendance'));
        
        if (attendance && attendance.monthlyData) {
          setAttendanceData({
            months: attendance.monthlyData.map(item => item.month),
            rates: attendance.monthlyData.map(item => item.rate)
          });
        }
        
        // Get employee data for department distribution
        const employees = await dataService.getEmployees();
        
        // Calculate department distribution
        const departmentCounts = employees.reduce((acc, employee) => {
          acc[employee.department] = (acc[employee.department] || 0) + 1;
          return acc;
        }, {});
        
        // Convert to arrays for chart
        const deptLabels = Object.keys(departmentCounts);
        const deptData = deptLabels.map(dept => departmentCounts[dept]);
        
        setDepartmentDistribution({
          labels: deptLabels,
          data: deptData
        });
      } catch (error) {
        console.error("Error loading chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChartData();
  }, []);
  
  const attendanceOptions = {
    chart: {
      id: 'attendance-chart',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#6366f1'],
    grid: {
      borderColor: '#f3f4f6',
      row: {
        colors: ['transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: attendanceData.months,
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
    },
    yaxis: {
      min: 90,
      max: 100,
      labels: {
        style: {
          colors: '#6b7280',
        },
        formatter: function (value) {
          return value.toFixed(1) + '%';
        }
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toFixed(1) + '%';
        }
      }
    },
    theme: {
      mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    }
  };
  
  const attendanceSeries = [
    {
      name: 'Attendance Rate',
      data: attendanceData.rates
    }
  ];
  
  const departmentOptions = {
    chart: {
      id: 'department-chart',
      toolbar: {
        show: false
      }
    },
    labels: departmentDistribution.labels,
    colors: ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#10b981', '#06b6d4', '#f59e0b'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#374151'
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    theme: {
      mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    }
  };
  
  if (isLoading) {
    return (
      <div className="card p-4 h-80 flex items-center justify-center">
        <div className="text-surface-500 dark:text-surface-400">Loading charts...</div>
      </div>
    );
  }
  
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-surface-200 dark:border-surface-700 p-4">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">HR Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <div>
          <h3 className="text-md font-medium text-surface-900 dark:text-surface-100 mb-4">Monthly Attendance Rate</h3>
          <Chart 
            options={attendanceOptions} 
            series={attendanceSeries} 
            type="line" 
            height={250} 
          />
        </div>
        
        <div>
          <h3 className="text-md font-medium text-surface-900 dark:text-surface-100 mb-4">Department Distribution</h3>
          <Chart 
            options={departmentOptions} 
            series={departmentDistribution.data} 
            type="pie" 
            height={250} 
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;