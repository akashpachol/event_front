import React from "react";
import { useLocation } from "react-router-dom";
import OtpApi from "../../../../components/auth/otp/OtpApi";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/VenderAuthSlice";
const VenderOtp: React.FC = () => {
  const location = useLocation();
  const receivedData = location.state.type;
  return (
    <OtpApi
    loginSuccess={loginSuccess}
      receivedData={receivedData}
      style={{ bg_color: "user_div_1", button: "user_button" }}
      path={"/vender/reset"}
      pathdata={'/vender'}
    />
  );
};

export default VenderOtp;
