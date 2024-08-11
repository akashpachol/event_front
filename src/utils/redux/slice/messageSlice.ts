import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  message  } from "../../types";

type MessageSliceState = {
    loading: boolean;
    messageData:   message[];
  };
  
  const initialState: MessageSliceState = {
    loading: false,
    messageData: [],
  };
  

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    allMessageAdd: (state, action: PayloadAction<{ data: message[] }>) => {
      state.messageData = action.payload.data;
    },

    messageAdd: (state, action: PayloadAction<{ data: message }>) => {
        state.messageData = [... state.messageData,action.payload.data];
      },
  },
});

export const { messageAdd,allMessageAdd } = messageSlice.actions;
export default messageSlice.reducer;
