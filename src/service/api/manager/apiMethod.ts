import { ApiResponse, location  } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { managerUrls } from "../endpoint";


  export const getAlllocationwithId = (maangerId:string|undefined|null
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${managerUrls.gelocationwithId}/${maangerId}`;
   
  
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

  export const getlocationDetails = (locationId:string|undefined|null
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${managerUrls.gelocationDetails}/${locationId}`;
   
  
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

  
export const editLocation = (data: location): Promise<ApiResponse> => {
console.log(data);

    return new Promise((resolve, reject) => {
      try {
        apiCall("put", managerUrls.editLocation,data)
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



