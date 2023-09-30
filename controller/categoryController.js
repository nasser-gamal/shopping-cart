import asyncHandler from 'express-async-handler';
import * as categoryService from '../services/categoryService.js';

// @Method POST
// @route /api/v1/categories
// @desc create new category
// @access private/admin
export const createCategory = asyncHandler(async (req, res, next) => {
  const file = req.file;
  req.body.image = await categoryService.resizeImage(file);
  const doc = await categoryService.create(req.body);
  return res.status(201).json({ message: 'created success', data: doc });
});

// @Method GET
// @route /api/v1/categories
// @desc get all categories
// @access protected
export const findCategories = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const { count, data, pagination } = await categoryService.find(query);
  return res.status(200).json({ count, data, pagination });
});

// @Method GET
// @route /api/v1/categories/{categoryId}
// @desc get specific category by id
// @access protected
export const findCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const doc = await categoryService.findById(categoryId);
  return res.status(200).json({ data: doc });
});

// @Method PUT
// @route /api/v1/categories/{categoryId}
// @desc update category by id
// @access private/admin
export const updateCategory = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (file) {
    req.body.image = await categoryService.resizeImage(file);
  }
  const { categoryId } = req.params;
  const doc = await categoryService.updateById(categoryId, req.body);
  return res.status(200).json({ message: 'updated success', data: doc });
});

// @Method DELETE
// @route /api/v1/categories/{categoryId}
// @desc delete category by id
// @access private/admin
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const doc = await categoryService.deleteById(categoryId);
  return res.status(200).json({ message: 'deleted success' });
});
