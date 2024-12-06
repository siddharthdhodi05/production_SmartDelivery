import express from 'express';
import { getOrders, createOrder, updateOrderStatus, assignOrder } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import the auth middleware

const router = express.Router();

// Route to get all orders (protected route)
router.get('/', protect, getOrders);

// Route to create a new order (protected route)
router.post('/', protect, createOrder);

// Route to update order status (protected route)
router.put('/:id/status', protect, updateOrderStatus);

// Route to assign an order to a partner (protected route)
router.put('/:id/assign', protect, assignOrder);

export default router;
