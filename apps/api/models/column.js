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
});

const Column = mongoose.model("Task", ColumnSchema);

module.exports = Column;