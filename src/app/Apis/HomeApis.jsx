const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Language": "en",
};

if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
  headers.Authorization = JSON.parse(localStorage.getItem("access_token"));
}

export const getRegions = async () => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/regions?per_page=20&subRegion_count=1`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getCities = async () => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(`${BASEURL}/api/v1/cities`, { headers });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getMostPopularProperties = async () => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/user/units?order_type=desc&order_by=default_price&per_page=12&page=1&most_popular=1`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getRegionsWithSubRegionsList = async () => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/regions?with_sub=1&most_popular=1`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
