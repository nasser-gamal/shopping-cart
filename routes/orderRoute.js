import express from 'express';
import {
  createCashOrder,
  findOrders,
  findOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  stripePayment,
  stripeWebhook,
} from '../controller/orderController.js';
import {
  createOrderValidator,
  orderValidator,
} from '../utils/validation/orderValidator.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
const router = express.Router();

router
  .route('/')
  .get(authMiddleware, findOrders)
  .post(authMiddleware, createOrderValidator, createCashOrder);

router.get(
  '/:orderId',
  authMiddleware,
  roleMiddleware(['admin']),
  orderValidator,
  findOrder
);

router.get(
  '/stripe/checkout-session/:orderId',
  authMiddleware,
  orderValidator,
  stripePayment
);

router.post(
  '/stripe/webhook-checkout',
  express.raw({ type: 'application/json' }),
  authMiddleware,
  stripeWebhook
);

router.put('/:orderId/pay', authMiddleware, orderValidator, updateOrderToPaid);
router.put(
  '/:orderId/deliver',
  authMiddleware,
  orderValidator,
  updateOrderToDelivered
);

export default router;
