export interface Workout {
  _id?: string;        // Optional, unique identifier for the workout
  date: Date;       // Date in ISO format (e.g., "2024-11-11")
  time: string;       // Time in HH:mm format (e.g., "14:30")
  name: string;       // Name of the workout (e.g., "Push-Ups")
  count: number;      // Number of repetitions or sets
  comments: string;
}
