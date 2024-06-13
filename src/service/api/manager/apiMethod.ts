import { ApiResponse, location,  } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { managerUrls } from "../endpoint";


  export const getAlllocationwithId = (locationId:string|undefined|null
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${managerUrls.gelocationwithId}/${locationId}`;
   
  
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


  export const addLocation = (data: location): Promise<ApiResponse> => {

    return new Promise((resolve, reject) => {
      try {
        apiCall("post", managerUrls.addLocation,data)
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
  export const getVender = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${managerUrls.getVender}`;
      
  
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

  




