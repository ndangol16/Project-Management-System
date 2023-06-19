const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  }
});

const Column = mongoose.model("Column", ColumnSchema);

module.exports = Column;