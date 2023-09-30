import asyncHandler from 'express-async-handler';
import * as productService from '../services/productService.js';

// @Method POST
// @route /api/v1/products
// @desc create new product
// @access private/admin
export const createProduct = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const { imageCover, images } = await productService.resizeImage(files);
  req.body.imageCover = imageCover;
  req.body.images = images;
  console.log(req.body);
  const doc = await productService.create(req.body);
  return res.status(201).json({ message: 'created success', data: doc });
});

// @Method GET
// @route /api/v1/products
// @desc getAll  products
// @access protected
export const findProducts = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const { count, data, pagination } = await productService.find(query);
  return res.status(200).json({ count, data, pagination });
});

// @Method GET
// @route /api/v1/products/{productId}
// @desc find  product by Id
// @access protected
export const findProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const doc = await productService.findById(productId);
  return res.status(200).json({ data: doc });
});

// @Method PUT
// @route /api/v1/products/{productId}
// @desc update product by Id
// @access private/admin
export const updateProduct = asyncHandler(async (req, res, next) => {
  const files = req.files;
  const { imageCover, images } = await productService.resizeImage(files);
  console.log(images);
  if (imageCover) {
    req.body.imageCover = imageCover;
  }
  if (images.length > 0) {
    req.body.images = images;
  }
  const { productId } = req.params;
  const doc = await productService.updateById(productId, req.body);
  return res.status(200).json({ message: 'updated success', data: doc });
});

// @Method DELETE
// @route /api/v1/products/{productId}
// @desc delete product by Id
// @access private/admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const doc = await productService.deleteById(productId);
  return res.status(200).json({ message: 'deleted success' });
});
