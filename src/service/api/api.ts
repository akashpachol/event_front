import axios from "axios";
import store from "../../utils/redux/app/store";
import { BASE_URL } from "../../utils/constants/baseUrls";

export const api = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

const state = store.getState();

const authToken = state.user.token;
console.log(authToken, "kkkk");

api.interceptors.request.use(
  async (config) => {
    console.log(config, "config");

    config.headers["Authorization"] = `Bearer ${authToken}`;
    console.log(config, "config");

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

console.log("config");
