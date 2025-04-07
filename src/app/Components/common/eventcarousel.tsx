import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import { EventCard } from '@/app/components/common/eventcard';
import { getEvents } from '@/app/helpers/data/events';

import React, { useEffect, useState } from 'react';

export function EventCarousel() {
  const [events, setEvents] = useState<any[]>([]); // State to store events

  useEffect(() => {
    async function fetchEvents() {
      const fetchedEvents = await getEvents(); // Await the promise
      setEvents(fetchedEvents); // Update state with resolved events
    }
    fetchEvents();
  }, []);

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
              <EventCard
                eventTitle={event.title}
                eventDescription={event.description}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
