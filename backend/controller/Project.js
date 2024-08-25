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

  if (!projectID || !title || !description || !location) {
    return res.status(400).json({ error: 'All required fields must be filled' });
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

exports.searchProjectsByLocation = async (req, res) => {
    const { location } = req.query;
  
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }
  
    try {
      // Perform a case-insensitive search for projects with matching location
      const projects = await Project.find({ location: { $regex: new RegExp(location, 'i') } });
      
      if (projects.length === 0) {
        return res.status(404).json({ error: 'No projects found for the specified location' });
      }
  
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search projects by location' });
    }
  };

// Controller to get projects by status
exports.getProjectsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const projects = await Project.find({ status }).populate('departmentsInvolved');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch filtered projects' });
  }
};
