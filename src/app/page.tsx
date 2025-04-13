'use client';
import Login from './components/login/login';
import { useUserStore } from './store';
import Dashboard from './components/dashboard/dashboard';
import { useEffect } from 'react';
import { initAuthListener } from './helpers/firebase/auth'; // Import the Firebase auth listener
import Navbar from './components/common/navbar';
import Footer from './components/common/footer';

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
