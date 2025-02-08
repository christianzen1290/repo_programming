// pages/api/tasks/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/db'; // Ensure this is your correct path to DB pool
import { verifyToken } from '../../../lib/auth'; // Helper function to verify JWT

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, assignedTo, status } = req.body;

    // Verify JWT Token for Authorization
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Verify token and extract user data
      const decoded = await verifyToken(token); // Assuming you have a JWT verification function

      // Insert new task into the database
      const result = await pool.query(
        'INSERT INTO tasks (title, status, created_by) VALUES ($1, $2, $3) RETURNING *',
        [title , status, 1]  // Use userEmail or other info for auditing
      );

      const newTask = result.rows[0];
      res.status(200).json(newTask);  // Return the newly created task
    } catch (error: any) {
      console.error('Error creating task:', error); // Log the error on the server side

      // Respond with a more descriptive error message based on the caught error
      if (error instanceof Error) {
        return res.status(500).json({ error: `Failed to create task: ${error.message}` });
      }

      // If error type is unknown
      return res.status(500).json({ error: 'Failed to create task due to an unknown error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
