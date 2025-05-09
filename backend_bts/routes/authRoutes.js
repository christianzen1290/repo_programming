// /routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//no 2
router.post('/register', authController.register); // Endpoint for registration

// no 1
router.post('/login', authController.login); // Endpoint for login

// Protected route
router.get('/protected', authMiddleware.authenticateToken, authController.protected);

module.exports = router;