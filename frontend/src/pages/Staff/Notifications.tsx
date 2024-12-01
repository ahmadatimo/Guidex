import React, { useState } from "react";

interface Notification {
  id: number;
  title: string;
  description?: string;
  timestamp: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Visitor Tour Approval Pending",
      description: "You have a pending approval for XYZ High School.",
      timestamp: "2024-11-18 10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "Reminder: Staff Meeting",
      description: "Don't forget the staff meeting scheduled at 1:00 PM.",
      timestamp: "2024-11-17 9:00 AM",
      read: true,
    },
    {
      id: 3,
      title: "Feedback Due",
      description: "Submit feedback for ABC Academy's visitor tour.",
      timestamp: "2024-11-16 2:45 PM",
      read: false,
    },
  ]);

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Delete a notification
  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Notifications</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {notifications.length === 0 ? (
          <p className="text-gray-700">No new notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 border rounded flex justify-between items-start ${
                  notification.read ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
