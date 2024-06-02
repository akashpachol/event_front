import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ApiResponse, signupInputs } from "../../../utils/types";
import { DevTool } from "@hookform/devtools";
import { googleAuthenticate, postLogin } from "../../../service/api/user/apiMethod";
import { loginSuccess } from "../../../utils/redux/slice/Auth/UserAuthSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {  GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { RootState } from "../../../utils/redux/app/store";

interface TokenResponse {
  access_token: string;
}


const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { register, handleSubmit, control, formState } =
    useForm<signupInputs>();
  const { errors } = formState;


  const user = useSelector((state: RootState) => state.user);


  useEffect(() => {
  if(!user.token){
    navigate('/login')
  }else{
    navigate('/')
  }
  }, [user.token, navigate]);


  const onSubmit: SubmitHandler<signupInputs> = (payloads) => {
    postLogin(payloads)
      .then((response: ApiResponse) => {
        if (response.status === "success") {
          toast.success(response.message);
          dispatch(loginSuccess({ user: response }));
          navigate("/");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };




  const handleGoogleSuccess = async (tokenResponse: TokenResponse) => {
    try {
      const { access_token } = tokenResponse;
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      );
      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userObject = await userInfoResponse.json();
const payload={
    username:userObject.name,
     email:userObject.email
}

      googleAuthenticate(payload)
      .then((response: ApiResponse) => {
        if (response.status === "success") {
          toast.success(response.message);
  
        
         
          
          dispatch(loginSuccess({ user: response }));
          navigate("/");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });

      
   
    } catch (error) {
      console.error("Failed to handle Google login", error);
      toast.error("Failed to handle Google login");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast.error("Google login failed. Please try again.");
    },
  });
  return (
    <div className="w-full flex   md:flex-row">
      <div className="authentication_div_1  bg-regal-blue">
        <div className="w-1/2 p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">New Here!</h1>
          <p className=" text-white mb-4">
            Signin up and discover a great amount of new oppertunities
          </p>
          <button
            type="submit"
            className="bg-regal-blue  border border-white authentication_button"
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="authentication_div_2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create an account
        </h1>

        <form
          className="w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <DevTool control={control} placement="top-left" />
          <div className="mb-4">
            <label className="label" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your mail"
              className="input"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className=" relative mb-4">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="input"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={PasswordVisibility}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div className="mb-4 ">
            <p className="text-end text-regal-blue">
              <a href="/forgotPassword">forgot password</a>
            </p>
          </div>

          <button type="submit" className="bg-regal-blue authentication_button">
            log in
          </button>
        </form>

        <p className="mt-5">
          Not registered yet? <a href="/signup">Create an account</a>
        </p>
        <GoogleOAuthProvider
          clientId="148557789553-sacq2fu1liun02j38c29srmi5ego060l.apps.googleusercontent.com"
        >
          <button
            type="button"
            onClick={() => googleLogin()}
            className="mt-5 flex items-center justify-center w-full max-w-sm text-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FcGoogle className="mr-2" /> Sign in with Google
          </button>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
