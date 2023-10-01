import express from 'express';
import {
  login,
  register,
  forgetPassword,
  verifyResetPassCode,
  resetPassword,
} from '../controller/authController.js';
import {
  loginValidator,
  registerValidator,
  forgetPasswordValidator,
  verifyCodeValidator,
  resetPasswordValidator,
} from '../utils/validation/authValidator.js';

const router = express.Router();

/**
 * @swagger    login
 *  /
 *  get
 */
router.post('/login', loginValidator, login);
router.post('/register', registerValidator, register);
router.post('/forgetPassword', forgetPasswordValidator, forgetPassword);
router.post('/verifyCode', verifyCodeValidator, verifyResetPassCode);
router.post('/resetPassword', resetPasswordValidator, resetPassword);

export default router;
