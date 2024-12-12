import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Modal from "react-modal";
import { fetchAssignedAppointmentsForGuide, fetchSchoolNameForAppointment } from "../../utils/api";
import { toast } from "react-toastify";

// Set the app element for accessibility (adjust the selector based on your app's root element)
Modal.setAppElement("#root");

// Localizer for the calendar (using moment.js)
const localizer = momentLocalizer(moment);

// Appointment type for event mapping
interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  school: string;
  note: string;
}

const StaffCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadAppointmentsWithSchoolNames = async () => {
      try {
        setIsLoading(true);

        // Fetch the assigned appointments
        const appointments = await fetchAssignedAppointmentsForGuide();

        // Map appointments to include school names
        const mappedEvents: CalendarEvent[] = await Promise.all(
          appointments.map(async (appointment) => {
            try {
              const schoolName = await fetchSchoolNameForAppointment(appointment.id);
              return {
                id: appointment.id,
                title: schoolName,
                start: new Date(`${appointment.date}T${appointment.time}`),
                end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 3 * 60 * 60 * 1000),
                school: schoolName,
                note: appointment.note
              };
            } catch (error) {
              console.error(`Error fetching school name for appointment ${appointment.id}:`, error);
              return {
                id: appointment.id,
                title: "Unknown School",
                start: new Date(`${appointment.date}T${appointment.time}`),
                end: new Date(new Date(`${appointment.date}T${appointment.time}`).getTime() + 3 * 60 * 60 * 1000),
                school: "Unknown School",
                note: appointment.note
              };
            }
          })
        );

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error loading appointments with school names:", error);
        //toast.error("Failed to load appointments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointmentsWithSchoolNames();
  }, []);

  // Custom Event Renderer (Optional: if you want to customize how events appear)
  const EventRenderer = ({ event }: { event: CalendarEvent }) => (
    <div>
      <strong>{event.title}</strong>
      <div className="text-sm text-gray-300">{moment(event.start).format("hh:mm A")}</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Staff Calendar</h1>
      <div className="bg-white p-4 rounded-lg shadow relative">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading calendar...</p>
        ) : (
          <>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 480 }}
              views={["month", "week", "day"]}
              defaultView="month"
              popup
              onSelectEvent={(event) => setSelectedEvent(event as CalendarEvent)}
              components={{
                event: EventRenderer, // Use custom event renderer if needed
              }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: "#3b82f6", // Event color
                  color: "white",
                  fontSize: "14px",
                },
              })}
            />

            {/* Modal for Appointment Details */}
            <Modal
              isOpen={!!selectedEvent}
              onRequestClose={() => setSelectedEvent(null)}
              contentLabel="Appointment Details"
              className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg z-50"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
            >
              {selectedEvent && (
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-4">Appointment Details</h2>
                  <p>
                    <strong>School:</strong> {selectedEvent.school}
                  </p>
                  <p>
                    <strong>Date:</strong> {moment(selectedEvent.start).format("MMMM Do YYYY")}
                  </p>
                  <p>
                    <strong>Time:</strong> {moment(selectedEvent.start).format("hh:mm A")} -{" "}
                    {moment(selectedEvent.end).format("hh:mm A")}
                  </p>
                  {selectedEvent.note && (
                    <p>
                      <strong>Note:</strong> {selectedEvent.note}
                    </p>
                  )}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffCalendar;
