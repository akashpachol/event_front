export type signupInputs = {
  username?: string
  email: string
  password:string
  phone?:string
  confirmPassword?:string
  }


  export type initialSate={
    loading: boolean,
    token:  string | null|undefined,
    userId?: string | null|undefined,
    user?: string|null|undefined,
    adminId?: string | null|undefined,
    admin?: string|null|undefined
  

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

  export type ApiResponse={
    status: string;
    message: string;
    token?:string;
    user?:string;
    data?: object|userDataTypes;
    userId?:string;
    adminId?: string ,
    admin?: string
  }

  export type ApiError = {
    response: {
      data: {
        message: string;
      };
    };
  };


  export type GoogleUser= {
username:string,
email:string;
  }

 export type ProfileFormProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userData:object |null
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
    updatedAt?:string
  }