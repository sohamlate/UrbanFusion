import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [signUpType, setSignUpType] = useState('email'); 
  const [userRole, setUserRole] = useState('user'); 
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (signUpType === 'email') {
      if (email && password) {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', userRole);
        
      } else {
        setError('Please fill in all fields');
      }
    } else if (signUpType === 'otp') {
      if (email && otp) {
        console.log('Email:', email);
        console.log('OTP:', otp);
        console.log('Role:', userRole);

      } else {
        setError('Please fill in all fields');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="text-center mb-4">
          <button
            onClick={() => setUserRole('user')}
            className={`py-2 px-4 rounded-l-md ${userRole === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            User Sign Up
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`py-2 px-4 rounded-r-md ${userRole === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Admin Sign Up
          </button>
        </div>
        
        
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {signUpType === 'email' && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}
          {signUpType === 'otp' && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            </>
          )}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              {signUpType === 'email' ? 'Sign Up' : 'Verify OTP'}
            </button>
          </div>
          <div className="text-center mt-4">
            <a href="/login" className="text-blue-500 hover:underline">
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
