// src/controllers/orderController.js

import Order from '../models/Order.js';  // Import your Order model
import Partner from '../models/Partner.js';  // Import the Partner model

// Function to get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to assign an order to a partner
export const assignOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const partner = await Partner.findById(req.body.partnerId);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });

    if (partner.currentLoad >= 3) {
      return res.status(400).json({ message: 'Partner is already assigned to 3 orders' });
    }

    order.assignedTo = partner._id;
    order.status = 'assigned';
    partner.currentLoad += 1;

    await order.save();
    await partner.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
