import { AxiosInstance } from 'axios';
import { getWccgAxios } from '../data/wccgAxios';

async function getAxios(): Promise<AxiosInstance> {
  return getWccgAxios(process.env.eventsApiBaseUrl);
}

export type RazorpayResponse = {
  paymentId: string;
  orderId: string;
  signature: string;
};

export type Invoice = {
  invoiceId: string;
};

export async function createRzpInvoice(
  rzpResp: RazorpayResponse,
): Promise<Invoice> {
  let http = await getAxios();
  let ordersApiUrl = (process.env.ordersApiUrl + '/razorpay') as string;
  const response = await http.post<any>(ordersApiUrl, rzpResp);
  let event = response.data;
  return event;
}
