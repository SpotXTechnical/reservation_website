import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn, setAccessToken } from "../../store/Auth/authSlice";

export const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("user");
      const tokenFromLocalStorage = localStorage.getItem("access_token");

      if (userFromLocalStorage) {
        dispatch(logIn(JSON.parse(userFromLocalStorage)));
      }
      if (tokenFromLocalStorage) {
        dispatch(setAccessToken(tokenFromLocalStorage));
      }
    }
  }, [dispatch]);
  return children;
};
