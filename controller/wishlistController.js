import asyncHandler from 'express-async-handler';
import * as wishlistService from '../services/wishistService.js';



// @Method POST
// @route /api/v1/wishlists
// @desc add product to wishlist 
// @access protected
export const addProductToWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const { wishlist } = await wishlistService.addProductToWishlist(
    productId,
    userId
  );
  return res
    .status(201)
    .json({ message: 'product added successfully to wishlist' });
});


// @Method PUT
// @route /api/v1/wishlists
// @desc remove product from wishlist 
// @access protected
export const removeProductFromWishlist = asyncHandler(
  async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.body;
    const { wishlist } = await wishlistService.removeProductFromWishlist(
      productId,
      userId
    );
    return res.status(200).json({ message: 'product removed from wishlist' });
  }
);

// @Method GET
// @route /api/v1/wishlists
// @desc get logged user wishlist s
// @access protected
export const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { wishlist, count } = await wishlistService.getLoggedUserWishlist(
    userId
  );

  return res.status(200).json({ count, wishlist });
});
