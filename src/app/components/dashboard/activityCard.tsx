import React from 'react';
import { Card, CardHeader } from '@/app/components/common/card';
import { useEffect, useState } from 'react';
import { getActivities } from '@/app/helpers/data/activities';
import { useUserStore } from '@/app/store';

const ActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<{ name?: string }[]>([]);

  const user = useUserStore((state: { user: any }) => state.user);

  useEffect(() => {
    const fetchActivities = async () => {
      const idToken = user.accessToken; // Assume this function retrieves the logged-in user's ID token
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
