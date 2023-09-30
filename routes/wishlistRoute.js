import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from '../controller/wishlistController.js';
import { wishlistValidator } from '../utils/validation/wishlistValidator.js';
const router = express.Router();

router
  .route('/')
  .get(authMiddleware, getLoggedUserWishlist)
  .post(authMiddleware, wishlistValidator, addProductToWishlist)
  .put(authMiddleware, wishlistValidator, removeProductFromWishlist);

export default router;
