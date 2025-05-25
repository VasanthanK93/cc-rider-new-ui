import wfetch from './wccg-fetch';

export const getChallenges = async (): Promise<any> => {
  const url = `/events-content/challenges`;
  const challengeslist = await wfetch.get(url);
  return challengeslist;
};
