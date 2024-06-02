import { ApiResponse, signupInputs } from "../../../utils/types";
import { apiCall } from "../apiCall";
import { adminUrls } from "../endpoint";
export const postLogin = (userData: signupInputs): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.login, userData)
          .then((response) => {
            resolve(response);
            console.log(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        resolve({ status: "500", message: "Somethings wrong." });
      }
    });
  };