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

router.route('/login').post(loginValidator, login);
router.route('/register').post(registerValidator, register);
router.route('/forgetPassword').post(forgetPasswordValidator, forgetPassword);
router.route('/verifyCode').post(verifyCodeValidator, verifyResetPassCode);
router.route('/resetPassword').post(resetPasswordValidator, resetPassword);

export default router;
