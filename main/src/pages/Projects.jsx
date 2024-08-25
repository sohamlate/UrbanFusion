import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', location: '' });
  const [filter, setFilter] = useState('all'); // all, planning, in-progress, completed
  const [searchLocation, setSearchLocation] = useState(''); // For location search
  const [error, setError] = useState('');

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://urban-fusion-jm21.vercel.app/project/');
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    const { title, location } = newProject;

    if (!title || !location) {
      setError('Project title and location cannot be empty');
      return;
    }

    try {
      const response = await axios.post('https://urban-fusion-jm21.vercel.app/project/', {
        projectID: `proj_${Date.now()}`, // Generate a simple unique ID for the project
        title,
        description: 'Default description', // Default description
        location,
        status: 'planning', // Set default status to 'planning'
        departmentsInvolved: [],
        legalComplianceStatus: true,
      });
      setProjects([...projects, response.data]);
      setNewProject({ title: '', location: '' });
      setError('');
    } catch (error) {
      setError('Failed to add project');
    }
  };

  // Handle filtering projects by status
  const handleFilterChange = (status) => {
    setFilter(status);
  };

  // Handle searching projects by location
  const handleSearchLocation = async () => {
    if (!searchLocation) {
      setError('Please enter a location to search');
      return;
    }

    try {
      const response = await axios.get(`https://urban-fusion-jm21.vercel.app/project/search?location=${searchLocation}`);
      setProjects(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch projects by location');
    }
  };

  // Handle status change of a project
  const handleStatusChange = async (projectId, newStatus) => {
    if (!['planning', 'in-progress', 'completed'].includes(newStatus)) {
      setError('Invalid status');
      return;
    }

    try {
      const response = await axios.put(`https://urban-fusion-jm21.vercel.app/project/${projectId}`, { status: newStatus });
      // Update the project list with the updated project
      setProjects(projects.map(project =>
        project._id === projectId ? { ...project, status: newStatus } : project
      ));
      setError('');
    } catch (error) {
      setError('Failed to update project status');
    }
  };

  // Filter projects based on the selected filter
  const filteredProjects = projects.filter((project) => {
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
          onClick={() => handleFilterChange('planning')}
          className={`py-2 px-4 rounded-md ${filter === 'planning' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Planning
        </button>
        <button
          onClick={() => handleFilterChange('in-progress')}
          className={`py-2 px-4 rounded-md ${filter === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          In-Progress
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`py-2 px-4 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>

      <div className='flex justify-evenly'>

        <form onSubmit={handleAddProject} className="mb-6 space-y-4">
          <div>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="New project title"
            />
          </div>
          <div>
            <input
              type="text"
              value={newProject.location}
              onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Project location"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Add Project
          </button>
        </form>

        <div className="mb-6">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by location"
          />
          <button
            onClick={handleSearchLocation}
            className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Search
          </button>
        </div>

      </div>

      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p>Status: {project.status}</p>
              <p>Description: {project.description}</p>
              <p>Location: {project.location}</p>

              {/* Dropdown for changing project status */}
              {project.status !== 'completed' && (
                <div className="mt-4">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

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
