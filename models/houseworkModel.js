const mongoose = require("mongoose");

const houseworkSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Housework", houseworkSchema);
