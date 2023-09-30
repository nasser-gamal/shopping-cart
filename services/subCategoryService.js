import subCategory from '../models/subCategoryModel.js';
import { uploadImage } from '../middleware/uploadImageMiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import * as baseService from './baseService.js';
import handleResizeImage from '../utils/resizeImage.js';
import ApiError from '../utils/apiError.js';

export const uploadSubCategoryImage = uploadImage('image');

export const resizeImage = async (image) => {
  if (!image) throw new ApiError('image is required', 400);
  
  const filename = `subCategory-${uuidv4()}-${Date.now()}.jpeg`;
  const path = `uploads/subCategories/${filename}`;
  const buffer = image.buffer;
  
  await handleResizeImage({
    filename,
    buffer,
    path,
  });

  return filename;
};

export const create = async (data) =>
  await baseService.createOne(subCategory, data);

export const find = async (query) => await baseService.find(subCategory, query);

export const findById = async (subCategoryId) =>
  await baseService.findById(subCategory, subCategoryId);

export const updateById = async (subCategoryId, data) =>
  await baseService.updateById(subCategory, subCategoryId, data);

export const deleteById = async (subCategoryId) =>
  await baseService.deleteById(subCategory, subCategoryId);
