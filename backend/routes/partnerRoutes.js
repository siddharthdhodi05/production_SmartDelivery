import express from 'express';
import { getPartners, createPartner } from '../controllers/partnerController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import the auth middleware

const router = express.Router();

// Route to get all partners (protected route)
router.get('/', protect, getPartners);  // Get all partners

// Route to add a new partner (protected route)
router.post('/', protect, createPartner);  // Add a new partner

export default router;
