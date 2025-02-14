import { configureStore } from "@reduxjs/toolkit";
import farmReducer from "./farmSlice";

export const store = configureStore({
  reducer: {
    farm: farmReducer,
  },
});
