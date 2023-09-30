import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'not authorized' });
    }

    const token = authHeader.split(' ')[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    if (!decodeToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decodeToken.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export default authMiddleware;
