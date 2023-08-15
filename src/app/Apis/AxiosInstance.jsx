import axios from "axios";
import Router from "next/router";

export const axiosInstance = axios.create({
  baseURL: "https://api.spotx.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined" && localStorage.getItem("language")) {
      config.headers["Accept-Language"] = localStorage.getItem("language");
    }
    config.headers["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("access_token")
    )}`;
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.href.includes("properties")) {
        const parts = window.location.href.split("/");
        const propertyNumber = parts[parts.length - 1];
        Router.push(`/signin?from_unit=${propertyNumber}`);
      } else {
        Router.push("/signin");
      }
    }

    console.error(error);
    return Promise.reject(error);
  }
);
