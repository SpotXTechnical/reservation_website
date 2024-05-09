import { axiosInstance } from "./AxiosInstance";

export const confirmReservation = async (reservationId) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/user/reservations/${reservationId}/confirm`
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
