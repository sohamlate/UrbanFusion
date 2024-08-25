const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['planning', 'in-progress', 'completed'], default: 'planning' },
  location: { type: String, required: true }, // Coordinates or address
  departmentsInvolved: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  legalComplianceStatus: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
