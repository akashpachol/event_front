import authSlice from '../slice/Auth/UserAuthSlice';
import AdminAuthSlice from '../slice/Auth/AdminAuthSlice';
import VenderAuthSlice from '../slice/Auth/VenderAuthSlice';
import managerAuthSlice from '../slice/Auth/managerAuthSlice';
import eventSlice from '../slice/EventSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import bookingSlice from '../slice/bookingSlice';
import chatSlice from '../slice/chatSlice';

const rootReducer = combineReducers({
    user: authSlice,
    admin: AdminAuthSlice,
    vender: VenderAuthSlice,
    manager: managerAuthSlice,
    event: eventSlice,
    book:bookingSlice,
    chat:chatSlice
});

const persistConfig = {
  key: 'root',
  storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)



  export const store = configureStore({
    reducer: persistedReducer,
  });
  export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


