// authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

// Load environment variables manually
const jwtSecret = process.env.JWT_SECRET || 'default_secret';
const authMiddleware = async (req, res, next) => {
  try {
       // Get the token from the request headers
       const authHeader = req.headers.authorization;
       if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ message: 'Authorization token is missing or invalid' });
       }

      
       
       // Extract the token
       const token = authHeader.split(' ')[1];
      

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded,">>>>>>>>>JWTTT")
    console.log(decoded.userId,">>>>>>>>>userID!!!")
    // Get the user ID from the decoded token
    const userId = decoded.userId;

    // Find the user in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};



const authorizeLearner = (req, res, next) => {
  // Check if the authenticated user has the 'learner' role
  if (req.user.role !== 'learner') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

const authorizeAdmin = (req, res, next) => {
  // Check if the authenticated user has the 'admin' role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};




module.exports = {
   authMiddleware,
  authorizeLearner,
  authorizeAdmin,
};
