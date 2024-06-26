import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, managerSate } from "../../../types";
const manager = JSON.parse(localStorage.getItem('admin') || 'null');
const managerToken = JSON.parse(localStorage.getItem('managerToken') || 'null');
const managerId = JSON.parse(localStorage.getItem('managerId') || 'null');
const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || 'null');


const initialState: managerSate = {
    loading: false,
    manager: manager || null,
    managerToken: managerToken || null,
    managerId: managerId || null,
    refreshToken:refreshToken || null,

  };


  
const managerAuthSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
      loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
        
        state.manager = action.payload.user.user;
        state.managerToken = action.payload.user.token;
        state.managerId = action.payload.user.userId;
        state.refreshToken = action.payload.user.refreshToken;



      },
      logout: (state) => {
        state.manager = null;
        state.managerToken = null;
        state.managerId = null;
 
      },
    },
  });

  export const { logout, loginSuccess } = managerAuthSlice.actions;
export default managerAuthSlice.reducer;