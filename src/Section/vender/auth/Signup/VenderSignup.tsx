import React from "react";
import SignupApi from "../../../../components/auth/signup/SignupApi";

const VenderSignup: React.FC = () => {
  return (
    <SignupApi
      role={"vender"}
      style={{ bg_color: "user_div_1", button: "user_button" }}
      path={"/vender/otp"}
      loginPath={'/vender/login'}
    />
  );
};

export default VenderSignup;
