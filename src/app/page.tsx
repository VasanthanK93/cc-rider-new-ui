'use client';
import Login from './components/Login/Login';
import { useUserStore } from './store';
import Dashboard from './components/Dashboard/dashboard';
import { useEffect } from 'react';
import { initAuthListener } from './helpers/firebase/auth'; // Import the Firebase auth listener
import Navbar from './components/common/navbar';
import Footer from './components/Login/Footer';

export default function Home() {
  const user = useUserStore((state: { user: any }) => state.user);
  useEffect(() => {
    initAuthListener(); // Initialize the Firebase auth listener
  }, []);
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {user ? (
        <div>
          <Navbar />
          <Dashboard />
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
