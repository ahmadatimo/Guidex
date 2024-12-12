import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface Feedback {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user_id: number;
  appointment_id: number | null;
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setShouldRedirect(true);
          return;
        }

        const response = await fetch('/api/feedback/list', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        // Handle specific HTTP status codes
        switch (response.status) {
          case 401:
            sessionStorage.removeItem('token'); // Clear invalid token
            setShouldRedirect(true);
            return;
          case 403:
            throw new Error('Access denied - You do not have permission to view feedback');
          case 404:
            throw new Error('Feedback data not found');
          case 500:
            throw new Error('Server error - Please try again later');
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format - Expected JSON data');
        }

        const data = await response.json();
        
        // Validate response data structure
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format - Expected an array of feedback');
        }

        // Validate each feedback object
        const validatedFeedbacks = data.map((item: any) => {
          if (!item.id || typeof item.rating !== 'number' || !item.created_at) {
            throw new Error('Invalid feedback data structure');
          }
          return item as Feedback;
        });

        setFeedbacks(validatedFeedbacks);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch feedback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/auth" replace />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="flex justify-center items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-gray-600">Loading feedback...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 text-lg">⚠️</span>
            <h3 className="text-red-800 font-semibold">Error</h3>
          </div>
          <p className="text-red-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
        Visitor Feedback
      </h1>
      
      {feedbacks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-gray-500">No feedback submitted yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-blue-600">
                      {feedback.rating}/5
                    </span>
                    <RatingStars rating={feedback.rating} />
                  </div>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(feedback.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <p className="text-gray-700 overflow-hidden line-clamp-3">{feedback.comment}</p>
              
              {feedback.appointment_id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Appointment ID: {feedback.appointment_id}
                  </span>
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