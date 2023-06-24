const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getRegions = async (withSub) => {
  try {
    if (typeof window !== "undefined" && localStorage.getItem("language")) {
      headers["Accept-Language"] = localStorage.getItem("language");
    }
    const res = await fetch(
      `${BASEURL}/api/v1/regions?per_page=20&subRegion_count=1&page=1&with_sub=${withSub}`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getMostPopularRegions = async () => {
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/most-popular/regions?per_page=100&page=1`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getRegionDetails = async (id, name) => {
  try {
    if (typeof window !== "undefined" && localStorage.getItem("language")) {
      headers["Accept-Language"] = localStorage.getItem("language");
    }
    const res = await fetch(`${BASEURL}/api/v1/regions/${id}?search=${name}`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
