// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
require('dotenv').config();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept,Authorization', allowedMethods: 'GET, POST, PUT, DELETE' }));

// Use the cookie-parser middleware
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
// Learner routes
app.use('/api/learners', learnerRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
sequelize.sync().then(() => {
  app.listen(3006, () => {
    console.log('Server is running on port 3006');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
