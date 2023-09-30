import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';

export const createSubCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ min: 3 })
    .withMessage('Too short SubCategory name')
    .isLength({ max: 32 })
    .withMessage('Too long SubCategory name'),
  body('categoryId')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];

export const findSubCategoriesValidator = [
  check('subCategoryId')
    .isMongoId()
    .withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check('subCategoryId')
    .isMongoId()
    .withMessage('Invalid SubCategory id format'),
  body('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ min: 3 })
    .withMessage('Too short SubCategory name')
    .isLength({ max: 32 })
    .withMessage('Too long SubCategory name'),
  body('categoryId')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  check('subCategoryId')
    .isMongoId()
    .withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];
