import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import financeReducer from "../features/finances/financeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer,
  },
});
