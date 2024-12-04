import { AxiosError } from "axios";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateAppointmentStatus, fetchAppointments, Appointment } from "../../utils/api";

const PendingApprovals: React.FC = () => {
  const [approvals, setApprovals] = useState<Appointment[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Fetch appointments when the component mounts
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const appointments = await fetchAppointments(); // Fetch appointments from API
        setApprovals(appointments); // Update state with fetched appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments.");
      }
    };

    loadAppointments(); // Call the function to load appointments
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const approved = async (id: number) => {
    setLoadingId(id);
    try {
      const response = await updateAppointmentStatus(id, { status: 'approved' });
      console.log("API Response:", response);
      setApprovals((prevAppointment) =>
        prevAppointment.map((appointment) =>
          appointment.id === id ? { ...appointment, status: 'Approved' } : appointment
        )
      );
      toast.success("Tour Approved!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios Error:", error.response?.data || error.message);
        toast.error(`Failed to approve the appointment: ${error.response?.data?.message || error.message || "Unknown error"}`);
      } else {
        console.error("Unexpected Error:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoadingId(null);
    }
  };
 
  const denied = async (id: number) => {
    setLoadingId(id);
    try {
      await updateAppointmentStatus(id, { status: 'Denied' });
      setApprovals((prevApprovals) =>
        prevApprovals.map((approval) =>
          approval.id === id ? { ...approval, status: 'Denied' } : approval
        )
      );
      toast.error("Tour Denied!");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios Error:", error.response?.data || error.message);
        toast.error(`Failed to deny the appointment: ${error.response?.data?.message || "Unknown error"}`);
      } else {
        console.error("Unexpected Error:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Pending Approvals</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {approvals.length === 0 ? (
          <p className="text-gray-700">No pending approvals.</p>
        ) : (
          <ul className="space-y-4">
            {approvals.map((approval) => (
              <li
                key={approval.id}
                className="p-4 border rounded flex justify-between items-center"
              >
                {/* Approval Details */}
                <div>
                  <h3 className="font-bold text-lg">{approval.id}</h3>
                  <p className="text-gray-600">Date: {approval.date} </p>
                  <p className="text-gray-600">Time: {approval.time} </p>
                </div>

                {/* Buttons: Approve & Deny */}
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => approved(approval.id)}
                    disabled={loadingId === approval.id}>
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => denied(approval.id)}
                    disabled={loadingId === approval.id}>
                    Deny
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;
