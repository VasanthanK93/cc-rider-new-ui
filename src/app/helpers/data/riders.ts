import wfetch from './wccg-fetch';

export const getRider = async (
  idToken: string,
  riderId: string,
): Promise<any> => {
  const url = `/riders/${riderId}/retrieve`;
  const rider = await wfetch.get(url, idToken);
  return rider;
};

export const updateRider = async (
  idToken: string,
  rider: any,
): Promise<any> => {
  const { riderId } = rider;
  const url = `/riders/${riderId}/update/details`;
  const response = await wfetch.post(url, idToken, rider);
  return response;
};
