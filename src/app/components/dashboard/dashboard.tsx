// pages/dashboard.js
'use client';
import Head from 'next/head';
import 'react-circular-progressbar/dist/styles.css';
import { getAccessTokenFromCookie, useUserStore } from '@/app/store';
import jwt from 'jsonwebtoken';
import { EventCarousel } from '@/app/components/common/eventCarousel';
import ActivityCard from '@/app/components/dashboard/activityCard';
import Challenges from '@/app/components/dashboard/challengeCard';
import MileageSummary from '@/app/components/dashboard/mileageSummary';
import React from 'react';

export default function Dashboard() {
  const [displayName, setDisplayName] = React.useState<string>('Cyclist');
  const [user_id, setUserId] = React.useState<string>('CC000000');
  const accessToken = getAccessTokenFromCookie();
  const user = accessToken ? jwt.decode(accessToken) : null;

  React.useEffect(() => {
    setDisplayName(
      user && typeof user !== 'string' && 'name' in user
        ? user.name
        : 'Cyclist',
    );
    setUserId(
      user && typeof user !== 'string' && 'user_id' in user
        ? user.user_id
        : 'CC000000',
    );
  }, [user]);

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
            Welcome back, <span className="text-green-500">{displayName}</span>{' '}
            <span className="text-gray-400 text-lg md:text-xl">
              ({user_id})
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
      <EventCarousel eventType="upcoming" showmore={true} />
    </div>
  );
}
