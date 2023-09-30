import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const categoryModel = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category is required'],
      unique: [true, 'Category Name is Uniqe'],
      minLength: [3, 'short Name'],
      maxLength: [35, 'long Name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const setData = (doc) => {
  doc.image = `/categories/${doc.image}`;
  doc.slug = slugify(doc.name);
};

categoryModel.post('save', (doc) => {
  setData(doc);
});

categoryModel.post('init', (doc) => {
  setData(doc);
});

const Category = mongoose.model('Category', categoryModel);

export default Category;
