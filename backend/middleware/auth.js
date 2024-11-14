const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to protect routes
const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.split(' ')[1]; // Expected format: "Bearer <token>"

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user to the request object
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;
