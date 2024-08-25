const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  forum: { type: Schema.Types.ObjectId, ref: 'Forum' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
