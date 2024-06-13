import React, { useEffect } from "react";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/managerAuthSlice";
import {  useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";

import LoginApi from "../../../../components/auth/login/LoginApi";

const ManagerLogin: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.manager);
  
  useEffect(() => {
    if (user.managerToken) {
      navigate("/manager");
    }
  }, [user.managerToken, navigate]);
return (
  <div>
    <LoginApi role={'manager'} loginSuccess={loginSuccess}  style={{bg_color:'manager_div_1',button:"manager_button"}} path={"/manager"} signUpPath={'/manager/signup'} forgotPath={'/manager/forgotPassword'}  />
  </div>
);
};

export default ManagerLogin;
