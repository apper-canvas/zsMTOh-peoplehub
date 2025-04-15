import { useState } from "react";
import { X } from "lucide-react";
import { format } from "date-fns";

function EventForm({ isOpen, onClose, onSave, selectedDate }) {
  const [formData, setFormData] = useState({
    title: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    type: "event",
    attendees: ""
  });
  
  const [errors, setErrors] = useState({});

  const eventTypes = [
    { value: "meeting", label: "Meeting" },
    { value: "event", label: "Event" },
    { value: "deadline", label: "Deadline" },
    { value: "holiday", label: "Holiday" },
    { value: "training", label: "Training" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (formData.startTime && !formData.endTime) {
      newErrors.endTime = "End time is required when start time is provided";
    }
    
    if (!formData.startTime && formData.endTime) {
      newErrors.startTime = "Start time is required when end time is provided";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process attendees from comma-separated string to array
      const processedData = {
        ...formData,
        attendees: formData.attendees ? formData.attendees.split(',').map(a => a.trim()) : []
      };
      
      onSave(processedData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Add New Event</h2>
          <button 
            onClick={onClose}
            className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100`}
                placeholder="Event title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Event Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.startTime ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100`}
                />
                {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.endTime ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100`}
                />
                {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100"
                placeholder="Event location"
              />
            </div>
            
            <div>
              <label htmlFor="attendees" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Attendees (comma separated)
              </label>
              <input
                type="text"
                id="attendees"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100"
                placeholder="John Smith, Jane Doe"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-surface-700 dark:text-surface-100"
                placeholder="Event description"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-md text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;