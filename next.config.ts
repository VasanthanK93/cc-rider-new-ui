import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    WCCG_FIREBASE_API_KEY: 'AIzaSyCLTZ0L0vORG4RyZGnTTI5RyPMsjnmD_Ak',
    WCCG_FIREBASE_PROJECT_ID: 'wccg-stag',
    WCCG_FIREBASE_MESSAGING_SENDER_ID: '195617813260',
    WCCG_WCCG_FIREBASE_DATABASE_URL: 'test',
    WCCG_FIREBASE_APP_ID: '1:195617813260:web:c22ee88b09061661b7cf29',
    WCCG_API_BASE_URL: 'https://cc-stag.azure-api.net',
    WCCG_STRAVA_AUTHORIZE_URL:
      'https://www.strava.com/oauth/authorize?client_id=120579&response_type=code&approval_prompt=force&scope=activity:read_all',
    WCCG_RIDER_GA_KEY: 'UA-136236060-4',
    WCCG_NODE_ENV: 'development',
  },
};

export default nextConfig;
