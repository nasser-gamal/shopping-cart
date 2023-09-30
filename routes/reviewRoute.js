import express from 'express';

import {
  deleteReview,
  createReview,
  findReview,
  findReviews,
  updateReview,
} from '../controller/reviewController.js';
import {
  updateReviewValidator,
  createReviewValidator,
  findProductReviewValidator,
  findReviewValidator,
  deleteReviewValidator,
} from '../utils/validation/reviewValidator.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get(
  '/:productId',
  authMiddleware,
  findProductReviewValidator,
  findReviews
);
router.post('/', authMiddleware, createReviewValidator, createReview);

router
  .route('/:reviewId')
  .put(authMiddleware, updateReviewValidator, updateReview)
  .delete(authMiddleware, deleteReviewValidator, deleteReview);

export default router;
