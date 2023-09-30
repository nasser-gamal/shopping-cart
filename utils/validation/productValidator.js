import { body, check } from 'express-validator';
import validatorMiddleware from '../../middleware/validatorMiddleware.js';
import ApiError from '../apiError.js';
import Category from '../../models/categoryModel.js';
import SubCategory from '../../models/subCategoryModel.js';

export const createProductValidator = [
  body('title')
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars'),
  body('description').notEmpty().withMessage('description is required'),
  body('quantity')
    .notEmpty()
    .withMessage('quantity is required')
    .isNumeric()
    .withMessage('quantity must be a number'),
  body('sold').optional().isNumeric().withMessage('sold must be a number'),
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .isNumeric()
    .withMessage('price must be a number'),
  body('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price < value)
        throw new ApiError('priceAfterDiscount must be lower than price', 400);
      return true;
    }),
  body('colors')
    .optional()
    .isArray()
    .withMessage('availableColors should be array of string'),
  body('images')
    .optional()
    .isArray()
    .withMessage('images should be array of string'),
  body('category')
    .notEmpty()
    .withMessage('category is required')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((value, { req }) => {
      Category.findById(value).then((category) => {
        if (!category)
          throw new ApiError(`No category for this id: ${value}`, 400);
      });
      return true;
    }),
  body('subCategories')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((subCategoriesId, { req }) => {
      // check subCategory exist
      SubCategory.findById({
        _id: { $exists: true, $in: subCategoriesId },
      }).then((subCategory) => {
        if (
          subCategory.length < 1 ||
          subCategory.length !== subCategoriesId.length
        )
          throw new ApiError(`Invalid subcategories Ids`, 400);
      });
      return true;
    })
    .custom((value, { req }) => {
      SubCategory.find({ category: req.body.category }).then(
        (subCategories) => {
          const subCategoriesId = [];
          subCategories.forEach((subCategory) => {
            subCategoriesId.push(subCategory._id.toString());
          });
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(value, subCategoriesId)) {
            throw new ApiError(`subcategories not belong to category`);
          }
        }
      );
      return true;
    }),
  body('brand').optional().isMongoId().withMessage('Invalid ID formate'),
  body('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),
  body('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),
  validatorMiddleware,
];

export const productValidator = [
  check('productId').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];
