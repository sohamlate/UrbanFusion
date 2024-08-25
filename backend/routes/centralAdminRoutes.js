// routes/centralAdminRoutes.js

const express = require('express');
const CentralAdminController = require('../controller/CentralAdminController');
const router = express.Router();

router.post('/add-department', CentralAdminController.addDepartment);


router.delete('/remove-department/:id', CentralAdminController.removeDepartment);

router.get('/view-departments', CentralAdminController.viewDepartments);

router.put('/assign-department-admin', CentralAdminController.assignDepartmentAdmin);

module.exports = router;
