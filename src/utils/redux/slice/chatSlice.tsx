import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chat, chatSliceType,  } from "../../types";

const initialState: chatSliceType = {
  loading: false,
  data: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatAdd: (state, action: PayloadAction<{ data: chat }>) => {
      state.data = action.payload.data;
    },
  },
});

export const { chatAdd } = chatSlice.actions;
export default chatSlice.reducer;
