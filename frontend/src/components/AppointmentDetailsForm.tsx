import React from "react";
import { toast } from 'react-toastify';

interface AppointmentDetailsFormProps {
    user: { name: string; school: string; email: string };
    data: { groupSize: number; visitType: string; specialRequests: string };
    onUpdateData: (field: string, value: string | number) => void;
    onNext: () => void;
  }
  
  const AppointmentDetailsForm: React.FC<AppointmentDetailsFormProps> = ({
    user,
    data,
    onUpdateData,
    onNext,
  }) => {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
        <p className="mb-4">
          <strong>Organizer:</strong> {user.name} ({user.school})
        </p>
        <p className="mb-8">
          <strong>Contact Email:</strong> {user.email}
        </p>
        <form className="space-y-4">
          <input
            type="number"
            placeholder="Group Size"
            value={data.groupSize || ''}
            onChange={(e) => 
                onUpdateData('groupSize', Number(e.target.value))}
            min={5}
            className="w-full p-2 border rounded"
            required
          />
          {/* <select
            value={data.visitType}
            onChange={(e) => onUpdateData('visitType', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Visit Type
            </option>
            <option value="general">General Tour</option>
            <option value="academic">Academic Department Focused</option>
          </select> */}
          <textarea
            placeholder="Special Requests (optional)"
            value={data.specialRequests}
            onChange={(e) => onUpdateData('specialRequests', e.target.value)}
            className="w-full p-2 border rounded"
          />
        <button
            type="button"
            onClick={() => data.groupSize < 5 ? toast('Group size must be at least 5!'): onNext()}
            className="bg-blue-600 text-white py-2 px-4 rounded"
        >
            Next
        </button>          
        </form>
      </div>
    );
  };
  
  export default AppointmentDetailsForm;
  