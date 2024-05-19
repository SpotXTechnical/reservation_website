import { axiosInstance } from "./AxiosInstance";

export const getRefundPolicy = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/settings/policy`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
