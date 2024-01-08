const express = require('express');
const { createOrder, getAllOrders, updatePaymentStatus, updateOrderStatus, getOrdersByUserId } = require('../controllers/orderController');

const router = express.Router();


router.post('/order/create', createOrder);

router.put('/order/update-payment', updatePaymentStatus);

router.put('/order/update-order', updateOrderStatus);

// find all order
router.get('/orders', getAllOrders);

router.get('/order/:userId', getOrdersByUserId);

module.exports = router;
