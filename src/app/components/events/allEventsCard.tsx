'use client';
import React from 'react';
import { getEvents } from '@/app/helpers/data/events';
import { categorizeEvents } from '@/app/helpers/aggregate-helpers';
import UpcomingEventsCard from './upcomingEventsCard';
import { getChallenges } from '@/app/helpers/data/challenges';
// import EventCard from './EventCard';

interface Event {
  id: string;
  name: string;
  shortDescription: string;
}

const AllEventsCard: React.FC<{}> = () => {
  // State variables for categorized events
  const [endurance, setEndurance] = React.useState<{
    type: string;
    events: Event[];
  }>({ type: '', events: [] });
  const [challenges, setChallenges] = React.useState<{
    type: string;
    events: Event[];
  }>({ type: '', events: [] });
  const [enduroEvents, setEnduroEvents] = React.useState<{
    type: string;
    events: Event[];
  }>({ type: '', events: [] });
  const [otherEvents, setOtherEvents] = React.useState<{
    type: string;
    events: Event[];
  }>({ type: '', events: [] });

  const fetchAndCategorizeEvents = async () => {
    const events = await getEvents();
    const challengesData: [] = await getChallenges();
    const [endurance, challenges, enduroEvents, otherEvents] = categorizeEvents(
      [...events, ...challengesData],
    );
    return [endurance, challenges, enduroEvents, otherEvents];
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const [enduranceData, challengesData, enduroEventsData, otherEventsData] =
        await fetchAndCategorizeEvents();
      setEndurance(enduranceData);
      setChallenges(challengesData);
      setEnduroEvents(enduroEventsData);
      setOtherEvents(otherEventsData);
    };

    fetchData();
  }, []);
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Endurance Events Card */}
        <div className="bg-white text-black rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Endurance</h3>
          <div>
            {endurance.events.map((event) => (
              <UpcomingEventsCard
                key={event.eventId}
                events={event}
                type="upcoming"
              />
            ))}
          </div>
        </div>

        {/* Challenges Card */}
        <div className="bg-white text-black rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Challenges</h3>
          <div>
            {challenges.events.map((challenge) => (
              <UpcomingEventsCard
                key={challenge.eventId}
                events={challenge}
                type="upcoming"
              />
            ))}
          </div>
        </div>

        {/* Enduro Events Card */}
        <div className="bg-white text-black rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Enduro events</h3>
          <div>
            {enduroEvents.events.map((event) => (
              <UpcomingEventsCard
                key={event.eventId}
                events={event}
                type="upcoming"
              />
            ))}
          </div>
        </div>

        {/* Other Events Card */}
        <div className="bg-white text-black rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Other events</h3>
          <div>
            {otherEvents.events.map((event) => (
              <UpcomingEventsCard
                key={event.eventId}
                events={event}
                type="upcoming"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventsCard;
