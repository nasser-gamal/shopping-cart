import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const subCategoryModel = new Schema(
  {
    name: {
      type: String,
      required: [true, 'SubCategory is required'],
      unique: [true, 'SubCategory Name is Uniqe'],
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
    categoryId: {
      type: Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to Categroy'],
    },
  },
  { timestamps: true }
);

const setData = (doc) => {
  doc.image = `/subCategories/${doc.image}`;
  doc.slug = slugify(doc.name);
};

subCategoryModel.post('save', (doc) => {
  setData(doc);
});

subCategoryModel.post('init', (doc) => {
  setData(doc);
});

const SubCategory = mongoose.model('SubCategory', subCategoryModel);

export default SubCategory;
