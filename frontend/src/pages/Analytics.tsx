import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Analytics</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700">
          Comprehensive analytics dashboard is under development. For now, check the analytics snapshot on your homepage.
        </p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Analytics Snapshot
        </button>
      </div>
    </div>
  );
};

export default Analytics;
