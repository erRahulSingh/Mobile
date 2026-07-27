const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const enquiryController = require('./controllers/enquiryController');
const orderController = require('./controllers/orderController');

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'ElectroMart API Server is running smoothly' }));

// Auth API
app.post('/api/auth/register', authController.registerUser);
app.post('/api/auth/login', authController.loginUser);
app.get('/api/auth/me', authController.getMe);

// Products API
app.get('/api/products', productController.getProducts);
app.get('/api/products/:id', productController.getProductById);

// Enquiry System API
app.post('/api/enquiries', enquiryController.createEnquiry);
app.get('/api/enquiries', enquiryController.getEnquiries);

// Order Management & Razorpay Payment API
app.post('/api/orders', orderController.createOrder);
app.get('/api/orders', orderController.getOrders);
app.put('/api/orders/:id/status', orderController.updateOrderStatus);

// Razorpay Payment Gateway Endpoints
app.post('/api/payment/create-razorpay-order', orderController.createRazorpayOrder);
app.post('/api/payment/verify-signature', orderController.verifyRazorpayPayment);

// Admin Analytics API
app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalRevenue: 2849000,
      totalOrders: 142,
      totalEnquiries: 48,
      totalCustomers: 1280,
      recentEnquiriesCount: 12,
      pendingOrdersCount: 8
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ ElectroMart Express Server listening on port ${PORT}`);
  console.log(`💳 Razorpay Key ID Loaded: ${process.env.RAZORPAY_KEY_ID || 'rzp_test_SUIH6k4l3JewbV'}`);
});
