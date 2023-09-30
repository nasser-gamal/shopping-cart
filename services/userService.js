import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import ApiError from '../utils/apiError.js';
import bcrypt from 'bcryptjs';
import ApiFeatures from '../utils/apiFeatures.js';
import { uploadImage } from '../middleware/uploadImageMiddleware.js';
import { v4 as uuidv4 } from 'uuid';
import * as baseService from './baseService.js';

export const uploadUserImage = uploadImage('image');

export const resizeImage = async (image) => {
  if (!image) throw new ApiError('image is required', 400);
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  const path = `uploads/users/${filename}`;
  const buffer = image.buffer;
  await handleResizeImage({
    filename,
    buffer,
    path,
  });

  return filename;
};

export const create = async (data) => {
  const user = await baseService.createOne(User, data);
  user.password = undefined;
  return { message: 'created success', user };
};

export const find = async (query) => await baseService.find(User, query);

export const findById = async (userId) =>
  await baseService.findById(User, userId);

export const updateById = async (userId, data) =>
  await baseService.updateById(User, userId, data);

export const changePassword = asyncHandler(async (userId, userData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(`user not found with this id ${userId}`, 404);
  }

  user.password = await bcrypt.hash(userData.password, 12);
  user.passwordUpdatedAt = Date.now();
  await user.save();

  user.password = undefined;

  return { message: 'password updated successfully', user };
});

export const deleteById = asyncHandler(async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(`user not found with this id ${userId}`, 404);
  }
  return { message: 'user deleted successfully' };
});
