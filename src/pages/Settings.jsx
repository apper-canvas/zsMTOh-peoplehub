import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Save, X } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Acme Corporation",
    companyLogo: "/logo.png",
    timezone: "UTC-5 (Eastern Time)",
    dateFormat: "MM/DD/YYYY",
    fiscalYearStart: "January",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    notifyOnEmployeeUpdates: true,
    notifyOnDocumentUpdates: true,
    notifyOnAttendanceIssues: true,
    digestEmailFrequency: "daily",
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    dataRetentionPeriod: "7 years",
    allowEmployeeFeedback: true,
    allowEmployeeProfileEditing: true,
    employeeDataVisibility: "managers",
    shareAnalyticsWithDepartments: true,
  });
  
  const [integrationSettings, setIntegrationSettings] = useState({
    googleWorkspace: false,
    slack: true,
    microsoftTeams: false,
    zoom: true,
    quickbooks: false,
  });
  
  const [localizationSettings, setLocalizationSettings] = useState({
    language: "English",
    currency: "USD ($)",
    firstDayOfWeek: "Sunday",
    measurementSystem: "Imperial",
    timeFormat: "12-hour",
  });
  
  const [accessSettings, setAccessSettings] = useState({
    requireTwoFactor: false,
    passwordExpiration: "90 days",
    sessionTimeout: "2 hours",
    ipRestrictions: "",
    loginAttempts: "5",
  });
  
  const [auditLogFilter, setAuditLogFilter] = useState("all");
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: "Sarah Johnson", action: "Changed company logo", timestamp: "2023-08-15 09:32:45", category: "general" },
    { id: 2, user: "Admin", action: "Updated password policy", timestamp: "2023-08-14 14:20:18", category: "security" },
    { id: 3, user: "System", action: "Backup completed", timestamp: "2023-08-14 02:00:05", category: "system" },
    { id: 4, user: "Mark Wilson", action: "Added new department", timestamp: "2023-08-13 11:42:37", category: "organization" },
    { id: 5, user: "Sarah Johnson", action: "Enabled Slack integration", timestamp: "2023-08-12 16:15:22", category: "integrations" },
    { id: 6, user: "Admin", action: "Modified user permissions", timestamp: "2023-08-11 10:08:59", category: "security" },
    { id: 7, user: "System", action: "Automatic updates installed", timestamp: "2023-08-10 03:15:00", category: "system" },
    { id: 8, user: "Emma Davis", action: "Updated notification settings", timestamp: "2023-08-09 13:27:14", category: "notifications" },
  ]);
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const saveSettings = () => {
    // Simulate saving settings to the server
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  
  const filteredLogs = auditLogFilter === "all" 
    ? auditLogs 
    : auditLogs.filter(log => log.category === auditLogFilter);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Settings</h1>
        <p className="text-surface-600 dark:text-surface-400 mt-1">
          Configure your application settings and preferences
        </p>
      </div>
      
      {/* Settings navigation and content */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow">
        <div className="border-b border-surface-200 dark:border-surface-700">
          <div className="px-1 flex overflow-x-auto">
            {[
              { id: "general", name: "General" },
              { id: "notifications", name: "Notifications" },
              { id: "privacy", name: "Privacy & Data" },
              { id: "integrations", name: "Integrations" },
              { id: "localization", name: "Localization" },
              { id: "access", name: "Access & Security" },
              { id: "audit", name: "Audit Logs" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary dark:text-primary-light"
                    : "border-transparent text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  General Settings
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Basic configuration for your organization
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Company Logo
                  </label>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-md flex items-center justify-center mr-4 border border-surface-300 dark:border-surface-600">
                      <img src="/acme-logo.png" alt="Logo" className="max-w-full max-h-full" />
                    </div>
                    <button className="px-4 py-2 bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 text-sm font-medium rounded-md transition-colors">
                      Upload New
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Timezone
                  </label>
                  <div className="relative">
                    <select 
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (Greenwich Mean Time)</option>
                      <option>UTC+1 (Central European Time)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Date Format
                  </label>
                  <div className="relative">
                    <select 
                      value={generalSettings.dateFormat}
                      onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                      <option>MMM DD, YYYY</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Fiscal Year Start
                  </label>
                  <div className="relative">
                    <select 
                      value={generalSettings.fiscalYearStart}
                      onChange={(e) => setGeneralSettings({...generalSettings, fiscalYearStart: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Notification Settings
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Configure how and when you receive notifications
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                  <div>
                    <h4 className="text-sm font-medium text-surface-900 dark:text-white">Email Notifications</h4>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      Receive notifications via email
                    </p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: !notificationSettings.emailNotifications
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="emailNotifications"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        notificationSettings.emailNotifications
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          notificationSettings.emailNotifications ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                  <div>
                    <h4 className="text-sm font-medium text-surface-900 dark:text-white">Push Notifications</h4>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: !notificationSettings.pushNotifications
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="pushNotifications"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        notificationSettings.pushNotifications
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          notificationSettings.pushNotifications ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                  <div>
                    <h4 className="text-sm font-medium text-surface-900 dark:text-white">Employee Updates</h4>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      Notify when employee information changes
                    </p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="employeeUpdates"
                      checked={notificationSettings.notifyOnEmployeeUpdates}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnEmployeeUpdates: !notificationSettings.notifyOnEmployeeUpdates
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="employeeUpdates"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        notificationSettings.notifyOnEmployeeUpdates
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          notificationSettings.notifyOnEmployeeUpdates ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                  <div>
                    <h4 className="text-sm font-medium text-surface-900 dark:text-white">Document Updates</h4>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      Notify when documents are added or modified
                    </p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="documentUpdates"
                      checked={notificationSettings.notifyOnDocumentUpdates}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnDocumentUpdates: !notificationSettings.notifyOnDocumentUpdates
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="documentUpdates"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        notificationSettings.notifyOnDocumentUpdates
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          notificationSettings.notifyOnDocumentUpdates ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-surface-200 dark:border-surface-700">
                  <div>
                    <h4 className="text-sm font-medium text-surface-900 dark:text-white">Attendance Issues</h4>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      Notify about attendance anomalies
                    </p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="attendanceIssues"
                      checked={notificationSettings.notifyOnAttendanceIssues}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyOnAttendanceIssues: !notificationSettings.notifyOnAttendanceIssues
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="attendanceIssues"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        notificationSettings.notifyOnAttendanceIssues
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          notificationSettings.notifyOnAttendanceIssues ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Digest Email Frequency
                  </label>
                  <div className="relative">
                    <select 
                      value={notificationSettings.digestEmailFrequency}
                      onChange={(e) => setNotificationSettings({...notificationSettings, digestEmailFrequency: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option value="daily">Daily Summary</option>
                      <option value="weekly">Weekly Summary</option>
                      <option value="never">Never</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Privacy & Data Settings
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Manage how data is stored and accessed
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Data Retention Period
                  </label>
                  <div className="relative">
                    <select 
                      value={privacySettings.dataRetentionPeriod}
                      onChange={(e) => setPrivacySettings({...privacySettings, dataRetentionPeriod: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>1 year</option>
                      <option>3 years</option>
                      <option>5 years</option>
                      <option>7 years</option>
                      <option>Indefinitely</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    How long to keep employee data after termination
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Employee Data Visibility
                  </label>
                  <div className="relative">
                    <select 
                      value={privacySettings.employeeDataVisibility}
                      onChange={(e) => setPrivacySettings({...privacySettings, employeeDataVisibility: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option value="managers">Managers Only</option>
                      <option value="department">Department Members</option>
                      <option value="all">All Employees</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    Who can view employee personal information
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Allow Employee Feedback</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Let employees provide feedback on colleagues
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="allowFeedback"
                        checked={privacySettings.allowEmployeeFeedback}
                        onChange={() => setPrivacySettings({
                          ...privacySettings,
                          allowEmployeeFeedback: !privacySettings.allowEmployeeFeedback
                        })}
                        className="sr-only"
                      />
                      <label
                        htmlFor="allowFeedback"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          privacySettings.allowEmployeeFeedback
                            ? "bg-primary"
                            : "bg-surface-300 dark:bg-surface-600"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                            privacySettings.allowEmployeeFeedback ? "translate-x-4" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Allow Profile Editing</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Let employees edit their own profiles
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="allowProfileEditing"
                        checked={privacySettings.allowEmployeeProfileEditing}
                        onChange={() => setPrivacySettings({
                          ...privacySettings,
                          allowEmployeeProfileEditing: !privacySettings.allowEmployeeProfileEditing
                        })}
                        className="sr-only"
                      />
                      <label
                        htmlFor="allowProfileEditing"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          privacySettings.allowEmployeeProfileEditing
                            ? "bg-primary"
                            : "bg-surface-300 dark:bg-surface-600"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                            privacySettings.allowEmployeeProfileEditing ? "translate-x-4" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Share Analytics</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Share department analytics with managers
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="shareAnalytics"
                        checked={privacySettings.shareAnalyticsWithDepartments}
                        onChange={() => setPrivacySettings({
                          ...privacySettings,
                          shareAnalyticsWithDepartments: !privacySettings.shareAnalyticsWithDepartments
                        })}
                        className="sr-only"
                      />
                      <label
                        htmlFor="shareAnalytics"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          privacySettings.shareAnalyticsWithDepartments
                            ? "bg-primary"
                            : "bg-surface-300 dark:bg-surface-600"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                            privacySettings.shareAnalyticsWithDepartments ? "translate-x-4" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-50 dark:bg-surface-700/30 rounded-lg p-4 my-4">
                <h4 className="text-sm font-medium text-surface-900 dark:text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-surface-600 dark:text-surface-400">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Data Protection Policy
                </h4>
                <p className="text-xs text-surface-600 dark:text-surface-400 mt-2">
                  Your organization is required to comply with local data protection regulations. 
                  Review your data retention and privacy policies regularly to ensure compliance 
                  with the latest regulations in your region.
                </p>
                <button className="mt-3 text-primary dark:text-primary-light text-xs flex items-center">
                  Review Data Protection Guide
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* Integration Settings */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Integration Settings
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Connect with third-party services
                </p>
              </div>
              
              <div className="divide-y divide-surface-200 dark:divide-surface-700">
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-red-100 dark:bg-red-900/20 flex items-center justify-center mr-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#EA4335">
                        <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c1.054,0,1.909-0.855,1.909-1.909v-0.818c0-1.054-0.855-1.909-1.909-1.909h-3.536c-1.054,0-1.909,0.855-1.909,1.909V12.151z M9.728,12.151L9.728,12.151c0,1.054-0.855,1.909-1.909,1.909H4.283c-1.054,0-1.909-0.855-1.909-1.909v-0.818c0-1.054,0.855-1.909,1.909-1.909h3.536c1.054,0,1.909,0.855,1.909,1.909V12.151z M12.545,18.834L12.545,18.834c0,1.054,0.855,1.909,1.909,1.909h3.536c1.054,0,1.909-0.855,1.909-1.909v-0.818c0-1.054-0.855-1.909-1.909-1.909h-3.536c-1.054,0-1.909,0.855-1.909,1.909V18.834z M9.728,18.834L9.728,18.834c0,1.054-0.855,1.909-1.909,1.909H4.283c-1.054,0-1.909-0.855-1.909-1.909v-0.818c0-1.054,0.855-1.909,1.909-1.909h3.536c1.054,0,1.909,0.855,1.909,1.909V18.834z M12.545,5.467L12.545,5.467c0,1.054,0.855,1.909,1.909,1.909h3.536c1.054,0,1.909-0.855,1.909-1.909V4.649c0-1.054-0.855-1.909-1.909-1.909h-3.536c-1.054,0-1.909,0.855-1.909,1.909V5.467z M9.728,5.467L9.728,5.467c0,1.054-0.855,1.909-1.909,1.909H4.283c-1.054,0-1.909-0.855-1.909-1.909V4.649c0-1.054,0.855-1.909,1.909-1.909h3.536c1.054,0,1.909,0.855,1.909,1.909V5.467z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Google Workspace</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Sync calendars, contacts, and documents
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="googleWorkspace"
                      checked={integrationSettings.googleWorkspace}
                      onChange={() => setIntegrationSettings({
                        ...integrationSettings,
                        googleWorkspace: !integrationSettings.googleWorkspace
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="googleWorkspace"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        integrationSettings.googleWorkspace
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          integrationSettings.googleWorkspace ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#611f69">
                        <path d="M9.879,10.121C9.667,9.909,9.333,9.909,9.121,10.121L6.293,12.95C6.082,13.162,6.082,13.495,6.293,13.707L9.121,16.536C9.333,16.747,9.667,16.747,9.879,16.536C10.09,16.324,10.09,15.99,9.879,15.778L7.364,13.264L7.364,13.393L9.879,10.879C10.09,10.667,10.09,10.333,9.879,10.121Z M14.121,10.121C13.91,10.333,13.91,10.667,14.121,10.879L16.636,13.393L16.636,13.264L14.121,15.778C13.91,15.99,13.91,16.324,14.121,16.536C14.333,16.747,14.667,16.747,14.879,16.536L17.707,13.707C17.919,13.495,17.919,13.162,17.707,12.95L14.879,10.121C14.667,9.909,14.333,9.909,14.121,10.121Z M20.063,5.5H3.938C3.697,5.5,3.5,5.697,3.5,5.938V18.063C3.5,18.303,3.697,18.5,3.938,18.5H20.063C20.303,18.5,20.5,18.303,20.5,18.063V5.938C20.5,5.697,20.303,5.5,20.063,5.5Z M19.5,17.5H4.5V6.5H19.5V17.5Z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Slack</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Send notifications to channels
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="slack"
                      checked={integrationSettings.slack}
                      onChange={() => setIntegrationSettings({
                        ...integrationSettings,
                        slack: !integrationSettings.slack
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="slack"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        integrationSettings.slack
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          integrationSettings.slack ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#4b53bc">
                        <path d="M12.002,1.934c-5.567,0-10.068,4.501-10.068,10.068c0,5.567,4.501,10.068,10.068,10.068c5.567,0,10.068-4.501,10.068-10.068C22.07,6.435,17.569,1.934,12.002,1.934z M4.067,14.795c-0.44-0.882-0.683-1.87-0.687-2.904c0.003-1.034,0.246-2.022,0.686-2.904l2.446,2.448c-0.025,0.149-0.039,0.302-0.039,0.457c-0.001,0.155,0.013,0.307,0.037,0.456L4.067,14.795z M17.305,15.076H6.696c-0.352-0.33-0.657-0.634-0.987-0.987v-4.177c0.33-0.353,0.635-0.657,0.987-0.987h10.609c0.353,0.33,0.657,0.634,0.987,0.987v4.177C17.962,14.442,17.657,14.747,17.305,15.076z M16.928,8.893c-0.092-0.134-0.184-0.267-0.243-0.384c-0.064-0.14-0.12-0.281-0.17-0.423l2.444-2.449c0.441,0.882,0.684,1.87,0.688,2.904c-0.004,1.034-0.247,2.022-0.687,2.904l-2.446-2.448c0.025-0.149,0.039-0.302,0.039-0.457C16.553,8.386,16.551,8.082,16.928,8.893z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Microsoft Teams</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Share updates via Teams
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="microsoftTeams"
                      checked={integrationSettings.microsoftTeams}
                      onChange={() => setIntegrationSettings({
                        ...integrationSettings,
                        microsoftTeams: !integrationSettings.microsoftTeams
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="microsoftTeams"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        integrationSettings.microsoftTeams
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          integrationSettings.microsoftTeams ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#0E71EB">
                        <path d="M20,7C20,4.79,18.21,3,16,3s-4,1.79-4,4v7h2V7c0-1.1,0.9-2,2-2s2,0.9,2,2v12.19L12,15.69l-4.99,3.5C6.4,19.67,6,20.5,6,21.38C6,22.82,7.18,24,8.62,24h6.76c1.44,0,2.62-1.18,2.62-2.62c0-0.88-0.4-1.71-1.01-2.19C17,19.19,20,17.01,20,14V7z M16.13,21c-0.42,0-0.77-0.34-0.77-0.77c0-0.42,0.34-0.77,0.77-0.77c0.42,0,0.77,0.34,0.77,0.77C16.9,20.66,16.56,21,16.13,21z M17.87,18c-0.42,0-0.77-0.34-0.77-0.77c0-0.42,0.34-0.77,0.77-0.77c0.42,0,0.77,0.34,0.77,0.77C18.64,17.66,18.3,18,17.87,18z M16.13,15c-0.42,0-0.77-0.34-0.77-0.77c0-0.42,0.34-0.77,0.77-0.77c0.42,0,0.77,0.34,0.77,0.77C16.9,14.66,16.56,15,16.13,15z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Zoom</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Schedule video meetings
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="zoom"
                      checked={integrationSettings.zoom}
                      onChange={() => setIntegrationSettings({
                        ...integrationSettings,
                        zoom: !integrationSettings.zoom
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="zoom"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        integrationSettings.zoom
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          integrationSettings.zoom ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#2CA01C">
                        <path d="M12.003,1.995c-5.525,0-10.005,4.479-10.005,10.004s4.479,10.005,10.005,10.005s10.004-4.48,10.004-10.005S17.528,1.995,12.003,1.995z M16.355,8.652l-5.819,5.819c-0.334,0.334-0.875,0.334-1.208,0l-3.138-3.138c-0.334-0.334-0.334-0.875,0-1.208c0.334-0.334,0.875-0.334,1.208,0l2.534,2.534l5.215-5.215c0.334-0.334,0.875-0.334,1.208,0C16.689,7.778,16.689,8.318,16.355,8.652z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">QuickBooks</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Sync payroll data
                      </p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      id="quickbooks"
                      checked={integrationSettings.quickbooks}
                      onChange={() => setIntegrationSettings({
                        ...integrationSettings,
                        quickbooks: !integrationSettings.quickbooks
                      })}
                      className="sr-only"
                    />
                    <label
                      htmlFor="quickbooks"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                        integrationSettings.quickbooks
                          ? "bg-primary"
                          : "bg-surface-300 dark:bg-surface-600"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                          integrationSettings.quickbooks ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <button className="text-primary dark:text-primary-light text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Connect More Services
                </button>
              </div>
            </div>
          )}
          
          {/* Localization Settings */}
          {activeTab === "localization" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Localization Settings
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Configure regional preferences
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Language
                  </label>
                  <div className="relative">
                    <select 
                      value={localizationSettings.language}
                      onChange={(e) => setLocalizationSettings({...localizationSettings, language: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese (Simplified)</option>
                      <option>Japanese</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Currency
                  </label>
                  <div className="relative">
                    <select 
                      value={localizationSettings.currency}
                      onChange={(e) => setLocalizationSettings({...localizationSettings, currency: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                      <option>CAD (C$)</option>
                      <option>AUD (A$)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    First Day of Week
                  </label>
                  <div className="relative">
                    <select 
                      value={localizationSettings.firstDayOfWeek}
                      onChange={(e) => setLocalizationSettings({...localizationSettings, firstDayOfWeek: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>Sunday</option>
                      <option>Monday</option>
                      <option>Saturday</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Measurement System
                  </label>
                  <div className="relative">
                    <select 
                      value={localizationSettings.measurementSystem}
                      onChange={(e) => setLocalizationSettings({...localizationSettings, measurementSystem: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>Metric</option>
                      <option>Imperial</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Time Format
                  </label>
                  <div className="relative">
                    <select 
                      value={localizationSettings.timeFormat}
                      onChange={(e) => setLocalizationSettings({...localizationSettings, timeFormat: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>12-hour</option>
                      <option>24-hour</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-md p-4 my-4">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Translation Notice
                </h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
                  Changing the language setting will translate the UI elements, but not user-generated content.
                  Existing data like employee names, department names, and documents will remain in their original language.
                </p>
              </div>
            </div>
          )}
          
          {/* Access & Security Settings */}
          {activeTab === "access" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Access & Security Settings
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Configure security and access controls
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-surface-900 dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                        Require 2FA for all users
                      </p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        id="twoFactor"
                        checked={accessSettings.requireTwoFactor}
                        onChange={() => setAccessSettings({
                          ...accessSettings,
                          requireTwoFactor: !accessSettings.requireTwoFactor
                        })}
                        className="sr-only"
                      />
                      <label
                        htmlFor="twoFactor"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                          accessSettings.requireTwoFactor
                            ? "bg-primary"
                            : "bg-surface-300 dark:bg-surface-600"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                            accessSettings.requireTwoFactor ? "translate-x-4" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Password Expiration
                  </label>
                  <div className="relative">
                    <select 
                      value={accessSettings.passwordExpiration}
                      onChange={(e) => setAccessSettings({...accessSettings, passwordExpiration: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>180 days</option>
                      <option>Never</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Session Timeout
                  </label>
                  <div className="relative">
                    <select 
                      value={accessSettings.sessionTimeout}
                      onChange={(e) => setAccessSettings({...accessSettings, sessionTimeout: e.target.value})}
                      className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                    >
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Failed Login Attempts
                    </label>
                    <div className="relative">
                      <select 
                        value={accessSettings.loginAttempts}
                        onChange={(e) => setAccessSettings({...accessSettings, loginAttempts: e.target.value})}
                        className="appearance-none w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                      >
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                      </div>
                    </div>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                      Account will be locked after this many failed attempts
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    IP Restrictions (optional)
                  </label>
                  <textarea
                    value={accessSettings.ipRestrictions}
                    onChange={(e) => setAccessSettings({...accessSettings, ipRestrictions: e.target.value})}
                    placeholder="Enter allowed IP addresses or ranges, one per line"
                    rows={3}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white resize-none"
                  ></textarea>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    Leave blank to allow access from any IP address. Enter IP addresses or CIDR notation (e.g., 192.168.1.0/24).
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-md p-4 my-4">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Security Recommendation
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                  We recommend enabling two-factor authentication for all users to improve security.
                  When 2FA is enabled, users will need to set it up the next time they log in.
                </p>
              </div>
            </div>
          )}
          
          {/* Audit Logs */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-surface-900 dark:text-white">
                  Audit Logs
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  Review system and user activity
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="relative">
                  <select 
                    value={auditLogFilter}
                    onChange={(e) => setAuditLogFilter(e.target.value)}
                    className="appearance-none px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-surface-700 dark:text-white pr-10"
                  >
                    <option value="all">All Categories</option>
                    <option value="general">General</option>
                    <option value="security">Security</option>
                    <option value="system">System</option>
                    <option value="organization">Organization</option>
                    <option value="integrations">Integrations</option>
                    <option value="notifications">Notifications</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-surface-500 dark:text-surface-400" />
                  </div>
                </div>
                
                <button className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:hover:bg-primary/30 dark:text-primary-light text-sm font-medium rounded-md transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export Logs
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                  <thead className="bg-surface-50 dark:bg-surface-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-300">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-700 dark:text-surface-200">
                          {log.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${log.category === 'security' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' : ''}
                            ${log.category === 'system' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : ''}
                            ${log.category === 'general' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : ''}
                            ${log.category === 'organization' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' : ''}
                            ${log.category === 'integrations' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' : ''}
                            ${log.category === 'notifications' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' : ''}
                          `}>
                            {log.category.charAt(0).toUpperCase() + log.category.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center py-3 px-4 bg-surface-50 dark:bg-surface-800">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-700">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 text-sm font-medium rounded-md text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-700">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-surface-700 dark:text-surface-300">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">32</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm font-medium text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-600">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm font-medium text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-surface-600">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 bg-primary/10 dark:bg-primary/20 text-sm font-medium text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary/30">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm font-medium text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-surface-600">
                        3
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm font-medium text-surface-700 dark:text-surface-300">
                        ...
                      </span>
                      <button className="relative inline-flex items-center px-4 py-2 border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm font-medium text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-surface-600">
                        8
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm font-medium text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-600">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Save button fixed at bottom */}
        <div className="border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-4 px-6 sticky bottom-0">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setRestoreModal(true)}
              className="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white"
            >
              Restore Defaults
            </button>
            
            <div className="flex items-center space-x-3">
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center"
                  >
                    <Check size={16} className="mr-1" />
                    Settings saved!
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={saveSettings}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium flex items-center transition-colors"
              >
                <Save size={16} className="mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restore Defaults Modal */}
      <AnimatePresence>
        {restoreModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 transition-opacity bg-surface-900/50"
                onClick={() => setRestoreModal(false)}
              ></motion.div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-surface-800 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-4 pt-5 pb-4 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-surface-400 hover:text-surface-500 dark:text-surface-500 dark:hover:text-surface-400 focus:outline-none"
                    onClick={() => setRestoreModal(false)}
                  >
                    <span className="sr-only">Close</span>
                    <X size={20} />
                  </button>
                </div>
                
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-surface-900 dark:text-white" id="modal-headline">
                      Restore Default Settings?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        This will reset all settings to their original values. This action cannot be undone.
                        Are you sure you want to continue?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-md hover:bg-surface-50 dark:hover:bg-surface-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-1"
                    onClick={() => setRestoreModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-2"
                    onClick={() => setRestoreModal(false)}
                  >
                    Restore Defaults
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;