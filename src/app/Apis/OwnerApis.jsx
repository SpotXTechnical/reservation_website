import { axiosInstance } from "./AxiosInstance";

export const getOwnerDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/owners/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
