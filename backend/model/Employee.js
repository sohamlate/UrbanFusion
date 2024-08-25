const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee'], default: 'employee' },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  accessLevel: { type: String, enum: ['read', 'write'], default: 'read' },
  assignedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  aadhaarNumber: { type: String, required: true, select: false }, // Masked and encrypted
  PAN: { type: String, required: true, select: false }, // Masked and encrypted
  createdAt: { type: Date, default: Date.now },
  complianceAcknowledgement: { type: Boolean, default: false }
  
});

module.exports = mongoose.model('Employee', employeeSchema);
