import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [role, setRole] = useState(''); // State to track selected role
  const navigate = useNavigate(); // Hook for navigation

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleContinue = () => {
    if (role === 'highschool') {
      navigate('/visitor/auth');
    } else if (role === 'university') {
      navigate('/staff/auth');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Fuck you twice Timo</h1>

        {/* Role Selector */}
        <label className="block mb-2 text-sm font-medium">Role</label>
        <select
          className="w-full p-2 mb-6 bg-gray-200 text-black rounded-md"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="" disabled>Select your role</option>
          <option value="highschool">High School Visitor</option>
          <option value="university">University Staff</option>
        </select>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!role}
          className={`w-full py-2 font-bold rounded-md ${role ? 'bg-blue-500 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
