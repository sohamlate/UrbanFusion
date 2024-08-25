const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  notificationID: { type: String, required: true, unique: true },
  type: { type: String, enum: ['task-assigned', 'resource-request', 'project-update'], required: true },
  message: { type: String, required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' }
});

module.exports = mongoose.model('Notification', notificationSchema);
