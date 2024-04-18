import { axiosInstance } from "./AxiosInstance";

export const verifyTransacion = async (transactionRef) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/payments/verify", {
      tran_ref: transactionRef,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
