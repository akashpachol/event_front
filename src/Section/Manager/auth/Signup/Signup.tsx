import React from "react";
import SignupApi from "../../../../components/auth/signup/SignupApi";

const MangerSignup: React.FC = () => {
  return (
    <SignupApi
      role={"manager"}
      style={{ bg_color: "manager_div_1", button: "manager_button" }}
      path={"/manager/otp"}
      loginPath={'/manager/login'}
    />
  );
};

export default MangerSignup;
