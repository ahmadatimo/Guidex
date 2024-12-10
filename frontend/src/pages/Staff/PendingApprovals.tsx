import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { 
  fetchAvailableAppointmentsForGuides, fetchAdminsAppointments, Appointment, updateAppointmentStatus,
  assignGuideToAppointment, unassignGuideFromAppointment, getCurrRole} from "../../utils/api";

const PendingApprovals: React.FC = () => {
  const [approvals, setApprovals] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null); // State for storing the role of the user


  // Fetch user role and appointments on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch the user's role
        const role = await getCurrRole();
        console.log('Fetched user role:', role);
        setUserRole(role);

        // Fetch the appointments based on role
        let appointments: Appointment[] = []; // Declare the type explicitly
        if (role === 'admin') {
          appointments = await fetchAdminsAppointments(); // Admin sees all appointments
        } else if (role === 'guide') {
          appointments = await fetchAvailableAppointmentsForGuides(); // Guide sees only approved appointments
        }
        console.log('Fetched appointments:', appointments);
        setApprovals(appointments);
      } catch (error) {
        console.error('Failed to load data:', error);
        toast.error('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  
  const handleApproval  = async (id: number, newStatus: string) => {
    try {
      await updateAppointmentStatus(id, { status: newStatus });
      setApprovals((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: newStatus } : appointment
        )
      );
      toast.success("Appointment approved!" )
    } catch (error) {
      console.error("Failed to approve appointment:", error);
      toast.error("Failed to approve appointment. Please try again.");
    }
  };

  const handleAcceptance = async (id: number) => {
    try {
      await assignGuideToAppointment(id);
  
      setApprovals((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: "accepted"} : appointment
        )
      );
  
      toast.success("Appointment accepted!");
    } catch (error) {
      console.error("Failed to assign guide:", error);
      toast.error("Failed to assign guide. Please try again.");
    }
  };
  

  const handleRejection = async (id: number, newStatus: string) => {
   try {
      await updateAppointmentStatus(id, { status: newStatus });
      setApprovals((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: newStatus} : appointment
        )
      );
      toast.success(userRole === "admin" ? "Appointment rejected!" : "Appointment declined!")
    } catch (error) {
      console.error("Failed to reject appointment:", error);
      toast.error("Failed to reject appointment. Please try again.");
    }
  };

  const resetStatus = async (id: number, newStatus: string) => {
  // Find the current appointment to check its current status.
  const currentAppointment = approvals.find((appointment) => appointment.id === id);

  if (!currentAppointment) {
    toast.error("Appointment not found."); 
    return;
  }

  try {
    console.log('Current Status ', currentAppointment.status);

    // Unassign and change status
    await unassignGuideFromAppointment(id, {status: newStatus});

    setApprovals((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: newStatus} : appointment
      )
    );

    toast.info("Appointment status reset successfully.");
  } catch (error) {
    console.error("Failed to reset appointment:", error);
    toast.error("Failed to reset appointment. Please try again.");
  }
};


  if (userRole !== 'admin' && userRole !== 'guide') {
    return (
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        You are not allowed here, brother/sister {"😔"}
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        {
          userRole === 'admin'
          ? 'Admin Pending Approvals':
          userRole === 'guide'
          ?'Guide Pending Approvals': 
          "why are you here ?"
        }
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {approvals.length === 0 ? (
          <p className="text-gray-700">No pending approvals.</p>
        ) : (
          <ul className="space-y-4">
            {approvals.map((approval) => (
              <li
                key={approval.id}
                className={`p-4 border rounded flex justify-between items-center 
                ${
                  (userRole === "admin" && (approval.status === ("approved") || approval.status === ("accepted") )) 
                  ? "bg-green-100" : (userRole === "admin" && approval.status === ("rejected") || approval.status === ("declined")) 
                  ? "bg-red-100": (userRole === "guide" && approval.status === ("accepted")) 
                  ? "bg-green-100" :  (userRole === "guide" && approval.status === ("declined")) 
                  ? "bg-red-100": "bg-white" 
                }`}>
                {/* Approval Details */}
                <div>
                  <h3 className="font-bold text-lg">{approval.id}</h3>
                  <h4 className= "font-bold text-lg">{approval.status}</h4>
                  <p className="text-gray-600">Date: {approval.date} </p>
                  <p className="text-gray-600">Time: {approval.time} </p>
                  {/*<p className="text-gray-600"> Guide ID: {approval.guide_id ? approval.guide_id : "Not Assigned"}</p>*/}
                </div>

                {/* Buttons: Approve & Deny */}
                <div className="flex space-x-2">
                  {userRole ==="admin" && approval.status === "created" && 
                    (
                      <>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
                          onClick={() => handleApproval(approval.id, "approved")}>
                          Approve
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                          onClick={() => handleRejection(approval.id , "rejected")}>
                          Deny
                        </button>
                      </>
                    )
                  }
                  {userRole === "guide" && approval.status === "approved" && 
                    (
                      <>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          onClick={() => handleAcceptance(approval.id)}>
                          Accept
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                          onClick={() => handleApproval(approval.id, "declined")}>
                          Deny
                        </button>
                      </> 
                    )
                  }
                  { (userRole === "admin" && approval.status !== "created") &&
                    (
                      <button
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                        onClick={() => resetStatus(approval.id, 'created')}>
                        Edit
                      </button>
                    )
                  }
                  {(userRole === "guide" && approval.status !== "approved") &&
                    (
                      <button
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                        onClick={() => resetStatus(approval.id, 'approved')}>
                        Edit
                      </button>
                    )
                  }
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