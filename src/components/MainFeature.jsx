import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Chart from 'react-apexcharts';

function MainFeature() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'employee-growth',
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
    colors: ['#6366f1', '#10b981'],
    grid: {
      borderColor: '#f3f4f6',
      row: {
        colors: ['transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6b7280',
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      offsetY: -8,
      labels: {
        colors: document.documentElement.classList.contains('dark') ? '#d1d5db' : '#374151'
      }
    },
    tooltip: {
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    }
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'New Hires',
      data: [3, 4, 2, 5, 4]
    },
    {
      name: 'Departures',
      data: [1, 2, 1, 2, 1]
    }
  ]);
  
  // Update chart theme when dark mode changes
  useEffect(() => {
    const darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark');
          
          setChartOptions(prev => ({
            ...prev,
            theme: {
              mode: isDarkMode ? 'dark' : 'light'
            },
            tooltip: {
              theme: isDarkMode ? 'dark' : 'light'
            },
            legend: {
              ...prev.legend,
              labels: {
                colors: isDarkMode ? '#d1d5db' : '#374151'
              }
            }
          }));
        }
      });
    });
    
    darkModeObserver.observe(document.documentElement, { attributes: true });
    return () => darkModeObserver.disconnect();
  }, []);

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-surface-200 dark:border-surface-700 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Workforce Trends</h2>
          <button className="flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light text-sm font-medium">
            Full Report
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-md font-medium text-surface-900 dark:text-surface-100 mb-2">Employee Growth (Last 5 Months)</h3>
          <Chart 
            options={chartOptions} 
            series={chartSeries} 
            type="line" 
            height={300} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Average Tenure</h4>
            <div className="text-xl font-bold text-surface-900 dark:text-surface-100 mt-1">2.4 Years</div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-1">+0.3 years from 2022</div>
          </div>
          
          <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Retention Rate</h4>
            <div className="text-xl font-bold text-surface-900 dark:text-surface-100 mt-1">91.2%</div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-1">+2.1% from last quarter</div>
          </div>
          
          <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-surface-500 dark:text-surface-400">Time to Fill</h4>
            <div className="text-xl font-bold text-surface-900 dark:text-surface-100 mt-1">28 Days</div>
            <div className="text-sm text-amber-600 dark:text-amber-400 mt-1">-2 days from last quarter</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFeature;