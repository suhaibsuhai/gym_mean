const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user
exports.registerUser = async (req, res) => {
  // Input validation
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check for existing user
  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ message: 'Email already in use.' }); // Conflict
      }
  } catch (error) {
      return res.status(500).json({ message: 'Error checking for existing user.' }); // Internal server error
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
      username,
      password: hashedPassword,
      email
  });

  // Save the user
  try {
      await user.save();
      res.status(201).json({ message: 'User registered successfully.' }); // Successful registration
  } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: 'Registration failed.', error: error.message }); // Error during save
  }
};
// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };