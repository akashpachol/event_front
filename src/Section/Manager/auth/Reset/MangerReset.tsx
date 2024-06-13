import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";
import ResetPasswordApi from "../../../../components/auth/reset/ResetPasswordApi";
const MangerReset: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.manager);
  useEffect(() => {
    if (user.managerToken) {
      navigate("/manager");
    }
  }, [user.managerToken, navigate]);
  return (
    <ResetPasswordApi
      role={"manager"}
      style={{ bg_color: "manager_div_1", button: "manager_button" }}
      path={"/manager/login"}
    />
  );
};

export default MangerReset;
