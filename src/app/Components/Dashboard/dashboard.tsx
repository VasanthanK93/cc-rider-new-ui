// pages/dashboard.js
'use client';
import Head from 'next/head';
import 'react-circular-progressbar/dist/styles.css';
import { useUserStore } from '../../store';
import { EventCarousel } from '../common/eventcarousel';
import ActivityCard from './activityCard';
import Challenges from './challengeCard';
import MileageSummary from './mileageSummary';

export default function Dashboard() {
  const user = useUserStore((state: { user: any }) => state.user);

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Dashboard | Chennai Cyclists</title>
        <meta name="description" content="Chennai Cyclists Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-4">
        {/* Welcome Message */}
        <div className="mb-10">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            Welcome back,{' '}
            <span className="text-green-500">{user.displayName}</span>{' '}
            <span className="text-gray-400 text-lg md:text-xl">
              ({user.uid})
            </span>
          </h1>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Activity Card */}
          <ActivityCard />

          {/* Challenges Card */}
          <Challenges />
        </div>

        {/* Mileage Summary */}
        <MileageSummary />
      </main>
      <EventCarousel eventType="upcoming" />
    </div>
  );
}
