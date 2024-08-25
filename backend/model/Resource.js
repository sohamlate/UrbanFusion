const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    resourceID: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['available', 'allocated'], default: 'available' },
    location: { type: String, required: true }, // Coordinates or address
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    legalClearance: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);
