const Project = require('../model/Project');

// Controller to get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('departmentsInvolved');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Controller to add a new project
exports.addProject = async (req, res) => {
  const { projectID, title, description, location, departmentsInvolved, legalComplianceStatus } = req.body;

  if (!projectID || !title || !description || !location || !location.lat || !location.lng) {
    return res.status(400).json({ error: 'All required fields must be filled, including location coordinates' });
  }

  try {
    const newProject = new Project({
      projectID,
      title,
      description,
      location,
      departmentsInvolved,
      legalComplianceStatus,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
};

// Controller to update project status
exports.updateProjectStatus = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body;

  const validStatuses = ['planning', 'in-progress', 'completed'];

  // Validate status
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check if status transition is valid
    if (
      (project.status === 'planning' && status === 'completed') ||
      (project.status === 'in-progress' && status === 'planning')
    ) {
      return res.status(400).json({ error: 'Invalid status transition' });
    }

    // Update project status
    project.status = status;
    project.updatedAt = Date.now(); // Update the timestamp
    const updatedProject = await project.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project status' });
  }
};


exports.searchProjects = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query; 
    const radiusInMeters = parseInt(radius) || 5000; 

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

   
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

   
    const projects = await Project.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lngNum, latNum], radiusInMeters / 6378100] // 6378100 is Earth's radius in meters
        }
      }
    });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getProjectsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const projects = await Project.find({ status }).populate('departmentsInvolved');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch filtered projects' });
  }
};
