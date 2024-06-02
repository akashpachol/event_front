import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slice/Auth/UserAuthSlice';
import AdminAuthSlice from '../slice/Auth/AdminAuthSlice';

export const store = configureStore({
    reducer: { 
        user: authSlice,
        admin:AdminAuthSlice
     },
  });
  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  export default store