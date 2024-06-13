import { ApiResponse,  signupInputs } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { userUrls } from "../endpoint";

export const getUserDeatails = (
  userId: string | null | undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.getUserData}/${userId}`;
      console.log(url, "lfkldfdlkfdl");

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};

export const editProfileImg = (
  userId: string | null | undefined,
  image: string
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.editProfileImg}/${userId}`;

      apiCall("patch", url, { secure_url: image })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};
export const editProfile = (
  userId: string | null | undefined,
  userData: signupInputs
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.getUserData}/${userId}`;

      apiCall("patch", url, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};





export const getLocation = (
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.getlocation}`;
    

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};

