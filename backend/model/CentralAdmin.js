const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; 

const centralAdminSchema = new Schema({

    
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['central-admin'], default: 'central-admin' },
  permissions: {
    addDepartment: { type: Boolean, default: true },
    removeDepartment: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  aadhaarNumber: { type: String, required: true, select: false }, 
  PAN: { type: String, required: true, select: false }, 
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  complianceAcknowledgement: { type: Boolean, default: false }
});

module.exports = mongoose.model('CentralAdmin', centralAdminSchema);
