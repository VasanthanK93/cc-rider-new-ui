import wfetch from './wccg-fetch';
import { getWccgAxios } from '../data/wccgAxios';
import { AxiosInstance } from 'axios';

async function getAxios(): Promise<AxiosInstance> {
  return getWccgAxios(process.env.NEXT_EVENTS_API_BASE_URL);
}

export type Discount = {
  code: string;
  amount: number;
};

export type Registration = {
  eventId: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  minorAllowed: boolean;
  showShareContact: boolean;
  maxMembersAllowed: number; //TODO: Logic to be written during event registration
  donation: Donation;
  registrationOptions: RegistrationOption[];
  customFields: CustomField[];
  address: Address;
};

export type Donation = {
  id: string;
  name: string;
  description: string;
  denominations: string[];
  reason: string;
  amount: number;
  data: string[];
};

export type Address = {
  address: string;
  contactNumber: number | undefined;
  city: string;
  state: string;
  pincode: number | undefined;
};

export type RegistrationOption = {
  id: string;
  title: string;
  description: string;
  paymentPaise: number;
  maxCount: number;
  active: boolean;
  notes: string;
  instructions: string;
  customFields: CustomField[];
};

export type CustomField = {
  id: string;
  label: string;
  required: boolean;
  type: string;
  options: CustomSelectOption[];
};

export type CustomSelectOption = {
  id: string;
  label: string;
};

export type CustomValue = {
  id: string;
  label: string;
  value: string;
};

export type OrderCreate = {
  totalAmount: number;
  events: OrderEvent[];
  notes: string;
  donations: OrderDonation[];
};

export type OrderEvent = {
  id: string;
  register: OrderEventRegistration;
  address: Address;
};

export type OrderEventRegistration = {
  option: string;
  quanity: number;
  amount: number;
  hasDiscount: boolean;
  discount: Discount;
  netAmount: number;
  shareContact: boolean;
  customData: CustomValue[];
};

export type OrderDonation = {
  id: string;
  reason: string;
  amount: number;
};

export type OrderResponse = {
  orderId: string;
  paymentId: string;
  invoiceSeq: string;
  paymentStatus: string;
  riderId: string;
  eventId: string;
  eventName: string;
  selectedOption: string;
  totalAmount: number;
};

export type OrderCreated = {
  orderId: string;
  paymentId?: string;
  paymentStatus?: string;
  riderId?: string;
  emailId?: string;
  fullName?: string;
  contactNumber?: number;
  totalAmount: number;
  eventName?: string;
};

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

export const createOrder = async (
  idToken: string,
  orderCreate: OrderCreate,
): Promise<OrderCreated> => {
  let http = await getAxios();
  let ordersApiUrl = process.env.WCCG_EVENTS_API_BASE_URL as string;
  const response = await http.post<OrderCreated>(ordersApiUrl, orderCreate);
  let order = response.data;
  return order;
};
