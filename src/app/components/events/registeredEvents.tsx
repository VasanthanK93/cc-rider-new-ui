'use client';
import React from 'react';
import UpcomingEventsCard from './upcomingEventsCard';
import { getAccessTokenFromCookie } from '@/app/store';
import { getRegistrations } from '@/app/helpers/data/events';
import { categorizeEvents } from '@/app/helpers/aggregate-helpers';

const RegisteredEvents: React.FC<{}> = () => {
  const [registeredEndurance, setRegisteredEndurance] =
    React.useState<any>(null);
  const [registeredChallenges, setRegisteredChallenges] =
    React.useState<any>(null);
  const [registeredEnduroEvents, setRegisteredEnduroEvents] =
    React.useState<any>(null);
  const [registeredOtherEvents, setRegisteredOtherEvents] =
    React.useState<any>(null);
  const accessToken = getAccessTokenFromCookie();

  const fetchAndCategorizeRegistrations = async () => {
    const idToken = accessToken;
    if (!idToken) {
      console.error('Access token is undefined');
      return [];
    }
    const registrations = await getRegistrations(idToken);
    console.log('Registrations:', registrations);
    const [
      registeredEndurance,
      registeredChallenges,
      registeredEnduroEvents,
      registeredOtherEvents,
    ] = categorizeEvents(registrations);
    return [
      registeredEndurance,
      registeredChallenges,
      registeredEnduroEvents,
      registeredOtherEvents,
    ];
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const [enduranceData, challengesData, enduroEventsData, otherEventsData] =
        await fetchAndCategorizeRegistrations();
      console.log('Registered Endurance:', enduranceData);
      setRegisteredEndurance(enduranceData);
      setRegisteredChallenges(challengesData);
      setRegisteredEnduroEvents(enduroEventsData);
      setRegisteredOtherEvents(otherEventsData);
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="border-b border-gray-200 py-4">
        <div className="flex justify-between items-start">
          <div>
            {/* <UpcomingEventsCard key={registeredEndurance.eventId} event={registeredEndurance} type="registered"/> */}
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 py-4">
        {/* <div className="flex justify-between items-start mb-1">
        <h3 className="text-green-500 font-medium">
          {challenge.title} - {challenge.goal} {challenge.recentActivity && `| Recent activity - ${challenge.recentActivity}`}
        </h3>
        <div className="text-green-500 text-sm font-medium">
          View more details
        </div>
      </div>
      <p className="text-sm text-gray-700">{challenge.progress}% completed</p>
      <ProgressBar progress={challenge.progress} /> */}
      </div>
    </div>
  );
};

export default RegisteredEvents;
