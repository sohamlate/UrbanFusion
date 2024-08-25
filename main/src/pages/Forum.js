// src/pages/DiscussionForumPage.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const DiscussionForumPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Discussion Forums</h1>
        </div>
      </header>

      <main className="flex-grow py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Engage with Various Discussion Forums</h2>
            <p>Collaborate and share insights:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <NavLink to="/forums/intra-department" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  Intra-Departmental Forums
                </NavLink>: Discuss topics specific to individual departments.
              </li>
              <li>
                <NavLink to="/forums/inter-department" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  Inter-Departmental Forums
                </NavLink>: Collaborate on projects and issues involving multiple departments.
              </li>
              <li>
                <NavLink to="/forums/public" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  Public Forums
                </NavLink>: Provide feedback and engage with the general public.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <p>&copy; 2024 Urban Governance Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DiscussionForumPage;
