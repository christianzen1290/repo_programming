import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/db'; // Make sure this points to your db connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch all users where role = 2 (Team Members)
    const result = await pool.query('SELECT id, username FROM users_todo WHERE role = $1',["2"]);
    console.log(result)
    // If no users found, return an empty array
    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(result.rows); // Send team users
  } catch (error) {
    console.error('Error fetching team users:', error);
    return res.status(500).json({ error: 'Failed to fetch team users' });
  }
}
