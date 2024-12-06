import Assignment from '../models/Assignment.js';
import Order from '../models/Order.js';
import Partner from '../models/Partner.js';

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('orderId', 'orderNumber customer')
      .populate('partnerId', 'name');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new assignment
export const createAssignment = async (req, res) => {
  try {
    const { orderId, partnerId, status, reason, assignedAt } = req.body;

    const order = await Order.findById(orderId);
    const partner = await Partner.findById(partnerId);

    if (!order || !partner) {
      return res.status(404).json({ message: 'Order or Partner not found' });
    }

    console.log('Order found:', order);
    console.log('Partner found:', partner);

    const assignment = new Assignment({
      orderId,
      partnerId,
      status,
      reason,
      assignedAt,
    });

    if (status === 'success') {
      // Update order and partner metrics
      order.status = 'delivered';
      partner.metrics.completedOrders += 1;
    } else {
      order.status = 'failed';
      partner.metrics.cancelledOrders += 1;
    }

    await assignment.save();
    await order.save();
    await partner.save();

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error during assignment creation:', error.message);
    res.status(500).json({ message: error.message });
  }
};
