import { ApiResponse, location, signupInputs,  } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { venderUrls } from "../endpoint";


  export const getAllVenderwithId = (venderId:string|undefined|null
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${venderUrls.geVenderwithId}/${venderId}`;
   
  
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


  export const addVender = (data: location): Promise<ApiResponse> => {

    return new Promise((resolve, reject) => {
      try {
        apiCall("post", venderUrls.addVender,data)
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

  export const editProfile = (
    userId: string | null | undefined,
    userData: signupInputs
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${venderUrls.getUserData}/${userId}`;
  
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
  
  export const getUserDeatails = (
    userId: string | null | undefined
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${venderUrls.getUserData}/${userId}`;
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
        const url = `${venderUrls.editProfileImg}/${userId}`;
  
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




