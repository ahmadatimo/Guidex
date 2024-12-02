import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createAppointment} from '../utils/api'

interface ConfirmationSummaryProps {
    data: { date: string; time: string; visitors_number: number; city: string; note: string };
    onEdit: () => void;
}

const mockUser = {
  id: 1, // Mock user ID for testing
  name: 'John Doe',
  email: 'johndoe@example.com',
};


  const ConfirmationSummary: React.FC<ConfirmationSummaryProps> = ({ data, onEdit }) => {
    const navigate = useNavigate();

    const handleConfirm = async () => {
      try {
        const response = await createAppointment({
          user_id: mockUser.id,
          date: data.date,
          time: data.time,
          visitors: data.visitors_number,
          note: data.note,
        });
  
  
        if (response.status === "201") {
          toast.success('Appointment successfully created!');
          console.log('Created Appointment:', response);
          navigate('/');
        } else {
          toast.error('Failed to create appointment. Please try again.');
        }
      } catch (error) {
        console.error('Error creating appointment:', error);
        toast.error('An error occurred while creating the appointment.');
      }
    };
  
    return (
          <div>
      <h2 className="text-xl font-bold mb-4">Confirm Your Appointment</h2>
      <ul className="mb-4">
        <li>Date: {data.date}</li>
        <li>Time: {data.time}</li>
        <li>Visitors: {data.visitors_number}</li>
        <li>Note: {data.note || 'None'}</li>
      </ul>
      
      <button className="px-4 py-2 bg-yellow-500 text-white rounded mr-2" onClick={onEdit}>
        Edit
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleConfirm}>
        Confirm
      </button>
    </div>
    );
  };
  
  export default ConfirmationSummary;
  