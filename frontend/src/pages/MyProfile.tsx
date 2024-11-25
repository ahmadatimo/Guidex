import React, { useState } from "react";

const MyProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "Maksat Abrayev",
    image: "public/assets/Maksat_Abrayev.jpg",
    email: "MaksatAbrayev@gmail.com",
    phone: "+90 506 909 38 05",
    address: "Bilkent University 06800 Bilkent, Ankara, Türkiye",
    gender: "Male",
    BirthDate: "2004-06-02", // Use ISO format for compatibility with `type="date"`
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 my-25">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img
          className="w-36 h-36 rounded-full shadow-md object-cover"
          src={userData.image}
          alt="Profile"
        />
        {isEdit ? (
          <input
            className="mt-4 text-center text-2xl font-semibold bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {userData.name}
          </h1>
        )}
      </div>

      {/* User Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          User Information
        </h2>
        <div className="grid grid-cols-2 gap-y-4 mt-4 text-gray-800">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          ) : (
            <p>{userData.address}</p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-2 gap-y-4 mt-4 text-gray-800">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              className="bg-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={userData.BirthDate}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, BirthDate: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.BirthDate}</p>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="flex justify-center mt-6">
        {isEdit ? (
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all"
            onClick={() => setIsEdit(false)}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
