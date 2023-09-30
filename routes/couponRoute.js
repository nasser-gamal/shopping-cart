import express from 'express';
import {
  createCoupon,
  deleteCoupon,
  findCoupon,
  findCoupons,
  updateCoupon,
} from '../controller/couponController.js';
import {
  createCouponValidator,
  deleteCouponValidator,
  findCouponValidator,
  updateCouponValidator,
} from '../utils/validation/couponValidator.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/:couponId')
  .get(authMiddleware, findCouponValidator, findCoupon)
  .put(
    authMiddleware,
    roleMiddleware(['admin']),
    updateCouponValidator,
    updateCoupon
  )
  .delete(
    authMiddleware,
    roleMiddleware(['admin']),
    deleteCouponValidator,
    deleteCoupon
  );

router
  .route('/')
  .get(authMiddleware, roleMiddleware(['admin']), findCoupons)
  .post(
    authMiddleware,
    roleMiddleware(['admin']),
    createCouponValidator,
    createCoupon
  );

export default router;
