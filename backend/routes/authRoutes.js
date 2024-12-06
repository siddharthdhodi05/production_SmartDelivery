import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import the auth middleware

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/register (No middleware as it's for new users)
router.post('/register', registerUser);

// POST /api/auth/logout (Protected route)
router.post('/logout', protect, logoutUser);

export default router;
