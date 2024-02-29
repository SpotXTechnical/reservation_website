import { axiosInstance } from "./AxiosInstance";
export const getUserTransactions = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/users/${id}/wallet`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
