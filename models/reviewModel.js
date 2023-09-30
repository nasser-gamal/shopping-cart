import mongoose from 'mongoose';
import Product from './productModel.js';
const Schema = mongoose.Schema;

const reviewModel = new Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'product is requird'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'user is requird'],
    },
  },

  { timestamps: true }
);

reviewModel.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name' });
  next();
});

reviewModel.statics.calcAverageRatingsAndQuantity = async function (productId) {
  const result = await this.aggregate([
    // get all the products Reviews
    {
      $match: { product: productId },
    },
    // Grouping reviews based on productId and calc avgRatings, ratingsQuantity
    {
      $group: {
        _id: productId,
        avgRatings: { $avg: '$rating' },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRatings,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewModel.post('save', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewModel.post('remove', async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

const Review = mongoose.model('Review', reviewModel);

export default Review;
