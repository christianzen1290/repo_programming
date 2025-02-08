import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { pool } from '../../lib/db'; // Ensure this points to your DB connection

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Define the Task type
type Task = {
  id: number;
  title: string;
  assigned_to: string;
  status: string;
  comment?: string;
};

// Utility function to verify JWT token and extract the user's role
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY) as { email: string; role: string };
  } catch (error) {
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  switch (method) {
    case 'GET':
      try {
        let result;
        if(user.role === '1'){user.role = 'lead'};
        if(user.role === '2'){user.role = 'team'};
        // Lead fetches tasks they created
        if (user.role === 'lead') {
          result = await pool.query('SELECT * FROM tasks WHERE created_by = $1', [user.email]);
        } 
        // Team members fetch tasks assigned to them
        else if (user.role === 'team') {
          result = await pool.query('SELECT * FROM tasks WHERE email = $1', [user.email]);
        } 
        else {
          return res.status(403).json({ error: 'Unauthorized access' });
        }

        return res.status(200).json(result.rows);
      } catch (err) {
        return res.status(500).json({ error: 'Error fetching tasks', details: err });
      }

      case 'PUT':
        const { taskId, status, comment } = req.body;
      
        if (!taskId || !status) {
          return res.status(400).json({ error: 'Missing required fields (taskId, status)' });
        }
      
        try {
          // Find the task by ID
          const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
          const task = taskResult.rows[0];
      
          if (!task) {
            return res.status(404).json({ error: 'Task not found' });
          }
      
          // Log for debugging (Check the task object)
          console.log('Task retrieved:', task);
      
          // Only the assigned team member can update the task
          if (user.role === 'team' && user.email !== task.assigned_to) {
            return res.status(403).json({ error: 'You are not assigned to this task' });
          }
      
          // Update task status and comment
          const updatedTaskResult = await pool.query(
            'UPDATE tasks SET status = $1, comment = $2 WHERE id = $3 RETURNING id, title, status, comment, assigned_to',
            [status, comment || task.comment, taskId]
          );
      
          const updatedTask = updatedTaskResult.rows[0];
      
          // Log the updated task for debugging
          console.log('Updated Task:', updatedTask);
      
          return res.status(200).json(updatedTask);
        } catch (error) {
          console.error('Error updating task:', error);
          return res.status(500).json({ error: 'Error updating task', details: error });
        }
      

    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
