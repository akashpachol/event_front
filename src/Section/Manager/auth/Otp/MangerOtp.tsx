import React from "react";
import { useLocation } from "react-router-dom";
import OtpApi from "../../../../components/auth/otp/OtpApi";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/managerAuthSlice";

const MangerOtp: React.FC = () => {
  const location = useLocation();
  const receivedData = location.state.type;

  return (
    <OtpApi
    loginSuccess={loginSuccess}
      receivedData={receivedData}
      style={{ bg_color: "manager_div_1", button: "manager_button" }}
      path={"/manager/reset"}
      pathdata={'/manager'}
    />
  );
};

export default MangerOtp;
