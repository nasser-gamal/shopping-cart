import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/apiError.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

export const register = asyncHandler(async (userData) => {
  const { firstName, lastName, email, password, address, phoneNumber } =
    userData;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    address,
    phoneNumber,
  });

  await newUser.save();
  newUser.password = undefined;
  return { message: 'created success', data: newUser };
});

export const login = asyncHandler(async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError('invalid creditionals', 401);
  }
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new ApiError('invalid creditionals', 401);
  }

  const token = generateToken({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  });
  user.password = undefined;
  return { message: 'login successed', token, data: user };
});

export const forgetPassword = asyncHandler(async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError('user not found', 404);
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  const hashResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  user.passwordResetVerified = false;
  user.passwordResetCode = hashResetCode;
  // expire after 30 minutes
  user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  await user.save();
  const text = `Hi ${user.firstName} ${user.lastName},  We received a request to reset the password on your shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The shop Team`;

  try {
    await sendEmail({
      to: email,
      object: 'forget Password',
      text,
    });
  } catch (err) {
    user.passwordResetVerified = undefined;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
  }
  return {
    message: 'we send code to email, please check your email',
    token: resetCode,
  };
});

export const verifyResetPassCode = asyncHandler(
  async ({ email, resetCode }) => {
    const hashResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');
    console.log(hashResetCode);
    const user = await User.findOne({
      email,
      passwordResetCode: hashResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ApiError('Reset Code not valid of expired', 400);
    }

    user.passwordResetVerified = true;
    await user.save();

    return { message: 'verified' };
  }
);

export const resetPassword = asyncHandler(async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('user not found', 404);
  }

  if (!user.passwordResetVerified) {
    throw new ApiError('reset code not verified', 400);
  }

  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;
  user.passwordResetCode = undefined;

  await user.save();
  user.password = undefined;

  const token = generateToken(user._id);

  return { message: 'success', token, data: user };
});
