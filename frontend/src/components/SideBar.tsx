import { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from 'react-icons/ai';
import { FiChevronLeft } from 'react-icons/fi';
import { useUserContext } from '../ Constext/context';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = useUserContext();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    user.setUser(null)
    navigate('/visitor/auth')
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'w-60' : 'w-16'
        } flex flex-col h-full`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-blue-600">
          {isOpen && (
            <h2 className="text-lg font-semibold text-white">Welcome {user?.user?.id}</h2>
          ) }
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FiChevronLeft
              size={24}
              className={`transform transition-transform duration-300 ${
                isOpen ? '' : 'rotate-180'
              }`}
            />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 flex-1 overflow-hidden">
          <ul className="flex flex-col space-y-1">
            <li>
              <Link
                to='/visitor/home'
                relative='path'
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors ${
                  !isOpen ? 'justify-center' : ''
                }`}
              >
                <AiOutlineHome size={24} className="flex-shrink-0" />
                {isOpen && <span className="ml-3">Home</span>}
              </Link>
            </li>
            <li>
            <Link
                to='/visitor/profile'
                relative='path'
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors ${
                  !isOpen ? 'justify-center' : ''
                }`}
              >
                <AiOutlineUser size={24} className="flex-shrink-0" />
                {isOpen && <span className="ml-3">Profile</span>}
              </Link>
            </li>
            <li>
            <Link
                to='/visitor/settings'
                relative='path'
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors ${
                  !isOpen ? 'justify-center' : ''
                }`}
              >
                <AiOutlineSetting size={24} className="flex-shrink-0" />
                {isOpen && <span className="ml-3">Settings</span>}
              </Link>
            </li>
            <li>
            <div
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors ${
                  !isOpen ? 'justify-center' : ''
                }`}
              >
                <AiOutlineLogout size={24} className="flex-shrink-0" />
                {isOpen && <span className="ml-3">Logout</span>}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
