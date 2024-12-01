import React, { useState } from "react";

// Mock User Data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Manager",
};

const Settings: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: "light",
  });
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update Account Information
  const handleUpdateAccount = () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email cannot be empty.");
      return;
    }
    setUser({ ...user, name: formData.name, email: formData.email });
    alert("Account information updated successfully!");
    setFormData({ ...formData, password: "" });
  };

  // Handle Preferences Change
  const toggleNotifications = () => {
    setPreferences((prev) => ({ ...prev, notifications: !prev.notifications }));
  };

  const toggleTheme = () => {
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
    alert(`Theme changed to ${preferences.theme === "light" ? "dark" : "light"}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Settings</h1>

      {/* Account Management */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Account</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-3 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-3 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
              className="mt-1 p-3 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdateAccount}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Update Account
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <button
            type="button"
            onClick={toggleNotifications}
            className={`px-4 py-2 rounded ${
              preferences.notifications ? "bg-green-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {preferences.notifications ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Theme Preferences */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
        <div className="flex items-center justify-between">
          <span>Theme</span>
          <button
            type="button"
            onClick={toggleTheme}
            className={`px-4 py-2 rounded ${
              preferences.theme === "light" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
            }`}
          >
            {preferences.theme === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Role Information */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Role Information</h2>
        <p className="text-gray-700">
          Your current role is: <span className="font-semibold text-blue-700">{user.role}</span>
        </p>
      </div>

      {/* Logout */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => alert("You have been logged out.")}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
