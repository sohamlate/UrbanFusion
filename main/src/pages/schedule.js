import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarIcon, PlusCircleIcon } from '@heroicons/react/solid';

const SchedulingPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Project Kickoff Meeting', dueDate: '2024-08-30', department: 'Planning', completed: false },
    { id: 2, title: 'Site Survey', dueDate: '2024-09-05', department: 'Engineering', completed: false },
  ]);

  const [newTask, setNewTask] = useState({ title: '', dueDate: '', department: '' });

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate && newTask.department) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
      setNewTask({ title: '', dueDate: '', department: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Scheduling</h1>
          <nav className="space-x-4">
            <NavLink to="/home" className="text-white hover:text-yellow-300 transition-colors duration-300">
              Home
            </NavLink>
            <NavLink to="/profile" className="text-white hover:text-yellow-300 transition-colors duration-300">
              Profile
            </NavLink>
            <NavLink to="/logout" className="text-white hover:text-yellow-300 transition-colors duration-300">
              Logout
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Add New Task Section */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task Title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={newTask.department}
                onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
                placeholder="Department"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                <PlusCircleIcon className="w-5 h-5 inline mr-2" />
                Add Task
              </button>
            </div>
          </section>

          {/* Task List Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className={`flex items-center justify-between p-4 border-b border-gray-200 ${task.completed ? 'bg-green-50' : ''}`}>
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600">Due Date: {task.dueDate}</p>
                    <p className="text-gray-600">Department: {task.department}</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => handleTaskCompletion(task.id)} 
                    className="h-6 w-6 text-blue-600"
                  />
                </li>
              ))}
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

export default SchedulingPage;
