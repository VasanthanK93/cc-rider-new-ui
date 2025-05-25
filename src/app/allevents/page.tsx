import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import AllEventsCard from '../components/events/allEventsCard';
import Link from 'next/link';
import RegisteredEvents from '../components/events/registeredEvents';

{
  /* All Events and Challenges Section */
}
const AllEvents: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-900 ">
        <Link
          href="/events"
          className="text-2xl md:text-3xl text-white py-10 px-4 font-bold mb-6 flex"
        >
          <FaArrowLeft />
          All Events and Challenges
        </Link>
        <h4 className="text-green-500 text-xl mb-4">Upcoming events</h4>
        <AllEventsCard />
        <h4 className="text-green-500 text-xl mb-4">
          Registered Challenges and events
        </h4>
      </div>
      <RegisteredEvents />
    </>
  );
};

export default AllEvents;
