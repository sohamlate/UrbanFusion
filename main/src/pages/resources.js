// src/pages/Resources.js
import React from 'react';

const Resources = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">Resources</h1>
        <p className="text-lg mb-4">
          Explore valuable resources related to urban governance and interdepartmental collaboration. 
          These materials include guides, reports, and useful links to enhance your understanding and efficiency.
        </p>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Resource Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Urban Governance Guide</h2>
            <p className="text-gray-600 mb-4">
              A comprehensive guide on urban governance principles, practices, and policies.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800">Read More</a>
          </div>

          {/* Add more resource cards as needed */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Interdepartmental Collaboration Report</h2>
            <p className="text-gray-600 mb-4">
              An insightful report on best practices for collaboration between departments.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800">Read More</a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Training Resources</h2>
            <p className="text-gray-600 mb-4">
              Access various training materials and workshops to build your skills.
            </p>
            <a href="#" className="text-teal-600 hover:text-teal-800">Explore</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
