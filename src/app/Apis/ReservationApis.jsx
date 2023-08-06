import { axiosInstance } from "./AxiosInstance";

export const getReservations = async (status) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/reservations?${status}=1`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReservationDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cancelReservation = async (id) => {
  try {
    const response = await axiosInstance.put(`/user/reservations/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
