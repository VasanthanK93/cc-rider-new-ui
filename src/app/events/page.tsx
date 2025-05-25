import React from 'react';
import { EventCarousel } from '@/app/components/common/eventCarousel';

const EventsPage: React.FC = () => {
  return (
    <div>
      <EventCarousel eventType="registrations" showmore={true} />
      <EventCarousel eventType="upcoming" />
    </div>
  );
};

export default EventsPage;
