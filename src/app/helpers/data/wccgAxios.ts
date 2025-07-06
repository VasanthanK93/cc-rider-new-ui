import axios, { AxiosInstance } from 'axios';
import { getAccessTokenFromCookie } from '../../store';

export async function getWccgAxios(
  baseUrl: string = '',
  withToken = true,
): Promise<AxiosInstance> {
  if (!baseUrl || baseUrl == '') {
    throw 'Application error. API url(s) not configured.';
  }

  const instance = axios.create({
    baseURL: baseUrl,
  });

  const accessToken = getAccessTokenFromCookie();
  if (withToken && accessToken) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (
        error.response &&
        error.response.status &&
        error.response.status == 401
      ) {
        //storeLogout(); //TODO
      }

      return Promise.reject(error);
    },
  );

  return instance;
}
