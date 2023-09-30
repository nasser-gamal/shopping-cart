import { body } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import User from '../../models/userModel.js';
import ApiError from '../apiError.js';

export const registerValidator = [
  body('firstName')
    .notEmpty()
    .withMessage('firstName is required')
    .isLength({ min: 3 })
    .withMessage('Too short User firstName'),
  body('lastName')
    .notEmpty()
    .withMessage('lastName is required')
    .isLength({ min: 3 })
    .withMessage('Too short User lastName'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new ApiError('email is exist', 422);
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password at least 8 character to 20 character'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('phone number  is required')
    .optional()
    .isMobilePhone(['ar-EG'])
    .withMessage('Invalid phone number only accepted Egy')
    .custom(async (phoneNumber, { req }) => {
      const user = await User.findOne({ phoneNumber });
      if (user) {
        throw new ApiError('phone number is exist', 422);
      }
      return true;
    }),
  body('address').notEmpty().withMessage('address is required'),
  validatorMiddleware,
];

export const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
  body('password').notEmpty().withMessage('password required'),
  validatorMiddleware,
];

export const forgetPasswordValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
  validatorMiddleware,
];

export const verifyCodeValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
  body('resetCode').notEmpty().withMessage('rest code is required'),
  validatorMiddleware,
];

export const resetPasswordValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email not valid'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password at least 8 character to 20 character'),
  validatorMiddleware,
];
