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

export const getPropertyReservationDetails = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units/${id}/reservations`
    );
    return response.data?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPropertyAgeRanges = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units/${id}/age-ranges`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPropertySupportedMeals = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units/${id}/supported-meals`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getHotelRoomReservationDetails = async (id, queryString) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units/${id}/reservations?${queryString}`
    );
    return response.data?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
