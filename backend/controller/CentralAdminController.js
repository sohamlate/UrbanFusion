

const Department = require('../model/Department');
const User = require('../model/User');


exports.addDepartment = async (req, res) => {
  try {
    const { name, departmentCode, adminId } = req.body;


    if (!name || !departmentCode || !adminId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Department already exists' });
    }

    
    const newDepartment = new Department({
      name,
      departmentCode,
      departmentAdmin: adminId,
      createdAt: Date.now() 
    });

  
    await newDepartment.save();

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    admin.department = newDepartment._id;
    admin.role = 'DepartmentAdmin';
    await admin.save();

    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.removeDepartment = async (req, res) => {
  try {
    const { id } = req.params;

  
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await User.updateOne(
      { department: id },
      { $unset: { department: "", role: "Employee" } }
    );

 
    res.status(204).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.viewDepartments = async (req, res) => {
  try {
  
    const departments = await Department.find().populate('departmentAdmin', 'name email');
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.assignDepartmentAdmin = async (req, res) => {
  try {
    const { departmentId, adminId } = req.body;


    if (!departmentId || !adminId) {
      return res.status(400).json({ message: 'Department ID and Admin ID are required' });
    }


    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }


    department.departmentAdmin = adminId;
    await department.save();

    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    admin.department = departmentId;
    admin.role = 'DepartmentAdmin';
    await admin.save();

  
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
