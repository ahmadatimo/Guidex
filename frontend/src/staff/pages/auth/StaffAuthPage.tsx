import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffAuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [user, setUser] = useState(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const endpoint = "http://localhost:8000/login";
    
    const body = JSON.stringify({ email, password })
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setUser(data); // Save user data, could be a token or user info
      console.log(`Request successful with status code: ${res.status}`);
  
      navigate('/staff/home'); 
    } else {
      console.error(`Failed to fetch data: ${res.status}`);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Staff Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />

          {/* Password Field */}
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 mb-6 bg-gray-200 text-black rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mb-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffAuthPage;
