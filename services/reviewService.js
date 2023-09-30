import * as baseService from './baseService.js';
import Review from '../models/reviewModel.js';

export const create = async (data) => await baseService.createOne(Review, data);

export const find = async (productId) =>
  await baseService.find(Review, {}, { product: productId });

export const findById = async (reviewId) =>
  await baseService.findById(Review, reviewId);

export const updateById = async (reviewId, data) =>
  await baseService.updateById(Review, reviewId, data);

export const deleteById = async (reviewId) =>
  await baseService.deleteById(Review, reviewId);
