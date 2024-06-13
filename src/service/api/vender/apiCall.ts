import { ApiError } from "../../../utils/types";
import { venderApi } from "./api";

export const apiCall = async <T>(method: string, url: string, data: T) => {
  try {
    let response;

    if (method === "post") {
      response = await venderApi.post(url, data);
    } else if (method === "get") {
      response = await venderApi.get(url);
    } else if (method === "patch") {
      response = await venderApi.patch(url, data);
    }
    return Promise.resolve(response?.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    return Promise.reject(apiError.response.data);
  }
};
