import dayjs from 'dayjs';
import wfetch from './wccg-fetch';

export const getActivities = async (idToken: string): Promise<any> => {
  const url = '/activities/rider/activities';
  const activities = await wfetch.get(url, idToken);
  return activities;
};

export const getActivitiesForDateRange = async (
  idToken: string,
  fromTimestamp: number,
  toTimestamp: number,
): Promise<any> => {
  const url = `/activities/rider/activities/range/${fromTimestamp}/${toTimestamp}`;
  const activities = await wfetch.get(url, idToken);
  return activities;
};

export const getActivitiesForMonth = async (
  idToken: string,
  month: string,
): Promise<any> => {
  const fromDate = dayjs(`${month}-01`, 'YYYY-MM-DD');
  const toDate = dayjs(fromDate).add(1, 'months');
  const fromTimestamp = fromDate.unix();
  const toTimestamp = toDate.unix();
  const activities = await getActivitiesForDateRange(
    idToken,
    fromTimestamp,
    toTimestamp,
  );
  return activities;
};

export const getRiderSummary = async (idToken: string): Promise<any> => {
  const url = '/activities/rider/summary';
  const summary = await wfetch.get(url, idToken);
  return summary;
};

export const getRiderMonthlySummary = async (
  idToken: string,
  year: string,
): Promise<any> => {
  const url = `/activities/rider/monthly/summary/${year}`;
  const summary = await wfetch.get(url, idToken);
  return summary;
};

export const getRiderYearlySummary = async (
  idToken: string,
  year: string,
): Promise<any> => {
  const url = `/activities/rider/yearly/summary/${year}`;
  const summary = await wfetch.get(url, idToken);
  return summary;
};

export const getDelayedRiderYearlySummary = async (
  idToken: string,
  year: string,
): Promise<any> => {
  const url = `/activities/delayed/rider/yearly/summary/${year}`;
  const summary = await wfetch.get(url, idToken);
  return summary;
};

export const sendReconcileRequestForDateRange = async (
  idToken: string,
  beforeTimestamp: number,
  afterTimestamp: number,
): Promise<any> => {
  const url = '/activities/rider/reconcile/range';
  const data = {
    before: beforeTimestamp,
    after: afterTimestamp,
  };
  const message = await wfetch.post(url, idToken, data);
  return message;
};

export const sendReconcileRequestForMonth = async (
  idToken: string,
  month: string,
): Promise<any> => {
  const afterDate = dayjs(`${month}-01`, 'YYYY-MM-DD');
  const beforeDate = dayjs(afterDate).add(1, 'month');
  const afterTimestamp = afterDate.unix();
  const beforeTimestamp = beforeDate.unix();
  const message = await sendReconcileRequestForDateRange(
    idToken,
    beforeTimestamp,
    afterTimestamp,
  );
  return message;
};

export const sendReconcileRequestFrom = async (
  idToken: string,
  afterDate: string,
): Promise<any> => {
  const beforeDate = dayjs();
  const afterTimestamp = dayjs(afterDate).unix();
  const beforeTimestamp = beforeDate.unix();
  const message = await sendReconcileRequestForDateRange(
    idToken,
    beforeTimestamp,
    afterTimestamp,
  );
  return message;
};
