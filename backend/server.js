const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  // Import the connectDB function
const userRoutes = require('./routes/userroute');
const workoutRoutes = require('./routes/workoutroute');  // Ensure this path is correct
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/userroute', userRoutes);
app.use('/api/workouts', workoutRoutes); // Fixed route path by adding a leading '/'

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  // In production, serve the frontend React app
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')); // Corrected to sendFile
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
