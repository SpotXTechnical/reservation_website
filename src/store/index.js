import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import Auth from "./Auth/authSlice";

export const langSlice = createSlice({
  name: "lang",
  initialState: {
    lang: "en",
  },
  reducers: {
    langEn: (state) => {
      state.lang = "en";
    },
    langAr: (state) => {
      state.lang = "ar";
    },
  },
});

// config the store
const store = configureStore({
  reducer: {
    language: langSlice.reducer,
    auth: Auth,
  },
});

// export default the store
export default store;

// export the action
export const langAction = langSlice.actions;
