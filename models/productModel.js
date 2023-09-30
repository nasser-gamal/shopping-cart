import mongoose from 'mongoose';
import slugify from 'slugify';
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, 'Product Image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must be belong to category'],
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const setData = (doc) => {
  console.log(doc)
  doc.slug = slugify(doc.title);
  if (doc.imageCover) {
    doc.imageCover = `/products/${doc.imageCover}`;
  }
  if (doc.images) {
    const list = [];
    doc.images.forEach((image) => {
      const imgURL = `/products/${image}`;
      list.push(imgURL);
    });
    doc.images = list;
  }
};

productModel.post('save', (doc) => {
  setData(doc);
});

productModel.post('init', (doc) => {
  setData(doc);
});

const Product = mongoose.model('Product', productModel);

export default Product;
