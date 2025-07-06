'use client';
import React, { useState, useEffect, use } from 'react';
import { Calendar, Clock, MapPin, Zap, Activity, Target } from 'lucide-react';
import { getAccessTokenFromCookie } from '@/app/store';
import { getActivities } from '@/app/helpers/data/activities';

const ActivitiesListPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  type ActivityType = {
    id: string | number;
    name?: string;
    activityType: string;
    description: string;
    startDateLocal: string;
    date: string;
    elapsedTime: number;
    location: string;
    distance: number;
    calories: number;
    avgSpeed: string;
  };

  const [allActivities, setAllActivities] = useState<ActivityType[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  // Sample Strava activities data
  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    const fetchActivities = async () => {
      if (!accessToken) {
        console.error('Access token is undefined');
        return [];
      }
      const data = await getActivities(accessToken);
      return data;
    };

    fetchActivities().then((activity) => {
      setAllActivities(activity);
      updateActivities();
    });
  }, [accessToken]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!accessToken) {
        console.error('Access token is undefined');
        return [];
      }
      const data = await getActivities(accessToken);
      return data;
    };

    fetchActivities().then((activity) => {
      setAllActivities(activity);
      updateActivities();
    });
  }, [selectedMonth, selectedYear]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Filter activities based on selected month and year
  const updateActivities = () => {
    const filtered = allActivities.filter((activity) => {
      const activityDate = new Date(activity.startDateLocal);
      const matchesMonth = activityDate.getMonth() === selectedMonth;
      const matchesYear = activityDate.getFullYear() === selectedYear;

      return matchesMonth && matchesYear;
    });
    setActivities(filtered);
  };

  useEffect(() => {
    updateActivities();
  }, [selectedMonth, selectedYear]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Ride: 'bg-blue-500',
      Run: 'bg-green-500',
      Walk: 'bg-red-500',
      Swim: 'bg-purple-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Activity className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  My Activities
                </h1>
                <p className="text-gray-400 mt-1">
                  Track your fitness journey for {months[selectedMonth]}{' '}
                  {selectedYear}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {activities.length} activities recorded
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Month and Year Selection */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">
                  Period:
                </span>
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={updateActivities}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Update Activities
            </button>
          </div>
        </div>

        {/* Activities List */}
        {activities.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {activity.name || 'Unnamed Activity'}
                      </h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(activity.activityType)}`}
                      >
                        {activity.activityType}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                      {formatDate(activity.startDateLocal)}
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-2 text-green-400" />
                      {activity.elapsedTime / 60 < 60
                        ? `${Math.floor(activity.elapsedTime / 60)} min`
                        : `${Math.floor(activity.elapsedTime / 3600)} hr ${Math.floor((activity.elapsedTime % 3600) / 60)} min`}
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <Target className="h-4 w-4 mr-2 text-purple-400" />
                      {Math.floor(activity.distance / 1000)} km
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 max-w-md mx-auto">
              <Activity className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Activities Recorded
              </h3>
              <p className="text-gray-400 mb-6">
                No fitness activities recorded for {months[selectedMonth]}{' '}
                {selectedYear}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesListPage;
