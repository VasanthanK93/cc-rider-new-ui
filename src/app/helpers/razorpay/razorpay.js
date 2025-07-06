import axios from 'axios';
import { createRzpInvoice } from './razorpayorders';
import nProgress from 'nprogress';

function getAxios() {
  const instance = axios.create({
    baseURL: process.env.eventsApiBaseUrl,
  });

  return instance;
}

async function createInvoice(response) {
  console.log('Response razorpay response as ...', response);
  const rzpResp = {
    orderId: response.razorpay_order_id,
    paymentId: response.razorpay_payment_id,
    signature: response.razorpay_signature,
  };
  await createRzpInvoice(rzpResp);
}

export default function OpenCheckout(orderCreated, postCheckoutCallback) {
  console.log('OrderCreated received params...', orderCreated);
  const razorpayKey = process.env.razorpayKey;
  let options = {
    key: razorpayKey, // Enter the Key ID generated from the Dashboard
    amount: orderCreated.totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
    currency: 'INR',
    name: 'WCCG - Chennai Cyclists',
    protocol: 'https',
    hostname: 'api.razorpay.com',
    description: 'Payment for ' + orderCreated.eventName,
    image:
      'https://res.cloudinary.com/wccg/image/upload/v1574591622/Logos/wccg-logo-2.jpg',
    order_id: orderCreated.orderId, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
    //callback_url: "http://localhost:8080/api/orders/razorpay", //TODO-Redirect and do proper validations
    //redirect: true,
    handler: async function (response) {
      //Method to handle payment status.. (Failed to be properly handled, currently its only retries on screen!)
      nProgress.start();
      await createInvoice(response);
      nProgress.done();
      postCheckoutCallback();
      // Navigate to Orders Page!!
    },
    prefill: {
      riderId: orderCreated.riderId,
      name: orderCreated.fullName,
      email: orderCreated.emailId,
      contact: orderCreated.contactNumber,
    },
    notes: {
      selectedOption: orderCreated.selectedOption,
    },
    theme: {
      color: '#528FF0',
    },
  };

  let rzp = new Razorpay(options);
  rzp.open();
}
