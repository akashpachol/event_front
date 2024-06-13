import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/app/store";
import { useNavigate } from "react-router-dom";

type RouteProps = {
  children: React.ReactNode;
};

const ManagerAuth: React.FC<RouteProps> = ({ children }) => {
  const manager = useSelector((state: RootState) => state.manager);
  const navigate = useNavigate();

  useEffect(() => {
    if (!manager.managerToken) {
      navigate("/manager/login");
    }
  }, [manager.managerToken, navigate]);

  if (manager.managerToken) {
    return <>{children}</>;
  }
  
  // Optionally, you can return null or some loading indicator here
  return null;
};

export default ManagerAuth;
