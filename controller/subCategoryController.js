import asyncHandler from 'express-async-handler';
import * as subCategoryService from '../services/subCategoryService.js';

// @Method POST
// @route /api/v1/subCategories
// @desc create new subCategory
// @access private/admin
export const createSubCategory = asyncHandler(async (req, res, next) => {
  const file = req.file;
  req.body.image = await subCategoryService.resizeImage(file);
  const doc = await subCategoryService.create(req.body);
  return res.status(201).json({ message: 'created success', data: doc });
});

// @Method GET
// @route /api/v1/subCategories
// @desc get all SubCategories
// @access protected
export const findSubCategories = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const { count, data, pagination } = await subCategoryService.find(query);
  return res.status(200).json({ count, data, pagination });
});

// @Method GET
// @route /api/v1/subCategories/{subCategoryId}
// @desc get specific category by id
// @access protected
export const findSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const doc = await subCategoryService.findById(subCategoryId);
  return res.status(200).json({ data: doc });
});

// @Method PUT
// @route /api/v1/subCategories/{subCategoryId}
// @desc update category by id
// @access private/admin
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (file) {
    req.body.image = await subCategoryService.resizeImage(file);
  }
  const { subCategoryId } = req.params;
  const doc = await subCategoryService.updateById(subCategoryId, req.body);
  return res.status(200).json({ message: 'updated success', data: doc });
});

// @Method DELETE
// @route /api/v1/subCategories/{subCategoryId}
// @desc delete SubCategory by id
// @access private/admin
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const doc = await subCategoryService.deleteById(subCategoryId);
  return res.status(200).json({ message: 'deleted success' });
});
