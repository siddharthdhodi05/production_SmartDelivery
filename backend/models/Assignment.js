import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failed'], required: true },
  reason: { type: String },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
