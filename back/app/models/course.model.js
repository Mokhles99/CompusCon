// app/models/course.model.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  
  room: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  courseFile: { data: Buffer, contentType: String, type: String }, 
});

module.exports = mongoose.model('Course', courseSchema);


