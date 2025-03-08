import wfetch from './wccg-fetch';

export const getOrders = async (idToken: string): Promise<any> => {
  const url = '/events/orders/list';
  const orders = await wfetch.get(url, idToken);
  return orders;
};

export const getRegistrations = async (idToken: string): Promise<any> => {
  const orders = await getOrders(idToken);
  const registrations = orders.filter(
    (o: any) => o.paymentStatus === 'Success',
  );
  return registrations;
};

export const getActivityApprovals = async (
  idToken: string,
  eventId: string,
): Promise<any> => {
  const url = `/events-tracking/activity-approvals/events/${eventId}`;
  const approvals = await wfetch.get(url, idToken);
  return approvals;
};

export const getScorecard = async (
  idToken: string,
  eventId: string,
  selectedOption: any,
): Promise<any> => {
  const url = `/events-tracking/scorecards/${eventId}`;
  const scorecard = await wfetch.get(url, idToken);
  return scorecard;
};

export const getEventRegistrationContent = async (
  eventId: string,
): Promise<any> => {
  const url = `/events-content/events/${eventId}/registration`;
  const eventRegistration = await wfetch.get(url);
  return eventRegistration;
};

export const getEvents = async (): Promise<any> => {
  const url = `/events-content/events`;
  const eventlist = await wfetch.get(url);
  return eventlist;
};
