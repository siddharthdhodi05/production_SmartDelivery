import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  currentLoad: { type: Number, default: 0, max: 3 },
  areas: { type: [String], required: true },
  shift: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  metrics: {
    rating: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
  },
});

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
