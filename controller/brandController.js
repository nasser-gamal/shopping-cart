import asyncHandler from 'express-async-handler';
import * as brandService from '../services/brandService.js';

// @Method POST
// @route /api/v1/brands
// @desc create new brand
// @access private/admin
export const createBrand = asyncHandler(async (req, res, next) => {
  const file = req.file;
  console.log(req.user);

  req.body.image = await brandService.resizeImage(file);
  const doc = await brandService.create(req.body);
  return res.status(201).json({ message: 'created success', data: doc });
});

// @Method GET
// @route /api/v1/brands
// @desc get all brands
// @access protected
export const findBrands = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const { count, data, pagination } = await brandService.find(query);
  return res.status(200).json({ count, data, pagination });
});

// @Method GET
// @route /api/v1/brands/{brandId}
// @desc get specific brand by id
// @access protected
export const findBrand = asyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  const doc = await brandService.findById(brandId);
  return res.status(200).json({ data: doc });
});

// @Method PUT
// @route /api/v1/brands/{brandId}
// @desc update brand by id
// @access private/admin
export const updateBrand = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (file) {
    req.body.image = await brandService.resizeImage(file);
  }
  const { brandId } = req.params;
  const doc = await brandService.updateById(brandId, req.body);
  return res.status(200).json({ message: 'updated success', data: doc });
});

// @Method DELETE
// @route /api/v1/brands/{brandId}
// @desc delete brand by id
// @access private/admin
export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  const doc = await brandService.deleteById(brandId);
  return res.status(200).json({ message: 'deleted success' });
});
