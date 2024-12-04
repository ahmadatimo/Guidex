import React, { useState, useEffect } from "react";
import { fetchNotifications, markNotificationAsRead, Notification as NotificationType } from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications: React.FC = () => {
  const [newNotifications, setNewNotifications] = useState<NotificationType[]>([]);
  const [readNotifications, setReadNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch notifications from the backend
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNotifications();

        // Split notifications into "new" and "read"
        const unread = data.filter((notification) => !notification.is_read);
        const read = data.filter((notification) => notification.is_read);

        setNewNotifications(unread);
        setReadNotifications(read);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);

      // Move the notification to the "read" section
      setNewNotifications((prev) =>
        prev.filter((notification) => {
          if (notification.id === id) {
            setReadNotifications((prevRead) => [...prevRead, { ...notification, is_read: true }]);
            return false;
          }
          return true;
        })
      );

      toast.success("Notification marked as read.");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Notifications</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {isLoading ? (
          <p className="text-gray-700">Loading notifications...</p>
        ) : (
          <>
            {/* New Notifications Section */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">New Notifications</h2>
              {newNotifications.length === 0 ? (
                <p className="text-gray-600">No new notifications.</p>
              ) : (
                <ul className="space-y-4">
                  {newNotifications.map((notification) => (
                    <li
                      key={notification.id}
                      id={`notification-${notification.id}`}
                      className="p-4 border rounded bg-blue-50 flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{notification.message}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        Mark as Read
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Read Notifications Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Read Notifications</h2>
              {readNotifications.length === 0 ? (
                <p className="text-gray-600">No read notifications.</p>
              ) : (
                <ul className="space-y-4">
                  {readNotifications.map((notification) => (
                    <li
                      key={notification.id}
                      id={`notification-${notification.id}`}
                      className="p-4 border rounded bg-gray-100 flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{notification.message}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.created_at).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
