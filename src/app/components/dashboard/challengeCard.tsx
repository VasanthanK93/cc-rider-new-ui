import React, { useEffect, useState } from 'react';
import { getActivityApprovals, getScorecard } from '@/app/helpers/data/events';
import { getAccessTokenFromCookie } from '@/app/store';
import jwt from 'jsonwebtoken';
import Router from 'next/router';

const ChallengeCard: React.FC = () => {
  const [user_id, setUserId] = useState<string>('CC000000');
  const [challenge, setChallenge] = useState<any | null>(null);
  const [challengeVal, setChallengeVal] = useState<string>('');
  const [completionVal, setCompletionVal] = useState<number>(0);
  const accessToken = getAccessTokenFromCookie();
  const user = accessToken ? jwt.decode(accessToken) : null;

  useEffect(() => {
    setUserId(
      user && typeof user !== 'string' && 'user_id' in user
        ? user.user_id
        : 'CC000000',
    );
    initializeChallenge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const initializeChallenge = async () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let eventId = '';
    let selectedOptionId = '';
    let localChallengeVal = '';
    let localCompletionVal = '';

    switch (month) {
      case 3:
        eventId = `march-madness-${year}`;
        selectedOptionId = `march-madness-${year}`;
        localChallengeVal = '25x10/50x10';
        localCompletionVal = '10';
        break;
      case 6:
        eventId = `distancechallenge-${year}`;
        selectedOptionId = `distancechallenge-${year}`;
        localChallengeVal = '300/500/750/1000+ km';
        break;
      case 9:
        eventId = `${year}-sept-challenge`;
        selectedOptionId = `${year}-sept-challenge`;
        localChallengeVal = '25x15';
        localCompletionVal = '15';
        break;
      case 11:
        eventId = `18activedays-${year}`;
        selectedOptionId = `18activedays-${year}`;
        localChallengeVal = '18 Active Days';
        localCompletionVal = '18';
        break;
      default:
        break;
    }

    try {
      if (!accessToken) {
        throw new Error('Access token is undefined');
      }
      // fetch challenge data
      const scorecardPromise = await getScorecard(
        accessToken,
        eventId
      );
      const foundChallenge = scorecardPromise.find(
        (scorecard: any) => scorecard.riderId === user_id,
      );
      if (foundChallenge) {
        let compVal = localCompletionVal;
        if (foundChallenge.eventId.includes('distancechallenge')) {
          // get number from registrationOptionId
          compVal = foundChallenge.registrationOptionId.match(/\d+/)[0];
        }
        setChallenge(foundChallenge);
        setChallengeVal(localChallengeVal);
        setCompletionVal(Number(compVal));
      } else {
        setChallenge(null);
        setChallengeVal('');
        setCompletionVal(0);
      }
    } catch (e) {
      setChallenge(null);
      setChallengeVal('');
      setCompletionVal(0);
      console.error('Error initializing challenge:', e);
    }
  };

  function getCompletionPercentage(
    eventId: string,
    completed: number,
    total: number,
  ) {
    if (!total || total === 0) return 0;
    if (eventId.includes('distancechallenge')) {
      return (completed / 1000 / total) * 100;
    } else {
      return (completed / total) * 100;
    }
  }

  type ProgressCircleProps = {
    progress: number;
    size?: number;
  };

  const ProgressCircle: React.FC<ProgressCircleProps> = ({
    progress,
    size = 120,
  }) => {
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10b981"
            strokeWidth="12"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
    );
  };

  return (
    <div>
      {challenge ? (
        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col h-full">
          <div className="mb-6 min-h-[80px] flex flex-col justify-start">
            <h3 className="text-2xl font-bold text-gray-900">Challenges</h3>
          </div>
          <div className="flex-1 flex items-center">
            {/* Challenge Item */}
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {challenge.eventId.replace(/-/g, ' ')}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{challengeVal}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Completed</p>
                  {challenge.eventId.includes('distancechallenge') ? (
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {challenge.score / 1000}
                      </span>
                      <span className="text-lg text-gray-400">
                        /{completionVal}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {challenge.score}
                      </span>
                      <span className="text-lg text-gray-400">
                        /{completionVal}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Progress Circle */}
              <div className="ml-6 flex-1 flex items-center">
                <ProgressCircle
                  progress={getCompletionPercentage(
                    challenge.eventId,
                    challenge.score,
                    completionVal,
                  )}
                  size={150}
                />
              </div>
            </div>
          </div>
          <div className="min-h-[24px] flex items-end">
            <button onClick={()=> Router.push('/activities/:challenge.eventId')} className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center transition-colors">
              View more
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col h-full">
          <div className="mb-6 min-h-[80px] flex flex-col justify-start">
            <p className="text-gray-900">
              No registered challenge available to display
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
