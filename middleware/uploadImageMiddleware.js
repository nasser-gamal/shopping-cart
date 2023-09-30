import multer from 'multer';
import ApiError from '../utils/apiError.js';

const multerOptions = () => {
  const storage = multer.memoryStorage();

  const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('only images allowed', 400), false);
    }
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};

export const uploadImage = (fieldName) => multerOptions().single(fieldName);
export const uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
