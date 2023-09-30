import express from 'express';

import {
  addProductToCart,
  clearCart,
  decrementProductQuantity,
  removeProductFromCart,
  getUserLoggedCart,
  incrementProductQuantity,
  applyCoupon,
} from '../controller/cartController.js';
import {
  addProductToCartValdiator,
  cartItemValidator,
} from '../utils/validation/cartValidator.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/applyCoupon', authMiddleware, applyCoupon);

router.put(
  '/:itemId',
  authMiddleware,
  cartItemValidator,
  removeProductFromCart
);

router.put(
  '/increment/:itemId',
  authMiddleware,
  cartItemValidator,
  incrementProductQuantity
);
router.put(
  '/decrement/:itemId',
  authMiddleware,
  cartItemValidator,
  decrementProductQuantity
);

router
  .route('/')
  .get(authMiddleware, getUserLoggedCart)
  .post(authMiddleware, addProductToCartValdiator, addProductToCart)
  .delete(authMiddleware, clearCart);

export default router;
