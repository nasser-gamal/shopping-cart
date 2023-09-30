import { body } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const wishlistValidator = [
  body('productId').isMongoId().withMessage('Invalid product id format'),
  validatorMiddleware,
];
