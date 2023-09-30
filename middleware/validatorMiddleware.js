import { validationResult } from 'express-validator';

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next();
};

export default validatorMiddleware;
