import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import ApiError from '../utils/apiError.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import * as baseService from './baseService.js';
import {
  stripeCheckoutSession,
  webhookStripeCheckout,
} from '../utils/payments.js';
import User from '../models/userModel.js';

export const createCashOrder = asyncHandler(async (userId, data) => {
  const taxPrice = 0;
  const shippingPrice = 0;
  let totalQuantity = 0;

  // find user logged cart
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new ApiError('no cart for this user', 404);

  // get the totalPrice in the cart
  const totalCartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  const totalOrderPrice = totalCartPrice + taxPrice + shippingPrice;

  // get the totalQuantity of the items in the cart
  cart.cartItems.map((item) => {
    totalQuantity += item.quantity;
  });

  // create new Order
  const order = await Order.create({
    user: userId,
    cartItems: cart.cartItems,
    shippingAddress: data.shippingAddress,
    totalQuantity,
    totalPrice: totalOrderPrice,
  });

  // decreament the product quantity and increament product sold;
  if (order) {
    const bulkOptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOptions, {});

    // clear cart
    await Cart.findByIdAndDelete(cart._id);
  }

  return { message: 'order success', order };
});

export const find = async (userId) => {
  let filter = {};
  if (userId) {
    filter = { user: userId };
  }
  return baseService.find(Order, {}, filter);
};

export const findOne = async (orderId) =>
  await baseService.findById(Order, orderId);

export const updateOrderToPaid = asyncHandler(async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new ApiError(`There is no such a order with this id`, 404);

  order.isPaid = true;
  order.paidAt = Date.now();

  await order.save();

  return { message: 'order paid success', order };
});

export const updateOrderToDelivered = asyncHandler(async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new ApiError(`There is no such a order with this id`, 404);

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  await order.save();

  return { message: 'order delivered success', order };
});

export const stripePayment = asyncHandler(async (userId) => {
  const taxPrice = 0;
  const shippingPrice = 0;

  // find user logged cart
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new ApiError('no cart for this user', 404);

  // get the totalPrice in the cart
  const totalCartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  const totalOrderPrice = totalCartPrice + taxPrice + shippingPrice;

  const stripe = await stripeCheckoutSession({
    user: { name: 'nasser', email: 'nasser@gmail.com' },
    amount: totalOrderPrice * 100,
    cartId: cart._id,
    shippingAddress: cart.shippingAddress,
  });

  return { status: 'success', session };
});

export const createCardOrder = asyncHandler(async (session) => {
  const cartId = session.client_reference_id;
  const shippingAddress = session.metadata;
  const orderPrice = session.amount_total / 100;

  // find user logged cart
  const cart = await Cart.findById(cartId);
  const user = await User.findOne({ email: session.customer_email });


  // get the totalPrice in the cart
  const totalCartPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;


   // 3) Create order with default paymentMethodType card
   const order = await Order.create({
    user: user._id,
    cartItems: cart.cartItems,
    shippingAddress,
    totalOrderPrice: orderPrice,
    isPaid: true,
    paidAt: Date.now(),
    paymentMethodType: 'card',
  });

  if (order) {
    const bulkOptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));

    await Product.bulkWrite(bulkOptions, {});

    // clear cart
    await Cart.findByIdAndDelete(cart._id);
  }
  return { message: 'order success', order };
});

export const stripeWebhook = asyncHandler(async (sig, body) => {
  const event = await webhookStripeCheckout(sig, body);
  if (event) {
    createCardOrder(event.data.object);
  }
});
