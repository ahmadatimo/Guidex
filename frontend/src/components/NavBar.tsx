import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa"; // Example icon

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white text-gray-700">
      {/* Logo Section */}
      <img
        onClick={() => navigate("/")}
        className="h-12 cursor-pointer"
        src="/assets/bilkent_logo.jpg"
        alt="Bilkent Logo"
      />

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 hover:text-blue-700"
                : "text-gray-600 hover:text-gray-800"
            }
          >
            {({ isActive }) => (
              <>
                HOME
                <hr
                  className={`h-0.5 bg-blue-600 w-3/5 m-auto mt-1 ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 hover:text-blue-700"
                : "text-gray-600 hover:text-gray-800"
            }
          >
            {({ isActive }) => (
              <>
                ABOUT
                <hr
                  className={`h-0.5 bg-blue-600 w-3/5 m-auto mt-1 ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 hover:text-blue-700"
                : "text-gray-600 hover:text-gray-800"
            }
          >
            {({ isActive }) => (
              <>
                CONTACT
                <hr
                  className={`h-0.5 bg-blue-600 w-3/5 m-auto mt-1 ${
                    isActive ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </NavLink>
        </li>
      </ul>

      {/* User Profile or Account Section */}
      <div className="flex items-center gap-6">
        {token ? (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <img
              className="w-10 h-10 rounded-full border border-gray-300"
              src="/assets/Maksat_Abrayev.jpg"
              alt="User Profile"
            />
            <FaChevronDown className="text-gray-600 group-hover:text-gray-800" />
            <div className="absolute top-full mt-2 right-0 hidden group-hover:block bg-white shadow-lg rounded-lg py-2 text-sm z-20 w-48">
              <p
                onClick={() => navigate("/my-profile")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("my-appointments")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => {
                  setToken(false);
                  navigate("/login");
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-all"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
