const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: { type: String, default: 'planning' }, // planning, in-progress, completed
  departmentsInvolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  legalComplianceStatus: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
