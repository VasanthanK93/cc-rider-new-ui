import React, { use, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface EventsDetailsProps {
  eventData: eventDetails;
}

interface eventDetails {
  name: string;
  heroImage: {
    file: {
      url: string;
      fileName: string;
    };
  };
  eventCategory: string;
  live: boolean;
  startPoint: string;
  date: string;
  registration: {
    registrationEndDate: string;
  };
  description: string;
}
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const daySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
};
const getDayOfWeek = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString('default', { weekday: 'long' });
};
const EventDetails: React.FC<EventsDetailsProps> = ({ eventData }) => {
  const [eventDate, setEventDate] = React.useState<string | null>(null);
  const [eventDay, setEventDay] = React.useState<string | null>(null);
  const [registrationCloseDate, setRegistrationCloseDate] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    setEventDate(formatDate(eventData.date));
    setEventDay(getDayOfWeek(eventData.date));
    setRegistrationCloseDate(
      formatDate(eventData.registration.registrationEndDate),
    ); // Assuming registration closes on 23rd February 2025
  }, [eventData]);
  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Event Header */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <img
              src={eventData.heroImage.file.url}
              alt={eventData.heroImage.file.fileName}
              className="w-full h-64"
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {eventData.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    In-person
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Virtual
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {eventData.eventCategory}
                  </span>
                </div>
              </div>
              <button
                disabled={eventData.live}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                REGISTER NOW
              </button>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-gray-800">
                    {eventData.startPoint}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-800">{eventDate}</div>
                  <div className="text-sm text-gray-600">{eventDay}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">
                    Registration closes on
                  </div>
                  <div className="text-sm text-gray-600">
                    {registrationCloseDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-base font-semibold py-6 my-6 text-gray-800">
                {eventData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
