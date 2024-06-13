
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
}
export const userUrls = {
    getUserData: "/user/profile",
    editProfileImg: "/user/profileimage",
   getlocation:'/user/getVerifyLocation',

  };

  export const adminUrls = {
    login: "/adminAuth",
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
    gelocationwithId:"/location/getlocationwithid",
        getVender:'/vender/getVerifyVender'
  };

  export const venderUrls = {
    addVender:"/vender/addVender",
    geVenderwithId:"/vender/getvenderwithid",
  };