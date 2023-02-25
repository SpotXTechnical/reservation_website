const BASEURL = "https://api-stage.spotx.app";
const Headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getRegions = async () => {
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/regions?per_page=20&subRegion_count=1`,
      { Headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getMostPopularProperties = async () => {
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/user/units?order_type=desc&order_by=default_price&per_page=12&page=1&most_popular=1`,
      { Headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getRegionsWithSubRegionsList = async () => {
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/regions?with_sub=1&most_popular=1`,
      { Headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
