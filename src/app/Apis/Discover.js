import { handleQueryparams } from "../utils";
import { axiosInstance } from "./AxiosInstance";

export const getUnits = async (qparams, signal) => {
  try {
    const { sortFilters, regions, page, beds, rooms } = qparams;

    const sortQueryParams = new URLSearchParams([
      ...sortFilters,
      ...regions,
      ...page,
      ...beds,
      ...rooms,
    ]);

    const response = await axiosInstance.get(
      `/api/v1/user/units?${sortQueryParams.toString()}`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {}
};
