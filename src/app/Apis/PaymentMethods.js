import { axiosInstance } from "./AxiosInstance";

export const getPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/user/payment-methods");
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
