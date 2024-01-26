import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

if (!secret) {
  console.error('JWT_SECRET_KEY is not defined in the environment variables.');
  process.exit(1);
}

const generateToken = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export { generateToken, verifyToken };
