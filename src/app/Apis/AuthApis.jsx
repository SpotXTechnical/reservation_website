const BASEURL = "https://api-stage.spotx.app";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Language": "en",
};

if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
  headers.Authorization = JSON.parse(localStorage.getItem("access_token"));
}

export const signUp = async (data) => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    let res = await fetch(`${BASEURL}/api/v1/user/register`, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export const signIn = async (data) => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    let res = await fetch(`${BASEURL}/api/v1/user/login`, {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export const logOut = async (data) => {
  if (typeof window !== "undefined" && localStorage.getItem("language")) {
    headers["Accept-Language"] = localStorage.getItem("language");
  }
  try {
    let res = await fetch(`${BASEURL}/api/v1/user/login`, {
      headers,
      method: "POST",
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};
