import React from "react";
import ForgotApi from "../../../../components/auth/forgot/ForgotApi";
const MangerForgot: React.FC = () => {
  return (
    <ForgotApi
      role={"manager"}
      style={{ bg_color: "manager_div_1", button: "manager_button" }}
      path={"/manager/otp"}
    />
  );
};

export default MangerForgot;
