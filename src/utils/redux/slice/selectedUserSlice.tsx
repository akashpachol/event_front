import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {   selectUser, userDataTypes } from "../../types";


const initialState:selectUser = {
    loading: false,
    user:null,
  
};

const selectedUserSlice = createSlice({
    name: "selecteduser",
    initialState,
    reducers: {
     
 


        addUser: (state, action: PayloadAction<{ data:userDataTypes|null }>) => {
            console.log(action.payload,'ghjfhgjh');
            
            state.user=action.payload.data
        },
    },
});

export const { addUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;

