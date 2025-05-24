'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/common/carousel';
import { EventCard } from '@/app/components/common/eventCard';
import { getEvents, getRegistrations } from '@/app/helpers/data/events';
import { useUserStore } from '@/app/store';

import React, { useEffect, useState } from 'react';

export function EventCarousel({ eventType }: { eventType: string }) {
  const [events, setEvents] = useState<any[]>([]); // State to store events
  const user = useUserStore((state: { user: any }) => state.user);

  useEffect(() => {
    async function fetchEvents() {
      if (eventType === 'registrations') {
        const idTokenn = user.accessToken;
        const fetchedEvents = await getRegistrations(idTokenn); // Pass eventType to getRegistrations
        setEvents(fetchedEvents); // Update state with resolved events
      } else if (eventType === 'upcoming') {
        const fetchedEvents = await getEvents(); // Pass eventType to getEvents
        setEvents(fetchedEvents); // Update state with resolved events
      }
    }
    fetchEvents();
  }, []); // Add eventType as a dependency

  return (
    <>
      <div className="flex flex-wrap justify-center py-2">
        <div className="text-white text-3xl font-bold text-center">
          Upcoming events and Challenges
        </div>
      </div>
      <Carousel>
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index} className="sm:basis-1/3">
              {eventType === 'registrations' ? (
                <EventCard
                  eventTitle={event.eventName}
                  eventImageUrl={event.heroImage?.file.url}
                />
              ) : (
                <EventCard
                  eventTitle={event.name}
                  eventDescription={event.shortDescription}
                  eventImageUrl={event.heroImage?.file.url}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
