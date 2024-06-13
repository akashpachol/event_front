import React from "react";
import ForgotApi from "../../../../components/auth/forgot/ForgotApi";

const VenderForgot: React.FC = () => {
  return (
    <ForgotApi
      role={"vender"}
      style={{ bg_color: "user_div_1", button: "user_button" }}
      path={"/vender/otp"}
    />
  );
};

export default VenderForgot;
