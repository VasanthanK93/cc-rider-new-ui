import React from 'react';
import { EventCarousel } from '@/app/components/common/eventcarousel';

const EventsPage: React.FC = () => {
  return (
    <div>
      <EventCarousel eventType="registrations" />
      <EventCarousel eventType="upcoming" />
    </div>
  );
};

export default EventsPage;
