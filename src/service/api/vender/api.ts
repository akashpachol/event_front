import axios from "axios";
import store from "../../../utils/redux/app/store";
import { BASE_URL } from "../../../utils/constants/baseUrls";

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
