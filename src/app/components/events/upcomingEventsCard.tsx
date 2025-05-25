import Link from 'next/link';
import React from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
}

interface UpcomingEventsCardProps {
  events: Event[];
}

const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  events,
  type,
}) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-green-500 font-medium">
            {events.name} {events.date && `| ${events.date}`}
          </h3>
          {events.location && (
            <p className="text-sm text-gray-700">{events.location}</p>
          )}
          {events.categories && (
            <p className="text-sm text-gray-700">{events.categories}</p>
          )}
          {events.description && (
            <p className="text-sm text-gray-700">{events.description}</p>
          )}
        </div>
        <div>
          {type === 'upcoming' ? (
            events.type === 'other' && events.name.contains('Aalam') ? (
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-sm">
                Know more
              </button>
            ) : events.coming_soon ? (
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-full text-sm"
                disabled
              >
                Coming soon
              </button>
            ) : (
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-sm">
                <Link href={`/registration/${events.eventId}`}>
                  Register now
                </Link>
              </button>
            )
          ) : (
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-sm">
              View details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
