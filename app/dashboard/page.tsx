// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get role from localStorage
    const userRole = localStorage.getItem('role');
    if (userRole) {
      setRole(userRole);

      // If the role is 'team', reroute to the team page
      if (userRole === 'team') {
        router.push('/team');
      }
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">Welcome to the Dashboard</h1>

      {role === 'lead' ? (
        <div>
          <h2 className="text-xl">Lead Section</h2>
          <p>This section is only for Leads. You can create tasks, assign tasks, etc.</p>
        </div>
      ) : role === 'team' ? (
        <p>Redirecting to Team Page...</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
