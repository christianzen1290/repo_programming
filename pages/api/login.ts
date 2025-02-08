import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { pool } from '../../lib/db';  // Correct path for database connection
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_jwt_secret_key';  // This should be stored in an environment variable

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Fetch the user from the database based on the email
      const result = await pool.query('SELECT * FROM users_todo WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = result.rows[0];
      

      // Create JWT token and send it back to the client
      const token = jwt.sign({ email, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Error logging in, please try again later' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
