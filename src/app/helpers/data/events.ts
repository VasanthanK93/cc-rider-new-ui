import wfetch from './wccg-fetch';

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
  eventId: string
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

export async function getEventbyId(eventId: String): Promise<any> {
  console.log('Fetching event by ID:', eventId);
  const url = `/events-content/events/${eventId}`;
  const event = await wfetch.get(url);
  return event;
}
