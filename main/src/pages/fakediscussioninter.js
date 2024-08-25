// src/pages/InterDepartmentalDiscussionPage.js
import React, { useState } from 'react';

const InterDepartmentalDiscussionPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, author: 'Carol Davis', text: 'Let’s coordinate our resources for the upcoming project.' },
    { id: 2, author: 'Dave Green', text: 'I agree. We should have a joint meeting to discuss the details.' },
    { id: 3, author: 'Carol Davis', text: 'How about a shared calendar to track progress and deadlines?' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, author: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Inter-Departmental Discussion: Resource Coordination</h1>
        </div>
      </header>

      <main className="flex-grow py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="space-y-4 mb-4">
              {messages.map(message => (
                <div key={message.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="font-semibold">{message.author}</p>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Send
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

export default InterDepartmentalDiscussionPage;
