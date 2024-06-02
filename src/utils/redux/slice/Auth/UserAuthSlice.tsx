import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, initialSate } from "../../../types";

const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = JSON.parse(localStorage.getItem('token') || 'null');
const userId = JSON.parse(localStorage.getItem('userId') || 'null');

const initialState: initialSate = {
  loading: false,
  user: user || null,
  token: token || null,
  userId: userId || null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
      state.user = action.payload.user.user;
      state.token = action.payload.user.token;
      state.userId = action.payload.user.userId;
      localStorage.setItem('user', JSON.stringify(action.payload.user.user));
      localStorage.setItem('token', JSON.stringify(action.payload.user.token));
      localStorage.setItem('userId', JSON.stringify(action.payload.user.userId));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
