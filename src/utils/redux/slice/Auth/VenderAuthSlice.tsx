import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, venderSate } from "../../../types";
const vender = JSON.parse(localStorage.getItem('admin') || 'null');
const venderToken = JSON.parse(localStorage.getItem('venderToken') || 'null');
const venderId = JSON.parse(localStorage.getItem('venderId') || 'null');


const initialState: venderSate = {
    loading: false,
    vender: vender || null,
    venderToken: venderToken || null,
    venderId: venderId || null,
  };


  
const venderAuthSlice = createSlice({
    name: "vender",
    initialState,
    reducers: {
      loginSuccess: (state, action: PayloadAction<{ user: ApiResponse }>) => {
        console.log(action.payload,"fdhfhdjfdgf");
        
        state.vender = action.payload.user.user;
        state.venderToken = action.payload.user.token;
        state.venderId = action.payload.user.userId;
        localStorage.setItem('vender', JSON.stringify(action.payload.user.user));
        localStorage.setItem('venderToken', JSON.stringify(action.payload.user.token));
        localStorage.setItem('venderId', JSON.stringify(action.payload.user.userId));
      },
      logout: (state) => {
        state.vender = null;
        state.venderToken = null;
        state.venderId = null;
        localStorage.removeItem("vender");
        localStorage.removeItem("venderToken");
        localStorage.removeItem("venderId");
      },
    },
  });

  export const { logout, loginSuccess } = venderAuthSlice.actions;
export default venderAuthSlice.reducer;