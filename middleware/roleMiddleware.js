import User from '../models/userModel.js';

const roleMiddleware = (requiredRoles) => async (req, res, next) => {
  const user = req.user;
  const exist = requiredRoles.includes(user.role);

  if (!exist) {
    return res.status(401).json({ message: 'you can not access this route' });
  }

  next();
};

export default roleMiddleware;
