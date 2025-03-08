import wfetch from './wccg-fetch';

export const getStatus = async (idToken: string): Promise<any> => {
  const url = '/strava-account/status';
  const status = await wfetch.get(url, idToken);
  return status;
};

export const getAccount = async (idToken: string): Promise<any> => {
  const url = '/strava-account/account';
  const status = await wfetch.get(url, idToken);
  return status;
};

export const disconnect = async (idToken: string): Promise<any> => {
  const url = '/strava-account/account';
  const status = await wfetch.del(url, idToken);
  return status;
};

export const connect = async (
  idToken: string,
  authorizationCode: string,
): Promise<any> => {
  const url = '/strava-account/account';
  const data = { authorizationCode };
  const status = await wfetch.post(url, idToken, data);
  return status;
};
