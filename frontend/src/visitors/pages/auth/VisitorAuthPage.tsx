import React, { useState } from 'react';

const VisitorAuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [school, setSchool] = useState(''); // State for high school dropdown

  // Dummy data for high school dropdown
  const highSchools = ['High School A', 'High School B', 'High School C'];

  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSchool(event.target.value);
  };

  function SchoolAndName()
  {
    return(<>
    {/* High School Dropdown */}
    <label className="block mb-2 text-sm font-medium">Select Your School</label>
        <select
          className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
          value={school}
          onChange={handleSchoolChange}>
          <option value="" disabled>Select your school</option>
          {highSchools.map((schoolName) => (
            <option key={schoolName} value={schoolName}>
              {schoolName}
            </option>
          ))}
        </select>


        {/* Name Field */}
        <label className="block mb-2 text-sm font-medium">Name</label>
        <input
          type="Name"
          className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
          placeholder="Enter your Name"
        />
  </>)}

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Visitor Login' : 'Visitor Signup'}</h1>

        {isLogin ? "" : <SchoolAndName/>}

        {/* Email Field */}
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-6 bg-gray-200 text-black rounded-md"
          placeholder="Enter your password"
        />

        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mb-4">
          {isLogin ? 'Login' : 'Signup'}
        </button>

        {/* Toggle between Login and Signup */}
        <p className="text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VisitorAuthPage;
