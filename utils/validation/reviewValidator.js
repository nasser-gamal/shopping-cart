import { body, check } from 'express-validator';
import Review from '../../models/reviewModel.js';
import ApiError from '../apiError.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const createReviewValidator = [
  body('title').optional(),
  body('rating')
    .notEmpty()
    .withMessage('ratings value is required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Ratings value must be between 1 to 5'),
  body('product')
    .isMongoId()
    .withMessage('Invalid product id format')
    .custom((value, { req }) => {
      Review.findOne({ product: value, user: req.user._id }).then((review) => {
        if (review) throw new ApiError('you already created a review');
      });
      return true;
    }),
  validatorMiddleware,
];

export const findReviewValidator = [
  check('reviewId').isMongoId().withMessage('Invalid review id format'),
  validatorMiddleware,
];

export const findProductReviewValidator = [
  check('productId').isMongoId().withMessage('Invalid product id format'),
  validatorMiddleware,
];

export const updateReviewValidator = [
  check('reviewId')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((value, { req }) => {
      Review.findOne({ _id: value }).then((review) => {
        if (review.user._id.toString() !== req.user._id.toString())
          Promise.reject(new Error(`You already created a review before `));
      });
      return true;
    }),
  body('title').optional(),
  body('rating')
    .notEmpty()
    .withMessage('ratings value is required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Ratings value must be between 1 to 5'),
  check('product').isMongoId().withMessage('Invalid Review id format'),
  validatorMiddleware,
];

export const deleteReviewValidator = [
  check('reviewId')
    .isMongoId()
    .withMessage('Invalid Review id format')
    .custom((value, { req }) => {
      Review.findOne({ _id: value }).then((review) => {
        if (!review) Promise.reject(new Error(`no review found`));
        if (review.user._id.toString() !== req.user._id.toString())
          Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
      });
      return true;
    }),

  validatorMiddleware,
];
