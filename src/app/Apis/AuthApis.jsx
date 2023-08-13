import { axiosInstance } from "./AxiosInstance";

export const signUp = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/register", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signIn = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editProfile = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/profile", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await axiosInstance.post("/api/v1/user/login");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/user/profile");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
