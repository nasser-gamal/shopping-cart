import express from 'express';
const router = express.Router();

import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import categoryRoute from './categoryRoute.js';
import subCategoryRoute from './subCategoryRoute.js';
import brandRoute from './brandRoute.js';
import productRoute from './productRoute.js';
import counponRoute from './couponRoute.js';
import cartRoute from './cartRoute.js';
import wishlistRoute from './wishlistRoute.js';
import orderRoute from './orderRoute.js';
import reviewRoute from './reviewRoute.js';

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/brands', brandRoute);
router.use('/categories', categoryRoute);
router.use('/subCategories', subCategoryRoute);
router.use('/products', productRoute);
router.use('/wishlists', wishlistRoute);
router.use('/cart', cartRoute);
router.use('/coupons', counponRoute);
router.use('/order', orderRoute);
router.use('/reviews', reviewRoute);

export default router;
