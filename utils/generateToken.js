import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  return jwt.sign({ user: payload }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: '1h',
  });
};

export default generateToken;
