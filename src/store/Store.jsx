import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice";

export const Store = configureStore({
  reducer: {
    userAuth: AuthReducer,
  },
});
