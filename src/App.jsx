import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, User, CalendarIcon, FileText, BarChart3, Settings as SettingsIcon, Users, Briefcase, Building, Home as HomeIcon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import Documents from "./pages/Documents";
import Departments from "./pages/Departments";
import Positions from "./pages/Positions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PerformanceReviews from "./pages/PerformanceReviews";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showMenuHint, setShowMenuHint] = useState(false);

  useEffect(() => {
    // Set active link based on current location
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    // Check user preference for dark mode
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    // Initialize sidebar state based on screen size
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setSidebarOpen(isDesktop);
    };
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Show menu hint after a short delay on mobile devices
    let hintTimer;
    if (window.innerWidth < 1024 && !sidebarOpen) {
      hintTimer = setTimeout(() => {
        setShowMenuHint(true);
        // Auto-hide the hint after 5 seconds
        setTimeout(() => setShowMenuHint(false), 5000);
      }, 2000);
    }
    
    return () => {
      clearTimeout(hintTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setShowMenuHint(false); // Hide hint when sidebar is toggled
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Organized navigation with categories
  const navCategories = [
    {
      name: "Overview",
      items: [
        { name: "Dashboard", icon: <HomeIcon size={20} />, path: "/" }
      ]
    },
    {
      name: "Human Resources",
      items: [
        { name: "Employee Directory", icon: <Users size={20} />, path: "/employees" },
        { name: "Performance Reviews", icon: <FileText size={20} />, path: "/performance-reviews" },
        { name: "Attendance", icon: <CalendarIcon size={20} />, path: "/attendance" },
        { name: "Calendar", icon: <CalendarIcon size={20} />, path: "/calendar" }
      ]
    },
    {
      name: "Administration",
      items: [
        { name: "Documents", icon: <FileText size={20} />, path: "/documents" },
        { name: "Departments", icon: <Building size={20} />, path: "/departments" },
        { name: "Positions", icon: <Briefcase size={20} />, path: "/positions" }
      ]
    },
    {
      name: "Analytics",
      items: [
        { name: "Reports", icon: <BarChart3 size={20} />, path: "/reports" },
        { name: "Settings", icon: <SettingsIcon size={20} />, path: "/settings" }
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-surface-900/50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: window.innerWidth >= 1024 ? 0 : -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-30 h-full w-64 lg:w-72 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 lg:relative lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-xl font-bold text-primary">PeopleHub</h1>
            </div>
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navCategories.map((category, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400 px-4 mb-2">
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeLink === item.path
                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                            : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                        }`}
                        onClick={closeSidebarOnMobile}
                      >
                        <span className={`mr-3 ${
                          activeLink === item.path
                            ? "text-primary dark:text-primary-light"
                            : "text-surface-500 dark:text-surface-400"
                        }`}>
                          {item.icon}
                        </span>
                        <span className={`font-medium ${
                          activeLink === item.path
                            ? "font-semibold text-primary dark:text-primary-light"
                            : ""
                        }`}>
                          {item.name}
                        </span>
                        {activeLink === item.path && (
                          <ChevronRight size={16} className="ml-auto text-primary dark:text-primary-light" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          
          <div className="p-4 border-t border-surface-200 dark:border-surface-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-surface-300 dark:bg-surface-600 flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80" 
                  alt="User avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-surface-900 dark:text-surface-100">Sarah Johnson</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">HR Manager</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="relative">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center lg:bg-surface-100 lg:dark:bg-surface-700 lg:text-surface-800 lg:dark:text-surface-100 lg:hover:bg-surface-200 lg:dark:hover:bg-surface-600"
                aria-label="Toggle menu"
              >
                <Menu size={20} />
              </button>
              
              {/* Menu hint tooltip */}
              <AnimatePresence>
                {showMenuHint && !sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 top-full mt-2 px-3 py-2 bg-primary text-white text-sm rounded-md shadow-lg whitespace-nowrap z-50"
                  >
                    Click to open menu
                    <div className="absolute -top-1 left-3 w-2 h-2 bg-primary rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200 relative">
                  <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-50 dark:bg-surface-900 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/performance-reviews" element={<PerformanceReviews />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;