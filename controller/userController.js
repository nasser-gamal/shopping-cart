import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService.js';

// @method POST
// @desc Create User
// @route  /api/v1/users
// @access Private/Admin
export const createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // const image = req.file;
  // const filename = await userService.resizeImage(image);
  // req.body.image = filename;
  const { message, user } = await userService.create(req.body);
  return res.status(201).json({ message, data: user });
});

// @method GET
// @desc Find Users
// @route  /api/v1/users
// @access Private/Protect
export const findUsers = asyncHandler(async (req, res, next) => {
  const { count, data, pagination } = await userService.find(req.query);
  return res.status(200).json({ count, data, pagination });
});

// @method GET
// @desc find User By id
// @route  /api/v1/users/{userId}
// @access Private/Admin
export const findUserById = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.findById(userId);
  return res.status(200).json({ user });
});

// @method PUT
// @desc update User By id
// @route  /api/v1/users/{userId}
// @access Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.updateById(userId, req.body);
  return res.status(200).json({ user });
});

// @method PUT
// @desc update User By id
// @route  /api/v1/users/changePassword/{userId}
// @access Private/Admin
export const changePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { message, user } = await userService.changePassword(userId, req.body);
  return res.status(200).json({ message, user });
});

// @method DELETE
// @desc  Delete specific user
// @route  /api/v1/users/{userId}
// @access Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { message } = await userService.deleteById(userId);
  return res.status(200).json({ message });
});

// @method GET
// @desc get the logged user
// @route  /api/v1/users/get
// @access Private/Protected
export const getUserLogged = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.findById(userId);
  return res.status(200).json({ user });
});

// @method PUT
// @desc update the logged user
// @route  /api/v1/users/update
// @access Private/Protected
export const updateUserLogged = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.updatedById(userId, req.body);
  return res.status(200).json({ user });
});

// @method PUT
// @desc update the logged user password
// @route  /api/v1/users/changePassword
// @access Private/Protected
export const updateUserPasswordLogged = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { message, user } = await userService.changePassword(userId, req.body);
  return res.status(200).json({ message, user });
});
