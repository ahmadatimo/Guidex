import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ConfirmationSummaryProps {
    user: { name: string; school: string; email: string };
    data: { date: string; time: string; groupSize: number; visitType: string; specialRequests: string };
    onEdit: () => void;
  }
  

  const ConfirmationSummary: React.FC<ConfirmationSummaryProps> = ({ user, data, onEdit }) => {
    const navigate = useNavigate();
    const clicked = () => {
        toast('Your appointment will be processed shortly'); // Show the toast
        navigate('/')
    }
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Your Appointment</h2>
        <p><strong>Organizer:</strong> {user.name}</p>
        <p><strong>School:</strong> {user.school}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {data.time}</p>
        <p><strong>Group Size:</strong> {data.groupSize}</p>
        <p><strong>Visit Type:</strong> {data.visitType}</p>
        <p><strong>Special Requests:</strong> {data.specialRequests || 'None'}</p>
        <div className="space-x-4 mt-4">
          <button onClick={onEdit} className="bg-gray-600 text-white py-2 px-4 rounded">Edit</button>
          <button onClick={clicked} className="bg-green-600 text-white py-2 px-4 rounded">Confirm</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationSummary;
  