import React, { useState } from "react";
const MyAppointments: React.FC = () => {
  const [status, setStatus] = useState(true);

  return (
    <div className="ml-10 max-w-lg flex flex-col gap-2 text-sm">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div className="grid grid-cols-[1fr-2fr] gap-4 sm:flex sm-gap-6 py-2 border-b">
        <div className="flex-1 text-sm text-zinc-600">
          <p>Organizer: Jhon Doe</p>
          <p>School: Sunrise High School</p>
          <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time:</span>11/20/2024 | 10:00 AM</p>
          <p>Number of people: 60</p>
        </div>
        <div>
          <p className="text-xs mt-1 text-center">Status:</p>
          {status ? <p className="text-sm text-green-600 text-center">Approved</p> : 
          <p className="text-sm text-red-600 text-center">Declined</p>}
          <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded 
          hover:bg-red-600 hover:text-white transition all duration-300">Cancel Tour</button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
