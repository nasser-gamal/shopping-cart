import async from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import Coupon from '../models/couponModel.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from 'express-async-handler';

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.map((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

export const addProductToCart = async(async (userId, data) => {
  const { productId, color } = data;
  // find cart for the logged user
  let cart = await Cart.findOne({ user: userId });
  // find Product
  const product = await Product.findById(productId);
  if (!product) throw new ApiError('product not found', 400);

  if (!cart) {
    // create new Cart for the logged user
    cart = await Cart.create({
      user: userId,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    // check if the product exist in cart
    console.log(cart);
    const findProductInCart = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    console.log(findProductInCart);
    if (findProductInCart > -1) {
      // product already exist in cart => update the quantity
      cart.cartItems[findProductInCart].quantity += 1;
    } else {
      // add new Product to the cart
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }

  // Calculate total cart price
  calcTotalCartPrice(cart);

  await cart.save();

  return {
    status: 'success',
    message: 'product added to cart successfully',
    cart,
    totalItemsCount: cart.cartItems.length,
  };
});

// increment product Quantity in Cart
export const incrementQuantity = asyncHandler(async (userId, itemId) => {
  const cart = await Cart.findOneAndUpdate(
    {
      user: userId,
      'cartItems._id': itemId,
    },
    { $inc: { 'cartItems.$.quantity': 1 } },
    { new: true }
  );

  if (!cart) throw new Error('cart not found', 404);

  return {
    status: 'success',
    message: 'product incremented successfully',
    cart,
    totalItemsCount: cart.cartItems.length,
  };
});

// decrement product Quantity in Cart
export const decrementQuantity = asyncHandler(async (userId, itemId) => {
  const cart = await Cart.findOneAndUpdate(
    {
      user: userId,
      'cartItems._id': itemId,
    },
    { $inc: { 'cartItems.$.quantity': -1 } },
    { new: true }
  );

  if (!cart) throw new Error('cart not found', 404);

  return {
    status: 'success',
    message: 'product decreamented successfully',
    cart,
    totalItemsCount: cart.cartItems.length,
  };
});

// get the user logged Cart
export const getUserLoggedCart = asyncHandler(async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate('cartItems.product')
    .select('-user');

  if (!cart) throw new ApiError('no cart for this user', 404);
  return { cart, totalItemsCount: cart.cartItems.length };
});

// remove Product from the cart
export const removeProductFromCart = asyncHandler(async (userId, itemId) => {
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: { cartItems: { _id: itemId } },
    },
    { new: true }
  );

  calcTotalCartPrice(cart);
  await cart.save();
  return {
    status: 'success',
    message: 'product removed from the cart successfully',
    cart,
    totalItemsCount: cart.cartItems.length,
  };
});

// apply Coupon
export const applyCoupon = asyncHandler(async (userId, data) => {
  const { name } = data;

  // find coupon with this name
  const coupon = await Coupon.findOne({
    name,
    expire: { $gt: Date.now() },
  });

  if (!coupon) throw new ApiError(`Coupon is invalid or expired`, 400);

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(`no cart for this user`, 404);

  const totalPrice = cart.totalPrice;

  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;

  await cart.save();
  return { cart, totalItemsCount: cart.cartItems.length };
});

// clear the user Cart
export const clearCart = asyncHandler(async (userId) => {
  const cart = await Cart.findOneAndDelete({ user: userId });
  return { cart };
});
