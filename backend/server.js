const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  // Import the connectDB function
const userRoutes = require('./routes/userroute');
const workoutRoutes = require('./routes/workoutroute');  // Ensure this path is correct
const cors = require('cors');

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

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
