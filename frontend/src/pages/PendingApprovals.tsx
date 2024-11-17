import React from 'react';
import { toast } from 'react-toastify';

const PendingApprovals: React.FC = () => {
  const approvals = [
    { id: 1, name: 'Visitor Tour for XYZ High School', date: '2024-11-20', time:'14:00', status: 'Pending' },
    { id: 2, name: 'Visitor Tour for ABC Academy', date: '2024-11-21', time:'9:30', status: 'Pending' },
    { id: 3, name: 'Visitor Tour for DEF Institute', date: '2024-11-19', time:'17:00', status: 'Approved' },
  ];

  const pendingApprovals = approvals.filter((approval) => approval.status === 'Pending');

  const approved = () => {
    toast.success('Tour Approved!')
    //TODO: set status to approved
    //TODO: add to user tours and update relevants
  }
  const denied = () => {
    toast.success('Tour Denied...')
    //TODO: set status to denied
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Pending Approvals</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {pendingApprovals.length === 0 ? (
          <p className="text-gray-700">No pending approvals.</p>
        ) : (
          <ul className="space-y-4">
            {pendingApprovals.map((approval) => (
              <li
                key={approval.id}
                className="p-4 border rounded flex justify-between items-center"
              >
                {/* Approval Details */}
                <div>
                  <h3 className="font-bold text-lg">{approval.name}</h3>
                  <p className="text-gray-600">Date: {approval.date} </p> 
                  <p className="text-gray-600">Time: {approval.time} </p> 
                </div>

                {/* Buttons: Approve & Deny */}
                <div className="flex space-x-2">
                  <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={approved}>
                    Approve
                  </button>
                  <button 
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={denied}>
                    Deny
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

export default PendingApprovals;
