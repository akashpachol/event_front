import { ApiError } from "../../../utils/types";
import { managerApi } from "./api";

export const apiCall = async <T>(method: string, url: string, data: T) => {
  try {
    let response;

    if (method === "post") {
      response = await managerApi.post(url, data);
    } else if (method === "get") {
      response = await managerApi.get(url);
    } else if (method === "patch") {
      response = await managerApi.patch(url, data);
    }
    return Promise.resolve(response?.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    return Promise.reject(apiError.response.data);
  }
};
