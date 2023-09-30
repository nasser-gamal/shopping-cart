import Coupon from '../models/couponModel.js';
import * as baseService from './baseService.js';

export const create = async (data) => await baseService.createOne(Coupon, data);

export const find = async (query) => await baseService.find(Coupon, query);

export const findById = async (couponId) =>
  await baseService.findById(Coupon, couponId);

export const updateById = async (couponId, data) =>
  await baseService.updateById(Coupon, couponId, data);

export const deleteById = async (couponId) =>
  await baseService.deleteById(Coupon, couponId);
