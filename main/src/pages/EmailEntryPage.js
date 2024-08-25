import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailEntryPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://urban-fusion-jm21.vercel.app/user/sendotp', { email });
      if (response.data.success) {
        setSuccess('OTP sent successfully. Redirecting to signup page...');
        setError('');
        // Redirect to signup page
        setTimeout(() => navigate('/signup'), 2000);
      }
    } catch (error) {
      setError('Error sending OTP. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Enter Your Email</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailEntryPage;
