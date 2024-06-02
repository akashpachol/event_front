import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ApiResponse, signupInputs } from "../../../utils/types";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../../service/api/user/apiMethod";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
const Signup: React.FC = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { register, handleSubmit, control, formState } =
    useForm<signupInputs>();
  const { errors } = formState;

  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
 
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

    const onSubmit: SubmitHandler<signupInputs> = (payloads) => {
      postRegister(payloads).then((response: ApiResponse) => {
      

        
        if (response.status === 'success') {
          toast.success(response.message);
          navigate(`/otp`, { state: { email: payloads.email } });
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });

  };
 
  return (
    <div className="w-full flex md:flex-row">
      <div className="authentication_div_1 bg-regal-blue">
        <div className="w-full xl:w-1/2 p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-white mb-4">
            To keep connected with us please login with your personal info
          </p>
          <button
            type="submit"
            className="bg-regal-blue border border-white authentication_button"
          >
            Login
          </button>
        </div>
      </div>
      <div className="authentication_div_2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Create an account
        </h1>
        <DevTool control={control} placement="top-left" />
        <form
          className="w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="mb-4">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              className="input"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            <p className="text-red-600">{errors.username?.message}</p>
          </div>
          <div className="mb-4">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
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
          <div className="relative mb-4">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
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
              className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 ${
                errors.password ? "top-1" : "top-7"
              }`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div className="relative mb-4">
            <label className="label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
                validate: (value) =>
                  value ===
                    (document.getElementById("password") as HTMLInputElement)
                      .value || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={ConfirmPasswordVisibility}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 ${
                errors.confirmPassword ? "top-1" : "top-6"
              }`}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="text-red-600">{errors.confirmPassword?.message}</p>
          </div>
          <button type="submit" className="bg-regal-blue authentication_button">
            Sign Up
          </button>
        </form>
        <p className="mt-5">
          Already have an account? <a href="/">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
