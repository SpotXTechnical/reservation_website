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
