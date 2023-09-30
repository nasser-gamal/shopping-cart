import asyncHandler from 'express-async-handler';
import sharp from 'sharp';

const handleResizeImage = asyncHandler(async (options) => {
  await sharp(options.buffer)
    .resize(options.resize || 600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(options.path);
});

export default handleResizeImage;
