const BASEURL = "https://api-stage.spotx.app";
const Headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const getRegions = async () => {
  try {
    const res = await fetch(`${BASEURL}/api/v1/regions`, { Headers });
    const data = await res.json();
    console.log("datadatadata", data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
