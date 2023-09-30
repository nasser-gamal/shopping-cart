import express from 'express';
import {
  createCategory,
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory,
} from '../controller/categoryController.js';

import {
  createCategoryValidator,
  deleteCategoryValidator,
  findCategoryValidator,
  updateCategoryValidator,
} from '../utils/validation/categoryValidator.js';
import { uploadCategoryImage } from '../services/categoryService.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/:categoryId')
  .get(
    authMiddleware,
    roleMiddleware(['admin']),
    findCategoryValidator,
    findCategory
  )
  .put(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadCategoryImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    authMiddleware,
    roleMiddleware(['admin']),
    deleteCategoryValidator,
    deleteCategory
  );

router
  .route('/')
  .get(findCategories)
  .post(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadCategoryImage,
    createCategoryValidator,
    createCategory
  );

export default router;
