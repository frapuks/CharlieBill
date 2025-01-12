import { configureStore } from "@reduxjs/toolkit";
// Slices
import firstSlice from "./Slices/firstSlice";
import secondSlice from "./Slices/secondSlice";

export const store = configureStore({
  reducer: {
    first: firstSlice,
    second: secondSlice,
  },
});