import { axiosInstance } from "./AxiosInstance";

export const getRegions = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/regions", {
      params: {
        per_page: 20,
        subRegion_count: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCities = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/cities");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMostPopularProperties = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/user/units", {
      params: {
        order_type: "desc",
        order_by: "default_price",
        per_page: 12,
        page: 1,
        most_popular: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRegionsWithSubRegionsList = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/regions", {
      params: {
        with_sub: 1,
        most_popular: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
