import React, { useState } from 'react';

const StaffAuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Staff Login' : 'Staff Signup'}</h1>

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

export default StaffAuthPage;
