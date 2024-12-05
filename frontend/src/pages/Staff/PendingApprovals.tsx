import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { fetchAppointments, Appointment, updateAppointmentStatus} from "../../utils/api";

const PendingApprovals: React.FC = () => {
  const [approvals, setApprovals] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  // Fetch appointments on component mount
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        console.log("Fetched appointments:", data);
        setApprovals(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        toast.error("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, []);

  
  const approved = async (id: number) => {
    try {
      // Update status to "approved" in the backend
      await updateAppointmentStatus(id, { status: "approved" });
      
      // Update the frontend state
      setApprovals((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "approved" } : appointment
        )
      );

      toast.success("Appointment approved!");
    } catch (error) {
      console.error("Failed to approve appointment:", error);
      toast.error("Failed to approve appointment. Please try again.");
    }
  };

 
  const rejected = async (id: number) => {
   try {
      // Update status to "approved" in the backend
       await updateAppointmentStatus(id, { status: "rejected" });
      
      // Update the frontend state
      setApprovals((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "rejected" } : appointment
        )
      );

      toast.success("Appointment rejected!");
    } catch (error) {
      console.error("Failed to reject appointment:", error);
      toast.error("Failed to reject appointment. Please try again.");
    }
  };

  const edit = async (id: number) => {
    try {
      await updateAppointmentStatus(id, { status: "created" });
      setApprovals((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "created" } : appointment
        )
      );
      toast.info("Appointment status reset to pending.");
    } catch (error) {
      console.error("Failed to reset appointment:", error);
      toast.error("Failed to reset appointment. Please try again.");
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
                className={`p-4 border rounded flex justify-between items-center ${
                approval.status === "approved" ? "bg-green-100" : approval.status === "rejected" ? "bg-red-100": "bg-white" }`}
              >
                {/* Approval Details */}
                <div>
                  <h3 className="font-bold text-lg">{approval.id}</h3>
                  <h4 className= "font-bold text-lg">{approval.status}</h4>
                  <p className="text-gray-600">Date: {approval.date} </p>
                  <p className="text-gray-600">Time: {approval.time} </p>
                </div>

                {/* Buttons: Approve & Deny */}
                <div className="flex space-x-2">
                {approval.status === "created" && (
                    <>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
                        onClick={() => approved(approval.id)}>
                        Approve
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => rejected(approval.id)}>
                        Deny
                      </button>
                    </>
                  )}
                  {approval.status !== "created" && (
                    <button
                      className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                      onClick={() => edit(approval.id)}>
                      Edit
                    </button>)}
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
