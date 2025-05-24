'use client';
import Login from '@/app/components/login/login';
import { useUserStore } from '@/app/store';
import Dashboard from '@/app/components/dashboard/dashboard';
import { useEffect } from 'react';
import { initAuthListener } from '@/app/helpers/firebase/auth'; // Import the Firebase auth listener

export default function Home() {
  const user = useUserStore((state: { user: any }) => state.user);
  useEffect(() => {
    initAuthListener(); // Initialize the Firebase auth listener
  }, []);
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
