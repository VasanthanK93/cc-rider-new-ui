let config: { baseUrl: string };

class FetchException extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

const ensureResponseOk = async (res: Response): Promise<Response> => {
  if (res.ok) {
    return res;
  }

  const bodyText = await res.text();
  throw new FetchException(res.status, bodyText);
};

const getHeaders = (token: string | null, data: any = null): HeadersInit => {
  const headers: HeadersInit = {};

  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const init = (initConfig: { baseUrl: string }): void => {
  config = initConfig;
};

const wccgFetch = async (
  url: string,
  token: string | null,
  method: string = 'GET',
  data: any = null,
): Promise<Response> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''; // Get baseUrl from environment variables
  const apiUrl = `${baseUrl}${url}`;
  let apiOptions: RequestInit;
  const headers = getHeaders(token, data);

  if (data) {
    const body = data && JSON.stringify(data);
    apiOptions = {
      method,
      headers,
      body,
    };
  } else {
    apiOptions = {
      method,
      headers,
    };
  }

  const res = await fetch(apiUrl, apiOptions);
  return ensureResponseOk(res);
};

const getResponseData = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    const responseData = await response.json();
    return responseData;
  }

  const responseData = await response.text();
  return responseData;
};

const get = async (
  url: string,
  token: string | null = null,
  data: any = null,
): Promise<any> => {
  const response = await wccgFetch(url, token, 'GET', data);
  return getResponseData(response);
};

const post = async (
  url: string,
  token: string | null = null,
  data: any = null,
): Promise<any> => {
  const response = await wccgFetch(url, token, 'POST', data);
  return getResponseData(response);
};

const put = async (
  url: string,
  token: string | null = null,
  data: any = null,
): Promise<any> => {
  const response = await wccgFetch(url, token, 'PUT', data);
  return getResponseData(response);
};
const del = async (
  url: string,
  token: string | null = null,
  data: any = null,
): Promise<any> => {
  const response = await wccgFetch(url, token, 'DELETE', data);
  return getResponseData(response);
};

const wfetch = {
  get,
  post,
  put,
  del,
  init,
};

export default wfetch;
