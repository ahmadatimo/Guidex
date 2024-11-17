// import { useNavigate } from "react-router-dom";
// const CallToAction: React.FC = () => {
//   const navigate = useNavigate();
//     return (
//       <section className="py-12 bg-blue-600 text-white text-center">
//         <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
//         <p className="mb-6">Schedule your campus tour today and start your journey with us.</p>
//         <button onClick={() => {navigate('/appointment')}} className="bg-white text-blue-600 font-bold py-3 px-6 rounded hover:bg-gray-200">Schedule Your Tour</button>
//       </section>
//     );
//   };
  
//   export default CallToAction;
  
const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm" >
            {/* Left Section*/}
            <div>
                <img className=" mb-5 w-64" src="/assets/bilkent_logo_with_label.jpg" alt="Bilkeent Logo With Label" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
            </div>

            {/* Center Section */}
            <div>
                <p className="text-xl font-medium mb-5 "> GUIDEX</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            
            {/* Right Section*/}
            <div>
                <p className="text-xl font-medium mb-5 "> GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>+90 506 909 38 05</li>
                    <li> 
                        guidexdev@gmail.com
                    </li>
                </ul>
            </div>
            
        </div>

        <div>
             {/* Copyright Text */}
             <hr />
             <p className="py-5 text-sm text-center">Copyright 2024@ Guidex All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer