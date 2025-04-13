import dayjs from 'dayjs';

interface Stats {
  distance: number;
  commuteDistance: number;
  elpasedTime: number;
}

interface Summary {
  rideStats: Stats;
  runStats: Stats;
  walkStats: Stats;
  swimStats: Stats;
}

interface MonthlyData {
  month: number;
  rideStats: Stats;
}

export const mapRiderSummary = (
  summary: Summary,
  type: string,
): { type: string; total: string; completed: number } => {
  const RideConst = '15000';
  const RunConst = '250';
  const WalkConst = '250';
  const SwimConst = '250';

  switch (type) {
    case 'Ride':
      return {
        type: 'Ride',
        total: summary.rideStats.distance
          ? `${(summary.rideStats.distance / 1000).toFixed(1)} kms`
          : '0',
        completed: summary.rideStats.distance
          ? Math.round(
              (summary.rideStats.distance / 1000 / parseInt(RideConst)) * 100,
            )
          : 0,
      };
    case 'Run':
      return {
        type: 'Run',
        total: summary.runStats.distance
          ? `${(summary.runStats.distance / 1000).toFixed(1)} kms`
          : '0',
        completed: summary.runStats.distance
          ? Math.round(
              (summary.runStats.distance / 1000 / parseInt(RunConst)) * 100,
            )
          : 0,
      };
    case 'Walk':
      return {
        type: 'Walk',
        total: summary.walkStats.distance
          ? `${(summary.walkStats.distance / 1000).toFixed(1)} kms`
          : '0',
        completed: summary.walkStats.distance
          ? Math.round(
              (summary.walkStats.distance / 1000 / parseInt(WalkConst)) * 100,
            )
          : 0,
      };
    case 'Swim':
      return {
        type: 'Swim',
        total: summary.swimStats?.distance
          ? `${(summary.swimStats.elpasedTime / 60).toFixed(1)} mins`
          : '0',
        completed: summary.swimStats?.elpasedTime
          ? Math.round(
              (summary.swimStats.elpasedTime / 60 / parseInt(SwimConst)) * 100,
            )
          : 0,
      };
    default:
      return {
        type: 'Unknown',
        total: '0',
        completed: 0,
      };
  }
};

export const mapRiderMonthlySummary = (
  monthlySummary: MonthlyData[],
  type: string,
): { name: string; distance: number; commute: number }[] => {
  const monthlyData = [
    { name: 'Jan', distance: 0, commute: 0 },
    { name: 'Feb', distance: 0, commute: 0 },
    { name: 'Mar', distance: 0, commute: 0 },
    { name: 'Apr', distance: 0, commute: 0 },
    { name: 'May', distance: 0, commute: 0 },
    { name: 'Jun', distance: 0, commute: 0 },
    { name: 'Jul', distance: 0, commute: 0 },
    { name: 'Aug', distance: 0, commute: 0 },
    { name: 'Sep', distance: 0, commute: 0 },
    { name: 'Oct', distance: 0, commute: 0 },
    { name: 'Nov', distance: 0, commute: 0 },
    { name: 'Dec', distance: 0, commute: 0 },
  ];
  if (monthlySummary.length > 0) {
    monthlySummary.forEach((summary) => {
      const month = dayjs()
        .month(summary.month - 1)
        .format('MMM');
      monthlyData.map((data) => {
        if (data.name === month) {
          if (type === 'Swim') {
            data['distance'] = parseFloat(
              (typeof summary[
                (type.toLowerCase() + 'Stats') as keyof MonthlyData
              ] === 'object' &&
              summary[(type.toLowerCase() + 'Stats') as keyof MonthlyData] !==
                null
                ? (
                    summary[
                      (type.toLowerCase() + 'Stats') as keyof MonthlyData
                    ] as Stats
                  ).elpasedTime / 60
                : 0
              ).toFixed(1),
            );
            data['commute'] = 0;
          } else {
            data['distance'] = parseFloat(
              (typeof summary[
                (type.toLowerCase() + 'Stats') as keyof MonthlyData
              ] === 'object' &&
              summary[(type.toLowerCase() + 'Stats') as keyof MonthlyData] !==
                null
                ? (
                    summary[
                      (type.toLowerCase() + 'Stats') as keyof MonthlyData
                    ] as Stats
                  ).distance / 1000
                : 0
              ).toFixed(1),
            );
            data['commute'] = parseFloat(
              (typeof summary[
                (type.toLowerCase() + 'Stats') as keyof MonthlyData
              ] === 'object' &&
              summary[(type.toLowerCase() + 'Stats') as keyof MonthlyData] !==
                null
                ? (
                    summary[
                      (type.toLowerCase() + 'Stats') as keyof MonthlyData
                    ] as Stats
                  ).commuteDistance / 1000
                : 0
              ).toFixed(1),
            );
          }
        }
      });
    });
  }

  return monthlyData;
};
