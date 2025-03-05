import { ApiAllDataResponse, ApiResponse, eventType, signupInputs, venderType } from "../../../utils/types";
import { apiCall } from "./apiCall";
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


  
export const refreshAccessToken = (refreshToken:string|null|undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrls.refreshToken}`;
 

      apiCall("post", url, {refreshToken})
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

  export const getAllUserDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getUserData}`;
   
  
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

  export const getAllMangerDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getMangerData}`;
   
  
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

  export const getAllVenderDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getVenderData}`;
   
  
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

  export const blockUser = (userId: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.blockUser, {userId})
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

  export const addEvent = (data: eventType): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.addEvent,data)
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

  export const getAllEventDeatails = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getEvent}`;
   
  
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

  
  export const blockEvent = (eventId: number|string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.blockEvent, {eventId})
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

  export const addVenderType = (data: venderType): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.addVenterType,data)
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


  export const blockVenterType = (vendertypetId: number): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.blockVenterType, {vendertypetId})
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

  
  export const getAllVenderType = (
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getVenterType}`;
   
  
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


  export const verifyLocation = (locationId: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        
        apiCall("post", adminUrls.verifyLocation, {locationId})
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
  export const verifyVender = (venderId: string): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        apiCall("post", adminUrls.verifyVender, {venderId})
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


  export const bookingCount = (year: number): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.bookingCount}/${year}`;

        apiCall("get",url ,null)
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

  export const geAllManager = (): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getAllManager}`;

        apiCall("get",url ,null)
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


  export const getAllData = (): Promise<ApiAllDataResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${adminUrls.getAllData}`;

        apiCall("get",url ,null)
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