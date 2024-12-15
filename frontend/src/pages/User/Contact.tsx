import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const clicked = () => {
    navigate('/');
    toast.success('Message sent.\nThanks for your question.');
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
        If you have any questions or need more information, please feel free to reach out to us. We’d love to hear from you!
      </p>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Address</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Bilkent University  
            06800 Bilkent, Ankara, Türkiye
          </p>
          <h2 className="text-2xl font-semibold mb-4">Phone</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">+90 312 290 4000</p>
          <h2 className="text-2xl font-semibold mb-4">Email</h2>
          <p className="text-gray-700 dark:text-gray-300">bilinfo@bilkent.edu.tr</p>
        </div>
  
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form 
            className="space-y-4"
            onSubmit={clicked}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 border rounded bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
              rows={5}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );  
};

export default Contact;
