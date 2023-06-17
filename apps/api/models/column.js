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
});

const Column = mongoose.model("Task", ColumnSchema);

module.exports = Column;