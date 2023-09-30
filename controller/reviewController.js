import asyncHandler from 'express-async-handler';
import * as reviewService from '../services/reviewService.js';

// Nested Route
// @Method POST
// @route /api/v1/reviews
// @desc create new review
// @access protected
export const createReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;
  const doc = await reviewService.create(req.body);
  return res.status(201).json({ message: 'created success', data: doc });
});

// @Method GET
// @route /api/v1/reviews
// @desc get all reviews for the product
// @access protected
export const findReviews = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { data } = await reviewService.find(productId);
  return res.status(200).json({ data });
});

// @Method GET
// @route /api/v1/reviews/{reviewId}
// @desc get specific category by id
// @access protected
export const findReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const doc = await reviewService.findById(reviewId);
  return res.status(200).json({ data: doc });
});

// @Method PUT
// @route /api/v1/reviews/{reviewId}
// @desc update review by id
// @access protected
export const updateReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  req.body.user = req.user._id;
  const doc = await reviewService.updateById(reviewId, req.body);
  return res.status(200).json({ message: 'updated success', data: doc });
});

// @Method DELETE
// @route /api/v1/reviews/{reviewId}
// @desc delete review by id
// @access protected
export const deleteReview = asyncHandler(async (req, res, next) => {
  const { reviewId } = req.params;
  const doc = await reviewService.deleteById(reviewId);
  return res.status(200).json({ message: 'deleted success' });
});
