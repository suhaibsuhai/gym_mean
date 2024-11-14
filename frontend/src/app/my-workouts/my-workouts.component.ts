import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service'; // Adjust path as necessary
import { Workout } from '../models/workout.model'; // Import Workout model

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css'],
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];  // Array to store filtered workouts
  newWorkout: Workout = { date: new Date(), time: '', name: '', count: 0, comments: '' };  // Set default date to current date
  editMode: boolean = false;
  currentWorkoutId: string | null = null; // Updated type to handle nullable

  // For search and sort functionality
  searchText: string = '';
  sortCriteria: string = 'date'; // Default sort by date

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  // Get all workouts
  getWorkouts(): void {
    this.workoutService.getWorkouts().subscribe((data: Workout[]) => {
      this.workouts = data;
      this.filteredWorkouts = [...this.workouts];  // Initialize with all workouts
    });
  }

  // Add new workout
  addWorkout(): void {
    this.workoutService.addWorkout(this.newWorkout).subscribe((data) => {
      this.workouts.push(data); // Add new workout to the list
      this.filteredWorkouts.push(data); // Add to filtered workouts as well
      this.newWorkout = { date: new Date(), time: '', name: '', count: 0, comments: '' }; // Reset form with current date
    });
  }

  // Edit workout
  editWorkout(workout: Workout): void {
    this.editMode = true;
    this.currentWorkoutId = workout._id ?? null; // Use null if _id is undefined
    this.newWorkout = { ...workout }; // Copy workout data to form
  }

  // Update workout
  updateWorkout(): void {
    if (this.currentWorkoutId) {
      this.workoutService
        .updateWorkout(this.currentWorkoutId, this.newWorkout)
        .subscribe((updatedWorkout) => {
          const index = this.workouts.findIndex(
            (workout) => workout._id === this.currentWorkoutId
          );
          if (index !== -1) {
            this.workouts[index] = updatedWorkout; // Update workout in list
            this.filteredWorkouts[index] = updatedWorkout; // Update filtered list as well
          }
          this.cancelEdit(); // Reset form and mode
        });
    }
  }

  // Delete workout
  deleteWorkout(id: string | undefined): void {
    if (id) { // Ensure id is defined before proceeding
      this.workoutService.deleteWorkout(id).subscribe(() => {
        this.workouts = this.workouts.filter((workout) => workout._id !== id); // Remove from list
        this.filteredWorkouts = this.filteredWorkouts.filter((workout) => workout._id !== id); // Remove from filtered list
      });
    }
  }

  // Cancel edit mode and reset form
  cancelEdit(): void {
    this.editMode = false;
    this.newWorkout = { date: new Date(), time: '', name: '', count: 0, comments: '' }; // Reset form with current date
    this.currentWorkoutId = null;
  }

  // Search workouts by name
  searchWorkouts(): void {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Sort workouts by selected criteria
  sortWorkouts(): void {
    if (this.sortCriteria === 'date') {
      this.filteredWorkouts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortCriteria === 'count') {
      this.filteredWorkouts.sort((a, b) => a.count - b.count);
    }
  }
}
