// src/pages/IntraDepartmentalForumPage.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const IntraDepartmentalForumPage = () => {
  const [discussions, setDiscussions] = useState([
    { id: 1, title: 'Budget Allocation for 2024', author: 'John Doe', date: '2024-08-25' },
    { id: 2, title: 'Infrastructure Development', author: 'Jane Smith', date: '2024-08-24' },
    { id: 3, title: 'Employee Welfare Programs', author: 'Michael Johnson', date: '2024-08-23' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Intra-Departmental Forums</h1>
        </div>
      </header>

      <main className="flex-grow py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Department-Specific Discussions</h2>
            <p className="mb-4">Discuss topics specific to your department, share insights, and collaborate on projects.</p>
            
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* Discussion List */}
            <ul className="space-y-4">
              {filteredDiscussions.map(discussion => (
                <li key={discussion.id} className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
                  <h3 className="text-lg font-semibold">{discussion.title}</h3>
                  <p className="text-sm text-gray-600">by {discussion.author} on {discussion.date}</p>
                  <NavLink
                    to={`/discussion/${discussion.id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mt-2 inline-block"
                  >
                    View Discussion
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Create New Discussion Button */}
            <div className="mt-6 text-right">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Create New Discussion
              </button>
            </div>
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

export default IntraDepartmentalForumPage;
