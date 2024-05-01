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

export const getSummary = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/user/reservations/summary",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
