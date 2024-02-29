import { axiosInstance } from "./AxiosInstance";

export const getRegions = async (withSub) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/regions?per_page=20&subRegion_count=1&page=1&with_sub=${withSub}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMostPopularRegions = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/most-popular/regions?per_page=100&page=1"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRegionDetails = async (id, name, page) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/regions/${id}?page=${page}&search=${name}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
