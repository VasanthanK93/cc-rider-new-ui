'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import { getAccessTokenFromCookie } from '@/app/store';
import { getRider } from '@/app/helpers/data/riders';
import IDCard from '@/app/components/common/idCard';

interface Rider {
  riderId: string;
  firstName: string;
  lastName: string;
  dob: string; // Date of birth in YYYY-MM-DD format
  bloodGroup: string;
  emergencyNumber: string;
  alternateEmergencyNumber?: string;
  // Add other rider properties as needed
}

const IDCardPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const accessToken = getAccessTokenFromCookie();
  const user = accessToken ? jwt.decode(accessToken) : null;
  const [user_id, setUserId] = useState<string>('');
  const [rider, setRider] = useState<Rider | null>(null);

  useEffect(() => {
      const uid =
        user && typeof user !== 'string' && 'user_id' in user
          ? user.user_id
          : 'CC000000';
      setUserId(uid);
      if (accessToken && uid) {
        fetchUserData(accessToken, uid);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, user_id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;
    
    // Clear canvas with light gray background
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw placeholder text
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Image Placeholder', canvas.width / 2, canvas.height / 2);
  }, []);

  const fetchUserData = useCallback(async (token: string, uid: string) => {
      const RiderDetail = await getRider(token, uid);
      setRider(RiderDetail);
  }, [accessToken]);

  return (
    <>
      <Head>
        <title>My ID Card - Chennai Cyclists</title>
        <meta name="description" content="Chennai Cyclists Emergency ID Card" />
      </Head>
      
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-400 text-center mb-8">My ID Card</h1>
          
          {/* ID Card Container */}
          <IDCard rider={rider} />
          <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Download
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Incorrect details? Please update <a href="/myaccounts" className="text-green-400 hover:text-green-300">here</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDCardPage;