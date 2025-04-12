import React from 'react';
import { Card, CardHeader } from '../common/card';
import { useEffect, useState } from 'react';
import { getActivities } from '../../helpers/data/activities';
import { useUserStore } from '../../store';

const ActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<{ name: string }>({ name: '' });

  const user = useUserStore((state: { user: any }) => state.user);

  useEffect(() => {
    const fetchActivities = async () => {
      const idToken = user.accessToken; // Assume this function retrieves the logged-in user's ID token
      const data = await getActivities(idToken);
      return data;
    };

    fetchActivities().then((activity) => {
      setActivities(activity[0]);
      console.log('Activities:', activities);
    });
  }, []);
  return <Card>{/* <CardHeader title={activities[0].name} /> */}</Card>;
};

export default ActivityCard;
