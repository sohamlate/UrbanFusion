import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Verify
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOtp;
