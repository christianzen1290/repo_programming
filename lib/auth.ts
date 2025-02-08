import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key'; // Use environment variables for security

// Function to verify JWT token
export const verifyToken = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(new Error('Invalid token'));
      }
      resolve(decoded);
    });
  });
};
