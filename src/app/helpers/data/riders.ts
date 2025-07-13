import wfetch from './wccg-fetch';
import { getWccgAxios } from './wccgAxios';
import { AxiosInstance } from 'axios';

// Define Rider type (replace fields with actual Rider properties as needed)
export interface Rider {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  bloodGroup: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  alternateEmergencyContactName: string;
  alternateEmergencyContactNumber: string;
  sex: string;
  areaYouLive: string;
}

async function getAxios(): Promise<AxiosInstance> {
  return getWccgAxios(process.env.ridersApiBaseUrl);
}


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

export const createRider = async (rider: any): Promise<any> => {
  const axios = await getAxios();
  let signupApiUrl = process.env.NEXT_RIDER_SIGNUP_API_URL as string;
  const response = await axios.post<Rider>(signupApiUrl, rider);
  const createdRider = response.data;
  return createdRider;
}
