import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartModel = new Schema(
  {
    cartItems: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        price: Number,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
  },

  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartModel);

export default Cart;
