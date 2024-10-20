import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const DeleteUser: React.FC = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const endpoint = "http://localhost:8000/delete";
    
    const body = JSON.stringify({ email, password })
    
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    
    console.log("entered func")
    const data = await res.json();
  
    if (res.ok) {

      console.log(`Request successful with status code: ${res.status}`);
  
      alert("User Deleted")
    } else {
      console.error(`Failed to fetch data: ${res.status}`);
    }
  };  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Delete Your Account</h1>

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
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
