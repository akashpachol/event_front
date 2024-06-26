import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/app/store";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/VenderAuthSlice";
import LoginApi from "../../../../components/auth/login/LoginApi";


const VenderLoginPage = () => {
    const navigate: NavigateFunction = useNavigate();
    const user = useSelector((state: RootState) => state.vender);
    
    useEffect(() => {
      if (user.venderToken) {
        navigate("/vender");
      }
    }, [user.venderToken, navigate]);
  return (
    <div>
      <LoginApi role={'vender'} loginSuccess={loginSuccess}  style={{bg_color:'user_div_1',button:"user_button"}} path={"/vender"} forgotPath={'/vender/forgotPassword'} signUpPath="/vender/signup"  />
    </div>
  );
}

export default VenderLoginPage;
