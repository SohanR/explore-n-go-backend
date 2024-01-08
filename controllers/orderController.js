const Order = require('../models/OrderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      user,
      serviceType,
      serviceId,
      startDate,
      endDate,
      totalPrice,
      payment = 'due', 
      orderStatus = 'pending'
    } = req.body;

    const newOrder = await Order.create({
      user,
      serviceType,
      serviceId,
      startDate,
      endDate,
      totalPrice,
      payment,
      orderStatus,
    });

    console.log('New Order created:', newOrder);
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'fullname');
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  // Update payment status from due to paid
exports.updatePaymentStatus = async (req, res) => {
    const orderId = req.body.orderId;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { payment: 'paid' }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Payment status updated to paid', order: updatedOrder });
    } catch (error) {
      console.error('Error updating payment status:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Update order status from pending to approved
exports.updateOrderStatus = async (req, res) => {
    const orderId = req.body.orderId;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: 'approved' }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order status updated to approved', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order status:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  // Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
      const orders = await Order.find({ user: userId });
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders by user ID:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  