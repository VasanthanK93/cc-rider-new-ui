import React, { useEffect, useState } from 'react';
import { getActivityApprovals, getScorecard } from '@/app/helpers/data/events';
import { getAccessTokenFromCookie } from '@/app/store';
import { Card } from '@/app/components/common/card';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import Link from 'next/link';
import { IoMdArrowForward } from 'react-icons/io';

const ChallengeCard: React.FC = () => {
  const [activities, setActivities] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const accessToken = getAccessTokenFromCookie();

  // Challenge completion percentage
  const challengePercentage = 4 * 10; // 4 out of 10 days = 40%

  useEffect(() => {
    initializeChallenge();
  }, [accessToken]);

  const initializeChallenge = async () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let eventId = '';
    let eventName = '';
    let selectedOptionId = '';
    let challengeVal = '';
    let completionVal = '';

    switch (month) {
      case 3:
        eventId = `march-madness-${year}`;
        eventName = `CC March Madness - ${year}`;
        selectedOptionId = `march-madness-${year}`;
        challengeVal = '25x10/50x10';
        completionVal = '10';
        break;
      case 6:
        eventId = `distancechallenge-${year}`;
        eventName = `CC Distance Challenge - June ${year}`;
        selectedOptionId = `distancechallenge-${year}`;
        challengeVal = '300/500/750/1000+ km';
        break;
      case 9:
        eventId = `${year}-sept-challenge`;
        eventName = `CC 25x15 Challenge Registration - September ${year}`;
        selectedOptionId = `${year}-sept-challenge`;
        challengeVal = '25x15';
        completionVal = '15';
        break;
      case 11:
        eventId = `18activedays-${year}`;
        eventName = `CC 18 active Challenge - November ${year}`;
        selectedOptionId = `18activedays-${year}`;
        challengeVal = '18 Active Days';
        completionVal = '18';
        break;
      default:
        break;
    }

    try {
      const idToken = accessToken; // Assume this retrieves the logged-in user's ID token
      // const approvalsPromise = await getActivityApprovals(idToken, eventId);
      // const scorecardPromise = await getScorecard(
      //   idToken,
      //   eventId,
      //   selectedOptionId,
      // );
      // const challenge = scorecardPromise.find(
      //   (scorecard: any) => scorecard.riderId === user.id,
      // );

      // You can now use approvalsPromise, challenge, or other variables as needed
    } catch (e) {
      console.error('Error initializing challenge:', e);
    }
  };
  const getCompletionPercentage = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  return (
    <div className="challenge-card">
      {activities.length > 0 ? (
        <Card>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Challenges</h2>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">March Madness</h3>
                  <p className="text-gray-600 mt-1">25kms x 10 days</p>

                  <div className="mt-8">
                    <p className="text-gray-600">Completed</p>
                    <p className="text-5xl font-bold mt-1">
                      4<span className="text-gray-400 text-2xl">/10</span>
                    </p>
                  </div>
                </div>

                {/* Circular Progress using react-circular-progressbar */}
                <div className="w-32">
                  <CircularProgressbar
                    value={challengePercentage}
                    strokeWidth={10}
                    styles={buildStyles({
                      pathColor: '#4CAF50',
                      trailColor: '#e9e9e9',
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <Link href="/challenges">
                <span className="text-green-500 hover:text-green-600 flex items-center cursor-pointer">
                  View more <IoMdArrowForward className="ml-2" />
                </span>
              </Link>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <p>No registered challenge available to display</p>
        </Card>
      )}
    </div>
  );
};

export default ChallengeCard;
