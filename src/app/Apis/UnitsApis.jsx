import { axiosInstance } from "./AxiosInstance";

export const getUnitsPerRegion = async (regionId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units?region_id=${regionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilterConfig = async (regionId) => {
  try {
    const response = await axiosInstance.get("/api/v1/units-filter-config");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUnitsPerSubRegion = async (regionId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/units?regions[0]=${regionId}&order_type=desc&order_by=default_price&page=1&most_popular=0`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUnitsPerRegions = async (regions) => {
  let url = `/api/v1/user/units`;
  if (regions.length) url = appendArrayToUrl(url, regions, "regions");

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addToFavourite = async (unitId) => {
  let url = `/api/v1/user/favourites/${unitId}`;
  try {
    const response = await axiosInstance.post(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFromFavourite = async (unitId) => {
  let url = `/api/v1/user/favourites/${unitId}`;
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavouriteList = async () => {
  let url = `/api/v1/user/favourites`;
  if(typeof window !== "undefined" &&
  localStorage.getItem("access_token") ) {
    try {
      const response =  await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export const getAllUnits = async (filters) => {
  let url = `/api/v1/user/units`;
  if (filters && Object.keys(filters).length > 0) {
    for (const [key, elem] of Object.entries(filters)) {
      if (elem.length > 0 && Array.isArray(elem)) {
        url = appendArrayToUrl(url, elem, key);
      }
      if (key === "minPrice") url = appendParamToUrl(url, "price[from]", elem);
      if (key === "maxPrice") url = appendParamToUrl(url, "price[to]", elem);
      if (key === "order_by" && elem)
        url = appendParamToUrl(url, "order_by", elem);
      if (key === "order_type" && elem)
        url = appendParamToUrl(url, "order_type", elem);
    }
  }

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
