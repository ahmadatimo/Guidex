import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Appointment, User,getCurrUser, fetchAppointments } from '../../utils/api';
import PendingApprovals from './PendingApprovals';

const qoutes = [
  "\"Success is the sum of small efforts repeated day in and day out.\" – Robert Collier",
  "\"The paycheck is coming, don't give up boss!.\" – Abdulaleem Altarsha",
  "\"You may not like your work, but you surely like to buy the new iPhone, right ;)\" – Ahmad Haikal"
];

const StaffHomepage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access location state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pendingTours, setPendingTours] = useState<number>(0);
  const [unassignedTours, setUnassignedTours] = useState<number>(0);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
  
        // Fetch user data
        const userData = await getCurrUser();
        setUser(userData);
  
        // Fetch appointments
        const allAppointments = await fetchAppointments();
        setAppointments(allAppointments);
  
        // Filter counts for statuses
        if (appointments.length > 0) {
          const pendingCount = appointments.filter(app => app.status === 'created').length;
          const unassignedCount = appointments.filter(app => app.status === 'approved').length;
          setPendingTours(pendingCount);
          setUnassignedTours(unassignedCount);

          console.log("Pending:", pendingCount, "Unassigned:", unassignedCount); // Add this log
  
          setPendingTours(pendingCount);
          setUnassignedTours(unassignedCount);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(); // Fetch data initially
  }, []); // Dependency array triggers this only once

  const handleApprovalStatusChange = (pendingCount: number, unassignedCount: number) => {
    setPendingTours(pendingCount);
    setUnassignedTours(unassignedCount);
  };
  

  const goToApproval = () => navigate('/staff/pending-approvals');
  const goToCalendar = () => navigate('/staff/calendar');
  const goToNotifications = () => navigate('/staff/notifications');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="mb-8 p-6 bg-blue-600 text-white rounded-lg shadow">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="mt-2">{qoutes[Math.floor(Math.random() * qoutes.length)]}</p>
        <button
          className="mt-4 bg-white text-blue-600 py-2 px-6 rounded font-semibold hover:bg-gray-200"
          onClick={goToApproval}
        >
          View Pending Approvals
        </button>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task Summary */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Task Summary</h2>
          <ul className="space-y-2 text-gray-700">
          <li>{pendingTours} pending approvals</li>
          <li>{unassignedTours} unassigned tours</li>
          </ul>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${(pendingTours / (pendingTours + unassignedTours || 1)) * 100}%` }}> 
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Upcoming Schedule</h2>
          <ul className="space-y-2 text-gray-700">
            <li>9:00 AM - Team Meeting</li>
            <li>11:00 AM - Visitor Tour</li>
            <li>3:00 PM - Staff Training</li>
          </ul>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={goToCalendar}
          >
            View Calendar
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <ul className="space-y-2 text-gray-700">
            <li>New high-priority request from Admissions Office.</li>
            <li>Reminder: Feedback on recent tour due tomorrow.</li>
          </ul>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={goToNotifications}
          >
            See All Notifications
          </button>
        </div>
      </div>

      {/* Analytics Snapshot */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Analytics Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">25</h3>
            <p className="text-gray-700">Tours This Month</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">4.8</h3>
            <p className="text-gray-700">Average Feedback Rating</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">15%</h3>
            <p className="text-gray-700">Increase in Visitor Engagement</p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/schedule-tour"
            className="p-4 bg-white border rounded-lg shadow hover:bg-blue-50"
          >
            <h3 className="text-lg font-bold text-blue-600">Schedule a Tour</h3>
            <p className="text-gray-700">Easily create and manage tours for visitors.</p>
          </a>
          <a
            href="/manage-reports"
            className="p-4 bg-white border rounded-lg shadow hover:bg-blue-50"
          >
            <h3 className="text-lg font-bold text-blue-600">Manage Reports</h3>
            <p className="text-gray-700">Track and analyze performance reports.</p>
          </a>
          <a
            href="/visitor-requests"
            className="p-4 bg-white border rounded-lg shadow hover:bg-blue-50"
          >
            <h3 className="text-lg font-bold text-blue-600">Visitor Requests</h3>
            <p className="text-gray-700">View and approve pending visitor requests.</p>
          </a>
        </div>
      </div>
      <PendingApprovals onApprovalStatusChange={handleApprovalStatusChange} />
    </div>
  );
};

export default StaffHomepage;

