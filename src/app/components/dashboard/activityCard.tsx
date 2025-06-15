import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/app/components/common/card';
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
    return <Card><CardHeader><CardTitle>No activity available</CardTitle></CardHeader></Card>;
  }

  const activity = activities[0];

  return (
    <>
      <Card className="gap-2">
        <h3 className="text-sm font-semibold px-6 text-muted-foreground tracking-wide uppercase">
          Latest Activity
        </h3>

        <CardContent className="px-6 pt-1 text-sm text-muted-foreground">
          {new Date(activity.startDateLocal).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </CardContent>

        <CardHeader>
          <CardTitle className="text-xl font-bold leading-snug">
            {activity.name || 'Unnamed Activity'}
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-4 px-6 text-md text-muted-foreground">
          <p>
            <span className="font-semibold text-primary">
              {(activity.distance / 1000).toFixed(2)} km
            </span>
            {' | '}
            {Math.floor(activity.movingTime / 3600)} hr{' '}
            {Math.floor((activity.movingTime % 3600) / 60)} min
          </p>
        </CardContent>
        <CardFooter className="border-t px-6 pt-4 justify-center">
          <a
            href="/activities"
            className="text-sm font-bold text-primary hover:underline"
          >
            View all activities
          </a>
        </CardFooter>
      </Card>
    </>
  );
};

export default ActivityCard;
