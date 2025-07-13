import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.WCCG_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.WCCG_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.WCCG_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.WCCG_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.WCCG_FIREBASE_APP_ID,
    NEXT_PUBLIC_API_BASE_URL: process.env.WCCG_API_BASE_URL,
    NEXT_PUBLIC_STRAVA_AUTHORIZE_URL: process.env.WCCG_STRAVA_AUTHORIZE_URL,
    NEXT_PUBLIC_RIDER_GA_KEY: process.env.WCCG_RIDER_GA_KEY,
    NEXT_PUBLIC_NODE_ENV: process.env.WCCG_NODE_ENV,
    NEXT_RAZORPAY_KEY: process.env.WCCG_RAZORPAY_KEY,
    NEXT_EVENTS_API_BASE_URL: process.env.WCCG_EVENTS_API_BASE_URL,
    NEXT_ORDERS_API_BASE_URL: process.env.WCCG_ORDERS_API_BASE_URL,
    NEXT_RIDERS_API_BASE_URL: process.env.WCCG_RIDERS_API_BASE_URL,
    NEXT_RIDER_SIGNUP_API_URL: '/riderCreate',
    updateRidersPasswordApiUrl: '/{riderId}/update/password',
    eventsApiUrl: '/events',
    discountsApiUrl: '/offers',
    ordersApiUrl: '/orders',
  },
};

export default nextConfig;
