const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getPropertyDetails = async (id) => {
  try {
    const res = await fetch(
      `${BASEURL}/api/v1/user/units/${id}`,
      { headers }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};