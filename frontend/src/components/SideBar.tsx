import { useState } from 'react';
import { TiChevronRight } from "react-icons/ti";
import { TiChevronLeft } from "react-icons/ti";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle button placed outside the sidebar */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 p-2 bg-gray-700 text-orange-juice font-bold rounded-2xl hover:bg-gray-600 focus:outline-none transition-transform duration-300 ${
          isOpen ? 'translate-x-60' : 'translate-x-0'
        }`}
      >
        {isOpen ? <TiChevronLeft/> : <TiChevronRight/> }
      </button>

      {/* Sidebar */}
      <div
        className={`absolute h-[95vh] w-60 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-light-blue`}
      >
        <nav>
          <ul className="flex flex-col p-0 mt-4 space-y-4">
            <li className="list-none">
              <a href="#home" className="text-ayran no-underline text-2xl block hover:bg-orange-juice px-4 py-2">
                Home
              </a>
            </li>
            <li className="list-none">
              <a href="#profile" className="text-ayran no-underline text-2xl block hover:bg-orange-juice px-4 py-2">
                Profile
              </a>
            </li>
            <li className="list-none">
              <a href="#settings" className="text-ayran no-underline text-2xl block hover:bg-orange-juice px-4 py-2">
                Settings
              </a>
            </li>
            <li className="list-none">
              <a href="#logout" className="text-ayran no-underline text-2xl block hover:bg-orange-juice px-4 py-2">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
