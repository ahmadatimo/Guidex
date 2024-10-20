import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';


const RecoverEmail: React.FC = () => {
    const [email, setEmail] = useState('');
    //const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const endpoint = "http://localhost:8000/reset-password"  ;
        console.log("Passed email is ", email)
        const body = JSON.stringify({email: email});
        try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        if (res.ok) {
          const data = await res.json();
          alert("Succesfully reset password")
          console.log(`Request successful with status code: ${res.status}`);
          console.log(data);
          //navigate('/visitor/UpdatePass');
          
        } else {
          const errorData = await res.json();
          console.error(`Failed to fetch data: ${res.status}`, errorData);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    function Email () {
        return (
            <>
                {/* Email Field */}
                <label className="block mb-2 text-sm font-medium">Recovery Email</label> 
                <input
                type="email"
                className="w-full p-2 mb-4 bg-gray-200 text-black rounded-md"
                placeholder="Enter recovery email"
                value={email}
                onChange={handleEmailChange}
                />
            </>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

            
            <form onSubmit={handleSubmit}>
    
              <Email />
            
              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mb-4">
                {"Enter Email"}
              </button>
            </form>
          </div>
        </div>
      );
};

export default RecoverEmail;