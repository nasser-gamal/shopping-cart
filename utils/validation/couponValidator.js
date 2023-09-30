import { body, check } from 'express-validator';
import ApiError from '../apiError.js';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const createCouponValidator = [
  body('name')
    .notEmpty()
    .withMessage('Coupon name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Coupon name')
    .isLength({ max: 32 })
    .withMessage('Too long Coupon name'),
  body('expire')
    .notEmpty()
    .withMessage('expire  is required')
    .isDate()
    .withMessage('expire must be date'),
  body('discount')
    .notEmpty()
    .withMessage('expire  is required')
    .isNumeric()
    .withMessage('discount must be number')
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new ApiError('discount must be more than 0', 400);
      }
      return true;
    }),
  validatorMiddleware,
];

export const findCouponValidator = [
  check('couponId').isMongoId().withMessage('Invalid Coupon id format'),
  validatorMiddleware,
];

export const updateCouponValidator = [
  check('couponId').isMongoId().withMessage('Invalid Coupon id format'),
  body('name')
    .notEmpty()
    .withMessage('Coupon name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Coupon name')
    .isLength({ max: 32 })
    .withMessage('Too long Coupon name'),
  body('expire')
    .notEmpty()
    .withMessage('expire  is required')
    .isDate()
    .withMessage('expire must be date'),
  body('discount')
    .notEmpty()
    .withMessage('expire  is required')
    .isNumeric()
    .withMessage('discount must be number')
    .custom((value, { req }) => {
      if (value <= 0) {
        throw new ApiError('discount must be more than 0', 400);
      }
      return true;
    }),
  validatorMiddleware,
];

export const deleteCouponValidator = [
  check('couponId').isMongoId().withMessage('Invalid Coupon id format'),
  validatorMiddleware,
];
