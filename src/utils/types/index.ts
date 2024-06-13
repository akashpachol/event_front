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

  }

  export type venderSate={
    loading: boolean,

    venderId?: string | null|undefined,
    vender?: string|null|undefined
    venderToken?:  string | null|undefined,

  }
  export type managerSate={
    loading: boolean,

    managerId?: string | null|undefined,
    manager?: string|null|undefined
    managerToken?:  string | null|undefined,

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
    data?: object|userDataTypes;
    userId?:string;
    adminId?: string ,
    admin?: string,
    type?:string,
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
    userData:object |null,
    setApi:any,
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
    isBlocked?:boolean
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

 export type location={
  _id:string;
  name:string,
  description:string,
  address:string,
  state:string,
  type:string,
  price:string,
  capasity:string,
  image:object,
  manager?:string |null|undefined,
  verify?: boolean;
 }


 export type vender={
  name:string,
  description:string,
  address:string,
  state:string,
  type:string,
  price:string,

  image:object,
  vender?:string |null|undefined,
  verify?: boolean;
 }