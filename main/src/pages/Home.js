import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, DatabaseIcon, CalendarIcon, ChatIcon, UserGroupIcon, PlusCircleIcon } from '@heroicons/react/solid';
import AnnouncementForm from './AnnouncementForm'; // Import AnnouncementForm component
import governmentImage from '../assets/img2.jpg'; // Import your local image
//import announcementImage from '../assets/img2.jpg'; // Import image for announcement

const HomePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddAnnouncement = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      {/* <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-6 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          
          <nav className="space-x-6">
            <NavLink
              to="/profile"
              className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-medium"
            >
              Profile
            </NavLink>
            <NavLink
              to="/logout"
              className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-medium"
            >
              Logout
            </NavLink>
          </nav>
        </div>
      </header> */}

      {/* Main Content */}
      <h3 className="mt-[3rem] text-xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl leading-tight text-center mb-6">
  Urban Governance Platform
</h3>

      <main className="flex-grow py-8">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col lg:flex-row lg:space-x-8">
      
          {/* Content Section */}
          <div className="flex-1">
            {/* Image Above Announcements */}
            <div className="mb-6 relative flex justify-center items-center">
            
            <img
  src={governmentImage}
  alt="Government"
  className=" h-[600px] w-[1000px]  screen object-cover rounded-lg shadow-md border border-gray-200"
/>

            </div>

            {/* Announcements Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 relative">
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <button
                onClick={handleAddAnnouncement}
                className="bg-green-500 text-white py-1 px-3 rounded-md flex items-center space-x-2 absolute top-4 right-4 hover:bg-green-600 transition-colors duration-300 text-sm"
              >
                <PlusCircleIcon className="w-4 h-4" />
                <span>Add</span>
              </button>
              <ul className="list-disc pl-5 space-y-2">
                <li>New training modules available starting next week.</li>
                <li>Upcoming inter-departmental project planning meeting.</li>
                <li>System maintenance scheduled for this weekend.</li>
              </ul>
            </section>

            {/* Quick Stats Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-teal-500 text-white p-4 rounded-lg text-center border border-gray-300 shadow-md">
                  <h3 className="text-3xl font-bold">25</h3>
                  <p className="text-lg font-medium">Ongoing Projects</p>
                </div>
                <div className="bg-blue-500 text-white p-4 rounded-lg text-center border border-gray-300 shadow-md">
                  <h3 className="text-3xl font-bold">12</h3>
                  <p className="text-lg font-medium">Upcoming Deadlines</p>
                </div>
                <div className="bg-yellow-500 text-white p-4 rounded-lg text-center border border-gray-300 shadow-md">
                  <h3 className="text-3xl font-bold">8</h3>
                  <p className="text-lg font-medium">Active Discussions</p>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg text-center border border-gray-300 shadow-md">
                  <h3 className="text-3xl font-bold">3</h3>
                  <p className="text-lg font-medium">Recent Updates</p>
                </div>
              </div>
            </section>

            {/* Upcoming Events Calendar */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              {/* Placeholder for calendar or events */}
              <div className="h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Calendar view coming soon!</p>
              </div>
            </section>

            {/* Recent Activity Feed */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-500 text-white p-3 rounded-full">
                    <HomeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-800">Updated project status for XYZ.</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-800">Scheduled meeting for department A.</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
                {/* Add more activity items here */}
              </div>
            </section>

            {/* Overview Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <NavLink
                to="/projects"
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <DatabaseIcon className="w-12 h-12 text-teal-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
                  <p className="text-gray-600">View and manage ongoing and upcoming projects across departments.</p>
                </div>
              </NavLink>

              <NavLink
                to="/scheduling"
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <CalendarIcon className="w-12 h-12 text-teal-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Scheduling</h3>
                  <p className="text-gray-600">Manage task scheduling, deadlines, and work distribution.</p>
                </div>
              </NavLink>

              <NavLink
                to="/Forum"
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <ChatIcon className="w-12 h-12 text-teal-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Discussion Forums</h3>
                  <p className="text-gray-600">Participate in discussions within and between departments.</p>
                </div>
              </NavLink>

              <NavLink
                to="/training"
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <UserGroupIcon className="w-12 h-12 text-teal-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Training & Capacity Building</h3>
                  <p className="text-gray-600">Access training sessions, workshops, and seminars.</p>
                </div>
              </NavLink>
            </section>
          </div>

          {/* Government Image */}
          {/* <div className="w-full lg:w-1/3 lg:flex-shrink-0 mt-8 lg:mt-0">
            <img
              src={governmentImage}
              alt="Government"
              className="w-full h-auto lg:h-[500px] object-cover rounded-lg shadow-lg border border-gray-200"
            />
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 mt-auto">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2024 Urban Governance Platform. All rights reserved.</p>
        </div>
      </footer>

      {/* Announcement Form */}
      {isFormOpen && <AnnouncementForm onClose={handleCloseForm} />}
    </div>
  );
};

export default HomePage;
