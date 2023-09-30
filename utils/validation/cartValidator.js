import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const addProductToCartValdiator = [
  body('productId')
    .notEmpty()
    .withMessage('product is required')
    .isMongoId()
    .withMessage('Invalid Product id format'),
  body('color').notEmpty().withMessage('color is required'),
  validatorMiddleware,
];

export const cartItemValidator = [
  check('itemId').isMongoId().withMessage('Invalid Product id format'),
  validatorMiddleware,
];

