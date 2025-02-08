'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  // Check if the token exists in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If no token exists, redirect to the login page
      router.push('/login');
    } else {
      // If token exists, decode the token to check its validity (optional, can check expiry)
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = decodedToken.exp * 1000; // Expiry time in ms

      // If token has expired, redirect to login page
      if (expiryTime < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        // If token is valid, proceed to the dashboard
        router.push('/dashboard');
      }
    }
  }, [router]);

  return <></>; // Empty return, as this page just handles the redirect logic
}
