'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [comments, setComments] = useState<{ [taskId: number]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        
        // Initialize comments state based on existing tasks
        const initialComments = data.reduce((acc: any, task: any) => {
          acc[task.id] = task.comment || ''; // Default to empty if no comment
          return acc;
        }, {});
        setComments(initialComments);
      } else {
        setError('Failed to fetch tasks.');
      }
    } catch (error) {
      setError('Error fetching tasks.');
    }
  };

  // Function to handle status change and save it
  const handleSaveStatus = async (taskId: number) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const selectedTask = tasks.find((task) => task.id === taskId);
      
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskId,
          status: selectedTask?.status, // Use the current status from the task
          comment: comments[taskId],
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      } else {
        setError('Failed to update task status.');
      }
    } catch (error) {
      setError('Error saving task status.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle status change for each task
  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <div className="relative p-8">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>

      <h1 className="text-3xl font-semibold">Team Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-[33.33%]"> {/* Set max width to 1/3 */}
          {tasks.map((task) => (
            <div key={task.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{task.title}</h2>

                {/* Dropdown for Status */}
                <div className="flex items-center">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded mr-2"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="On Progress">On Progress</option>
                    <option value="Done">Done</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>

                {/* Comment Section */}
                <textarea
                  value={comments[task.id] || ''}
                  onChange={(e) =>
                    setComments({ ...comments, [task.id]: e.target.value })
                  }
                  placeholder="Add a comment..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                {/* Save button */}
                <button
                  onClick={() => handleSaveStatus(task.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Status'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
