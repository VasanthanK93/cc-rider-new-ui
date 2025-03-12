import { initializeApp } from 'firebase/app';

// Load environment variables from .env file
const firebaseConfig = {
  apiKey: process.env.WCCG_FIREBASE_API_KEY,
  authDomain: process.env.WCCG_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.WCCG_FIREBASE_DATABASE_URL,
  projectId: process.env.WCCG_FIREBASE_PROJECT_ID,
  storageBucket: process.env.WCCG_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.WCCG_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.WCCG_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;
