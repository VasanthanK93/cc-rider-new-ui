'use client';
import React, { useState, useEffect } from 'react';
import { getAccessTokenFromCookie } from '../../store';
import jwt from 'jsonwebtoken';
import { getScorecard } from '@/app/helpers/data/events';
import { Calendar, Clock, MapPin, Zap, Activity, Target } from 'lucide-react';

interface ChallengesListPageParams {
  eventId: string;
}

const ChallengesListPage = (params: ChallengesListPageParams) => {
    const [user_id, setUserId] = useState<string>('CC000000');
    const [eventId, setEventId] = useState<string>('');
      const [challenges, setChallenges] = useState<any | null>(null);
    
    const accessToken = getAccessTokenFromCookie();
      const user = accessToken ? jwt.decode(accessToken) : null;
    
      useEffect(() => {
        const eventparams = params.eventId;
        setEventId(eventparams);
        setUserId(
          user && typeof user !== 'string' && 'user_id' in user
            ? user.user_id
            : 'CC000000',
        );
        initializeChallenge();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [accessToken]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

      const initializeChallenge = async () => {
         try {
              if (!accessToken) {
                throw new Error('Access token is undefined');
              }
              // fetch challenge data
              const scorecardPromise = await getScorecard(
                accessToken,
                eventId,
              );
              const foundChallenge = scorecardPromise.find(
                (scorecard: any) => scorecard.riderId === user_id,
              );
              setChallenges(foundChallenge);
            } catch (error) {
            console.error('Error fetching challenge data:', error);
          }
          }

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
        <div>
        <div className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                        <Activity className="h-5 w-5" />
                      </button>
                      <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                          My Challenges Activities
                        </h1>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {challenges && challenges.length || 0} activities recorded
                    </div>
                  </div>
                </div>
              </div>
        {challenges && challenges.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((Challenge: any) => (
              <div
                key={Challenge.id}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {Challenge.name || 'Unnamed Challenge'}
                      </h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(Challenge.activityType)}`}
                      >
                        {Challenge.activityType}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {Challenge.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                      {formatDate(Challenge.startDateLocal)}
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-2 text-green-400" />
                      {Challenge.elapsedTime / 60 < 60
                        ? `${Math.floor(Challenge.elapsedTime / 60)} min`
                        : `${Math.floor(Challenge.elapsedTime / 3600)} hr ${Math.floor((Challenge.elapsedTime % 3600) / 60)} min`}
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <Target className="h-4 w-4 mr-2 text-purple-400" />
                      {Math.floor(Challenge.distance / 1000)} km
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
                No Challenges Recorded
              </h3>
            </div>
          </div>
        )}
        </div>
    );
}

export default ChallengesListPage;