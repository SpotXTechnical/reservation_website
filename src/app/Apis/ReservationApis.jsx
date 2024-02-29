import { axiosInstance } from "./AxiosInstance";

export const getReservations = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/reservations`);
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
    throw new Error(error.message);
  }
};

export const cancelReservation = async (id) => {
  try {
    const response = await axiosInstance.put(
      `api/v1/user/reservations/${id}/cancel`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectOffer = async (id) => {
  try {
    const response = await axiosInstance.put(
      `api/v1/user/reservations/offers/${id}/reject`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const acceptOffer = async (id) => {
  try {
    const response = await axiosInstance.put(
      `api/v1/user/reservations/offers/${id}/accept`
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
