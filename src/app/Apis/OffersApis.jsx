import { axiosInstance } from "./AxiosInstance";

export const getOffers = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/offers`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
