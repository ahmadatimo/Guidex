import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../ Constexts/context";


const VisitorAuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [school, setSchool] = useState(""); // State for high school dropdown
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const navigate = useNavigate(); // Initialize useNavigate for redirection if needed
  
  const { setUser } = useUserContext();

  // Dummy data for high school dropdown
  const highSchools = ["High School A", "High School B", "High School C"];

  // bullshit functions
  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSchool(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const endpoint = isLogin ? "http://localhost:8000/auth/login" : "http://localhost:8000/auth/register";
    
    const body = isLogin
      ? JSON.stringify({ email, password })
      : JSON.stringify({ username: name, email, password, school });

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data);
      console.log(`Request successful with status code: ${res.status}`);

      navigate("/visitor/home"); //problem
    } else {
      console.error(`Failed to fetch data: ${res.status}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Visitor Login" : "Visitor Signup"}
        </h1>

        <form onSubmit={handleSubmit}>
          {isLogin ? null : (
            <>
              {/* High School Dropdown */}
              <label className="block mb-2 text-sm font-medium">
                Select Your School
              </label>
              <select
                className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
                value={school}
                onChange={handleSchoolChange}
              >
                <option value="" disabled>
                  Select your school
                </option>
                {highSchools.map((schoolName) => (
                  <option key={schoolName} value={schoolName}>
                    {schoolName}
                  </option>
                ))}
              </select>

              {/* Name Field */}
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text" // Correct input type for name
                className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
                placeholder="Enter your Name"
                value={name}
                onChange={handleNameChange}
              />
            </>
          )}

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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mb-4"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
        {/* Toggle between Login and Signup */}
        <p className="text-center">
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate('/auth/RecoverEmail')}
            >
              {isLogin ? "Frogot your password?" : ''}{' '}
            </span>
          </p>
      </div>
    </div>
  );
};

export default VisitorAuthPage;
