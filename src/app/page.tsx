'use client';
import Login from '@/app/components/login/login';
import { getAccessTokenFromCookie } from '@/app/store';
import Dashboard from '@/app/components/dashboard/dashboard';
import { useEffect } from 'react';
import { initAuthListener } from '@/app/helpers/firebase/auth'; // Import the Firebase auth listener

export default function Home() {
  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    initAuthListener(); // Initialize the Firebase auth listener
  }, []);
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {accessToken ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
