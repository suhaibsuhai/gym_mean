const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// Create a workout
router.post('/', workoutController.createWorkout);

// Get all workouts
router.get('/', workoutController.getAllWorkouts);

// Get a workout by ID
router.get('/:id', workoutController.getWorkoutById);

// Update a workout by ID
router.put('/:id', workoutController.updateWorkout);

// Delete a workout by ID
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
