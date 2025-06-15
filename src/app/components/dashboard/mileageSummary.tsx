import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CardFooter } from '@/app/components/common/card';

import {
  FaCircle,
  FaBiking,
  FaRunning,
  FaWalking,
  FaSwimmer,
} from 'react-icons/fa';
import { IoMdArrowForward } from 'react-icons/io';
import { ResponsiveContainer, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import { getAccessTokenFromCookie } from '@/app/store';
import {
  getRiderMonthlySummary,
  getRiderYearlySummary,
} from '@/app/helpers/data/activities';
import YearPicker from '@/app/components/common/yearPicker';
import {
  mapRiderMonthlySummary,
  mapRiderSummary,
} from '@/app/helpers/chart-helpers';

const MileageSummary: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<
    { name: string; distance: number; commute: number }[]
  >([]);
  const [selectedActivity, setSelectedActivity] = useState<string>('Ride');
  const [yearlyData, setYearlyData] = useState<{
    completed: number;
    total: string;
  }>({ completed: 0, total: '0' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Monthly mileage data

  const accessToken = getAccessTokenFromCookie();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchMileageData();
  }, [year, selectedActivity]);

  const fetchMileageData = async () => {
    try {
      const idToken = accessToken;
      if (!idToken) {
        throw new Error('Access token is undefined');
      }
      let monthlyData = await getRiderMonthlySummary(idToken, year.toString());
      let updatedMonthlyData = await mapRiderMonthlySummary(
        monthlyData,
        selectedActivity,
      );
      setMonthlyData(updatedMonthlyData);
      const yearlyData = await getRiderYearlySummary(idToken, year.toString());
      const updatedYearlyData = await mapRiderSummary(
        yearlyData,
        selectedActivity,
      );
      setYearlyData(updatedYearlyData);
      setLoading(false);
    } catch (err) {
      // setError('Failed to fetch mileage data');
      setLoading(false);
    }
  };

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-l font-bold text-black mr-2">
              Mileage Summary
            </h2>
            <YearPicker onYearSelect={handleYearSelect} />
          </div>

          <div className="flex space-x-4">
            <div className="flex items-center">
              <FaCircle className="text-green-500 mr-2 text-xs" />
              <span className="text-black">Ride</span>
            </div>
            <div className="flex items-center">
              <FaCircle className="text-green-800 mr-2 text-xs" />
              <span className="text-black">Commute</span>
            </div>
          </div>

          {/* Activity Icons */}
          <ul className="flex justify-end mt-4 space-x-6">
            <li>
              <a onClick={() => setSelectedActivity('Ride')}>
                <FaBiking
                  className={`text-2xl ${selectedActivity === 'Ride' ? 'text-green-500' : 'text-gray-300'}`}
                />
              </a>
            </li>
            <li>
              <a onClick={() => setSelectedActivity('Run')}>
                <FaRunning
                  className={`text-2xl ${selectedActivity === 'Run' ? 'text-green-500' : 'text-gray-300'}`}
                />
              </a>
            </li>
            <li>
              <a onClick={() => setSelectedActivity('walk')}>
                <FaWalking
                  className={`text-2xl ${selectedActivity === 'Walk' ? 'text-green-500' : 'text-gray-300'}`}
                />
              </a>
            </li>
            <li>
              <a onClick={() => setSelectedActivity('swim')}>
                <FaSwimmer
                  className={`text-2xl ${selectedActivity === 'Swim' ? 'text-green-500' : 'text-gray-300'}`}
                />
              </a>
            </li>
          </ul>
        </div>
        {Object.keys(monthlyData).length > 0 ? (
          <div className="flex flex-col md:flex-row">
            {/* Total Circle using react-circular-progressbar */}
            {yearlyData ? (
              <div className="w-40 h-40 mx-auto md:mx-0 md:mr-8 mb-6 md:mb-0">
                <div className="relative">
                  <CircularProgressbar
                    value={yearlyData.completed} // Set the percentage filled
                    strokeWidth={8}
                    styles={buildStyles({
                      pathColor: '#4CAF50',
                      trailColor: '#e9e9e9',
                    })}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-gray-500 text-sm">Total</div>
                    <div className="text-2xl md:text-4xl font-bold text-green-500">
                      {yearlyData.total}
                    </div>
                    <div className="text-sm md:text-xl">
                      {selectedActivity === 'Swim' ? 'min' : 'kms'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No yearly summary data available.</p>
            )}

            {/* Monthly Stats using Recharts */}
            <div className="flex-grow h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar
                    dataKey="distance"
                    stackId="a"
                    fill="#3EB549"
                    barSize={10}
                  />
                  <Bar
                    dataKey="commute"
                    stackId="a"
                    fill="#379636"
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No monthly summary data available.</p>
        )}
      </div>
      <CardFooter className="border-t px-6 pt-4 justify-center mb-4">
        <a
          href="/stats"
          className="text-sm font-bold text-primary hover:underline"
        >
          View more stats
        </a>
      </CardFooter>
    </div>
  );
};

export default MileageSummary;
