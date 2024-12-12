import React, { useEffect, useState } from 'react';

interface Feedback {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user_id: number;
  appointment_id: number | null;
}

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/feedback/list', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized - Please log in again');
          }
          if (response.status === 403) {
            throw new Error('Access denied - You do not have permission to view feedback');
          }
          throw new Error('Failed to fetch feedback');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server returned invalid response format');
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch feedback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 p-4 text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-center">{error}</p>
          <p className="text-red-500 text-sm text-center mt-2">
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Visitor Feedback</h1>
      
      {feedbacks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No feedback submitted yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-blue-600">{fb.rating}/5</span>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-xl ${
                          index < fb.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(fb.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-gray-700">{fb.comment}</p>
              
              {fb.appointment_id && (
                <div className="mt-2 text-sm text-gray-500">
                  Appointment ID: {fb.appointment_id}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;