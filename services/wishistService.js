import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const addProductToWishlist = asyncHandler(async (productId, userId) => {
  // add productId to wishlist if it's not exist
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { wishlist: productId },
    },
    { new: true }
  );

  return { wishlist: user.wishlist };
});


export const removeProductFromWishlist = asyncHandler(
  async (productId, userId) => {
    // remove productId form the wishlist
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { wishlist: productId },
      },
      { new: true }
    );
    return { wishlist: user.wishlist };
  }
);

export const getLoggedUserWishlist = asyncHandler(async (userId) => {
  const user = await User.findById(userId).populate('wishlist');
  return { count: user.wishlist.length, wishlist: user.wishlist };
});
