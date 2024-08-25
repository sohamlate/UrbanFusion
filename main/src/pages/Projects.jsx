import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [filter, setFilter] = useState('all'); // all, ongoing, completed
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch projects from the server
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject) {
      setError('Project name cannot be empty');
      return;
    }

    try {
      const response = await axios.post('/api/projects', { name: newProject });
      setProjects([...projects, response.data]);
      setNewProject('');
      setError('');
    } catch (error) {
      setError('Failed to add project');
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Projects</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => handleFilterChange('all')}
          className={`py-2 px-4 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All Projects
        </button>
        <button
          onClick={() => handleFilterChange('ongoing')}
          className={`py-2 px-4 rounded-md ${filter === 'ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Ongoing
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`py-2 px-4 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>
      
      <form onSubmit={handleAddProject} className="mb-6 flex space-x-4">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="New project name"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Add Project
        </button>
      </form>

      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p>Status: {project.status}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                onClick={() => window.location.href = `/projects/${project._id}`}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
