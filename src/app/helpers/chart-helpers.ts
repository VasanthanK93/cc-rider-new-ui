import dayjs from 'dayjs';

interface Stats {
  distance: number;
  commuteDistance: number;
}

interface Summary {
  rideStats: Stats;
  runStats: Stats;
  walkStats: Stats;
  swimStats?: Stats;
}

interface MonthlyData {
  month: number;
  rideStats: Stats;
}

interface ChartData {
  labels: string[];
  datasets: {
    name?: string;
    values: string[];
  }[];
  colors?: string[];
  type?: string;
  axisOptions?: {
    xAxisMode: string;
    xIsSeries: boolean;
  };
  barOptions?: {
    stacked: number;
    spaceRatio: number;
  };
}

export const mapRiderSummary = (summary: Summary): ChartData => {
  const chartData: ChartData = {
    labels: ['Ride', 'Run', 'Walk'],
    datasets: [
      {
        values: [
          (summary.rideStats.distance / 1000).toFixed(1),
          (summary.runStats.distance / 1000).toFixed(1),
          (summary.walkStats.distance / 1000).toFixed(1),
        ],
      },
    ],
  };

  return chartData;
};

export const mapRiderMonthlySummary = (
  monthlySummary: MonthlyData[],
): ChartData => {
  const labels = monthlySummary.map(
    (monthlyData) =>
      `${dayjs()
        .month(monthlyData.month - 1)
        .format('MMM')}`,
  );
  const rideStats = monthlySummary.map((monthlyData) =>
    (monthlyData.rideStats.distance / 1000).toFixed(1),
  );
  const rideCommuteStats = monthlySummary.map((monthlyData) =>
    (monthlyData.rideStats.commuteDistance / 1000).toFixed(1),
  );
  const chartData: ChartData = {
    labels,
    datasets: [
      {
        name: 'Ride',
        values: rideStats,
      },
      {
        name: 'Commute',
        values: rideCommuteStats,
      },
    ],
    colors: ['purple', '#ffa3ef'],
    type: 'axis-mixed',
    axisOptions: {
      xAxisMode: 'tick',
      xIsSeries: true,
    },
    barOptions: {
      stacked: 1,
      spaceRatio: 0.5,
    },
  };

  return chartData;
};
