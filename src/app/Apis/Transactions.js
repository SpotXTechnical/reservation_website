import { axiosInstance } from "./AxiosInstance";
export const getUserBalance = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/wallet/balance`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserTransactions = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/wallet/transactions`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTransaction = async (transactionId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/wallet/transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
