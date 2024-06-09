import { handleQueryparams } from "../utils";
import { axiosInstance } from "./AxiosInstance";

export const getUnits = async (qparams, signal) => {
  try {
    const {
      sortFilters,
      regions,
      page,
      beds,
      rooms,
      prices,
      availability,
      keyWord,
      features,
      hasOffer,
      guests,
      type,
    } = qparams;

    const sortQueryParams = new URLSearchParams([
      ...sortFilters,
      ...regions,
      ...page,
      ...beds,
      ...rooms,
      ...prices,
      ...availability,
      ...keyWord,
      ...features,
      ...hasOffer,
      ...guests,
      ...type,
    ]);

    const response = await axiosInstance.get(
      `/api/v1/user/units?${sortQueryParams.toString()}`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    return new Error(error.message);
  }
};

export const getFeatures = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/features`);
    return response.data;
  } catch (error) {
    return new Error(error.message);
  }
};
