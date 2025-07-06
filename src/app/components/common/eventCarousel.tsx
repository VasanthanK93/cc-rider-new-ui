'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/common/carousel';
import { EventCard } from '@/app/components/common/eventCard';
import { getEvents } from '@/app/helpers/data/events';
import { getRegistrations } from '@/app/helpers/data/orders';
import { getAccessTokenFromCookie } from '@/app/store';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';

export function EventCarousel({
  eventType,
  showmore,
}: {
  eventType: string;
  showmore?: boolean;
}) {
  const [events, setEvents] = useState<any[]>([]);
  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    async function fetchEvents() {
      if (eventType === 'registrations') {
        if (accessToken) {
          const idTokenn = accessToken;
          const fetchedEvents = await getRegistrations(idTokenn);
          setEvents(fetchedEvents);
        } else {
          console.error('Access token is undefined');
        }
      } else if (eventType === 'upcoming') {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      <div className="m-5">
        <div className="flex flex-wrap justify-center py-6">
          <h2 className="text-white text-3xl font-bold text-center">
            Upcoming Events and Challenges
          </h2>
        </div>

        <div className="w-full flex justify-center">
          <Carousel className="w-full max-w-6xl">
            <CarouselContent className="flex justify-center items-stretch">
              {events.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
                >
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
        </div>

        {showmore && (
          <div className="flex justify-center mt-6">
            <Link
              href={eventType === 'upcoming' ? '/allevents' : '/allevents'}
              className="text-sm font-bold text-primary hover:underline mb-4"
            >
              {eventType === 'upcoming' ? 'View all events' : 'View more'}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
