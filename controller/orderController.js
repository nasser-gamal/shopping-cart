import asyncHandler from 'express-async-handler';
import * as orderService from '../services/orderService.js';

// @Method POST
// @route /api/v1/orders
// @desc create cash order
// @access protected
export const createCashOrder = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { message, order } = await orderService.createCashOrder(
    userId,
    req.body
  );
  return res.status(201).json({ message, data: order });
});

// @Method GET
// @route /api/v1/orders
// @desc find All orders
// @access protected
export const findOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const doc = await orderService.find(userId);
  return res.status(200).json({ status: 'sucess', data: doc });
});

// @Method GET
// @route /api/v1/order/{orderId}
// @desc find specific order
// @access protected
export const findOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const doc = await orderService.findOne(orderId);
  return res.status(200).json({ status: 'success', data: doc });
});

// @Method PUT
// @route /api/v1/order/{orderId}/pay
// @desc update the order to paid
// @access protected
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { message, order } = await orderService.updateOrderToPaid(orderId);
  return res.status(200).json({ message, data: order });
});

// @Method PUT
// @route /api/v1/order/{orderId}/deliver
// @desc update the order to delivered
// @access protected
export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { message, order } = await orderService.updateOrderToDelivered(orderId);
  return res.status(200).json({ message, data: order });
});

// @Method GET
// @route /api/v1/order/stripe/checkout-session/{orderId}
// @desc get checkout session form stripe and send it as response
// @access protected
export const stripePayment = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { message, order } = await orderService.stripePayment(orderId);
  return res.status(200).json({ message, data: order });
});

// @Method GET
// @route /api/v1/order/stripe/checkout-session/{orderId}
// @desc get checkout session form stripe and send it as response
// @access protected
export const stripeWebhook = asyncHandler(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const { order } = await orderService.stripeWebhook(sig, req.body);
  return res.status(200).json({ message, data: order });
});
