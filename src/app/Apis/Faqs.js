import { handleQueryparams } from "../utils";
import { axiosInstance } from "./AxiosInstance";

export const getFaqs = async (filters) => {
  const queryParams = handleQueryparams(filters);
  try {
    const response = await axiosInstance.get(`/api/v1/faqs?${queryParams}`);
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
