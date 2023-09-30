import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderModel = new Schema(
  {
    cartItems: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
        price: Number,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: Number,
    totalQuantity: Number,
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },

  { timestamps: true }
);

orderModel.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'userName profileImg email phone',
  }).populate({
    path: 'cartItems.product',
    select: 'title imageCover',
  });
  next();
});

const Order = mongoose.model('Order', orderModel);

export default Order;
