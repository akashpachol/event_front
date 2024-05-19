
import React from "react";

const Forgot : React.FC = () => {
 

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
          <div className="mb-6">
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
         
          

          <button
            type="submit"
            className="bg-regal-blue authentication_button"
          >
            Submit
          </button>
        </form>

      
       
      </div>
    </div>
  );
};

export default Forgot;
