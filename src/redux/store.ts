import { configureStore } from "@reduxjs/toolkit";
import { users } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    users: users,
  },
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
