import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";
import ResetPasswordApi from "../../../../components/auth/reset/ResetPasswordApi";
const VenderReset: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.vender);
  useEffect(() => {
    if (user.venderToken) {
      navigate("/");
    }
  }, [user.venderToken, navigate]);

  return (
    <ResetPasswordApi
      role={"vender"}
      style={{
        bg_color: "user_div_1",
        button: "user_button",
      }}
      path={"/vender/login"}
    />
  );
};

export default VenderReset;
