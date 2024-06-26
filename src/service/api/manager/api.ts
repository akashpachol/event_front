import axios from "axios";
import {store} from "../../../utils/redux/app/store";
import { BASE_URL } from "../../../utils/constants/baseUrls";
import { refreshAccessToken } from "../auth/apiMethod";
import { toast } from "react-toastify";
import { loginSuccess, logout } from "../../../utils/redux/slice/Auth/managerAuthSlice";

export const managerApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});


managerApi.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authToken = state.manager?.managerToken;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

managerApi.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    console.log('ghfjghkjfjh');
    
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {

        const state = store.getState();
        const authRefreshToken = state.manager?.refreshToken;
        const response = await refreshAccessToken(authRefreshToken);
        console.log(response, 'Token refreshed successfully');
        

        if (response.token) {
          store.dispatch(loginSuccess({ user: response }));

          const updatedState = store.getState();
          originalRequest.headers["Authorization"] = `Bearer ${updatedState.manager?.managerToken}`;
          
          return managerApi(originalRequest);
        } else {
          throw new Error("Failed to refresh token");
        }
          
      
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        toast.error('Session expired. Please log in again.');
        // Optionally, dispatch a logout action or redirect to login page
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);


