import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError.js';
import ApiFeatures from '../utils/apiFeatures.js';

export const createOne = asyncHandler(async (Model, data) => {
  const doc = new Model({
    ...data,
  });
  await doc.save();
  return doc;
});

export const find = asyncHandler(async (Model, query, filter = {}) => {
  const doc = Model.find(filter);
  const countDocuments = await Model.countDocuments();

  const { mongooseQuery, pagination } = new ApiFeatures(doc, query)
    .filter()
    .search()
    .limitFields()
    .sort()
    .paginate(countDocuments);

  const data = await mongooseQuery;

  return { count: countDocuments, data, pagination };
});

export const findById = asyncHandler(async (Model, docId) => {
  const doc = await Model.findById(docId);
  if (!doc) {
    throw new ApiError('document not found', 404);
  }
  return doc;
});

export const updateById = asyncHandler(async (Model, docId, data) => {
  const doc = await Model.findByIdAndUpdate(
    docId,
    {
      ...data,
    },
    { new: true }
  );
  if (!doc) {
    throw new ApiError('document not found', 404);
  }
  return doc;
});

export const deleteById = asyncHandler(async (Model, docId) => {
  const doc = await Model.findByIdAndDelete(docId);

  if (!doc) {
    throw new ApiError('document not found', 404);
  }

  return doc;
});
