// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
//import dotenv
const dotenv = require('dotenv');
dotenv.config();

// Load environment variables manually
const jwtSecret = process.env.JWT_SECRET || 'default_secret';
console.log(jwtSecret,">>>>")

const register = async (req, res) => {
  try {
    console.log(req.body,">>>")
    const { username, email, password, role,status } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      status
    });

     // Generate JWT token
     const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1d' });

     // Attach the token to a cookie in the response
     res.cookie('token', token, { httpOnly: true });
 

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token ,role:user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};
