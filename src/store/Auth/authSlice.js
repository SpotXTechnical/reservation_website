import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    access_token: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut, setAccessToken } = authSlice.actions;
