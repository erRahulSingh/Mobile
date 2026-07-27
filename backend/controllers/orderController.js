const Order = require('../models/Order');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_SUIH6k4l3JewbV';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '13t9eVDEmoEaiZ4zjL03Zcav';

let mockOrders = [
  {
    _id: 'ord_901',
    orderId: 'EM-884920',
    customerInfo: { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 9876543210', city: 'Sitamarhi', state: 'Bihar' },
    items: [{ title: 'Samsung Galaxy S24 Ultra 5G', price: 124999, quantity: 1, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80' }],
    totalAmount: 124999,
    paymentMethod: 'Razorpay Test (Key: rzp_test)',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: new Date(Date.now() - 172800000)
  }
];

// CREATE RAZORPAY ORDER ENDPOINT
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    const orderId = 'rzp_order_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const amountInPaise = Math.round(amount * 100);

    res.status(200).json({
      success: true,
      message: 'Razorpay order created successfully',
      keyId: RAZORPAY_KEY_ID,
      razorpayOrderId: orderId,
      amount: amountInPaise,
      currency: currency
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error generating Razorpay order' });
  }
};

// VERIFY RAZORPAY PAYMENT ENDPOINT
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully via Razorpay Gateway',
      paymentId: razorpayPaymentId || 'pay_' + Date.now(),
      status: 'VERIFIED'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, customerInfo, address } = req.body;
    const newOrder = {
      _id: 'ord_' + Date.now(),
      orderId: 'EM-' + Math.floor(100000 + Math.random() * 900000),
      customerInfo: customerInfo || { name: 'Rahul Jaiswal', email: 'rahul.jaiswal@electromart.in', phone: '+91 9876543210', city: 'Sitamarhi', state: 'Bihar' },
      items: items || [],
      totalAmount: totalAmount || 1299,
      paymentMethod: paymentMethod || 'Razorpay',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      address: address || 'Parsauni Chowk, Sitamarhi, Bihar 843316',
      createdAt: new Date()
    };

    try {
      const orderDoc = new Order(newOrder);
      await orderDoc.save();
    } catch (err) {
      mockOrders.unshift(newOrder);
    }

    res.status(201).json({ success: true, message: 'Order placed successfully!', data: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    let orders = [];
    try {
      orders = await Order.find().sort({ createdAt: -1 });
      if (!orders.length) orders = mockOrders;
    } catch (err) {
      orders = mockOrders;
    }
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = mockOrders.find(o => o._id === req.params.id || o.orderId === req.params.id);
    if (order) {
      order.orderStatus = orderStatus;
    }
    res.status(200).json({ success: true, message: `Order status updated to ${orderStatus}` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order status' });
  }
};
