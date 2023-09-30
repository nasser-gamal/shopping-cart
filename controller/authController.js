import asyncHandler from 'express-async-handler';
import * as authService from '../services/authService.js';

// @Method POST
// @route /api/v1/auth/register
// @desc register
// @access public
export const register = asyncHandler(async (req, res, next) => {
  const { message, data } = await authService.register(req.body);
  return res.status(201).json({ message, data });
});

// @Method POST
// @route /api/v1/auth/login
// @desc login
// @access public
export const login = asyncHandler(async (req, res, next) => {
  const { message, token, data } = await authService.login(req.body);
  return res.status(200).json({ message, token, data });
});

// @Method POST
// @route /api/v1/auth/forgetPassword
// @desc forgetPassword
// @access public
export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { message, token } = await authService.forgetPassword(req.body);
  return res.status(200).json({ message, token });
});

// @Method POST
// @route /api/v1/auth/verifyCode
// @desc verifyCode
// @access public
export const verifyResetPassCode = asyncHandler(async (req, res, next) => {
  const { message } = await authService.verifyResetPassCode(req.body);
  return res.status(200).json({ message });
});

// @Method POST
// @route /api/v1/auth/resetPassword
// @desc resetPassword
// @access public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { message, token, data } = await authService.resetPassword(req.body);
  return res.status(200).json({ message, token, data });
});
