import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import User from '../../models/userModel.js';
import ApiError from '../apiError.js';

export const createUserValidator = [
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

export const findUserValidator = [
  check('userId').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware,
];

export const updateUserValidator = [
  check('userId').isMongoId().withMessage('Invalid User id format'),
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
    .withMessage('email not valid'),
  // .custom(async (email, { req }) => {
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     throw new Error('email is exist');
  //   }
  //   return true;
  // })
  body('phoneNumber')
    .notEmpty()
    .withMessage('phone number  is required')
    .optional()
    .isMobilePhone(['ar-EG'])
    .withMessage('Invalid phone number only accepted Egy'),
  // .custom(async (phoneNumber, { req }) => {
  //   const user = await User.findOne({ phoneNumber });
  //   if (user) {
  //     throw new Error('phone number is exist');
  //   }
  //   return true;
  // }),
  body('address').notEmpty().withMessage('address is required'),
  validatorMiddleware,
];

export const changePasswordValidator = [
  check('userId').isMongoId().withMessage('Invalid User id format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password at least 8 character to 20 character'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new ApiError('password not match', 400);
      }
      return true;
    }),
  validatorMiddleware,
];

export const deleteUserValidator = [
  check('userId').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware,
];




export const updateLoggedUserValidator = [
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
    .withMessage('email not valid'),
  // .custom(async (email, { req }) => {
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     throw new Error('email is exist');
  //   }
  //   return true;
  // })
  body('phoneNumber')
    .notEmpty()
    .withMessage('phone number  is required')
    .optional()
    .isMobilePhone(['ar-EG'])
    .withMessage('Invalid phone number only accepted Egy'),
  // .custom(async (phoneNumber, { req }) => {
  //   const user = await User.findOne({ phoneNumber });
  //   if (user) {
  //     throw new Error('phone number is exist');
  //   }
  //   return true;
  // }),
  body('address').notEmpty().withMessage('address is required'),
  validatorMiddleware,
];



export const updateUserLoggedPasswordValidator = [
  check('userId').isMongoId().withMessage('Invalid User id format'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password at least 8 character to 20 character'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new ApiError('password not match', 400);
      }
      return true;
    }),
  validatorMiddleware,
];