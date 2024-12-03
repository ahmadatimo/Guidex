import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAppointment } from '../utils/api';

interface ConfirmationSummaryProps {
  data: { date: string; time: string; visitors_number: number; city: string; note: string };
  onEdit: () => void;
}

const ConfirmationSummary: React.FC<ConfirmationSummaryProps> = ({ data, onEdit }) => {
  const navigate = useNavigate();

  // Helper to format time to HH:MM:SS
  const formatTime = (time: string): string => {
    const [hours, minutesPart] = time.split(':');
    const [minutes, period] = minutesPart.split(' ');
    let formattedHours = parseInt(hours, 10);

    if (period === 'PM' && formattedHours !== 12) {
      formattedHours += 12;
    } else if (period === 'AM' && formattedHours === 12) {
      formattedHours = 0;
    }

    return `${String(formattedHours).padStart(2, '0')}:${minutes}:00`;
  };

  const handleConfirm = async () => {
    try {
      // Prepare the payload
      const payload = {
        date: data.date, // Assume already in YYYY-MM-DD format
        time: formatTime(data.time), // Format time to HH:MM:SS
        city: data.city,
        visitors_number: data.visitors_number,
        note: data.note,
      };

      console.log('Sending Appointment Payload:', payload);

      // API call
      const response = await createAppointment(payload);

      if (response) {
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
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Confirm Your Appointment</h2>
      <ul className="mb-4 text-gray-600">
        <li>
          <strong>Date:</strong> {data.date}
        </li>
        <li>
          <strong>Time:</strong> {data.time}
        </li>
        <li>
          <strong>Visitors:</strong> {data.visitors_number}
        </li>
        <li>
          <strong>City:</strong> {data.city}
        </li>
        <li>
          <strong>Note:</strong> {data.note || 'None'}
        </li>
      </ul>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationSummary;
