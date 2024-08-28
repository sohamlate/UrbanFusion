import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', location: { lat: 0, lng: 0 } });
  const [filter, setFilter] = useState('all');
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [error, setError] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchMap, setSearchMap] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const [searchLocation, setSearchLocation] = useState({ lat: 0, lng: 0 });
  const mapContainer = React.useRef(null);
  const searchMapContainer = React.useRef(null);

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

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = L.map(mapContainer.current).setView([0, 0], 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      mapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setNewProject({ ...newProject, location: { lat, lng } });
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          const newMarker = L.marker([lat, lng]).addTo(mapInstance);
          setMarker(newMarker);
        }
      });

      setMap(mapInstance);
    };

    if (!map) initializeMap();
  }, [map, newProject, marker]);

  useEffect(() => {
    if (map && newProject.location.lat && newProject.location.lng) {
      map.setView([newProject.location.lat, newProject.location.lng], 10);

      if (marker) {
        marker.setLatLng([newProject.location.lat, newProject.location.lng]);
      } else {
        const newMarker = L.marker([newProject.location.lat, newProject.location.lng]).addTo(map);
        setMarker(newMarker);
      }
    }
  }, [newProject, map, marker]);

  useEffect(() => {
    const initializeSearchMap = () => {
      const searchMapInstance = L.map(searchMapContainer.current).setView([0, 0], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(searchMapInstance);

      searchMapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setSearchLocation({ lat, lng });
        if (searchMarker) {
          searchMarker.setLatLng([lat, lng]);
        } else {
          const newSearchMarker = L.marker([lat, lng]).addTo(searchMapInstance);
          setSearchMarker(newSearchMarker);
        }
      });

      setSearchMap(searchMapInstance);
    };

    if (!searchMap) initializeSearchMap();
  }, [searchMap, searchMarker]);

  useEffect(() => {
    if (searchMap && searchLocation.lat && searchLocation.lng) {
      searchMap.setView([searchLocation.lat, searchLocation.lng], 13);

      if (searchMarker) {
        searchMarker.setLatLng([searchLocation.lat, searchLocation.lng]);
      } else {
        const newSearchMarker = L.marker([searchLocation.lat, searchLocation.lng]).addTo(searchMap);
        setSearchMarker(newSearchMarker);
      }
    }
  }, [searchLocation, searchMap, searchMarker]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const { title, location } = newProject;

    if (!title || !location.lat || !location.lng) {
      setError('Project title and location cannot be empty');
      return;
    }

    try {
      const response = await axios.post('https://urban-fusion-jm21.vercel.app/project/', {
        projectID: `proj_${Date.now()}`,
        title,
        description: 'Default description',
        location,
        status: 'planning',
        departmentsInvolved: [],
        legalComplianceStatus: true,
      });
      setProjects([...projects, response.data]);
      setNewProject({ title: '', location: { lat: 0, lng: 0 } });
      setError('');
    } catch (error) {
      setError('Failed to add project');
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleCitySearch = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        if (map) {
          map.setView([lat, lon], 10);
          setNewProject({ ...newProject, location: { lat, lon } });
          if (marker) {
            marker.setLatLng([lat, lon]);
          } else {
            const newMarker = L.marker([lat, lon]).addTo(map);
            setMarker(newMarker);
          }
        }
        setError('');
      } else {
        setError('City not found');
      }
    } catch (error) {
      setError('Failed to fetch city location');
    }
  };

  const handleSearchCity = async () => {
    if (!searchCity) {
      setError('Please enter a city name for the search map');
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${searchCity}&format=json&limit=1`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        if (searchMap) {
          searchMap.setView([lat, lon], 13);
          setSearchLocation({ lat, lon });
          if (searchMarker) {
            searchMarker.setLatLng([lat, lon]);
          } else {
            const newSearchMarker = L.marker([lat, lon]).addTo(searchMap);
            setSearchMarker(newSearchMarker);
          }
        }
        setError('');
      } else {
        setError('City not found');
      }
    } catch (error) {
      setError('Failed to fetch city location for the search map');
    }
  };

  const handleSearch = async () => {
    console.log("dsad",searchLocation);
    if (!searchLocation.lat || !searchLocation.lng) {
      setError('Please set a search location');
      return;
    }

    const radiusInMeters = 5000; // Fixed radius of 5 km
    const updatedProjects = projects.filter(project => {
      const distance = L.latLng(searchLocation.lat, searchLocation.lng).distanceTo(L.latLng(project.location.lat, project.location.lng));
      return distance <= radiusInMeters;
    });
    setProjects(updatedProjects);
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await axios.put(`https://urban-fusion-jm21.vercel.app/project/${projectId}`, { status: newStatus });
      const updatedProjects = projects.map((project) =>
        project._id === projectId ? { ...project, status: newStatus } : project
      );
      setProjects(updatedProjects);
    } catch (error) {
      setError('Failed to update project status');
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Projects</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6 flex flex-col">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter city name for main map"
          />
          <button
            onClick={handleCitySearch}
            className="ml-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Zoom to City (Main Map)
          </button>
        </div>
        {/* <div ref={mapContainer} style={{ height: '300px', borderRadius: '8px' }} /> */}
      </div>

      <div className="mb-6 flex flex-col">
        <form onSubmit={handleAddProject} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Add New Project</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Project Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <div ref={mapContainer} style={{ height: '300px', borderRadius: '8px' }} />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Add Project
          </button>
        </form>
      </div>


      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Search Projects by Location</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter city name for search map"
          />
          <button
            onClick={handleSearchCity}
            className="ml-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Zoom to City (Search Map)
          </button>
        </div>
        <div ref={searchMapContainer} style={{ height: '300px', borderRadius: '8px' }} />
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        >
          Search
        </button>
      </div>
      
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('planning')}
          className={`px-4 py-2 rounded-md ${filter === 'planning' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Planning
          
        </button>
        
        <button
          onClick={() => handleFilterChange('in-progress')}
          className={`px-4 py-2 rounded-md ${filter === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          In-Progress
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Completed
        </button>
        
      </div>

      <div>
        {filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600">Location: {project.location.lat}, {project.location.lng}</p>
              <p className="text-gray-600">Status: {project.status}</p>
              {project.status !== 'completed' && (
                <div className="mt-4">
                  <label htmlFor={`status-${project._id}`} className="block text-sm font-medium text-gray-700">
                    Change Status
                  </label>
                  <select
                    id={`status-${project._id}`}
                    value={project.status}
                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Projects ;