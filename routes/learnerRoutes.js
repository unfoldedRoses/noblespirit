const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { authMiddleware, authorizeLearner,authorizeAdmin } = require('../middlewares/authMiddleware');


// Protected learner routes

// Get all learners
router.get('/getall', authMiddleware,authorizeAdmin, userController.getLearners);

module.exports = router;
