const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//   },
//   image: {
//     type: String,
//   },
//   // column: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: 'Column',
//   //   required: true,
//   // },
// });

// Create a task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
