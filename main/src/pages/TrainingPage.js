// src/pages/TrainingPage.js
import React from 'react';

const TrainingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Training & Capacity Building</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Training Sessions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Project Management Workshop - August 28, 2024</li>
              <li>Urban Planning Seminar - September 5, 2024</li>
              <li>Capacity Building in Smart Cities - September 12, 2024</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Available Resources</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Introduction to Urban Governance - PDF</li>
              <li>Inter-Departmental Coordination Techniques - Video</li>
              <li>Effective Communication Strategies - Webinar Recording</li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <p>&copy; 2024 Urban Governance Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TrainingPage;
