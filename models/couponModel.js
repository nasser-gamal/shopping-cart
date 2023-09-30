import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const couponModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'Brand must be unique'],
    },
    expire: {
      type: Date,
      required: [true, 'Coupon expire time required'],
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount value required'],
    },
  },

  { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponModel);

export default Coupon;
