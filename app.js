// app.js

const express = require('express');
const app = express();
const cors=require('cors')
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models'); // Import Sequelize instance
const authRoutes = require('./routes/authRoutes');
const learnerRoutes = require('./routes/learnerRoutes');
require('dotenv').config()


// var corsOptions = {
//   origin: 'http://localhost:4000',
//   credentials: true
// }

// Middleware
app.use(cors({
  // origin: process.env.CLIENT_URL,
   origin: 'https://noble-spiritz.vercel.app',
  credentials: true,
  // allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Use the cookie-parser middleware
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
// Learner routes
app.use('/api/learners', learnerRoutes);


// Start the server
sequelize.sync().then(() => {
  app.listen(3006, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
