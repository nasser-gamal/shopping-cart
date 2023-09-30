import asyncHandler from 'express-async-handler';
import * as cartService from '../services/cartService.js';

// @Method POST
// @route /api/v1/cart
// @desc add products to cart
// @access protected
export const addProductToCart = asyncHandler(async (req, res) => {
  const { status, message, cart, totalItemsCount } =
    await cartService.addProductToCart(req.user._id, req.body);
  return res.status(201).json({
    status,
    message,
    data: cart,
    totalItemsCount,
  });
});

// @Method PUT
// @route /api/v1/cart/increment/{itemId}
// @desc increment products in cart
// @access protected
export const incrementProductQuantity = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { status, message, cart, totalItemsCount } =
    await cartService.incrementQuantity(req.user._id, itemId);
  return res.status(200).json({
    status,
    message,
    data: cart,
    totalItemsCount,
  });
});

// @Method PUT
// @route /api/v1/cart/decrement/{itemId}
// @desc decrement products in cart
// @access protected
export const decrementProductQuantity = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { status, message, cart, totalItemsCount } =
    await cartService.decrementQuantity(req.user._id, itemId);
  return res.status(200).json({
    status,
    message,
    data: cart,
    totalItemsCount,
  });
});

// @Method GET
// @route /api/v1/cart
// @desc get User Logged Cart
// @access protected
export const getUserLoggedCart = asyncHandler(async (req, res) => {
  const { cart, totalItemsCount } = await cartService.getUserLoggedCart(
    req.user._id
  );
  return res.status(200).json({
    data: cart,
    totalItemsCount,
  });
});

// @Method PUT
// @route /api/v1/cart/{itemId}
// @desc delete Product From Cart
// @access protected
export const removeProductFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { status, message, cart, totalItemsCount } =
    await cartService.removeProductFromCart(req.user._id, itemId);
  return res.status(200).json({
    status,
    message,
    data: cart,
    totalItemsCount,
  });
});

// @Method PUT
// @route /api/v1/cart/applyCoupon
// @desc apply coupon
// @access protected
export const applyCoupon = asyncHandler(async (req, res) => {
  const { status, cart, totalItemsCount } =
    await cartService.applyCoupon(req.user._id, req.body);
  return res.status(200).json({
    status,
    data: cart,
    totalItemsCount,
  });
});

// @Method DELETE
// @route /api/v1/cart
// @desc clear cart
// @access protected
export const clearCart = asyncHandler(async (req, res) => {
  const { cart } = await cartService.clearCart(req.user._id);
  return res.status(200).json({
    status: 'success',
    message: 'cart removed successfully',
  });
});
