import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/app/store";
import { useNavigate } from "react-router-dom";

type RouteProps = {
  children: React.ReactNode;
};

const VenderAuth: React.FC<RouteProps> = ({ children }) => {
  const vender = useSelector((state: RootState) => state.vender);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vender.venderToken) {
      navigate("/vender/login");
    }
  }, [vender.venderToken, navigate]);

  if (vender.venderToken) {
    return <>{children}</>;
  }

  return null; 
};

export default VenderAuth;

