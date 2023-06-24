import { appendArrayToUrl, appendParamToUrl } from "../utils";

const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getUnitsPerRegion = async (regionId) => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/user/units?region_id=${regionId}`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getFilterConfig = async (regionId) => {
  try {
    headers["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("access_token")
    )}`;
    if (typeof window !== "undefined" && localStorage.getItem("language")) {
      headers["Accept-Language"] = localStorage.getItem("language");
    }
    const res = await fetch(`${BASEURL}/api/v1/units-filter-config`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getUnitsPerRegions = async (regions) => {
  let url = `${BASEURL}/api/v1/user/units`;
  if (regions.length) url = appendArrayToUrl(url, regions, "regions");

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addToFavourite = async (unitId) => {
  let url = `${BASEURL}/api/v1/user/favourites/${unitId}`;
  headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("access_token")
  )}`;
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const removeFromFavourite = async (unitId) => {
  let url = `${BASEURL}/api/v1/user/favourites/${unitId}`;
  headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("access_token")
  )}`;
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getFavouriteList = async () => {
  let url = `${BASEURL}/api/v1/user/favourites`;
  headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("access_token")
  )}`;
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllUnits = async (filters) => {
  let url = `${BASEURL}/api/v1/user/units`;
  headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem("access_token")
  )}`;
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  if (filters && Object.keys(filters).length > 0) {
    for (const [key, elem] of Object.entries(filters)) {
      if (elem.length > 0 && Array.isArray(elem)) {
        url = appendArrayToUrl(url, elem, key);
      }
      if (key == "minPrice") url = appendParamToUrl(url, "price[from]", elem);
      if (key == "maxPrice") url = appendParamToUrl(url, "price[to]", elem);
      if (key == "order_by" && elem)
        url = appendParamToUrl(url, "order_by", elem);
      if (key == "order_type" && elem) {
        console.log("hhh off", url, "order_type", elem);
        url = appendParamToUrl(url, "order_type", elem);
      }
    }
  }

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
