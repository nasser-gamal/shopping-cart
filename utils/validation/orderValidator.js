import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const createOrderValidator = [
  body('shippingAddress')
    .notEmpty()
    .withMessage('shipping address is required'),
  validatorMiddleware,
];

export const orderValidator = [
  check('orderId').isMongoId().withMessage('Invalid order id format'),
  validatorMiddleware,
];
