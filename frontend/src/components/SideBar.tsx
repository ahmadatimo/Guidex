import { useState } from 'react';
import { AiOutlineSetting, AiOutlineForm, AiOutlineLogout, AiOutlineDashboard, AiOutlineFileDone, AiOutlineCalendar, AiOutlineBell, AiOutlineBarChart, AiOutlineUserAdd } from 'react-icons/ai';
import { FiChevronLeft } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    navigate('/auth');
  }
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'w-60' : 'w-16'
        } flex flex-col h-screen fixed z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-blue-600">
          {isOpen && <h2 className="text-lg font-semibold text-white">Welcome Friend!</h2>}
          <button
            onClick={toggleSidebar}
            aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
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
                to="/staff/home"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineDashboard size={24} />
                {isOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/staff/pending-approvals"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/pending-approvals')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineFileDone size={24} />
                {isOpen && <span className="ml-3">Pending Approvals</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/staff/appointments"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/appointments')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineForm size={24} />
                {isOpen && <span className="ml-3">Appointments</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/staff/calendar"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/calendar')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineCalendar size={24} />
                {isOpen && <span className="ml-3">Calendar</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/staff/notifications"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/notifications')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineBell size={24} />
                {isOpen && <span className="ml-3">Notifications</span>}
              </Link>
            </li> 
            <li>
              <Link
                to="/staff/analytics"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/analytics')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineBarChart size={24} />
                {isOpen && <span className="ml-3">Statistics</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/staff/add-staff"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/add-staff')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineUserAdd size={24} />
                {isOpen && <span className="ml-3">Profile</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/staff/settings"
                className={`flex items-center px-4 py-2 ${
                  isActive('/staff/settings')
                    ? 'bg-blue-200 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-100'
                } transition-colors ${!isOpen ? 'justify-center' : ''}`}
              >
                <AiOutlineSetting size={24} />
                {isOpen && <span className="ml-3">Settings</span>}
              </Link>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className={`flex items-center px-4 py-2 text-gray-700 hover:bg-red-400 transition-colors ${
                  !isOpen ? 'justify-center' : ''
                } cursor-pointer`}
              >
                <AiOutlineLogout size={24} />
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
