import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const createBrandValidator = [
  body('name')
    .notEmpty()
    .withMessage('brand name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name'),
  validatorMiddleware,
];

export const findBrandValidator = [
  check('brandId').isMongoId().withMessage('Invalid Brand id format'),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check('brandId').isMongoId().withMessage('Invalid Brand id format'),
  body('name')
    .notEmpty()
    .withMessage('brand name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Brand name')
    .isLength({ max: 32 })
    .withMessage('Too long Brand name'),
  validatorMiddleware,
];

export const deleteBrandValidator = [
  check('brandId').isMongoId().withMessage('Invalid Brand id format'),
  validatorMiddleware,
];
