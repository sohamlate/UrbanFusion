const express = require('express');
const router = express.Router();
const projectController = require('../controller/Project');

// Route to get all projects
router.get('/', projectController.getAllProjects);

// Route to add a new project
router.post('/', projectController.addProject);

// Route to get projects by status
router.get('/filter/:status', projectController.getProjectsByStatus);

router.get('/search', projectController.searchProjects);

router.put('/:projectId', projectController.updateProjectStatus);

module.exports = router;
