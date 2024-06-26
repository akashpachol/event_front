import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, venderSate } from "../../../types";
// const vender = JSON.parse(localStorage.getItem('admin') || 'null');
// const venderToken = JSON.parse(localStorage.getItem('venderToken') || 'null');
// const venderId = JSON.parse(localStorage.getItem('venderId') || 'null');
// const refreshToken = JSON.parse(localStorage.getItem('venderRefreshToken') || 'null');


const initialState: venderSate = {
    loading: false,
    vender:   null,
    venderToken:  null,
    venderId:  null,
    venderRefreshToken: null,
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
        state.venderRefreshToken = action.payload.user.refreshToken;


      },
      logout: (state) => {
        state.vender = null;
        state.venderToken = null;
        state.venderId = null;
        state.venderRefreshToken = null;

      },
    },
  });

  export const { logout, loginSuccess } = venderAuthSlice.actions;
export default venderAuthSlice.reducer;