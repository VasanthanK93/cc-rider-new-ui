import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/app/components/common/card';
import { getActivities } from '@/app/helpers/data/activities';
import { getAccessTokenFromCookie } from '@/app/store';

const ActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);

  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    const fetchActivities = async () => {
      if (!accessToken) {
        console.error('Access token is undefined');
        return [];
      }
      const data = await getActivities(accessToken);
      return data;
    };

    fetchActivities().then((activity) => {
      setActivities(activity);
    });
  }, [accessToken]);

  if (!activities.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No activity available</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const activity = activities[0];

  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col h-full">
        <div className="mb-6 min-h-[80px] flex flex-col justify-start">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Latest Activity
          </h3>

          <p className="text-sm text-gray-400">
            {new Date(activity.startDateLocal).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>

        <div className="mb-6 flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activity.name || 'Unnamed Activity'}
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-green-600 font-semibold">
              {(activity.distance / 1000).toFixed(2)} km
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">
              {Math.floor(activity.movingTime / 3600)} hr{' '}
              {Math.floor((activity.movingTime % 3600) / 60)} min
            </span>
          </div>
        </div>
        <div className="min-h-[24px] flex items-end">
          <button
            className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center transition-colors"
            onClick={() => (window.location.href = '/activities')}
          >
            View all activities
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
