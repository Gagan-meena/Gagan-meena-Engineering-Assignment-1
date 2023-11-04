import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./reducer/bankSlice.js";

const store = configureStore({
  reducer: {
    bank: bankReducer,
  },
});

export default store;
