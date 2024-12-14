import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { custom_notification } from "../../utils/api"; // Import the notifyGuides API function

const AddGuideNotification: React.FC = () => {
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState({
    notification_type: "",
    message: "",
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = sessionStorage.getItem("role");
        if (!role) {
          window.location.href = "/auth";
          return;
        }
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotification((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendNotification = async () => {
    if (!notification.notification_type || !notification.message) {
      toast.error("Both title and message are required.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Sending notification:", notification); // Debug request payload

      await custom_notification(notification.message, notification.notification_type);
      toast.success("Notification sent to all guides.", {
        position: "top-right",
        autoClose: 5000,
      });

      setNotification({ notification_type: "", message: "" }); // Reset state
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-500">Loading...</h1>
      </div>
    );
  }

  if (currentUserRole !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-500 mb-4">Access Restricted</h1>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Send Notification to Guides</h1>
        <div className="space-y-6">
          <div>
            <label htmlFor="notification_type" className="block text-lg font-medium text-gray-700 mb-2">
              Notification Title
            </label>
            <input
              type="text"
              id="notification_type"
              name="notification_type"
              placeholder="Enter notification title"
              value={notification.notification_type}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
              Notification Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={notification.message}
              onChange={handleChange}
              rows={6}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleSendNotification}
              disabled={isSubmitting}
              className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGuideNotification;
