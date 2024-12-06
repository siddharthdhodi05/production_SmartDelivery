import express from 'express';
import { createAssignment, getAssignments } from '../controllers/assignmentController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import the auth middleware

const router = express.Router();

// Get all assignments (protected route)
router.get('/', protect, getAssignments);

// Create a new assignment (protected route)
router.post('/', protect, createAssignment);

export default router;
