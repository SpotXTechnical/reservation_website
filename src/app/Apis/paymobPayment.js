import axios from "axios";
import { axiosInstance } from "./AxiosInstance";
import moment from "moment";
export async function getToken(reservationData, user) {
  const response = await axiosInstance.post(
    "/auth/tokens",
    {
      api_key: process.env.NEXT_PUBLIC_PAYMOB_API_KEY,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_PAYMOB_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // Getting token
  const token = response.data?.token;
  // Getting Order ID
  // const orderId = await orderRegistration(token, reservationData);

  // const paymentToken = await paymentKey(token, orderId, user, reservationData);
  // const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_IFRAME_ID}?payment_token=${paymentToken}`;

  // return token;

  /** New Solution */
  const paymentLink = await createPaymentLink(token, reservationData, user);
  return paymentLink;
}

async function createPaymentLink(token, reservationData, user) {
  const data = new FormData();
  const expireAt = calculateExpirationTime(10);
  //
  data.append("amount_cents", Math.ceil(reservationData.amount_to_pay) * 100);
  data.append("expires_at", expireAt);
  data.append("payment_methods", [
    process.env.NEXT_PUBLIC_PAYMOB_INTEGRATION_ID,
  ]);
  data.append("is_live", process.env.NEXT_PUBLIC_IS_LIVE);
  data.append("full_name", user.name);
  data.append("email", user.email);
  data.append("phone_number", user.phone);
  data.append(
    "description",
    `Unit: ${reservationData.unit?.title}, days: ${
      reservationData.days
    }, from: ${moment(reservationData.from).format("DD-MM-yyyy")}, to: ${moment(
      reservationData.to
    ).format("DD-MM-yyyy")}, total_price: ${Math.ceil(
      reservationData.total_price
    )} EGP, cash_to_owner: ${
      reservationData.cash_to_owner
    } EGP, amount_to_pay: ${reservationData.amount_to_pay} EGP`
  );
  data.append("merchant_staff_tag", reservationData.id);

  const response = await axios.post(
    `https://accept.paymob.com/api/ecommerce/payment-links`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data.client_url;
}

function calculateExpirationTime(minutes) {
  const currentTime = new Date();
  return new Date(
    currentTime.getTime() + 3 * 60 * 60000 + minutes * 60000
  ).toISOString();
}
// async function orderRegistration(token, reservationData) {
//   const data = {
//     auth_token: token,
//     delivery_needed: "false",
//     amount_cents: `${Math.ceil(reservationData.amount_to_pay) * 100}`,
//     currency: "EGP",
//     items: [
//       {
//         name: reservationData.id,
//         amount_cents: `${Math.ceil(reservationData.amount_to_pay) * 100}`,
//         description: `Unit: ${reservationData.unit?.title}, days: ${
//           reservationData.days
//         }, from: ${moment(reservationData.from).format(
//           "DD-MM-yyyy"
//         )}, to: ${moment(reservationData.to).format(
//           "DD-MM-yyyy"
//         )}, total_price: ${Math.ceil(
//           reservationData.total_price
//         )} EGP, cash_to_owner: ${
//           reservationData.cash_to_owner
//         } EGP, amount_to_pay: ${reservationData.amount_to_pay} EGP`,
//         quantity: "1",
//       },
//     ],
//   };
//   const response = await axios.post(
//     "https://accept.paymob.com/api/ecommerce/orders",
//     data,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data.id;
// }

// // Getting payment Key
// async function paymentKey(token, orderId, userData, reservationData) {
//   const data = {
//     auth_token: token,
//     amount_cents: `${Math.ceil(reservationData.amount_to_pay) * 100}`,
//     expiration: 600,
//     order_id: orderId,
//     billing_data: {
//       apartment: "NA",
//       email: `${userData.email}`,
//       floor: "NA",
//       first_name: `${userData.name}`,
//       street: "NA",
//       building: "NA",
//       phone_number: `${userData.phone}`,
//       shipping_method: "NA",
//       postal_code: "NA",
//       city: "NA",
//       country: "NA",
//       last_name: `${userData.name}`,
//       state: "NA",
//     },
//     currency: "EGP",
//     integration_id: process.env.NEXT_PUBLIC_INTEGRATION_ID,
//     lock_order_when_paid: "false",
//   };
//   const response = await axios.post(
//     "https://accept.paymob.com/api/acceptance/payment_keys",
//     data,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data.token;
// }
