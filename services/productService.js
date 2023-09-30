import Product from '../models/productModel.js';
import { uploadMixOfImages } from '../middleware/uploadImageMiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import * as baseService from './baseService.js';
import handleResizeImage from '../utils/resizeImage.js';

export const uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

export const resizeImage = async (files) => {
  console.log(files)
  let imageCover;
  if (files.imageCover) {
    const filename = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    const path = `uploads/products/${filename}`;
    const buffer = files.imageCover[0].buffer;
    await handleResizeImage({
      filename,
      buffer,
      path,
    });
    imageCover = filename;
  }

  let images = [];
  if (files.images) {
    await Promise.all(
      files.images.map(async (image, index) => {
        const filename = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        const path = `uploads/products/${filename}`;
        const buffer = image.buffer;

        await handleResizeImage({
          filename,
          buffer,
          path,
          resize: (2000, 1333),
        });

        images.push(filename);
      })
    );
  }
  return { imageCover, images };
};

export const create = async (data) =>
  await baseService.createOne(Product, data);

export const find = async (query) => await baseService.find(Product, query);

export const findById = async (productId) =>
  await baseService.findById(Product, productId);

export const updateById = async (productId, data) =>
  await baseService.updateById(Product, productId, data);

export const deleteById = async (productId) =>
  await baseService.deleteById(Product, productId);
