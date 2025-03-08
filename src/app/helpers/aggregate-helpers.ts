export const sumReducer = (
  items: any[],
  statsFor: string,
  statName: string,
): number => {
  return items.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue[statsFor][statName],
    0,
  );
};

export const getTotals = (
  stats: any[],
  activityType: string,
): { [key: string]: number } => {
  const statsName = `${activityType}Stats`;
  const runTotals = {
    commuteCount: sumReducer(stats, statsName, 'commuteCount'),
    commuteDistance: sumReducer(stats, statsName, 'commuteDistance'),
    count: sumReducer(stats, statsName, 'count'),
    distance: sumReducer(stats, statsName, 'distance'),
  };
  return runTotals;
};
