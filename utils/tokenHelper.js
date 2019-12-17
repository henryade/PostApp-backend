import { sign, verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { config } from 'dotenv';

config();

const { JWT_KEY } = process.env;

const generateToken = ({ _id: id, email, username }) => {
  return sign({ id, email, username }, JWT_KEY, { expiresIn: '1h' });
};

const verifyToken = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split('Bearer ')[1];
    if (token) {
      try {
        const user = verify(token, JWT_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired Token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error('Authorization header must be provided');
};

export { generateToken, verifyToken };
