import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; // Example icon

const NavBar = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-400">
      <img
        onClick={() => navigate("/")}
        className=" h-12 cursor-pointer"
        src="/assets/bilkent_logo.jpg"
        alt="Bilkent Logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li className="py-1">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "text-gray-700")}
          >
            {({ isActive }) => (
              <>
                HOME
                <hr
                  className={`h-0.5 bg-primary w-3/5 m-auto ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </li>

        <li className="py-1">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-primary" : "text-gray-700")}
          >
            {({ isActive }) => (
              <>
                ABOUT
                <hr
                  className={`h-0.5 bg-primary w-3/5 m-auto ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </li>

        <li className="py-1">
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-primary" : "text-gray-700")}
          >
            {({ isActive }) => (
              <>
                CONTACT
                <hr
                  className={`h-0.5 bg-primary w-3/5 m-auto ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>
        {token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-12 h-12 rounded-full ' src="/assets/zesty_timo.jpg" alt="Zesty Timo" />
                <FaChevronDown className="ml-2" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={()=>navigate("/my-profile")} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={()=>navigate("my-appointments")} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={()=>
                    {setToken(false);
                     navigate("/login")
                    }} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
              </div> 
            : <button onClick={() => navigate("/login")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-light hidden md:block">
                Create Account
              </button>}
      </div>
    </div>
  );
};

export default NavBar;
