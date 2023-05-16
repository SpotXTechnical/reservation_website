const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getPropertyDetails = async (id) => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/user/units/${id}&with_sub=1`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};