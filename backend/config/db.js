const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables from a .env file

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gym-ecommerce');
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Exit process with failure if the connection fails
    }
};

module.exports = connectDB;
