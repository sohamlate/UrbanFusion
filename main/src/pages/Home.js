import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Urban Governance Platform</h1>
        <p className="text-lg mb-8">Streamlining interdepartmental cooperation for better urban management.</p>
        <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        

        {/* New Features Section */}
        <div className="flex flex-col gap-x-5 md:flex-row justify-around items-center space-y-8 md:space-y-0 mt-12">
          <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Project Management</h3>
            <p>Manage ongoing and upcoming projects and share data with other departments.</p>
            <button
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/projects'}
            >
              Manage Projects
            </button>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Task Scheduling</h3>
            <p>Schedule and track tasks across departments for collaborative projects.</p>
            <button
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/tasks'}
            >
              Schedule Tasks
            </button>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Discussion Forum</h3>
            <p>Participate in discussions and share insights within and across departments.</p>
            <button
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/forum'}
            >
              Join the Forum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
