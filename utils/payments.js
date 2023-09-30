import asyncHandler from 'express-async-handler';
import stripe from 'stripe';
import ApiError from './apiError.js';

const stripeInstance = stripe(process.env.STRIPE_SECRET);



export const stripeCheckoutSession = asyncHandler(async (options) => {
  // Create stripe checkout session
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        name: options.user.name,
        amount: options.amount,
        currency: 'egp',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    customer_email: options.user.email,
    client_reference_id: options.cartId,
    metadata: options.shippingAddress,
  });

  return session;
});

export const webhookStripeCheckout = asyncHandler(async (sig, body) => {
  let event;

  try {
    event = stripeInstance.Webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new ApiError(`Webhook Error: ${err.message}`, 500);
  }

  if (event.type === 'checkout.session.completed') {
    return event;
  }
});
