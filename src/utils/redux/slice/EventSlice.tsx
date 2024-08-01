import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { eventDataTypes, eventState } from "../../types";



const initialState:eventState = {
    loading: false,
    data:[]|| null,

  };


  
const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        eventAdd: (state, action: PayloadAction<{ data:eventDataTypes[]  }>) => {
        action.payload.data.forEach(newEvent => {
          const exists = state.data?.some(event => event._id === newEvent._id);
          if (!exists) {
            state.data?.push(newEvent);
          }
        });
 
       
   
      },

    },
  });

  export const {  eventAdd } = eventSlice.actions;
export default eventSlice.reducer;