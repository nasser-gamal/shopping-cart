import asyncHandler from 'express-async-handler';
import * as couponService from '../services/couponService.js';

// @Method POST
// @route /api/v1/coupons
// @desc create new coupon
// @access private/admin
export const createCoupon = asyncHandler(async (req, res, next) => {
  const doc = await couponService.create(req.body);
  return res.status(201).json({ message: 'created success', data: doc });
});

// @Method GET
// @route /api/v1/coupons
// @desc get all coupons
// @access protected
export const findCoupons = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const { count, data, pagination } = await couponService.find(query);
  return res.status(200).json({ count, data, pagination });
});

// @Method GET
// @route /api/v1/coupons/{couponId}
// @desc get specific coupon by id
// @access protected
export const findCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;
  const doc = await couponService.findById(couponId);
  return res.status(200).json({ data: doc });
});

// @Method PUT
// @route /api/v1/coupons/{couponId}
// @desc update coupon by id
// @access private/admin
export const updateCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;
  const doc = await couponService.updateById(couponId, req.body);
  return res.status(200).json({ message: 'updated success', data: doc });
});

// @Method DELETE
// @route /api/v1/coupons/{couponId}
// @desc delete Coupon by id
// @access private/admin
export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;
  const doc = await couponService.deleteById(couponId);
  return res.status(200).json({ message: 'deleted success' });
});
