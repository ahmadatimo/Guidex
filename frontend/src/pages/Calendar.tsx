import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

// Event Data
const events = [
  {
    id: 1,
    title: "Visitor Tour for XYZ High School",
    start: new Date(2024, 10, 20, 9, 0), // Year, Month (0-based), Day, Hour, Minute
    end: new Date(2024, 10, 20, 11, 0),
  },
  {
    id: 2,
    title: "Staff Meeting",
    start: new Date(2024, 10, 21, 13, 0),
    end: new Date(2024, 10, 21, 14, 0),
  },
  {
    id: 3,
    title: "Visitor Tour for ABC Academy",
    start: new Date(2024, 10, 21, 10, 0),
    end: new Date(2024, 10, 21, 12, 0),
  },
];

// Localizer for the calendar (using moment.js)
const localizer = momentLocalizer(moment);

const StaffCalendar: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Staff Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 480 }} 
          views={["month", "week", "day"]}
          defaultView="month"
          popup
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "#3b82f6", // Customize event color
              color: "white",
              fontSize: '15px'
            },
          })}
        />
      </div>
    </div>
  );
};

export default StaffCalendar;
