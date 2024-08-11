export const authUrls = {
  register: "/auth/signup",
  verifyOtp: "/auth/verify-otp",
  resendOtp: "/auth/resend-otp",
  login: "/auth/login",
  googleAuth: "/auth/googleAuth",
  logout: "/auth/logout",
  forgotPassword: "/auth/forgotPassword",
  resetPassword: "/auth/resetPassword",
  forgotVerifyOtp: "/auth/verifyotp",
  refreshToken: "/auth/refreshAccessToken",
};
export const userUrls = {
  getUserData: "/user/profile",
  editProfileImg: "/user/profileimage",
  getlocation: "/location/getVerifyLocation",
  filterVender: "/vender/filterVender",
  bookingEvent: "/booking/bookLocation",
  paymentEvent: "/booking/paymentBooking",
  paymentcapture: "/booking/paymentcapture",  
  bookingHistory: "/booking/bookingHistory",  
  bookingDetails: "/booking/bookingDetails",  
  checkAvailability: "/booking/checkAvailability",  
  bookingCancel: "/booking/bookingCancel", 
  getWallet: "/user/getWallet",
  searchData: "/user/searchData",
  getManger: "/user/manager",
  allChats: "/chat/allChats",
  message:'/message',
  createChat:'/chat',
  getUnreadMessagesFromChat:"/message/getUnreadMessagesFromChat",

};

export const adminUrls = {
  login: "/adminAuth",
  refreshToken: "/adminAuth/refreshAccessToken",
  getUserData: "/admin/users",
  getMangerData: "/admin/manager",
  getVenderData: "/admin/vender",
  blockUser: "/admin/userblock",
  addEvent: "/event/addeventtype",
  getEvent: "/event/getevent",
  blockEvent: "/event/eventblock",
  addVenterType: "/vender/addvendertype",
  blockVenterType: "/vender/vendertypeblock",
  getVenterType: "/vender/getvendertype",
  verifyVender: "/vender/verifyvender",
  verifyLocation: "/location/verfyLocation",
};

export const managerUrls = {
  addLocation: "/location/addLocation",
  editLocation: "/location/editLocation",
  gelocationwithId: "/location/getlocationwithid",
  gelocationDetails: "/location/getLocationDetails",
  getVender: "/vender/getVerifyVender",
  getUserData: "/user/profile",
  editProfileImg: "/user/profileimage",
  getvenderwithid:"/vender/getVerifyVenderWithId",
  getUserBooking:"/manager/getUserBooking",
  getUserbookingDetails:"/manager/getUserbookingDetails",
  bookService: "/booking/bookService",
  venderPaymentBooking: "/booking/venderPaymentBooking",
  venderPaymentcapture: "/booking/venderPaymentcapture",  
  addOffer: "/offer/addOffer",
  getOffer: "/offer/getOffer", 
  blockOffer: "/offer/blockOffer", 
  editOffer: "/offer/editOffer", 
  searchData: "/user/searchData",
  getManger: "/user/manager",
  allChats: "/chat/allChats",
  groupChat: "/chat/group",
  message:'/message',
   createChat:'/chat',
   getUnreadMessagesFromChat:"/message/getUnreadMessagesFromChat",
   getWallet: "/user/getWallet",

};

export const venderUrls = {
  addVender: "/vender/addVender",
  geVenderwithId: "/vender/getvenderwithid",
  getUserData: "/user/profile",
  editProfileImg: "/user/profileimage",
  searchData: "/user/searchData",
  getUnreadMessagesFromChat:"/message/getUnreadMessagesFromChat",
  allChats: "/chat/allChats",
  createChat:'/chat',
  message:'/message',
  getMangerBooking:"/booking/getMangerBooking",
  getMangerbookingDetails:"/booking/getMangerbookingDetails",
};
export const commenUrls = {
  deleteForMe: "/message/deleteForMe",
  deleteForEveryOne: "/message/deleteEveryOne",
  getNotifications:"/notification/getNotifications"

};