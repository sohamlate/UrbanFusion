const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentAdminSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['department-admin'], default: 'department-admin' },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    permissions: {
        addEmployee: { type: Boolean, default: true },
        removeEmployee: { type: Boolean, default: true }
    },
    aadhaarNumber: { type: String, required: true, select: false }, // Masked and encrypted
    PAN: { type: String, required: true, select: false }, // Masked and encrypted
    createdAt: { type: Date, default: Date.now },
    complianceAcknowledgement: { type: Boolean, default: false }
});

module.exports = mongoose.model('DepartmentAdmin', departmentAdminSchema);
