import { handleQueryParams } from "..";
import { axiosInstance } from "../../Apis/AxiosInstance";
import * as constants from "./constants";
export const getUiBuilders = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/ui-builders`);
    const uiBuildersData = response.data?.data;
    const uiBuildersArray = uiBuildersData.map(async (builder) => {
      return await handleUiBuilersArray(builder);
    });
    return uiBuildersArray;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUnitsWithFilters = async (paramsObj, page = 1) => {
  try {
    const params = handleQueryParams({ ...paramsObj, page });
    const response = await axiosInstance.get(`/api/v1/user/units?${params}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getsubRegionWithFilters = async (paramsObj) => {
  try {
    const { main_region } = paramsObj;
    const params = handleQueryParams({
      [constants.WITH_SUB]: main_region,
    });
    const response = await axiosInstance.get(
      `/api/v1/regions/${main_region}?${params}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUiBuilder = async (builderId, page = 1) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/ui-builders/${builderId}`
    );
    const uiBuilderConfig = response.data?.data;
    const uiBuilderData = await handleUiBuilersArray(uiBuilderConfig, page);
    return uiBuilderData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleUiBuilersArray = async (builder, page = 1) => {
  if (builder[constants.CONTENT] === constants.SUB_REGION) {
    try {
      const response = await getsubRegionWithFilters(
        builder[constants.FILTERS]
      );
      return {
        id: builder.id,
        title: builder[constants.TITLE],
        type: builder[constants.CONTENT],
        sectionData: response.data?.[constants.SUBREGIONS],
      };
    } catch (error) {
      throw new Error(error);
    }
  } else if (builder[constants.CONTENT] === constants.UNITS) {
    try {
      const response = await getUnitsWithFilters(
        builder[constants.FILTERS],
        page
      );
      return {
        id: builder.id,
        title: builder[constants.TITLE],
        type: builder[constants.CONTENT],
        sectionData: response.data,
        meta: response?.meta,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
};
