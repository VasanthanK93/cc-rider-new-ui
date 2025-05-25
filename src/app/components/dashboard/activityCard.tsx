import React from 'react';
import { Card, CardHeader } from '@/app/components/common/card';
import { useEffect, useState } from 'react';
import { getActivities } from '@/app/helpers/data/activities';
import { getAccessTokenFromCookie } from '@/app/store';

const ActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<{ name?: string }[]>([]);

  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    const fetchActivities = async () => {
      const idToken = accessToken; // Assume this function retrieves the logged-in user's ID token
      if (!idToken) {
        console.error('Access token is undefined');
        return [];
      }
      const data = await getActivities(idToken);
      return data;
    };

    fetchActivities().then((activity) => {
      setActivities(activity);
    });
  }, []);

  return (
    <Card>
      <CardHeader title={activities[0]?.name || 'No activity available'} />
    </Card>
  );
};

export default ActivityCard;
