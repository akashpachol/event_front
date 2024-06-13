import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, managerSate } from "../../../types";
const manager = JSON.parse(localStorage.getItem('admin') || 'null');
const managerToken = JSON.parse(localStorage.getItem('managerToken') || 'null');
const managerId = JSON.parse(localStorage.getItem('managerId') || 'null');


const initialState: managerSate = {
    loading: false,
    manager: manager || null,
    managerToken: managerToken || null,
    managerId: managerId || null,
  };


  
const managerAuthSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
      loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
        console.log(action.payload,"fdhfhdjfdgf");
        
        state.manager = action.payload.user.user;
        state.managerToken = action.payload.user.token;
        state.managerId = action.payload.user.userId;
        localStorage.setItem('manager', JSON.stringify(action.payload.user.user));
        localStorage.setItem('managerToken', JSON.stringify(action.payload.user.token));
        localStorage.setItem('managerId', JSON.stringify(action.payload.user.userId));
      },
      logout: (state) => {
        state.manager = null;
        state.managerToken = null;
        state.managerId = null;
        localStorage.removeItem("manager");
        localStorage.removeItem("managerToken");
        localStorage.removeItem("managerId");
      },
    },
  });

  export const { logout, loginSuccess } = managerAuthSlice.actions;
export default managerAuthSlice.reducer;