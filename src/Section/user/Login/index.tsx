import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="label" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your mail"
              className="input"
            />
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
            />
            <button
              type="button"
              onClick={PasswordVisibility}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-4 ">
            <p className="text-end text-regal-blue"><a href="/forgotPassword">forgot password</a></p>
          </div>

          <button
            type="submit"
            className="bg-regal-blue authentication_button"
          >
            log in
          </button>
        </form>

        <p className="mt-5">
          Not registered yet? <a href="/signup">Create an account</a>
        </p>
        <button
          type="button"
          className="mt-5 flex items-center justify-center w-full max-w-sm text-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
