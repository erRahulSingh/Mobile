const Enquiry = require('../models/Enquiry');
const sendEmail = require('../utils/sendEmail');

// Global mock store in case MongoDB is connecting or fallback is used
let mockEnquiries = [
  {
    _id: 'enq_101',
    customerName: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    message: 'Interested in bulk purchase of 5 units for corporate gifting.',
    productName: 'Samsung Galaxy S24 Ultra 5G (512GB)',
    status: 'Pending',
    createdAt: new Date()
  },
  {
    _id: 'enq_102',
    customerName: 'Priya Patel',
    phone: '+91 9123456789',
    email: 'priya.patel@example.com',
    city: 'Ahmedabad',
    state: 'Gujarat',
    message: 'Is EMI available with HDFC Credit Card on this OLED TV?',
    productName: 'LG C3 65" 4K Smart OLED TV',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000)
  }
];

// @desc Create new Product Enquiry
// @route POST /api/enquiries
exports.createEnquiry = async (req, res) => {
  try {
    const { customerName, phone, email, city, state, message, productName, productId } = req.body;

    if (!customerName || !phone || !email || !productName) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    let enquiryData = {
      _id: 'enq_' + Date.now(),
      customerName,
      phone,
      email,
      city: city || 'Not specified',
      state: state || 'Not specified',
      message: message || 'I want more details about this product.',
      productName,
      productId: productId || '',
      status: 'Pending',
      createdAt: new Date()
    };

    // Try to save to MongoDB
    try {
      const newEnquiry = new Enquiry(enquiryData);
      await newEnquiry.save();
      enquiryData = newEnquiry;
    } catch (dbErr) {
      console.log('[Enquiry Controller] Using memory fallback store for Enquiry');
      mockEnquiries.unshift(enquiryData);
    }

    // Send Email to Admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f8fafc;">
        <h2 style="color: #0F172A;">⚡ New Product Enquiry Received - ElectroMart</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Location:</strong> ${city}, ${state}</p>
        <p><strong>Message:</strong> ${message}</p>
        <hr/>
        <p style="font-size: 12px; color: #64748b;">This inquiry was automatically generated from ElectroMart Website.</p>
      </div>
    `;

    sendEmail({
      email: process.env.ADMIN_EMAIL || 'admin@electromart.com',
      subject: `🚨 Urgent Enquiry: ${productName} - ${customerName}`,
      htmlMessage: adminEmailHtml
    });

    // Send Confirmation Email to Customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #2563EB;">Thank you for your enquiry with ElectroMart!</h2>
        <p>Dear <strong>${customerName}</strong>,</p>
        <p>We have received your request regarding <strong>${productName}</strong>. Our premium product executive will contact you within 2 business hours with the best pricing and availability details.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>ElectroMart Premium Support Team</strong></p>
      </div>
    `;

    sendEmail({
      email: email,
      subject: `Confirmation: We received your enquiry for ${productName}`,
      htmlMessage: customerEmailHtml
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully! Check your email for confirmation.',
      data: enquiryData
    });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error handling enquiry.' });
  }
};

// @desc Get all enquiries for Admin Panel
// @route GET /api/enquiries
exports.getEnquiries = async (req, res) => {
  try {
    let enquiries = [];
    try {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
      if (!enquiries.length) enquiries = mockEnquiries;
    } catch (err) {
      enquiries = mockEnquiries;
    }
    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error fetching enquiries' });
  }
};
