// utils/jwt.ts
import jwt from 'jsonwebtoken';

const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTY5MTA5NDk4OCIsIm5hbWUiOiJEYXZpZCBPbGFydGUiLCJpYXQiOjE1MTYyMzkwMjJ9.KYg9O1S8sBJ2yiu_bmyO-EZkTn-1fqTnb923mKAUaFs';

const generateToken = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' }); // Set token expiration time
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