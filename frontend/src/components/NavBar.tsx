import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-400">
      <img
        className="w-56 h-20 cursor-pointer"
        src="/assets/bilkent_logo_with_label.jpg"
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
            ? <div>
                
              </div> 
            : <button onClick={() => navigate("/login")} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">
          Create Account
        </button>}
      </div>
    </div>
  );
};

export default NavBar;
