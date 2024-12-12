import React, { useEffect, useState } from 'react';

interface Feedback {
  id: number;
  message: string;
  submittedAt: string;
}

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Fetch feedback from the backend
    setFeedbacks([
      { id: 1, message: 'Great experience!', submittedAt: '2024-12-10' },
      { id: 2, message: 'Could improve visitor flow.', submittedAt: '2024-12-11' },
    ]);
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">Visitor Feedback</h1>
      <div className="mt-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="p-4 border-b border-gray-200 hover:bg-gray-100"
          >
            <p>{fb.message}</p>
            <small className="text-gray-500">Submitted on {fb.submittedAt}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
