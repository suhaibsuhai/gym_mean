const mongoose = require('mongoose');

// Define the workout schema
const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the Workout model
module.exports = mongoose.model('Workout', workoutSchema);
