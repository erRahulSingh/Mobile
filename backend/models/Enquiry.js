const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  customerName: { type: String, required: [true, 'Customer Name is required'] },
  phone: { type: String, required: [true, 'Phone number is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  city: { type: String, required: true },
  state: { type: String, required: true },
  message: { type: String, required: true },
  productName: { type: String, required: true },
  productId: { type: String },
  status: { type: String, enum: ['Pending', 'Contacted', 'Resolved', 'Closed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
