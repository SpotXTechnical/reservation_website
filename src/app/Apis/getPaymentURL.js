import { axiosInstance } from "./AxiosInstance";

export const getPaymentURL = async (reservationId, return_url) => {
  console.log(reservationId);
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/payments/${reservationId}/link?return_url=${return_url}`
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
