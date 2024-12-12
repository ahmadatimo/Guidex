import React, { useState } from 'react';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // POST feedback to the backend (use an API endpoint)
    alert('Feedback submitted successfully!');
    setFeedback('');
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">Submit Your Feedback</h1>
      <form className="mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;
