import express from 'express';
import {
  changePasswordValidator,
  createUserValidator,
  deleteUserValidator,
  findUserValidator,
  updateLoggedUserValidator,
  updateUserLoggedPasswordValidator,
  updateUserValidator,
} from '../utils/validation/userValidator.js';
import {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  changePassword,
  deleteUser,
  getUserLogged,
  updateUserPasswordLogged,
  updateUserLogged,
} from '../controller/userController.js';
import { uploadUserImage } from '../services/userService.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/get/:userId').get(authMiddleware, getUserLogged);
router
  .route('/update/:userId')
  .put(authMiddleware, updateLoggedUserValidator, updateUserLogged);
router
  .route('/changePassword/:userId')
  .put(
    authMiddleware,
    updateUserLoggedPasswordValidator,
    updateUserPasswordLogged
  );

router
  .route('/changePassword/:userId')
  .put(authMiddleware, changePasswordValidator, changePassword);

router
  .route('/')
  .get(authMiddleware, roleMiddleware(['admin']), findUsers)
  .post(authMiddleware, uploadUserImage, createUserValidator, createUser);
router
  .route('/:userId')
  .get(
    authMiddleware,
    roleMiddleware(['admin']),
    findUserValidator,
    findUserById
  )
  .put(
    authMiddleware,
    roleMiddleware(['admin']),
    updateUserValidator,
    updateUser
  )
  .delete(
    authMiddleware,
    roleMiddleware(['admin']),
    deleteUserValidator,
    deleteUser
  );

export default router;
