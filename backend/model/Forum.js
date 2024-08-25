const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  forumID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' }, // Optional, for departmental forums
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Forum', forumSchema);
