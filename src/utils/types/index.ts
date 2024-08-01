export type signupInputs = {
  username?: string
  email?: string
  password?:string
  phone?:string
  confirmPassword?:string,
  oldpassword?:string
  role?:string
  }


  export type initialSate={
    loading: boolean,
    token?:  string | null|undefined,
    userId?: string | null|undefined,
    user?: string|null|undefined,
    adminId?: string | null|undefined,
    admin?: string|null|undefined
    adminToken?:  string | null|undefined,
    refreshToken?:string | null|undefined,
    adminrefreshToken?:string | null|undefined,
  }

  export type venderSate={
    loading: boolean,

    venderId?: string | null|undefined,
    vender?: string|null|undefined
    venderToken?:  string | null|undefined,
    venderRefreshToken?:string | null|undefined,

  }
  export type managerSate={
    loading: boolean,

    managerId?: string | null|undefined,
    manager?: string|null|undefined
    managerToken?:  string | null|undefined,
    refreshToken?: string | null|undefined,
  }

  export type ErrorMessageProps ={
    error?: string | null;
    open: boolean;
    message?: string | null,
    onClose: () => void;
  }

  export type OtpInputs = {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
  };

  export type reest = {
    password:string
  
    confirmPassword?:string,
    oldpassword?:string
   
  };

  export type ApiResponse={
    status: string;
    message: string;
    token?:string;
    user?:string;
    data?: object| [];
    userId?:string;
    adminId?: string ,
    admin?: string,
    type?:string,
    newAccessToken?:string,
    refreshToken?:string,
    role?:string
  }

  export type ApiSearchResponse={
    status: string;
    message: string;
  
    data?: object| [];
   
  }


  export type ApiError = {
    response: {
      data: {
        message: string;
      };
    };
  };




 export type ProfileFormProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userData:userDataTypes |null,
    setApi: React.Dispatch<React.SetStateAction<boolean>>;
    api:boolean,
  };
  export type cropFormProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
   
  };
 export type CropperDemoProps = {
    src: string;
    handleClose: () => void;
    getCroppedFile: (croppedImageUrl: string) => void;
  };

  export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };


  export type userDataTypes ={
    _id:string,
    username:string,
    email:string,
    phone?: string|undefined,
    image?:string| undefined,
    createdAt?:string,
    updatedAt?:string,
    isBlocked?:boolean,
    refreshToken?:string,
    refreshTokenExpiresAt?:string
    role:string
  }


  export type propsValue={
    role?:string ,
    style:{button:string,bg_color:string},
    loginSuccess?:any;
    path:string,
    forgotPath?:string,
    receivedData?:string,
    pathdata?:string,
    loginPath?:string,
    signUpPath?:string

   }

   export type eventType={
      name:string,
      description:string,
      imageFile?: string,
      image:string,

   }

   export type venderType={
    name:string,
    description:string,
    imageFile?: string,
    image:string,
    _id:string,
 }
 export type ApiResponseLocation={
  status: string;
  message: string;
  data?:object|null;
 }

 export type location = {
  _id?: string;
  name: string;
  description: string;
  address: string;
  state: string;
  type: string[];
  price: number;
  capasity: string;
  image: {url:string}[];
  manager?: string | null | undefined;
  verify?: boolean;
  discountPrice?:number
}

export type offer={
  name:string,
  discountValue:number,
_id?:string
  endDate:string,
  startDate:string,
  discountedManager:string | null | undefined,
  isActive?:boolean
}

 export type eventDataTypes= {
  _id: number |string;
  name: string;
  description: string;
  image?: string;
  isBlocked?: boolean;
  createdAt?:string;
  updatedAt?:string
}

 export type vender={
  _id: string;
  name:string,
  description:string,
  address:string,
  state:string,
  type:string,
  price:string,

  image:string[],
  vender?:string |null|undefined,
  verify?: boolean;
 }


 export type booking={
  _id?: string;
  name:string,
  event:string,
  count:string,
  type: string[],
  time:string,
  date:string,
  service: string[],
  manager:string,
  locationData:string,
 }

 export type serviceBooking={
  _id?: string;
  name:string,
  event:string,
  count:string,
  vender:string
  date:string,
  manager:string|undefined|null,
  venderData:string|undefined,
  status:string,
  bookingData?:string,
 }
 export type bookingData={
  _id?: string|undefined;
  name:string,
  event:eventDataTypes,
  count:string,
  type: string[],
  time:string,
  date:string,
  total:number,
  phone:string,
  service: string[],
  manager:userDataTypes,
  user:userDataTypes,
  locationData:location,
  status?:string
 }

 export type eventState={
  loading: boolean,

data:eventDataTypes[]|null

}

export type selectUser={
  loading: boolean,


  user:userDataTypes|null,



}


export type ApiResponseOfBooking={
  status: string;
  message: string;

  data?: object| bookingData[];
 
  
}

export type ApiResponseOfWallet={
  status: string;
  message: string;

  data?: wallet
 
  
}

export type ApiResponseOfChat={
  status: string;
  message: string;

  data?:chat
 
  
}

export type ApiResponseOfMessage={
  status: string;
  message: string;

  data?:message
 
  
}



export type wallet={
  _id?:string
  user: string;
  walletBalance: number;
  transactions:transaction[]


 
  
}

export type transaction={
  _id?:string
  date: string;
  amount: number;
  type:string 
}


export type chatType={
  _id?:string
  chatName: string;
  users: userDataTypes[];
  isGroupChat:boolean;
  messages?:any 
  groupAdmin?:string;  
}

export type chatSliceType={
loading:boolean,
data:chat |null,
}

export type message={
  _id?:string
  content: string;
  sender: userDataTypes;
  chat:chatType;
  readBy?:userDataTypes,
  createdAt:string
}


export type chat={
  _id?:string
  chatName?: string;
  isGroupChat?: boolean;
  users?: userDataTypes[];
  messages?: string[];
  groupAdmin?:string;  
}