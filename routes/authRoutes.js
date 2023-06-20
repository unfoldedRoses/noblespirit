// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authMiddleware} = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/current-user', authMiddleware, authController.getMe);
// router.get('/protected', authMiddleware.authenticate, (req, res) => {
//   // Protected route logic
// });



module.exports = router;
