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

export const categorizeEvents = (
  events: any[],
): { type: string; events: any[] }[] => {
  const categories: { type: string; events: any[] }[] = [
    { type: 'endurance', events: [] },
    { type: 'challenges', events: [] },
    { type: 'enduroseries', events: [] },
    { type: 'other', events: [] },
  ];

  events.forEach((event) => {
    switch (event.eventCategory) {
      case 'Enduro Series':
      case 'EnduroSeries':
      case 'UltraEnduroSeries':
        categories[2].events.push(event);
        break;
      case 'ITT RACE':
      case 'TTT Race':
      case 'Relay race':
      case 'RoadRace':
      case 'MTB TRAIL':
        categories[3].events.push(event);
        break;
      case 'ENDURANCE':
        categories[0].events.push(event);
        break;
      case 'Challenge':
      case 'Duathlon':
        categories[1].events.push(event);
        break;
      default:
        categories[3].events.push(event);
    }
  });

  return categories;
};
