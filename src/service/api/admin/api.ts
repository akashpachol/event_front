import axios from "axios";
import store from "../../../utils/redux/app/store";
import { BASE_URL } from "../../../utils/constants/baseUrls";

export const adminApi = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

// Add a request interceptor
adminApi.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authToken = state.admin?.adminToken;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
