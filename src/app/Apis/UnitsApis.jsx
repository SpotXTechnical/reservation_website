const BASEURL = "https://api.spotx.app";
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

export const getUnitsPerSubRegion = async (regionId) => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/user/units?regions[0]=${regionId}&order_type=desc&order_by=default_price&page=1&most_popular=0`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};