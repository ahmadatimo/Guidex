import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { fetchAssignedAppointmentsForGuide } from "../../utils/api";
import { toast } from "react-toastify";

// Localizer for the calendar (using moment.js)
const localizer = momentLocalizer(moment);

// Appointment type for event mapping
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const StaffCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);

        // Fetch the assigned appointments (replace `1` with actual guide ID logic)
        const appointments = await fetchAssignedAppointmentsForGuide(1);

        // Map appointments to CalendarEvent format
        const mappedEvents = appointments.map((appointment) => ({
          id: appointment.id,
          title: appointment.note || "Appointment",
          start: new Date(`${appointment.date}T${appointment.time}`),
          end: new Date(`${appointment.date}T${appointment.time}`), // Assume 1-hour duration
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Staff Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading calendar...</p>
        ) : (
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
                backgroundColor: "#3b82f6", //event color
                color: "white",
                fontSize: "15px",
              },
            })}
          />
        )}
      </div>
    </div>
  );
};

export default StaffCalendar;
