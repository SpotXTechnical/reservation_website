const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getReservations = async (status) => {
  try {
    headers["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("access_token")
    )}`;
    if (typeof window !== "undefined" && localStorage.getItem("language")) {
      headers["Accept-Language"] = localStorage.getItem("language");
    }
    const res = await fetch(`${BASEURL}/api/v1/user/reservations?${status}=1`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
