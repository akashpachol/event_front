import axios from "axios";
import {store} from "../../../utils/redux/app/store";
import { BASE_URL } from "../../../utils/constants/baseUrls";
import { refreshAccessToken } from "../auth/apiMethod";
import { loginSuccess, logout } from "../../../utils/redux/slice/Auth/VenderAuthSlice";
import { toast } from "react-toastify";

export const venderApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

// Add a request interceptor
venderApi.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authToken = state.vender?.venderToken;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
venderApi.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const response = await refreshAccessToken();
        
        if (response.token) {
   
          store.dispatch(loginSuccess({ user: response }));

   
          originalRequest.headers["Authorization"] = `Bearer ${response.token}`;
          
          return venderApi(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        toast.error('Session expired. Please log in again.');
      
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);