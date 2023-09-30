import express from 'express';
import {
  createProduct,
  deleteProduct,
  findProducts,
  findProduct,
  updateProduct,
} from '../controller/productController.js';

import {
  createCategoryValidator,
  deleteCategoryValidator,
  findCategoryValidator,
  updateCategoryValidator,
} from '../utils/validation/categoryValidator.js';
import { createProductValidator, productValidator } from '../utils/validation/productValidator.js';
import { uploadProductImages } from '../services/productService.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/:productId')
  .get(productValidator, findProduct)
  .put(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadProductImages,
    productValidator,
    updateProduct
  )
  .delete(
    authMiddleware,
    roleMiddleware(['admin']),
    productValidator,
    deleteProduct
  );

router
  .route('/')
  .get(findProducts)
  .post(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadProductImages,
    createProductValidator,
    createProduct
  );

export default router;
