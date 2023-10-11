import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./feature/alertSlice";
import { authSlice } from "./feature/auth/AuthSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
  },
});
