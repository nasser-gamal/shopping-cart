import Category from '../models/categoryModel.js';
import { uploadImage } from '../middleware/uploadImageMiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import * as baseService from './baseService.js';
import handleResizeImage from '../utils/resizeImage.js';
import ApiError from '../utils/apiError.js';

export const uploadCategoryImage = uploadImage('image');

export const resizeImage = async (image) => {
  if (!image) throw new ApiError('image is required', 400);
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  const path = `uploads/catgories/${filename}`;
  const buffer = image.buffer;
  await handleResizeImage({
    filename,
    buffer,
    path,
  });

  return filename;
};

export const create = async (data) =>
  await baseService.createOne(Category, data);

export const find = async (query) => await baseService.find(Category, query);

export const findById = async (categoryId) =>
  await baseService.findById(Category, categoryId);

export const updateById = async (categoryId, data) =>
  await baseService.updateById(Category, categoryId, data);

export const deleteById = async (categoryId) =>
  await baseService.deleteById(Category, categoryId);
