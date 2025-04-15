import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Monitor, 
  Lock, 
  Settings as SettingsIcon, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Clock, 
  Globe, 
  Calendar, 
  FileQuestion
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  
  // Form states
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    jobTitle: "HR Manager",
    department: "Human Resources",
    phone: "+1 (555) 123-4567",
    bio: "HR professional with 8+ years of experience in employee management and organizational development."
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    employeeUpdates: true,
    systemNotifications: true,
    news: false,
    marketingEmails: false
  });
  
  const [display, setDisplay] = useState({
    theme: "system",
    compactView: false,
    highContrast: false,
    animationsEnabled: true,
    sidebarCollapsed: false
  });
  
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [system, setSystem] = useState({
    language: "english",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    fiscalYearStart: "January",
    autoLogout: "30min"
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };
  
  const handleDisplayChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDisplay({
      ...display,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity({
      ...security,
      [name]: value
    });
  };
  
  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystem({
      ...system,
      [name]: value
    });
  };
  
  const saveSettings = () => {
    // In a real app, this would save to backend
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };
  
  const tabs = [
    { id: "profile", name: "Profile", icon: <User size={18} /> },
    { id: "notifications", name: "Notifications", icon: <Bell size={18} /> },
    { id: "display", name: "Display", icon: <Monitor size={18} /> },
    { id: "security", name: "Security", icon: <Lock size={18} /> },
    { id: "system", name: "System", icon: <SettingsIcon size={18} /> }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Settings</h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      {/* Settings tabs */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <div className="card p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                      : "text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                  }`}
                >
                  <span className={`mr-3 ${
                    activeTab === tab.id
                      ? "text-primary dark:text-primary-light"
                      : "text-surface-500 dark:text-surface-400"
                  }`}>
                    {tab.icon}
                  </span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="card p-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-50">Profile Settings</h2>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="sm:w-32 flex-shrink-0 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="btn btn-outline text-sm w-full">Change Photo</button>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="label">Full Name</label>
                      <input 
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="label">Email Address</label>
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="jobTitle" className="label">Job Title</label>
                      <input 
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={profile.jobTitle}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="department" className="label">Department</label>
                      <input 
                        type="text"
                        id="department"
                        name="department"
                        value={profile.department}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="label">Phone Number</label>
                      <input 
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="bio" className="label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    className="input"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={saveSettings}
                    className="btn btn-primary"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-50">Notification Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Notification Channels</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Email Notifications</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="email"
                          checked={notifications.email}
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Push Notifications</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Receive notifications in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="push"
                          checked={notifications.push}
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Employee Updates</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Get notified when employee data changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="employeeUpdates"
                          checked={notifications.employeeUpdates}
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">System Notifications</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Get notified about system updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="systemNotifications"
                          checked={notifications.systemNotifications}
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">News & Updates</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Get company news and announcements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="news"
                          checked={notifications.news}
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Marketing Emails</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Receive marketing and promotional content</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="marketingEmails"
                          checked={notifications.marketingEmails}
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={saveSettings}
                    className="btn btn-primary"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Display Settings */}
            {activeTab === "display" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-50">Display Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Theme</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div 
                      className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center ${
                        display.theme === "light" 
                          ? "border-primary bg-primary/10 dark:bg-primary/20" 
                          : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
                      }`}
                      onClick={() => setDisplay({...display, theme: "light"})}
                    >
                      <div className="w-full h-24 rounded-md mb-3 bg-white border border-surface-200 flex items-center justify-center shadow-sm">
                        <Sun size={24} className="text-surface-700" />
                      </div>
                      <span className="font-medium">Light</span>
                    </div>
                    
                    <div 
                      className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center ${
                        display.theme === "dark" 
                          ? "border-primary bg-primary/10 dark:bg-primary/20" 
                          : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
                      }`}
                      onClick={() => setDisplay({...display, theme: "dark"})}
                    >
                      <div className="w-full h-24 rounded-md mb-3 bg-surface-900 border border-surface-700 flex items-center justify-center shadow-sm">
                        <Moon size={24} className="text-surface-300" />
                      </div>
                      <span className="font-medium">Dark</span>
                    </div>
                    
                    <div 
                      className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center ${
                        display.theme === "system" 
                          ? "border-primary bg-primary/10 dark:bg-primary/20" 
                          : "border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800"
                      }`}
                      onClick={() => setDisplay({...display, theme: "system"})}
                    >
                      <div className="w-full h-24 rounded-md mb-3 bg-gradient-to-r from-white to-surface-900 border border-surface-200 dark:border-surface-700 flex items-center justify-center shadow-sm">
                        <Monitor size={24} className="text-surface-700" />
                      </div>
                      <span className="font-medium">System</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Layout Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Compact View</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Reduce spacing between elements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="compactView"
                          checked={display.compactView}
                          onChange={handleDisplayChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">High Contrast</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Increase visual contrast</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="highContrast"
                          checked={display.highContrast}
                          onChange={handleDisplayChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Animations</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Enable interface animations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="animationsEnabled"
                          checked={display.animationsEnabled}
                          onChange={handleDisplayChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-surface-800 dark:text-surface-200 font-medium">Sidebar Default State</p>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">Start with sidebar collapsed</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="sidebarCollapsed"
                          checked={display.sidebarCollapsed}
                          onChange={handleDisplayChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={saveSettings}
                    className="btn btn-primary"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Security Settings */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-50">Security Settings</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="currentPassword" className="label">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                          name="currentPassword"
                          value={security.currentPassword}
                          onChange={handleSecurityChange}
                          className="input pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="label">New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Two-Factor Authentication</h3>
                  <div className="bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-lg p-4 mb-4">
                    <p className="text-surface-800 dark:text-surface-200 font-medium">Two-factor authentication is currently disabled</p>
                    <p className="text-surface-500 dark:text-surface-400 text-sm mb-4">Add an extra layer of security to your account by requiring both your password and a verification code from your mobile device.</p>
                    <button className="btn btn-primary">Enable 2FA</button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Account Sessions</h3>
                  <div className="overflow-hidden border border-surface-200 dark:border-surface-700 rounded-lg">
                    <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                      <thead className="bg-surface-50 dark:bg-surface-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Device</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Location</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Last Active</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-surface-900 dark:text-surface-100">Chrome on Windows</div>
                            <div className="text-xs text-surface-500 dark:text-surface-400">Current session</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            New York, USA
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            Now
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="badge badge-primary">Active</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-surface-900 dark:text-surface-100">Safari on iPhone</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            Boston, USA
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-300">
                            2 days ago
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 font-medium">Logout</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button className="btn btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30">
                    Logout All Devices
                  </button>
                  <button 
                    onClick={saveSettings}
                    className="btn btn-primary"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* System Settings */}
            {activeTab === "system" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-50">System Settings</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Regional Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="language" className="label">Language</label>
                      <div className="relative">
                        <select
                          id="language"
                          name="language"
                          value={system.language}
                          onChange={handleSystemChange}
                          className="input appearance-none pr-8"
                        >
                          <option value="english">English (US)</option>
                          <option value="spanish">Spanish</option>
                          <option value="french">French</option>
                          <option value="german">German</option>
                          <option value="chinese">Chinese</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Globe size={18} className="text-surface-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="timezone" className="label">Time Zone</label>
                      <div className="relative">
                        <select
                          id="timezone"
                          name="timezone"
                          value={system.timezone}
                          onChange={handleSystemChange}
                          className="input appearance-none pr-8"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                          <option value="Europe/Paris">Central European Time (CET)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Clock size={18} className="text-surface-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="dateFormat" className="label">Date Format</label>
                      <div className="relative">
                        <select
                          id="dateFormat"
                          name="dateFormat"
                          value={system.dateFormat}
                          onChange={handleSystemChange}
                          className="input appearance-none pr-8"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Calendar size={18} className="text-surface-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="fiscalYearStart" className="label">Fiscal Year Start</label>
                      <div className="relative">
                        <select
                          id="fiscalYearStart"
                          name="fiscalYearStart"
                          value={system.fiscalYearStart}
                          onChange={handleSystemChange}
                          className="input appearance-none pr-8"
                        >
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Calendar size={18} className="text-surface-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Session Settings</h3>
                  <div>
                    <label htmlFor="autoLogout" className="label">Auto Logout After Inactivity</label>
                    <div className="relative">
                      <select
                        id="autoLogout"
                        name="autoLogout"
                        value={system.autoLogout}
                        onChange={handleSystemChange}
                        className="input appearance-none pr-8 max-w-xs"
                      >
                        <option value="never">Never logout</option>
                        <option value="5min">5 minutes</option>
                        <option value="15min">15 minutes</option>
                        <option value="30min">30 minutes</option>
                        <option value="1hour">1 hour</option>
                        <option value="2hours">2 hours</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Clock size={18} className="text-surface-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">Help & Support</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700">
                      <FileQuestion size={24} className="text-primary mr-4" />
                      <div>
                        <p className="font-medium text-surface-900 dark:text-surface-100">Documentation</p>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">Access user guides and documentation</p>
                      </div>
                      <button className="ml-auto btn btn-outline text-sm">View Docs</button>
                    </div>
                    
                    <div className="flex items-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700">
                      <div className="p-1 rounded-full bg-surface-200 dark:bg-surface-700 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M10 11h4"></path>
                          <path d="M12 9v4"></path>
                          <path d="M10 16h4"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-surface-900 dark:text-surface-100">Submit Ticket</p>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">Get help from our support team</p>
                      </div>
                      <button className="ml-auto btn btn-outline text-sm">Open Ticket</button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-100">System Information</h3>
                  <div className="bg-surface-50 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Application Version</p>
                        <p className="text-surface-900 dark:text-surface-100">PeopleHub v0.1.0</p>
                      </div>
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Last Updated</p>
                        <p className="text-surface-900 dark:text-surface-100">June 15, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Browser</p>
                        <p className="text-surface-900 dark:text-surface-100">{window.navigator.userAgent.split(' ').slice(-1)[0].split('/')[0]}</p>
                      </div>
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400">Operating System</p>
                        <p className="text-surface-900 dark:text-surface-100">{window.navigator.platform}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={saveSettings}
                    className="btn btn-primary"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Save notification toast */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-surface-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
          >
            <div className="bg-primary/20 p-2 rounded-full mr-3">
              <Save size={16} className="text-primary-light" />
            </div>
            <div>
              <p className="font-medium">Settings saved successfully</p>
              <p className="text-surface-300 text-sm">Your changes have been applied</p>
            </div>
            <button 
              onClick={() => setShowNotificationToast(false)}
              className="ml-4 p-1 rounded-full hover:bg-surface-700"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;