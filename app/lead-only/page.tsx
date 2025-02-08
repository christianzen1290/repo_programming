'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  title: string;
  assigned_to: string;
  status: string;
};

type TeamUser = {
  id: number;
  username: string;
};

export default function LeadOnlyPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamUsers, setTeamUsers] = useState<TeamUser[]>([]); // Store team members
  const [error, setError] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState(''); // Store selected assignee
  const router = useRouter();

  useEffect(() => {
    // Check if the user has the 'lead' role
    const role = localStorage.getItem('role');
    if (role !== 'lead') {
      router.push('/'); // Redirect non-leads to home
    } else {
      setIsAuthorized(true);
      fetchTasks();
      fetchTeamUsers();
    }
  }, []);

  // Fetch tasks created by the lead user
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      setError('Error fetching tasks');
    }
  };

  // Fetch team members (users with role = 2)
  const fetchTeamUsers = async () => {
    try {
      const response = await fetch('/api/users/team', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTeamUsers(data);
      }
    } catch (error) {
      setError('Error fetching team members');
    }
  };

  // Function to create a new task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !assignedTo) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newTaskTitle, assigned_to: assignedTo, status: 'Not Started' }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to state
        setNewTaskTitle(''); // Clear input field
        setAssignedTo(''); // Reset dropdown
      } else {
        setError('Failed to create task');
      }
    } catch (error) {
      setError('Error creating task');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 relative">
      {/* Logout Button in Top-Right Corner */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 py-2 px-4 bg-red-600 text-white rounded-md"
      >
        Logout
      </button>

      <h1 className="text-2xl font-semibold mb-6">Lead-Only Page</h1>
      <p className="mb-6">Welcome, Lead. You can manage tasks below.</p>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Form to Create New Task */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-3xl">
          <h2 className="text-xl mb-4">Create New Task</h2>
          <form onSubmit={handleCreateTask} className="bg-white shadow-lg p-6 rounded-lg">
            {/* Task Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">Task Title</label>
              <input
                id="title"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Assign To Dropdown */}
            <div className="mb-4">
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-600">Assign To</label>
              <select
                id="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Team Member</option>
                {teamUsers.map((user) => (
                  <option key={user.id} value={user.username}>{user.username}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
              Create Task
            </button>
          </form>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Task Title</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Assigned To</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={task.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-3 px-6">{task.title}</td>
                    <td className="py-3 px-6">{task.assigned_to}</td> {/* Assigned To Column */}
                    <td className="py-3 px-6">{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
