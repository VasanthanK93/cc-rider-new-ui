'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { getEventbyId } from '@/app/helpers/data/events';
import EventsDetails from '@/app/components/registration/eventDetails';
import EventForm from '@/app/components/registration/eventForm';

interface EventRegistrationPageProps {
  params: { eventId: string };
}

const EventRegistrationPage: React.FC<EventRegistrationPageProps> = ({
  params,
}) => {
  const [eventData, setEventData] = useState(null);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventparams = (await params).eventId;
      await setEventId(eventparams);
      if (eventparams) {
        try {
          console.log('Event ID from search params:', eventparams);
          const response = await getEventbyId(eventparams);
          setEventData(response);
        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      }
    };

    fetchEventData();
  }, [params]);

  return (
    <div>
      {eventId ? (
        eventData ? (
          <>
            <EventsDetails eventData={eventData} eventId={eventId} />
            <EventForm eventData={eventData} />
          </>
        ) : (
          <p>Loading event details...</p>
        )
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventRegistrationPage;
