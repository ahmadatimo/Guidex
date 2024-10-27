import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePass: React.FC = () => {
    const [email, setEmail] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [new_password_again, setNewPasswordAgain] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    };

    const handlePasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPasswordAgain(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

        if(new_password != new_password_again) {
            alert("Passwords do not match. Please try again!");
            return;
        }
        
        const endpoint = "http://localhost:8000/auth/reset-password";
        const body = JSON.stringify({
            email: email,
            password: new_password 
           });
           console.log(endpoint)
           try {
            const res = await fetch(endpoint, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body,
            });
      
            if (res.ok) {
                const data = await res.json();
                console.log(`Request successful with status code: ${res.status}`);
                console.log(data);
                navigate('/visitor/auth');  
            } else {
                const errorData = await res.json();
                console.error(`Failed to fetch data: ${res.status}`, errorData);
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
    }


  

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

            <form onSubmit={handleSubmit}>

            
              {/* Email Field */}
              <label className="block mb-2 text-sm font-medium">Email</label> 
              <input
              type="email"
              className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              />
          
              
                {/* Password Field */}
              <label className="block mb-2 text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full p-2 mb-6 bg-gray-200 text-black rounded-md"
                placeholder="Enter your new password"
                value={new_password}
                onChange={handlePasswordChange}
              />

              {/* Password Again Field */}
              <label className="block mb-2 text-sm font-medium">New Password (again)</label>
              <input
                type="password"
                className="w-full p-2 mb-6 bg-gray-200 text-black rounded-md"
                placeholder="Enter your new password"
                value={new_password_again}
                onChange={handlePasswordAgainChange}
              />
          
            
              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mb-4">
                {"Change Password"}
              </button>
            </form>
          </div>
        </div>
      );
};

export default UpdatePass;