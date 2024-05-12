import { axiosInstance } from "./AxiosInstance";

export const resetPassword = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/user/reset-password`,
      userData
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
