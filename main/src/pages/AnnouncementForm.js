import React, { useState } from "react";

const AnnouncementForm = ({ onClose }) => {
  const [announcement, setAnnouncement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to server or update state)
    console.log("Announcement submitted:", announcement);
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Announcement</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter announcement details here..."
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
