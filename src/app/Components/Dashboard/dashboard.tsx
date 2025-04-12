// pages/dashboard.js
'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import {
  FaBiking,
  FaRunning,
  FaWalking,
  FaSwimmer,
  FaCaretDown,
  FaCircle,
} from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useUserStore } from '../../store';
import { EventCarousel } from '../common/eventcarousel';

export default function Dashboard() {
  const [year, setYear] = useState('2025');
  const user = useUserStore((state: { user: any }) => state.user);
  console.log(user);

  // Monthly mileage data
  const monthlyData = [
    { name: 'Jan', value: 754 },
    { name: 'Feb', value: 876 },
    { name: 'Mar', value: 737 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 0 },
    { name: 'Aug', value: 0 },
    { name: 'Sep', value: 0 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 },
  ];

  // Challenge completion percentage
  const challengePercentage = 4 * 10; // 4 out of 10 days = 40%

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
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Latest activity</h2>

              <div className="mb-6">
                <p className="text-gray-600">April 14 2024 5:46 am</p>
                <h3 className="text-xl font-bold mt-2">
                  Morning ride with the Chennai cyclists team in ORR!
                </h3>
                <div className="mt-4 text-xl font-bold">
                  30.2 <span className="font-normal">Kms | 01 hr 32 mins</span>
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <Link href="/activities">
                <span className="text-green-500 hover:text-green-600 flex items-center cursor-pointer">
                  View all activities <IoMdArrowForward className="ml-2" />
                </span>
              </Link>
            </div>
          </div>

          {/* Challenges Card */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Challenges</h2>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">March Madness</h3>
                  <p className="text-gray-600 mt-1">25kms x 10 days</p>

                  <div className="mt-8">
                    <p className="text-gray-600">Completed</p>
                    <p className="text-5xl font-bold mt-1">
                      4<span className="text-gray-400 text-2xl">/10</span>
                    </p>
                  </div>
                </div>

                {/* Circular Progress using react-circular-progressbar */}
                <div className="w-32">
                  <CircularProgressbar
                    value={challengePercentage}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: '#4CAF50',
                      trailColor: '#e9e9e9',
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <Link href="/challenges">
                <span className="text-green-500 hover:text-green-600 flex items-center cursor-pointer">
                  View more <IoMdArrowForward className="ml-2" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mileage Summary */}
        <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <h2 className="text-xl font-bold">Mileage Summary</h2>
                <span className="ml-2 text-green-500 flex items-center cursor-pointer">
                  - 2024 <FaCaretDown className="ml-1" />
                </span>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center">
                  <FaCircle className="text-green-500 mr-2 text-xs" />
                  <span>Ride</span>
                </div>
                <div className="flex items-center">
                  <FaCircle className="text-green-800 mr-2 text-xs" />
                  <span>Commute</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Total Circle using react-circular-progressbar */}
              <div className="w-40 h-40 mx-auto md:mx-0 md:mr-8 mb-6 md:mb-0">
                <div className="relative">
                  <CircularProgressbar
                    value={70} // Set the percentage filled
                    strokeWidth={8}
                    styles={buildStyles({
                      pathColor: '#4CAF50',
                      trailColor: '#e9e9e9',
                    })}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-gray-500 text-sm">Total</div>
                    <div className="text-2xl md:text-4xl font-bold text-green-500">
                      2367
                    </div>
                    <div className="text-sm md:text-xl">Kms</div>
                  </div>
                </div>
              </div>

              {/* Monthly Stats using Recharts */}
              <div className="flex-grow h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide={true} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4CAF50" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activity Icons */}
            <div className="flex justify-end mt-4 space-x-6">
              <FaBiking className="text-2xl text-green-500" />
              <FaRunning className="text-2xl text-gray-300" />
              <FaWalking className="text-2xl text-gray-300" />
              <FaSwimmer className="text-2xl text-gray-300" />
            </div>
          </div>
          <div className="border-t px-6 py-4">
            <Link href="/challenges">
              <span className="text-green-500 hover:text-green-600 flex items-center cursor-pointer">
                View more <IoMdArrowForward className="ml-2" />
              </span>
            </Link>
          </div>
        </div>
      </main>
      <EventCarousel />
    </div>
  );
}
