'use client';  // Ensure this component is rendered on the client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Make a request to your backend to validate login
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error('Invalid email or passwords');
      }

      // Parse the response JSON to extract the token
      const data = await response.json();
      const token = data.token;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Decode JWT to get the role (you can use jwt-decode or manually decode it)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Manually decode the JWT
      const userRole = decodedToken.role == 1 ? 'lead' : 'team';

      // Store the role in localStorage (optional)
      localStorage.setItem('role', userRole);

      // Redirect based on the user role
      if (userRole === 'lead') {
        router.push('/lead-only');
      } else if (userRole === 'team') {
        router.push('/team');
      } else {
        throw new Error('Role not assigned');
      }
    } catch (error: any) {
      setError(error.message);  // Set the error message for invalid login
    } finally {
      setIsLoading(false);  // Reset the loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-xl teal-400">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Your Todo List</h1>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400 font-semibold hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
      </div>
    </div>
  );
}