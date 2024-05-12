import { handleQueryparams } from "../utils";
import { axiosInstance } from "./AxiosInstance";

export const getPaymentURL = async (reservationId, qParams) => {
  const params = handleQueryparams(qParams);
  try {
    const response = await axiosInstance.get(
      `/api/v1/user/payments/${reservationId}/link?${params}`
    );
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
};
