import express from 'express';
import {
  createSubCategory,
  deleteSubCategory,
  findSubCategories,
  findSubCategory,
  updateSubCategory,
} from '../controller/subCategoryController.js';

import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  findSubCategoriesValidator,
  updateSubCategoryValidator,
} from '../utils/validation/subCategoryValidator.js';
import { uploadSubCategoryImage } from '../services/subCategoryService.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:subCategoryId')
  .get(findSubCategoriesValidator, findSubCategory)
  .put(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadSubCategoryImage,
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    authMiddleware,
    roleMiddleware(['admin']),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

router
  .route('/')
  .get(findSubCategories)
  .post(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadSubCategoryImage,
    createSubCategoryValidator,
    createSubCategory
  );

export default router;
