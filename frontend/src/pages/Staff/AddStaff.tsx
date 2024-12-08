import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrRole, registerUser } from "../../utils/api";

const AddStaff: React.FC = () => {
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    school_name: ""
  });

  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Example list of schools (replace this with your actual data or fetch from API)
  const [schools, setSchools] = useState<{id: string; name: string}[]>([
    { id: "1", name: "School A" },
    { id: "2", name: "School B" },
    { id: "3", name: "School C" }
  ]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getCurrRole();
        setCurrentUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setCurrentUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = async () => {
    // Basic validation
    if (!newAccount.name || !newAccount.email || !newAccount.password || !newAccount.role) {
      toast.error("All fields are required. Please fill out the form completely.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (newAccount.role === "Visitor" && !newAccount.school_name) {
      toast.error("Please select a school for Visitor accounts.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      await registerUser(
        newAccount.email,
        newAccount.role,
        newAccount.name,
        newAccount.password,
        newAccount.role === "Visitor" ? newAccount.school_name : undefined
      );
      toast.success(`Account for "${newAccount.name}" created successfully as a "${newAccount.role}".`, {
        position: "top-right",
        autoClose: 5000,
      });
      setNewAccount({ name: "", email: "", password: "", role: "", school_name: "" });
    } catch (error) {
      console.error("Error creating user account:", error);
      toast.error("Failed to create the account. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-gray-500">Loading...</h1>
      </div>
    );
  }

  if (currentUserRole !== "admin") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-gray-500">Access Restricted</h1>
        <p className="text-gray-600">You do not have the necessary permissions to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-3xl font-bold mb-2 text-blue-700">Add Staff Accounts</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">New Staff Account</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={newAccount.name}
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
              placeholder="Enter email address"
              value={newAccount.email}
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
              placeholder="Enter password"
              value={newAccount.password}
              onChange={handleChange}
              className="mt-1 p-3 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={newAccount.role}
              onChange={handleChange}
              className="mt-1 p-3 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="guide">Guide</option>
              <option value="visitor">Visitor</option>
            </select>
          </div>

          {newAccount.role === "visitor" && (
            <div>
              <label htmlFor="school_name" className="block text-sm font-medium text-gray-700">
                School
              </label>
              <select
                id="school_name"
                name="school_name"
                value={newAccount.school_name}
                onChange={handleChange}
                className="mt-1 p-3 border rounded w-full focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select School</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.name}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
