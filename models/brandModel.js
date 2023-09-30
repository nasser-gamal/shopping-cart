import mongoose from 'mongoose';
import slugify from 'slugify';

const Schema = mongoose.Schema;

const brandModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, 'Brand must be unique'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const setData = (doc) => {
  doc.image = `/brands/${doc.image}`;
  doc.slug = slugify(doc.name);
};

brandModel.post('save', (doc) => {
  setData(doc);
});

brandModel.post('init', (doc) => {
  setData(doc);
});

const Brand = mongoose.model('Brand', brandModel);

export default Brand;
