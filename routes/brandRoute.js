import express from 'express';
import {
  createBrand,
  deleteBrand,
  findBrand,
  findBrands,
  updateBrand,
} from '../controller/brandController.js';
import {
  createBrandValidator,
  deleteBrandValidator,
  findBrandValidator,
  updateBrandValidator,
} from '../utils/validation/brandValidator.js';
import { uploadBrandImage } from '../services/brandService.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/:brandId')
  .get(findBrandValidator, findBrand)
  .put(authMiddleware, uploadBrandImage, updateBrandValidator, updateBrand)
  .delete(authMiddleware, deleteBrandValidator, deleteBrand);

router
  .route('/')
  .get(findBrands)
  .post(
    authMiddleware,
    roleMiddleware(['admin']),
    uploadBrandImage,
    createBrandValidator,
    createBrand
  );

export default router;
