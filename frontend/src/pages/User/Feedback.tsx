import React, { useState } from 'react';

interface FeedbackForm {
  rating: number;
  comment: string;
}

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackForm>({
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setFeedback({ rating: 5, comment: '' });
      alert('Feedback submitted successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">Submit Your Feedback</h1>
      <form className="mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <select
            className="w-full border rounded p-2"
            value={feedback.rating}
            onChange={(e) => setFeedback(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Comment</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Write your feedback here..."
            value={feedback.comment}
            onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
            required
            rows={4}
          />
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Feedback;