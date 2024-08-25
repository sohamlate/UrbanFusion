const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; 

const departmentSchema = new Schema({


  name: { type: String, required: true },
  departmentCode: { type: String, required: true, unique: true },
  departmentAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  createdAt: { type: Date, default: Date.now },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]

});

module.exports = mongoose.model('Department', departmentSchema);
