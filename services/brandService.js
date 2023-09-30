import Brand from '../models/brandModel.js';
import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError.js';
import { uploadImage } from '../middleware/uploadImageMiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import handleResizeImage from '../utils/resizeImage.js';
import * as baseService from './baseService.js';

export const uploadBrandImage = uploadImage('image');

export const resizeImage = asyncHandler(async (image) => {
  if (!image) throw new ApiError('image is required', 400);

  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  const buffer = image.buffer;
  const path = `uploads/brands/${filename}`;

  await handleResizeImage({
    filename,
    buffer,
    path,
  });

  return filename;
});

export const create = async (data) => await baseService.createOne(Brand, data);

export const find = async (query) => await baseService.find(Brand, query);

export const findById = async (brandId) =>
  await baseService.findById(Brand, brandId);

export const updateById = async (brandId, data) =>
  await baseService.updateById(Brand, brandId, data);

export const deleteById = async (brandId) =>
  await baseService.deleteById(Brand, brandId);
