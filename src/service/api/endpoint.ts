
export const authUrls = {
  register: "/auth/signup",
  verifyOtp: "/auth/verify-otp",
  resendOtp: "/auth/resend-otp",
  login: "/auth/login",
  googleAuth: "/auth/googleAuth",
  logout:"/auth/logout",
  forgotPassword: "/auth/forgotPassword",
  resetPassword: "/auth/resetPassword",
  forgotVerifyOtp: "/auth/verifyotp",
  refreshToken:"/auth/refreshAccessToken"
}
export const userUrls = {
    getUserData: "/user/profile",
    editProfileImg: "/user/profileimage",
   getlocation:'/user/getVerifyLocation',

  };

  export const adminUrls = {
    login: "/adminAuth",
      refreshToken:"/adminAuth/refreshAccessToken",
    getUserData: "/admin/users",
    getMangerData: "/admin/manager",
    getVenderData: "/admin/vender",
    blockUser:"/admin/userblock",
    addEvent:"/event/addeventtype",
    getEvent:"/event/getevent",
    blockEvent:"/event/eventblock",
    addVenterType:"/vender/addvendertype",
    blockVenterType:"/vender/vendertypeblock",
    getVenterType:"/vender/getvendertype",
    verifyVender:"/vender/verifyvender",
    verifyLocation:"/location/verfyLocation",
  };

  export const managerUrls = {
    addLocation:"/location/addLocation",
    editLocation:"/location/editLocation",
    gelocationwithId:"/location/getlocationwithid",
    gelocationDetails:"/location/getLocationDetails",
        getVender:'/vender/getVerifyVender'
  };

  export const venderUrls = {
    addVender:"/vender/addVender",
    geVenderwithId:"/vender/getvenderwithid",
  };