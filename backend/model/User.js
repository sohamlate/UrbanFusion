const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; 



const userSchema = new Schema({

    
  userID: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['central-admin', 'department-admin', 'employee'] },
  permissions: {
    addDepartment: { type: Boolean, default: false },
    removeDepartment: { type: Boolean, default: false },
    addEmployee: { type: Boolean, default: false },
    removeEmployee: { type: Boolean, default: false }
  },
  department: { type: Schema.Types.ObjectId, ref: 'Department' }, 
  aadhaarNumber: { type: String, select: false },
  PAN: { type: String, select: false },
  createdAt: { type: Date, default: Date.now },
  complianceAcknowledgement: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
