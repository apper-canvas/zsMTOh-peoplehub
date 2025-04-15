import { useState, useEffect, useRef } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, X, Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import dataService from "../services/dataService";
import EventForm from "../components/EventForm";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    meeting: true,
    event: true,
    deadline: true,
    holiday: true,
    training: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const filterRef = useRef(null);

  // Fetch events from data service
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const eventsData = await dataService.getEvents();
        // Convert date strings to Date objects for easier comparison
        const processedEvents = eventsData.map(event => ({
          ...event,
          dateObj: parseISO(event.date)
        }));
        setEvents(processedEvents);
        setFilteredEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle clicks outside the filter dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter events when filters change
  useEffect(() => {
    const filtered = events.filter(event => filters[event.type] || !event.type);
    setFilteredEvents(filtered);
  }, [filters, events]);

  // Navigation functions
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = day => {
    setSelectedDate(day);
  };

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Toggle filter for event types
  const toggleFilterType = type => {
    setFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Toggle event form modal
  const toggleEventForm = () => {
    setIsEventFormOpen(!isEventFormOpen);
  };

  // Handle creating a new event
  const handleCreateEvent = (eventData) => {
    // Generate a unique ID for the new event
    const newId = Math.max(0, ...events.map(e => e.id || 0)) + 1;
    
    // Create the new event object
    const newEvent = {
      id: newId,
      ...eventData,
      dateObj: parseISO(eventData.date)
    };
    
    // Add the new event to the events list
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    
    // Update filtered events accordingly
    if (filters[newEvent.type]) {
      setFilteredEvents([...filteredEvents, newEvent]);
    }
    
    // You could also call a service to save to backend
    // dataService.saveEvent(newEvent);
  };

  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Helper function to get events for a specific day
  const getEventsForDay = day => {
    return filteredEvents.filter(event => isSameDay(parseISO(event.date), day));
  };

  // Get event type color
  const getEventTypeColor = type => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "holiday":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "training":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300";
    }
  };

  // Render calendar header (days of week)
  const renderHeader = () => {
    const dateFormat = "EEE";
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-sm font-medium text-surface-500 dark:text-surface-400 py-2 text-center">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 border-b border-surface-200 dark:border-surface-700">{days}</div>;
  };

  // Render calendar cells
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const dayEvents = getEventsForDay(day);

        days.push(
          <div
            key={day}
            className={`min-h-[100px] p-1 border border-surface-200 dark:border-surface-700 ${
              !isSameMonth(day, monthStart)
                ? "bg-surface-100 dark:bg-surface-800/50 text-surface-400 dark:text-surface-600"
                : "bg-white dark:bg-surface-800"
            } ${isSameDay(day, selectedDate) ? "bg-primary/5 dark:bg-primary/20" : ""}`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex flex-col h-full">
              <div className={`text-right p-1 ${
                isSameDay(day, new Date()) 
                  ? "bg-primary rounded-full w-6 h-6 ml-auto flex items-center justify-center text-white"
                  : ""
              }`}>
                {formattedDate}
              </div>
              <div className="flex-grow overflow-y-auto mt-1 space-y-1">
                {dayEvents.length > 0 && 
                  dayEvents.slice(0, 3).map((event, idx) => (
                    <div 
                      key={idx}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${getEventTypeColor(event.type)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))
                }
                {dayEvents.length > 3 && (
                  <div className="text-xs text-center text-surface-500 dark:text-surface-400">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden">{rows}</div>;
  };

  // Filter options
  const filterOptions = [
    { type: "meeting", label: "Meetings", color: "bg-blue-500" },
    { type: "event", label: "Events", color: "bg-purple-500" },
    { type: "deadline", label: "Deadlines", color: "bg-red-500" },
    { type: "holiday", label: "Holidays", color: "bg-green-500" },
    { type: "training", label: "Training", color: "bg-amber-500" }
  ];

  // Events for the selected date
  const selectedDateEvents = getEventsForDay(selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">Calendar</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            View and manage company events and schedules
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="card">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-lg font-semibold mx-4">{format(currentMonth, "MMMM yyyy")}</h2>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300">
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative" ref={filterRef}>
                  <button 
                    className="px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 flex items-center text-sm"
                    onClick={toggleFilter}
                  >
                    <Filter size={16} className="mr-2" />
                    <span>Filter</span>
                  </button>
                  {isFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg z-10 p-3 w-48">
                      <div className="text-sm font-medium mb-2 text-surface-900 dark:text-surface-100">Event Types</div>
                      {filterOptions.map(option => (
                        <button
                          key={option.type}
                          className="flex items-center w-full px-2 py-1.5 rounded-md mb-1 last:mb-0 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer transition-colors"
                          onClick={() => toggleFilterType(option.type)}
                        >
                          <span className={`w-4 h-4 rounded-sm mr-2 ${option.color} ${!filters[option.type] ? 'opacity-30' : ''}`}></span>
                          <span className={`text-sm ${!filters[option.type] ? 'text-surface-500 dark:text-surface-500' : 'text-surface-700 dark:text-surface-300'}`}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button 
                  className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark flex items-center text-sm"
                  onClick={toggleEventForm}
                >
                  <Plus size={16} className="mr-2" />
                  <span>Add Event</span>
                </button>
                
                <button 
                  className="px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark flex items-center text-sm"
                  onClick={goToToday}
                >
                  <CalendarIcon size={16} className="mr-2" />
                  <span>Today</span>
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-2 text-surface-500 dark:text-surface-400">Loading calendar...</p>
              </div>
            ) : (
              <div className="p-2">
                {renderHeader()}
                {renderCells()}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span>{format(selectedDate, "MMMM d, yyyy")}</span>
            </h3>
            
            <div className="space-y-4">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-3 rounded-lg ${
                      selectedEvent && selectedEvent.id === event.id 
                        ? 'ring-2 ring-primary'
                        : 'bg-surface-50 dark:bg-surface-700'
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    
                    {event.startTime && (
                      <div className="flex items-center mt-2 text-xs text-surface-500 dark:text-surface-400">
                        <Clock size={14} className="mr-1" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center mt-1 text-xs text-surface-500 dark:text-surface-400">
                        <MapPin size={14} className="mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.description && (
                      <p className="mt-2 text-xs text-surface-600 dark:text-surface-300">
                        {event.description}
                      </p>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-surface-500 dark:text-surface-400 text-sm">
                  No events scheduled for this day
                </div>
              )}
            </div>
          </div>
          
          {selectedEvent && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 mt-4"
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-semibold">Event Details</h3>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm text-surface-500 dark:text-surface-400">Title</h4>
                  <p className="font-medium">{selectedEvent.title}</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-surface-500 dark:text-surface-400">Date</h4>
                  <p className="font-medium">{format(parseISO(selectedEvent.date), "MMMM d, yyyy")}</p>
                </div>
                
                {selectedEvent.startTime && (
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400">Time</h4>
                    <p className="font-medium">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400">Location</h4>
                    <p className="font-medium">{selectedEvent.location}</p>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400">Description</h4>
                    <p className="text-sm text-surface-700 dark:text-surface-300">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.attendees && (
                  <div>
                    <h4 className="text-sm text-surface-500 dark:text-surface-400">Attendees</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedEvent.attendees.map((attendee, idx) => (
                        <span key={idx} className="px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full text-xs">
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-end space-x-2">
                <button className="px-3 py-1.5 text-xs border border-surface-300 dark:border-surface-600 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700">
                  Edit
                </button>
                <button className="px-3 py-1.5 text-xs bg-primary text-white rounded-md hover:bg-primary-dark">
                  Add to My Calendar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Event Form Modal */}
      <EventForm 
        isOpen={isEventFormOpen} 
        onClose={toggleEventForm} 
        onSave={handleCreateEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default Calendar;