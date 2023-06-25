import { axiosInstance } from "./AxiosInstance";

export const getPropertyDetails = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units/${id}&with_sub=1`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const reserveUnit = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/user/reservations",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
