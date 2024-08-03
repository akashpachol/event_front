import { ApiResponse, ApiResponseOfChat, ApiResponseOfMessage, location, signupInputs,  } from "../../../utils/types";
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



  export const searchData = (
    data: string | undefined,role:string,userId:string
  ): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${venderUrls.searchData}?role=${role}&search=${data}&id=${userId}`;
  
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



  
export const getUnreadMessages = (
  chatId: string|undefined ,userId:string
): Promise<ApiResponseOfChat> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.getUnreadMessagesFromChat}`;

      apiCall("post", url,{chatId,userId})
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




export const getAllChats = (
  userId:string
): Promise<ApiResponseOfChat> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.allChats}/${userId}`;

      apiCall("get", url,null)
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


export const postChat = (
  userId: string ,receiverId:string|undefined,
): Promise<ApiResponseOfChat> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.createChat}`;

      apiCall("post", url, {userId,receiverId})
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




export const getMessage = (
  chatId: string|undefined ,userId:string|undefined|null
): Promise<ApiResponseOfMessage> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.message}?chatId=${chatId} &userId=${userId}`;

      apiCall("get", url,null)
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



export const postMessage = (
  userId: string ,chatId:string|undefined,content:string
): Promise<ApiResponseOfMessage> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.message}`;

      apiCall("post", url, {userId,chatId,content})
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



export const getManagerBookingHistory = (
  venderId: string | null | undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.getMangerBooking}/${venderId}`;
  

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

export const getManagerBookingDetails = (
  bookingId: string | null | undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${venderUrls.getMangerbookingDetails}/${bookingId}`;


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
