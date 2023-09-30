import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import Category from '../../models/categoryModel.js';
import ApiError from '../apiError.js';

export const createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Category name')
    .isLength({ max: 32 })
    .withMessage('Too long Category name')
    .custom((value, { req }) => {
      Category.findOne({ name: value }).then((category) => {
        if (category) throw new ApiError('category name is exist', 400);
      });
      return true;
    }),
  validatorMiddleware,
];

export const findCategoryValidator = [
  check('categoryId').isMongoId().withMessage('Invalid Category id format'),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check('categoryId').isMongoId().withMessage('Invalid Category id format'),
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3 })
    .withMessage('Too short Category name')
    .isLength({ max: 32 })
    .withMessage('Too long Category name'),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check('categoryId').isMongoId().withMessage('Invalid Category id format'),
  validatorMiddleware,
];

