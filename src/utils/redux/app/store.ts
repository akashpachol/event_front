import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slice/Auth/UserAuthSlice';
import AdminAuthSlice from '../slice/Auth/AdminAuthSlice';
import VenderAuthSlice from '../slice/Auth/VenderAuthSlice';
import managerAuthSlice from '../slice/Auth/managerAuthSlice';

export const store = configureStore({
    reducer: { 
        user: authSlice,
        admin:AdminAuthSlice,
        vender:VenderAuthSlice,
        manager:managerAuthSlice
     },
  });
  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  export default store