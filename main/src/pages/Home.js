import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white text-center p-6">
        <h1 className="text-5xl font-bold mb-4">Urban Governance Platform</h1>
        <p className="text-lg mb-8">Streamlining interdepartmental cooperation for efficient urban development.</p>
        <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

        <div className="flex flex-col gap-y-8 md:flex-row md:gap-x-6 md:gap-y-0 justify-center items-stretch">
          <div className="w-full md:w-1/3 p-6 bg-gray-200 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Data & Resource Exchange</h3>
            <p className="mb-4">Easily share technical expertise, machinery, and technology among departments. Access lists of ongoing and upcoming projects to improve coordination.</p>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/projects'}
            >
              Explore Projects
            </button>
          </div>
          <div className="w-full md:w-1/3 p-6 bg-gray-200 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Task Scheduling</h3>
            <p className="mb-4">Schedule and track tasks efficiently. Organize work distribution and manage deadlines for inter-departmental projects.</p>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/tasks'}
            >
              Manage Tasks
            </button>
          </div>
          <div className="w-full md:w-1/3 p-6 bg-gray-200 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Unified Project Planning</h3>
            <p className="mb-4">Identify and unify projects that share the same site. Optimize project phasing to reduce costs and enhance efficiency.</p>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              onClick={() => window.location.href = '/forum'}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
