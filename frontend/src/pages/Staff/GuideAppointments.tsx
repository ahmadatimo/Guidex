import React, { useState, useEffect } from "react";
import { fetchAssignedAppointmentsForGuide, Appointment } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock user simulating a logged-in guide
const mockUser = {
  id: 2, // Guide's ID
  name: "Jane Doe",
  role: "guide",
};

// Appointment statuses from backend
enum AppointmentStatus {
    CREATED = "created",
    PENDING_ADMIN = "pending_admin",
    APPROVED = "approved",
    AVAILABLE = "available",
    ACCEPTED = "accepted",
    COMPLETED = "completed",
    CANCELED = "canceled",
  }

const GuideAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchAssignedAppointmentsForGuide(mockUser.id);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching guide appointments:", error);
        toast.error("Failed to load appointments. Please try again.");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  /// Filter appointments based on status from the database
  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === AppointmentStatus.ACCEPTED 
  );

  const pastAppointments = appointments.filter(
    (appointment) => appointment.status === AppointmentStatus.COMPLETED ||
                    appointment.status === AppointmentStatus.CANCELED
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-12">
        My Appointments
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : error ? (
        <p className="text-center text-gray-500">
          Failed to load appointments. Please try again.
        </p>
      ) : appointments.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">
            You currently have no appointments assigned to you.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Upcoming Appointments */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Upcoming Appointments
            </h2>
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-lg">No upcoming appointments.</p>
            ) : (
              <ul className="space-y-6">
                {upcomingAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-xl text-gray-700">
                          {appointment.id}  {/*Change to school name */}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{" "}
                          {appointment.date}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Time:</span>{" "}
                          {appointment.time}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Visitors:</span>{" "}
                          {appointment.visitors}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Past Appointments */}
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Past Appointments
            </h2>
            {pastAppointments.length === 0 ? (
              <p className="text-gray-500 text-lg">No past appointments.</p>
            ) : (
              <ul className="space-y-6">
                {pastAppointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-gray-400"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-xl text-gray-700">
                          {appointment.id}   {/*Change to school name */}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Date:</span>{" "}
                          {appointment.date}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Time:</span>{" "}
                          {appointment.time}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Visitors:</span>{" "}
                          {appointment.visitors}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                          Past
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default GuideAppointments;
