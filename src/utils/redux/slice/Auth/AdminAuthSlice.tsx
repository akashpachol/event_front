import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, initialSate } from "../../../types";
const admin = JSON.parse(localStorage.getItem('admin') || 'null');
const adminToken = JSON.parse(localStorage.getItem('adminToken') || 'null');
const adminId = JSON.parse(localStorage.getItem('adminId') || 'null');


const initialState: initialSate = {
    loading: false,
    user: admin || null,
    adminToken: adminToken || null,
    userId: adminId || null,
  };


  
const adminAuthSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
        console.log(action.payload,"fdhfhdjfdgf");
        
        state.admin = action.payload.user.admin;
        state.adminToken = action.payload.user.token;
        state.adminId = action.payload.user.adminId;
        localStorage.setItem('admin', JSON.stringify(action.payload.user.admin));
        localStorage.setItem('adminToken', JSON.stringify(action.payload.user.token));
        localStorage.setItem('adminId', JSON.stringify(action.payload.user.adminId));
      },
      logout: (state) => {
        state.admin = null;
        state.adminToken = null;
        state.adminId = null;
        localStorage.removeItem("admin");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
      },
    },
  });

  export const { logout, loginSuccess } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;