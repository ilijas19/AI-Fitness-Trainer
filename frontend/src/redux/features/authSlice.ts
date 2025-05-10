import { createSlice } from "@reduxjs/toolkit";
import type { CurrentUser } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  currentUser: null | CurrentUser;
};

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export default authSlice.reducer;
export const { setCurrentUser, logout } = authSlice.actions;
